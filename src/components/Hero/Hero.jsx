import styles from './Hero.module.css';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.imageOverlay}></div>
      <div className={styles.content}>
        <h1 className={styles.title}>
          Find your <span className={styles.harmony}>harmony</span> in community
        </h1>

        <div className={styles.buttons}>
          <a href="#popular" className={styles.filledBtn}>
            Go to Articles
          </a>
          <Link to="/register" className={styles.outlineBtn}>
            Register
          </Link>
        </div>
      </div>
    </section>
  );
}
