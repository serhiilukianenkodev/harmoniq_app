import { useDispatch } from "react-redux";
import { useState } from "react";
import { logIn } from "../../redux/auth/operations";
import { Form, Field, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./LoginForm.module.css";
import toast from "react-hot-toast";

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

const LoginForm = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const loginSchema = Yup.object().shape({
    email: Yup.string().email().max(64, "Too Long!").trim().required(),
    password: Yup.string().min(8, "Too Short!").max(64, "Too Long!").trim().required(),
  });

  const handleSubmit = (values, options) => {
    dispatch(logIn(values))
      .unwrap()
      .then(() => {
        toast.success("login success");
      })
      .catch(() => {
        toast.error("login error");
      });

    options.resetForm();
  };

  return (
    <div>
  <Formik
  initialValues={initialValues}
  validationSchema={loginSchema}
  onSubmit={handleSubmit}
>
  {() => (
    <Form className={css.form} autoComplete="on">
      <label className={css.label}>
        Enter your email address
        <Field name="email">
          {({ field, meta }) => (
            <input
              {...field}
              type="email"
              className={`${css.field} ${meta.touched && meta.error ? css.errorField : ""}`}
            />
          )}
        </Field>
        <ErrorMessage name="email" className={css.error} component="div" />
      </label>

<label className={css.label}>
  Enter a password
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

      <button className={css.logBtn} type="submit">Login</button>
    </Form>
  )}
</Formik>
    </div>
  );
};

export default LoginForm;
