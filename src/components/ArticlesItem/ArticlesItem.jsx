import { Link } from 'react-router-dom';
import ButtonAddToBookmarks from '../ButtonAddToBookmarks/ButtonAddToBookmarks';
import styles from './ArticlesItem.module.css';

const ArticlesItem = ({ article }) => {
  const formattedTitle =
    article.title.length > 30
      ? `${article.title.slice(0, 30)}...`
      : article.title;
  
  function stripHtml(html) {
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
  }
  
  const plainText = stripHtml(article.desc);
  const formattedDescription =
  plainText.length > 60 ? `${plainText.slice(0, 60)}...` : plainText;

  return (
    <li className={styles.card}>
      <div>
        <img src={article.img} alt={article.title} className={styles.image} />
          <p className={styles.author}>{article.ownerName}</p>
          <h2 className={styles.title}>{formattedTitle}</h2>
          <p className={styles.description}>{formattedDescription}</p>
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
