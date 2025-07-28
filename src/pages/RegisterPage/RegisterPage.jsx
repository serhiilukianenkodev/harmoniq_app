import RegisterForm from "../../components/RegisterForm/RegisterForm";
import { NavLink } from "react-router-dom";
import css from "./RegisterPage.module.css"


export default function RegisterPage() {
  return (
    <div className={css.container}>
        <h1 className={css.title}>Register</h1>
        <p className={css.subTitle}>Join our community of mindfulness and wellbeing!</p>
        <RegisterForm />
        <p className={css.txt}>Already have an account? <NavLink className={css.loginLink} to="/login">Log in</NavLink></p>
    </div>
  );
}
