import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthors } from '../../redux/authors/operations';
import { selectAuthors, selectIsLoading, selectHasMore, selectError } from '../../redux/authors/selectors';
import AuthorsList from '../../components/Authors/AuthorsList/AuthorsList';
import styles from './AuthorsPage.module.css';

const AuthorsPage = () => {
  const dispatch = useDispatch();
  const authors = useSelector(selectAuthors);
  const isLoading = useSelector(selectIsLoading);
  const hasMore = useSelector(selectHasMore);
  const error = useSelector(selectError);
  const listRef = useRef(null);

  useEffect(() => {
    if (authors.length === 0) {
      dispatch(fetchAuthors({ page: 1, perPage: 20 }));
    }
  }, [dispatch, authors.length]);

  const handleLoadMore = (e) => {
    e.preventDefault();
    const currentLength = authors.length;
    const nextPage = Math.ceil(currentLength / 20) + 1;
    dispatch(fetchAuthors({ page: nextPage, perPage: 20 }));
    setTimeout(() => {
      const newElement = listRef.current?.querySelector(`li:nth-child(${currentLength + 1})`);
      if (newElement) {
        newElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
      }
    }, 500);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Authors</h1>
      {error && <p className={styles.error}>Error: {error}</p>}
      {isLoading && authors.length === 0 && <p className={styles.loading}>Loading...</p>}
      <AuthorsList authors={authors} isLoading={isLoading} ref={listRef} />
      <button
        type="button"
        className={`${styles.loadMore} ${!hasMore ? styles.disabled : ''}`}
        onClick={handleLoadMore}
        disabled={!hasMore}
      >
        Load More
      </button>
    </div>
  );
};

export default AuthorsPage;