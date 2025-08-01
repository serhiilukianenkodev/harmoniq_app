// import React from 'react';
// import styles from './BurgerModal.module.css';
// import { NavLink } from 'react-router-dom';

// const BurgerModal = ({ isOpen, onClose }) => {
//   if (!isOpen) return null;

//   return (
//     <div className={styles.overlay}>
//       {/* <button className={styles.closeBtn} onClick={onClose}>
//         ×
//       </button> */}
//       <nav className={styles.menuNav}>
//         <NavLink to="/" onClick={onClose}>
//           Home
//         </NavLink>
//         <NavLink to="/articles" onClick={onClose}>
//           Articles
//         </NavLink>
//         <NavLink to="/authors" onClick={onClose}>
//           Creators
//         </NavLink>
//         <NavLink to="/login" onClick={onClose}>
//           Log in
//         </NavLink>
//       </nav>
//     </div>
//   );
// };

// export default BurgerModal;

import React, { useEffect } from 'react';
import styles from './BurgerModal.module.css';
import { NavLink } from 'react-router-dom';

const BurgerModal = ({ isOpen, onClose }) => {
  // 🔒 Блокируем прокрутку при открытии
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
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
        <NavLink to="/login" onClick={onClose}>
          Log in
        </NavLink>
      </nav>
    </div>
  );
};

export default BurgerModal;
