import LoginForm from "../../components/LoginForm/LoginForm";
import { NavLink } from "react-router-dom";
import Container from "../../components/Container/Container"
import css from "./LoginPage.module.css"

export default function LoginPage() {
  return (
    <Container>
      <div className={css.container}>
        <h1 className={css.title}>Login</h1>
        <LoginForm />
        <p className={css.txt}>Dont have an account? <NavLink className={css.regLink} to="/register">Register</NavLink></p>
      </div>
    </Container>
  );
}
