import { useNavigate } from 'react-router-dom';

import styles from './NoArticles.module.css';
import AlertIcon from '/icons/AlertIcon.svg';

// const NoArticles = () => {
const NoArticles = ({
  title = 'Nothing found.',
  description = 'Be the first, who create an article',
  buttonText = 'Create an article',
  buttonLink = '/create',
}) => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <img src={AlertIcon} alt="alert" className={styles.icon} />
      {/* <h2 className={styles.title}>Nothing found.</h2> */}
      <h2 className={styles.title}>{title}</h2>
      {/* <p className={styles.description}>Be the first, who create an article</p>
      <button
        className={styles.createButton}
        onClick={() => navigate('/create')}
      >
        Create an article
      </button> */}
      <p className={styles.description}>{description}</p>
      <button
        className={styles.createButton}
        onClick={() => navigate(buttonLink)}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default NoArticles;
