import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { register } from "../../redux/auth/operations";
import { Form, Field, Formik, ErrorMessage, useField } from "formik";
import { toast } from "react-hot-toast";
import * as Yup from "yup";
import css from "./RegisterForm.module.css";

const EyeOpen = () => (
  <svg width={24} height={24} aria-hidden="true">
    <use href="/icons/sprite.svg#eye" />
  </svg>
);

const EyeClosed = () => (
  <svg width={24} height={24} aria-hidden="true">
    <use href="/icons/sprite.svg#eye-crossed" />
  </svg>
);

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (values, options) => {
    try {
      const { name, email, password } = values;
      const result = await dispatch(register({ name, email, password })).unwrap();

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
    confirmPassword: "",
  };
    
  const registerSchema = Yup.object().shape({
    name: Yup.string().min(2, "Too Short!").max(32, "Too Long!").trim().required(),
    email: Yup.string().email().max(64, "Too Long!").trim().required(),
    password: Yup.string().min(8, "Too Short!").max(64, "Too Long!").trim().required(),
    confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords don't match").min(8, "Too Short!").max(64, "Too Long!").trim().required(),
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
            <div className={css.iconField}>
               <Field name="password">
                    {({ field, meta }) => (
                      <input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        className={`${css.field} ${meta.touched && meta.error ? css.errorField : ""}`}
                      />
                    )}
                  </Field>
                    <button
                    type="button"
                    onClick={() => setShowPassword(prev => !prev)}
                    className={css.iconButton}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOpen /> : <EyeClosed />}
                  </button>
              </div>
              <ErrorMessage name="password" className={css.error} component="div" />
            </label>

            <label className={css.label}>
              Repeat your password
              <div className={css.iconField}>
              <Field name="confirmPassword">
                    {({ field, meta }) => (
                      <input
                        {...field}
                        type={showConfirmPassword ? "text" : "password"}
                        className={`${css.field} ${meta.touched && meta.error ? css.errorField : ""}`}
                      />
                    )}
                </Field>
                   <button
                    type="button"
                    onClick={() => setShowConfirmPassword(prev => !prev)}
                    className={css.iconButton}
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? <EyeOpen /> : <EyeClosed />}
                  </button>
              </div>
              <ErrorMessage name="confirmPassword" className={css.error} component="div" />
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
