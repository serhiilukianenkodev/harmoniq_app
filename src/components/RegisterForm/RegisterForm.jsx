import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import { Form, Field, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./RegisterForm.module.css";

const RegisterForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, options) => {
    dispatch(register(values));

    options.resetForm();
  };

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const registerSchema = Yup.object().shape({
    name: Yup.string().trim().required(),
    email: Yup.string().email().trim().required(),
    password: Yup.string().min(5).trim().required(),
  });

  return (
    <div>
      <Formik
        onSubmit={handleSubmit}
        validationSchema={registerSchema}
        initialValues={initialValues}
      >
        <Form className={css.form} autoComplete="off">
          <label className={css.label}>
            Username
            <Field type="text" name="name" />
            <ErrorMessage name="name" className="error" component="div" />
          </label>
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
          <button type="submit">Register</button>
        </Form>
      </Formik>
    </div>
  );
};

export default RegisterForm;
