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
      dispatch(fetchAuthors({ page: 1, limit: 20 }))
        .then((result) => {
          console.log('Initial fetchAuthors completed:', result);
        })
        .catch((err) => {
          console.error('Initial fetchAuthors failed:', err);
        });
    }
  }, [dispatch, authors.length]);

  const handleLoadMore = (e) => {
    e.preventDefault();
    const currentLength = authors.length;
    const nextPage = Math.ceil(currentLength / 20) + 1;
    console.log('Fetching page:', nextPage, 'Current authors length:', currentLength);
    dispatch(fetchAuthors({ page: nextPage, limit: 20 }));
    setTimeout(() => {
      const newElement = listRef.current?.querySelector(`li:nth-child(${currentLength + 1})`);
      if (newElement) {
        console.log('Scrolling to new element:', newElement);
        newElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
      } else {
        console.warn('New element not found for scroll, current list:', listRef.current?.children);
      }
    }, 500);
  };


  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Authors</h1>
      {error && <p className={styles.error}>Error: {error}</p>}
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