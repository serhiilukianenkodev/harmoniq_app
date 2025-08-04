import css from './ModalSignOut.module.css';
import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/auth/operations';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ModalSignOut = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logOut()).unwrap();
    } catch (error) {
      toast.error('Failed to log out from server');
    } finally {
      onClose();
      navigate('/login');
    }
  };

  return (
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={e => e.stopPropagation()}>
        <button className={css.close} onClick={onClose}>
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
          <button className={css.cancelBtn} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalSignOut;
