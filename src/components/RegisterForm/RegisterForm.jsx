import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../redux/auth/operations";
import { Form, Field, Formik, ErrorMessage, useField } from "formik";
import { toast } from "react-hot-toast";
import * as Yup from "yup";
import css from "./RegisterForm.module.css";

  const RegisterForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

  const handleSubmit = async (values, options) => {
    try {
      const result = await dispatch(register(values)).unwrap(); 
      if (result) {
        navigate("/photo");
      }
      options.resetForm();
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    }
  };

  const initialValues = {
    name: "",
    email: "",
    password: "",
    checkPwd: "",
  };
    
  const registerSchema = Yup.object().shape({
    name: Yup.string().min(2, "Too Short!").max(32, "Too Long!").trim().required(),
    email: Yup.string().email().max(64, "Too Long!").trim().required(),
    password: Yup.string().min(8, "Too Short!").max(64, "Too Long!").trim().required(),
    checkPwd: Yup.string().min(8, "Too Short!").max(64, "Too Long!").trim().required(),
  });
    


  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={registerSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className={css.form} autoComplete="off">
            <label className={css.label}>
              Enter your name
              <Field name="name">
                {({ field, meta }) => (
                  <input
                    {...field}
                    type="text"
                    className={`${css.field} ${
                      meta.touched && meta.error ? css.errorField : ""
                    }`}
                  />
                )}
              </Field>
              <ErrorMessage name="name" className={css.error} component="div" />
            </label>

            <label className={css.label}>
              Enter your email address
              <Field name="email">
                {({ field, meta }) => (
                  <input
                    {...field}
                    type="email"
                    className={`${css.field} ${
                      meta.touched && meta.error ? css.errorField : ""
                    }`}
                  />
                )}
              </Field>
              <ErrorMessage name="email" className={css.error} component="div" />
            </label>

            <label className={css.label}>
              Create a strong password
              <Field name="password">
                {({ field, meta }) => (
                  <input
                    {...field}
                    type="password"
                    className={`${css.field} ${
                      meta.touched && meta.error ? css.errorField : ""
                    }`}
                  />
                )}
              </Field>
              <ErrorMessage name="password" className={css.error} component="div" />
            </label>

            <label className={css.label}>
              Repeat your password
              <Field name="checkPwd">
                {({ field, meta }) => (
                  <input
                    {...field}
                    type="password"
                    className={`${css.field} ${
                      meta.touched && meta.error ? css.errorField : ""
                    }`}
                  />
                )}
              </Field>
              <ErrorMessage name="checkPwd" className={css.error} component="div" />
            </label>

            <button className={css.regBtn} type="submit">
              Create account
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
