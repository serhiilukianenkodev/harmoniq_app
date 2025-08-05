import { Link } from "react-router-dom";
import css from "./Logo.module.css"

const LogoIcon = () => (
  <svg width={148} height={34}  aria-hidden="true" className={css.logo}>
    <use href="/icons/sprite.svg#logo" />
  </svg>
);

const Logo = () => {
  return (
    <>
      <Link to="/">
        <LogoIcon/>
      </Link>
    </>
  );
};

export default Logo;
