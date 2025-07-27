import ButtonAddToBookmarks from "../ButtonAddToBookmarks/ButtonAddToBookmarks";
import styles from "./ArticlesItem.module.css";

const ArticlesItem = ({ article }) => (
  <li className={styles.card}>
    <img src={article.image} alt={article.title} className={styles.image} />
    <div>
      <p className={styles.author}>{article.author}</p>
      <h3 className={styles.title}>{article.title}</h3>
      <p className={styles.description}>{article.description}</p>
    </div>
    <div className={styles.footer}>
      <a href={`/article/${article.id}`} className={styles.link}>
        Learn more
      </a>
      <ButtonAddToBookmarks articleId={article.id} />
    </div>
  </li>
);

export default ArticlesItem;
