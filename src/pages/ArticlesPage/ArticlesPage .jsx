import { useEffect, useState } from 'react';

import { ArticlesList } from '../../components/ArticlesList/ArticlesList';
import CustomSelect from '../../components/CustomSelect/CustomSelect';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import styles from './ArticlesPage.module.css';

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('All');
  const [totalArticles, setTotalArticles] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  const articlesPerPage = 12;

  const fetchArticles = async (reset = false) => {
    setIsLoading(true);
    try {
      const currentPage = reset ? 1 : page;
      const queryParams = new URLSearchParams({
        page: currentPage,
        perPage: articlesPerPage,
        ...(filter !== 'All' && { filter }),
      });

      const response = await fetch(
        `https://harmoniq-backend-qo0h.onrender.com/articles?${queryParams}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401)
          throw new Error('Unauthorized: Access token expired');

        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.status !== 200)
        throw new Error(result.message || 'Failed to fetch articles');

      const { articles, totalItems, hasNextPage } = result.data;

      setArticles(prev => (reset ? articles : [...prev, ...articles]));
      setTotalArticles(totalItems);
      setHasMore(hasNextPage);

      if (reset) {
        setPage(1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (error) {
      console.error('Error fetching articles:', error.message);
      if (error.message.includes('Unauthorized')) {
        alert('Your session has expired. Please log in again.');
        window.location.href = '/login';
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles(true);
  }, [filter]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchArticles(false);
  };

  const handleFilterChange = newFilter => {
    if (newFilter !== filter) {
      setFilter(newFilter);
      setArticles([]);
    }
  };

  return (
    <div className={styles.container}>
      <SectionTitle title="Articles" />
      <div className={styles.header}>
        <p className={styles.count}>{totalArticles} articles</p>
        <div className={styles.filters}>
          <CustomSelect
            options={['All', 'Popular']}
            defaultSelected={filter}
            onChange={value => handleFilterChange(value)}
          />
        </div>
      </div>

      <ArticlesList articles={articles} isLoading={isLoading} />

      {hasMore && (
        <div className={styles.loadMoreWrapper}>
          <button
            onClick={handleLoadMore}
            disabled={isLoading}
            className={styles.loadMore}
          >
            {isLoading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ArticlesPage;
