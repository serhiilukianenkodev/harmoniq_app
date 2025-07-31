import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Form, Field, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addArticle } from "../../redux/articles/operations";
import css from "./CreateArticleForm.module.css";
import toast from "react-hot-toast";

const Photo = () => (
  <svg width={96} height={80} aria-hidden="true">
    <use href="/icons/sprite.svg#photo" />
  </svg>
);

const CreateArticleForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    title: "",
    desc: "",
    photo: null,
  };

  const articleSchema = Yup.object().shape({
    title: Yup.string().min(3, "Too Short!").max(48).trim().required(),
    desc: Yup.string().min(100, "Too Short!").max(4000, "Too Long!").trim().required(),
    photo: Yup.mixed()
      .required("Photo is required")
      .test(
        "fileSize",
        "File size must be less than 1MB",
        (value) => value && value.size <= 1024 * 1024
      )
  });

  const handleSubmit = (values, options) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("desc", values.desc);
    if (values.photo) formData.append("photo", values.photo);

    dispatch(addArticle(formData)) 
      .unwrap()
      .then(() => toast.success("Article created!"))
      .catch(() => toast.error("Something went wrong..."));

    options.resetForm();
  };

  
  return (
      <Formik
      initialValues={initialValues}
      validationSchema={articleSchema}
      onSubmit={handleSubmit}
      >
        {() => (
        <Form className={css.container} autoComplete="off">
          <div className={css.photoInput}>
            <div className={css.photoWrapper}>
            <Field name="photo">
            {({ form, meta }) => {
              const file = form.values.photo;
              const previewUrl = file ? URL.createObjectURL(file) : null;

              useEffect(() => {
                return () => {
                  if (previewUrl) URL.revokeObjectURL(previewUrl); 
                };
              }, [previewUrl]);

              return (
                <div className={css.btn}>
                  <button
                    type="button"
                    className={css.photoBtn}
                    onClick={() => document.getElementById("fileInput").click()}
                  >
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="Preview"
                        style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }}
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
                  {meta.touched && meta.error && <div className={css.error}>{meta.error}</div>}
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
              </label>
              </div>
            </div>

            <Field name="desc">
              {({ field, meta }) => (               
                <textarea               
                  {...field}                  
                  type="text"                  
                  className={`${css.txtarea} ${meta.touched && meta.error ? css.errorField : ""}`}
                  placeholder="Enter a text"
                />                
              )}              
            </Field>            
            <button className={css.createBtn} type="submit">Publish Article</button>           
          </Form>
        )}
      </Formik>
  );
};

export default CreateArticleForm;
