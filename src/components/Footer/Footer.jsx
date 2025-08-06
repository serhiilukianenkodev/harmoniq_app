import { useState } from 'react';
import css from './Footer.module.css';
import Container from '../Container/Container.jsx';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ModalErrorSave from '../ModalErrorSave/ModalErrorSave.jsx';
import Logo from '../Logo/Logo.jsx';


const Footer = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const [showModal, setShowModal] = useState(false);

  const handleAccountClick = e => {
    if (!isLoggedIn) {
      e.preventDefault();
      setShowModal(true);
    }
  };

  return (
    <footer className={css.footer}>
      <Container>
        <div className={css.inner}>
            <Logo />
          <p className={css.copy}>
            &copy; {new Date().getFullYear()} Harmoniq. All rights reserved.
          </p>

          <nav>
            <ul className={css.navList}>
              <li>
                <Link to="/articles" className={css.navLink}>
                  Articles
                </Link>
              </li>
              <li>
                <Link
                  to={isLoggedIn ? '/profile' : '#'}
                  className={css.navLink}
                  onClick={handleAccountClick}
                >
                  Account
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <ModalErrorSave
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        />
      </Container>
    </footer>
  );
};

export default Footer;
