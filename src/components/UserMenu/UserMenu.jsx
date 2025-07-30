import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import css from './UserMenu.module.css';

import { useState } from 'react';
import ModalSignOut from '../ModalSignOut/ModalSignOut';

const UserMenu = () => {
  const user = useSelector(selectUser);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);

  return (
    <div className={css.wrapper}>
      <button className={css.createBtn} onClick={() => setIsAddModalOpen(true)}>
        Create an article
      </button>

      <div className={css.userInfo}>
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

      {isSignOutModalOpen && (
        <ModalSignOut onClose={() => setIsSignOutModalOpen(false)} />
      )}
    </div>
  );
};

export default UserMenu;
