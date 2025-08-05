import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './PopularArticlesSection.module.css';
import { ArticlesList } from '../ArticlesList/ArticlesList.jsx';
import NoArticles from '../NoArticles/NoArticles.jsx';

function PopularArticlesSection() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [articlesToDisplayCount, setArticlesToDisplayCount] = useState(4);

  const getArticlesCountForBreakpoint = () => {
    if (window.innerWidth >= 1440) {
      return 3;
    } else if (window.innerWidth >= 768) {
      return 4;
    } else {
      return 4;
    }
  };

  const fetchPopularArticles = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams({
        filter: 'Popular',
        page: 1,
        perPage: 4,
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
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.status !== 200) {
        throw new Error(result.message || 'Failed to fetch popular articles');
      }

      const fetchedArticles = result.data.articles || [];
      setArticles(fetchedArticles);
    } catch (e) {
      console.error('Error fetching popular articles:', e);
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularArticles();
  }, []);

  useEffect(() => {
    const updateDisplayedArticlesCount = () => {
      const count = getArticlesCountForBreakpoint();
      setArticlesToDisplayCount(count);
    };

    updateDisplayedArticlesCount();
    window.addEventListener('resize', updateDisplayedArticlesCount);

    return () =>
      window.removeEventListener('resize', updateDisplayedArticlesCount);
  }, [articles]);

  const articlesToRender = articles.slice(0, articlesToDisplayCount);

  return (
    <section
      id="PopularArticles"
      className={styles['popular-articles-section']}
    >
      <div className={styles['section-header']}>
        <h2 className={styles['section-title']}>Popular Articles</h2>
        <Link to="/articles" className={styles['all-articles-link']}>
          Go to all Articles
          <svg
            className={styles['arrow-icon']}
            width={24}
            height={24}
            aria-hidden="true"
          >
            <use href="/icons/sprite.svg#top-right" />
          </svg>
        </Link>
      </div>

      {isLoading ? (
        <p className={styles.loadingText}>Loading popular articles...</p>
      ) : error ? (
        <p className={styles.errorText}>Error: {error}</p>
      ) : articlesToRender.length === 0 ? (
        <NoArticles />
      ) : (
        <div className={styles['articles-list-wrapper']}>
          <ArticlesList articles={articlesToRender} />
        </div>
      )}
    </section>
  );
}

export default PopularArticlesSection;
