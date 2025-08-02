import React from 'react';
import css from './CreatorsList.module.css';

const CreatorsList = ({ creators }) => {
  return (
    <ul className={css.creatorsList}>
      {creators.map(user => (
        <li className={css.creatorsItem} key={user._id}>
          <div className={css.creatorsImgWrapper}>
            <img
              className={css.creatorsImg}
              src={user.avatarUrl}
              width="148"
              height="148"
              alt={user.name}
            />
          </div>
          <p className={css.creatorsName}>{user.name}</p>
        </li>
      ))}
    </ul>
  );
};

export default CreatorsList;
