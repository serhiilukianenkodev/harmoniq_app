import { useNavigate } from 'react-router-dom';
import styles from './AuthorsItem.module.css';

const AuthorsItem = ({ author }) => {
  const navigate = useNavigate();

  // Перевірка, чи є author валідним об’єктом
  if (!author || !author._id) {
    return null; // Не рендеримо, якщо author невалідний
  }

  const handleClick = () => {
    navigate(`/authors/${author._id}`);
  };

  return (
    <li className={styles.item} onClick={handleClick} aria-label={`View ${author.name}'s profile`}>
      <img
        src={author.avatarUrl || '/default-avatar.png'} // Запасне зображення
        alt={author.name || 'Author'}
        className={styles.avatar}
        onError={(e) => (e.target.src = '/default-avatar.png')}
      />
      <div className={styles.info}>
        <h3 className={styles.name}>{author.name || 'Unknown Author'}</h3>
        <p className={styles.articles}>{author.articlesAmount || 0} articles</p>
      </div>
    </li>
  );
};

export default AuthorsItem;