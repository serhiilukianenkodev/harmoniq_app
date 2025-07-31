import { forwardRef } from 'react';
import AuthorsItem from '../AuthorsItem/AuthorsItem';
import styles from './AuthorsList.module.css';

const AuthorsList = ({ authors, isLoading }, ref) => {

  if (isLoading) {
    return <p className={styles.loader}>Loading authors...</p>;
  }

  if (!isLoading && (!authors || authors.length === 0)) {
    return <p className={styles.placeholder}>No authors found</p>;
  }

  return (
    <ul className={styles.list} ref={ref}>
      {authors.map((author, index) => (
        <AuthorsItem key={`${author._id}-${index}`} author={author} />
      ))}
    </ul>
  );
};

export default forwardRef(AuthorsList);