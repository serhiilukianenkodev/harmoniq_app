import { useNavigate } from "react-router-dom";

import styles from "./NoArticles.module.css";
import AlertIcon from "/icons/AlertIcon.svg";

const NoArticles = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img src={AlertIcon} alt="alert" />
        <h2 className={styles.title}>Nothing found.</h2>
        <p className={styles.description}>
          Be the first, who create an article
        </p>
      </div>
      <button
        className={styles.createButton}
        onClick={() => navigate("/create")}
      >
        Create an article
      </button>
    </div>
  );
};

export default NoArticles;
