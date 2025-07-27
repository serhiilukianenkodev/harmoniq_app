import AuthorsItem from '../AuthorsItem/AuthorsItem';
import styles from './AuthorsList.module.css';

const AuthorsList = ({ authors, isLoading }) => {
  if (isLoading) {
    return <p>Loading authors...</p>;
  }

  if (!authors || authors.length === 0) {
    return <p className={styles.placeholder}>No authors found</p>;
  }

  return (
    <ul className={styles.list}>
      {authors.map((author) => (
        <AuthorsItem key={author._id} author={author} />
      ))}
    </ul>
  );
};

export default AuthorsList;