import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import css from './UserMenu.module.css';

import { useState } from 'react';
import ModalSignOut from '../ModalSignOut/ModalSignOut';
import UploadForm from '../UploadForm/UploadForm';
import clsx from 'clsx';

const UserMenu = ({ variant = 'desktop' }) => {
  const user = useSelector(selectUser);
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);

  const handleBackdropClick = () => {
    setIsUploadModalOpen(false);
  };

  const stopPropagation = e => {
    e.stopPropagation();
  };

  return (
    <>
      <div className={clsx(css.wrapper, variant === 'modal' && css.modal)}>
        <div
          className={css.userInfo}
          onClick={() => setIsUploadModalOpen(true)}
        >
          {user.avatarURL ? (
            <img src={user.avatarURL} alt="avatar" className={css.avatar} />
          ) : (
            <div className={css.avatarPlaceholder}>
              {user.name && user.name[0].toUpperCase()}
            </div>
          )}
          <p className={css.username}>{user.name}</p>
        </div>

        <div className={css.divider}></div>

        <button
          type="button"
          className={css.logoutBtn}
          onClick={() => setIsSignOutModalOpen(true)}
          aria-label="Log out"
        >
          <svg width="24" height="24">
            <use href="/icons/sprite.svg#log" />
          </svg>
        </button>
      </div>

      {isSignOutModalOpen && (
        <ModalSignOut onClose={() => setIsSignOutModalOpen(false)} />
      )}

      {isUploadModalOpen && (
        <div className={css.modalBackdrop} onClick={handleBackdropClick}>
          <div className={css.modalContent} onClick={stopPropagation}>
            <button
              onClick={() => setIsUploadModalOpen(false)}
              className={css.closeUpload}
            >
              ✕
            </button>
            <UploadForm
              image={image}
              setImage={setImage}
              file={file}
              setFile={setFile}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default UserMenu;
