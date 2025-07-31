import css from './Footer.module.css';
import Container from '../Container/Container.jsx';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import ModalErrorSave from '../ModalErrorSave/ModalErrorSave.jsx';

const Footer = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const username = useSelector(state => state.auth.user?.username);
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
          <Link to="/">
            <img src="/logo.png" alt="harmoniq logo" className={css.icon} />
          </Link>
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
                  to={isLoggedIn ? `/user/${username}` : '#'}
                  className={css.navLink}
                  onClick={handleAccountClick}
                >
                  Account
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {showModal && (
          <ModalErrorSave
            isOpen={showModal}
            onClose={() => setShowModal(false)}
          />
        )}
      </Container>
    </footer>
  );
};

export default Footer;
