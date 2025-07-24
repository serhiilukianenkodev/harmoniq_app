import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";
import { Form, Field, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./LoginForm.module.css";
import toast from "react-hot-toast";

const LoginForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  const loginSchema = Yup.object().shape({
    email: Yup.string().email().trim().required(),
    password: Yup.string().min(5).trim().required(),
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
        <Form className={css.form} autoComplete="off">
          <label className={css.label}>
            Email
            <Field type="email" name="email" />
            <ErrorMessage name="email" className="error" component="div" />
          </label>
          <label className={css.label}>
            Password
            <Field type="password" name="password" />
            <ErrorMessage name="password" className="error" component="div" />
          </label>
          <button type="submit">Log In</button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
