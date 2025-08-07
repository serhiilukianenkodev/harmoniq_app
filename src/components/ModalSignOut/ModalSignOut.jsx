import css from './ModalSignOut.module.css';
import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/auth/operations';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ModalSignOut = ({ onCloseModal, onLogoutComplete }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logOut()).unwrap();

      if (onLogoutComplete) {
        onLogoutComplete();
      }

      navigate('/login');
    } catch (error) {
      toast.error('Failed to log out from server');
    } finally {
      if (onCloseModal) {
        onCloseModal();
      }
    }
  };

  return (
    <div className={css.backdrop} onClick={onCloseModal}>
      <div className={css.modal} onClick={e => e.stopPropagation()}>
        <button className={css.close} onClick={onCloseModal}>
          <svg width="24" height="28">
            <use href="/icons/sprite.svg#close-small" />
          </svg>
        </button>
        <h2 className={css.title}>Are you sure?</h2>
        <p className={css.message}>We will miss you!</p>
        <div className={css.buttons}>
          <button className={css.logoutBtn} onClick={handleLogout}>
            Log out
          </button>
          <button className={css.cancelBtn} onClick={onCloseModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalSignOut;
