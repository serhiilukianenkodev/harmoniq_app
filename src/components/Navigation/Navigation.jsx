import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import css from './Navigation.module.css';

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <nav className={css.nav}>
      <NavLink className={buildLinkClass} to="/">
        Home
      </NavLink>
      <NavLink className={buildLinkClass} to="/articles">
        Articles
      </NavLink>
      <NavLink className={buildLinkClass} to="/authors">
        Creators
      </NavLink>
      {isLoggedIn && (
        <NavLink className={buildLinkClass} to="/profile">
          My Profile
        </NavLink>
      )}
      {isLoggedIn && (
        <NavLink className={css.createArticle} to="/create">
          Create an article
        </NavLink>
      )}
    </nav>
  );
};

export default Navigation;
