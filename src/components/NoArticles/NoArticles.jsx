import { useNavigate } from 'react-router-dom';

import styles from './NoArticles.module.css';

const NoArticles = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <svg
          width="65"
          height="64"
          viewBox="0 0 65 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M32.5 40.4444V42.5556M32.5 21.4444V34.1111M51.5 32C51.5 42.4934 42.9934 51 32.5 51C22.0066 51 13.5 42.4934 13.5 32C13.5 21.5066 22.0066 13 32.5 13C42.9934 13 51.5 21.5066 51.5 32Z"
            stroke="#070721"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>

        <h2 className={styles.title}>Nothing found.</h2>
        <p className={styles.description}>
          Be the first, who create an article
        </p>
      </div>
      <button
        className={styles.createButton}
        onClick={() => navigate('/create')}
      >
        Create an article
      </button>
    </div>
  );
};

export default NoArticles;
