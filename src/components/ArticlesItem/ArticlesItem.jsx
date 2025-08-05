import { Link } from 'react-router-dom';
import ButtonAddToBookmarks from '../ButtonAddToBookmarks/ButtonAddToBookmarks';
import styles from './ArticlesItem.module.css';

const ArticlesItem = ({ article }) => {
  const formattedTitle =
    article.title.length > 30
      ? `${article.title.slice(0, 30)}...`
      : article.title;

  const formattedDescription =
    article.desc.length > 60 ? `${article.desc.slice(0, 60)}...` : article.desc;

  return (
    <li className={styles.card}>
      <div>
        <img src={article.img} alt={article.title} className={styles.image} />
        <div>
          <p className={styles.author}>{article.ownerName}</p>
          <h3 className={styles.title}>{formattedTitle}</h3>
          <p className={styles.description}>{formattedDescription}</p>
        </div>
      </div>
      <div className={styles.footer}>
        <Link to={`/articles/${article._id}`} className={styles.link}>
          Learn more
        </Link>
        <ButtonAddToBookmarks articleId={article._id} />
      </div>
    </li>
  );
};

export default ArticlesItem;
