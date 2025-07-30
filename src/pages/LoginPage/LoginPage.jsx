import LoginForm from "../../components/LoginForm/LoginForm";
import { NavLink } from "react-router-dom";
import css from "./LoginPage.module.css"

export default function LoginPage() {
  return (
    <div className={css.mainContainer}>
      <div className={css.container}>
        <h1 className={css.title}>Login</h1>
        <LoginForm />
        <p className={css.txt}>Dont have an account? <NavLink className={css.regLink} to="/register">Register</NavLink></p>
      </div>
    </div>
  );
}
