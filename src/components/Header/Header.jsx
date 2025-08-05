import { useSelector } from 'react-redux';
import Navigation from '../Navigation/Navigation.jsx';
import UserMenu from '../UserMenu/UserMenu.jsx';
import AuthNav from '../AuthNav/AuthNav.jsx';
import { selectIsLoggedIn } from '../../redux/auth/selectors.js';
import css from './Header.module.css';
import Logo from '../Logo/Logo.jsx';
import Container from '../Container/Container';
import { useState } from 'react';
import BurgerModal from '../BurgerModal/BurgerModal';

const Header = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  const toggleBurger = () => {
    setIsBurgerOpen(prev => !prev);
  };

  return (
    <>
      <header className={css.header}>
        <Container>
          <div className={css.headerContainer}>
            <Logo />

            <div className={css.rightBlock}>
              <nav className={css.nav}>
                <Navigation />
              </nav>

              {isLoggedIn ? <UserMenu /> : <AuthNav />}

              <button className={css.burger} onClick={toggleBurger}>
                <svg width="32" height="32">
                  <use
                    href={`/icons/sprite.svg#${
                      isBurgerOpen ? 'close-small' : 'burger'
                    }`}
                  />
                </svg>
              </button>
            </div>
          </div>
        </Container>
      </header>

      <BurgerModal
        isOpen={isBurgerOpen}
        onClose={() => setIsBurgerOpen(false)}
      />
    </>
  );
};

export default Header;
