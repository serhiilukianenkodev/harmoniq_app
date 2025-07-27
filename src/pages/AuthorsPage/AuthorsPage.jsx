import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthors } from '../../redux/authors/operations'; 
import { selectAuthors, selectIsLoading, selectHasMore } from '../../redux/authors/selectors'; 
import AuthorsList from '../../components/Authors/AuthorsItem/AuthorsItem';
import styles from './AuthorsPage.module.css';

const AuthorsPage = () => {
  const dispatch = useDispatch();
  const authors = useSelector(selectAuthors);
  const isLoading = useSelector(selectIsLoading);
  const hasMore = useSelector(selectHasMore);

  useEffect(() => {
    dispatch(fetchAuthors({ page: 1, limit: 20 }));
  }, [dispatch]);

  const handleLoadMore = () => {
    dispatch(fetchAuthors({ page: Math.ceil(authors.length / 20) + 1, limit: 20 }));
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Authors</h1>
      <AuthorsList authors={authors} isLoading={isLoading} />
      {hasMore && !isLoading && (
        <button className={styles.loadMore} onClick={handleLoadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

export default AuthorsPage;