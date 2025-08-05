import React, { useEffect } from 'react';
import styles from './BurgerModal.module.css';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import UserMenu from '../UserMenu/UserMenu';

const BurgerModal = ({ isOpen, onClose }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    const handleEsc = event => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.overlay} onClick={e => e.stopPropagation()}>
        <nav className={styles.menuNav}>
          <NavLink to="/" onClick={onClose}>
            Home
          </NavLink>
          <NavLink to="/articles" onClick={onClose}>
            Articles
          </NavLink>
          <NavLink to="/authors" onClick={onClose}>
            Creators
          </NavLink>
          {!isLoggedIn && (
            <NavLink to="/login" onClick={onClose}>
              Log in
            </NavLink>
          )}
          {isLoggedIn && (
            <NavLink to="/profile" onClick={onClose}>
              My Profile
            </NavLink>
          )}
          {!isLoggedIn && (
            <div className={styles.joinWrapper}>
              <NavLink
                to="/register"
                className={styles.joinBtn}
                onClick={onClose}
              >
                Join now
              </NavLink>
            </div>
          )}
        </nav>
        {isLoggedIn && (
          <div className={styles.createWrapper}>
            <NavLink
              to="/create"
              className={styles.createBtn}
              onClick={onClose}
            >
              Create an article
            </NavLink>
          </div>
        )}

        {isLoggedIn && (
          <div className={styles.userWrapper}>
            <UserMenu variant="modal" />
          </div>
        )}
      </div>
    </div>
  );
};

export default BurgerModal;
