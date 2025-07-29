import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../redux/auth/operations';
import { selectUser } from '../../redux/auth/selectors';
import css from './UserMenu.module.css';

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  return (
    <div className={css.wrapper}>
      <button className={css.createBtn}>Create an article</button>

      <div className={css.userInfo}>
        {user.avatarURL ? (
          <img src={user.avatarURL} alt="avatar" className={css.avatar} />
        ) : (
          <div className={css.avatarPlaceholder}></div>
        )}
        <p className={css.username}>{user.name}</p>
      </div>
      <div className={css.divider}></div>
      <button
        type="button"
        className={css.logoutBtn}
        onClick={() => dispatch(logOut())}
        aria-label="Log out"
      >
        <svg width="24" height="24">
          <use href="/icons/sprite.svg#log" />
        </svg>
      </button>
    </div>
  );
};

export default UserMenu;
