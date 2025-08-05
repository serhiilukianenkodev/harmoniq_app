import { addArticle, updateArticle } from "../../redux/articles/operations";
import { getArticleById } from "../../redux/articles/operations";
import RichTextEditor from "../RichTextEditor/RichTextEditor";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Form, Field, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import css from "./CreateArticleForm.module.css";

const Photo = () => (
  <svg width={96} height={80} aria-hidden="true">
    <use href="/icons/sprite.svg#photo" />
  </svg>
);

const CreateArticleForm = ({articleId}) => {
  const dispatch = useDispatch();
  const id = articleId; 
  const isEdit = Boolean(id);
  
  const [initialValues, setInitialValues] = useState({
    title: "",
    desc: "",
    photo: null,
  });

  const articleSchema = Yup.object().shape({
    title: Yup.string().min(3, "too short!").max(48).trim().required(),
    desc: Yup.string().min(100, "too short!").max(4000, "too long!").trim().required(),
    photo: isEdit
      ? Yup.mixed().nullable()
      : Yup.mixed()
        .required("photo is required")
        .test(
          "fileSize",
          "file size must be less than 1MB",
          (value) => value && value.size <= 1024 * 1024
        )
  });

  useEffect(() => {
    if (isEdit) {
      dispatch(getArticleById(id))
        .unwrap()
        .then((data) => {
          setInitialValues({
            title: data.title,
            desc: data.desc.replace(/\/n/g, "\n"),
            photo: data.img, 
          });
        })
        .catch(() => toast.error("Failed to load article"));
    }
  }, [isEdit, id, dispatch]);

  const handleSubmit = (values, options) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("desc", values.desc);
    if (values.photo && typeof values.photo !== "string") {
      formData.append("photo", values.photo);     
    }

    const action = isEdit
      ? updateArticle({ id, formData })
      : addArticle(formData);

    dispatch(action)
      .unwrap()
      .then(() => toast.success(isEdit ? "Article updated!" : "Article created!"))
      .catch(() => toast.error("Something went wrong..."));

    if (!isEdit) options.resetForm();
  };

  
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={articleSchema}
      onSubmit={handleSubmit}
      >
        {() => (
        <Form className={css.container} autoComplete="off">
            <div className={css.photoWrapper}>
            <Field name="photo">
            {({ form, meta }) => {
              const file = form.values.photo;
              const previewUrl = typeof file === "string" 
                ? file                
                : file             
                  ? URL.createObjectURL(file)
                  : null; 
    
              useEffect(() => {
                return () => {
                  if (file && typeof file !== "string") {
                    URL.revokeObjectURL(previewUrl);
                  }
                };
              }, [previewUrl, file]);

              return (
                <div>
                  <button
                    type="button"
                    className={css.photoBtn}
                    onClick={() => document.getElementById("fileInput").click()}
                  >
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className={css.previewUrl}
                      />
                    ) : (
                      <Photo />
                    )}
                    <input
                      id="fileInput"
                      type="file"
                      className={css.inputFile}
                      style={{ display: "none" }}
                      onChange={(event) => {
                        const file = event.currentTarget.files[0];
                        form.setFieldValue("photo", file);
                        event.target.value = ""; 
                      }}
                    />
                  </button>
                  {meta.touched && meta.error && 
                  <div className={css.error}>{meta.error}</div>}
                </div>
              );
            }}
            </Field>
          </div>
        
        <div className={css.inputWrapper}>
          <label>
              <span className={css.title}>Title</span>
              <Field name="title">
                {({ field, meta }) => (
                  <input
                    {...field}
                    type="text"
                    className={`${css.input} ${meta.touched && meta.error ? css.errorField : ""}`}
                    placeholder="Enter the title"
                    />
                  )}
                </Field>
                <ErrorMessage name="title" className={css.error} component="div" />
            </label>
          </div>
          
        <div className={css.txtareaWrapper}>
          <label htmlFor="descEditor">
            <Field name="desc">
              {({ field, form, meta }) => (
                <RichTextEditor
                  id="descEditor"
                  value={field.value}
                  onChange={(val) => form.setFieldValue(field.name, val)}
                  className={`${css.txtarea} ${meta.touched && meta.error ? css.errorField : ""}`}
                />
              )}
            </Field>
            <ErrorMessage name="desc" className={css.error} component="div" />
            </label>
        </div>

          <button className={css.createBtn} type="submit">
            {isEdit ? "Save changes" : "Publish Article"}
          </button>           
          </Form>
        )}
      </Formik>
  );
};

export default CreateArticleForm;
