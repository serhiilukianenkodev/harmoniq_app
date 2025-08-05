import { useNavigate } from 'react-router-dom';
import styles from './AuthorsItem.module.css';

const AuthorsItem = ({ author }) => {
  const navigate = useNavigate();

  if (!author || !author._id) {
    return null;
  }

  const handleClick = () => {
    navigate(`/authors/${author._id}`);
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  };

  return (
    <li
      className={styles.item}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`View ${author.name}'s profile`}
    >
      <img
        src={author.avatarUrl || '/favicon.svg'}
        alt={author.name || 'Author'}
        className={styles.image}
        onError={e => (e.target.src = '/favicon.svg')}
      />
      <h3 className={styles.name}>{author.name || 'Unknown Author'}</h3>
    </li>
  );
};

export default AuthorsItem;
