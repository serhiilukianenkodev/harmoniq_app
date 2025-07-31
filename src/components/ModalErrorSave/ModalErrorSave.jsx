import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';

import styles from './ModalErrorSave.module.css';

const ModalErrorSave = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleEscape = event => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalContent = (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button
          className={css.closeBtn}
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg width="24" height="28">
            <use href="/icons/sprite.svg#close-small" />
          </svg>
        </button>
        <h2 className={styles.title}>Error while saving</h2>
        <div className={styles.buttonContainer}>
          <button
            className={styles.loginButton}
            onClick={() => navigate('/login')}
          >
            Login
          </button>
          <button
            className={styles.registerButton}
            onClick={() => navigate('/register')}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default ModalErrorSave;
