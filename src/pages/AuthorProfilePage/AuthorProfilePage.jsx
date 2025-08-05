import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles } from '../../redux/articles/operations';
import { selectArticles, selectLoading, selectTotalPages } from '../../redux/articles/selectors';
import { ArticlesList } from '../../components/ArticlesList/ArticlesList';
import styles from './AuthorProfilePage.module.css';

const AuthorProfilePage = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const articles = useSelector(selectArticles);
  const isLoading = useSelector(selectLoading);
  const totalPages = useSelector(selectTotalPages);

  useEffect(() => {
    dispatch(fetchArticles({ page }));
  }, [dispatch, page]);

  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage(prev => prev + 1);
    }
  };

  return (
    <div className={styles.profileContainer}>
      <h2 className={styles.profileTitle}>Author Profile</h2>
      <ArticlesList articles={articles} isLoading={isLoading} />
      {page < totalPages && (
        <button className={styles.loadMoreButton} onClick={handleLoadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

export default AuthorProfilePage;