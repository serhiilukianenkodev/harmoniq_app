import { NavLink } from "react-router-dom";
import css from "./AuthNav.module.css";

const AuthNav = () => {
  return (
    <div>
      <NavLink className={css.link} to="/login">
        Log In
      </NavLink>
      <NavLink className={`${css.link} ${css.join}`} to="/register">
        Join now
      </NavLink>
    </div>
  );
};

export default AuthNav;
