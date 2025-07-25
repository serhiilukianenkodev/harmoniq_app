import { useSelector } from "react-redux";
import Navigation from "../Navigation/Navigation.jsx";
import UserMenu from "../UserMenu/UserMenu.jsx";
import AuthNav from "../AuthNav/AuthNav.jsx";
import { selectIsLoggedIn } from "../../redux/auth/selectors.js";
import css from "./Header.module.css";
import Logo from "../Logo/Logo.jsx";
import { Container } from "@mui/material";

const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <header className={css.header}>
      <Container>
        <div className={css.headerContainer}>
          <Logo />

          <div className={css.rightBlock}>
            <Navigation />
            {isLoggedIn ? <UserMenu /> : <AuthNav />}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
