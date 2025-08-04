// import styles from './Hero.module.css';
// import { Link } from 'react-router-dom';
// import Container from '../Container/Container';

// export default function Hero() {
//   return (
//     <section className={styles.hero}>
//       <div className={styles.imageOverlay}></div>

//       <div className={styles.content}>
//         <h1 className={styles.title}>
//           Find your <span className={styles.harmony}>harmony</span> in community
//         </h1>

//         <div className={styles.buttons}>
//           <a href="#PopularArticles" className={styles.filledBtn}>
//             Go to Articles
//           </a>
//           <Link to="/register" className={styles.outlineBtn}>
//             Register
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }

import styles from './Hero.module.css';
import { Link } from 'react-router-dom';
import Container from '../Container/Container';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

export default function Hero() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <section className={styles.hero}>
      <div className={styles.imageOverlay}></div>

      <div className={styles.content}>
        <h1 className={styles.title}>
          Find your <span className={styles.harmony}>harmony</span> in community
        </h1>

        <div className={styles.buttons}>
          <a href="#PopularArticles" className={styles.filledBtn}>
            Go to Articles
          </a>

          {!isLoggedIn && (
            <Link to="/register" className={styles.outlineBtn}>
              Register
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
