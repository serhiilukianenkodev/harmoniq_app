import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './PopularArticlesSection.module.css';
import { ArticlesList } from '../ArticlesList/ArticlesList.jsx';
import NoArticles from '../NoArticles/NoArticles.jsx';

const mockArticles = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  image: `https://placehold.co/600x400/gray/white?text=Article+${i + 1}`,
  author: `Author ${i + 1}`,
  title: `Article Title ${i + 1}`,
  description: `This is a short description for article ${
    i + 1
  }. It covers various aspects of well-being and mental health, providing insights and tips for a balanced life.`,
  type: 'Popular',
}));

const mockFetchPopularArticles = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        articles: mockArticles,
      });
    }, 500);
  });
};

function PopularArticlesSection() {
  const [popularArticles, setPopularArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [articlesToDisplayCount, setArticlesToDisplayCount] = useState(4);

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      try {
        const result = await mockFetchPopularArticles();
        setPopularArticles(result.articles);
      } catch (error) {
        console.error('Error fetching popular articles:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  useEffect(() => {
    const mediaQueryDesktop = window.matchMedia('(min-width: 1440px)');
    const mediaQueryTablet = window.matchMedia(
      '(min-width: 768px) and (max-width: 1439px)'
    );
    const updateArticlesCount = () => {
      if (mediaQueryDesktop.matches) {
        setArticlesToDisplayCount(3);
      } else if (mediaQueryTablet.matches) {
        setArticlesToDisplayCount(4);
      } else {
        setArticlesToDisplayCount(4);
      }
    };
    updateArticlesCount();

    mediaQueryDesktop.addEventListener('change', updateArticlesCount);
    mediaQueryTablet.addEventListener('change', updateArticlesCount);

    return () => {
      mediaQueryDesktop.removeEventListener('change', updateArticlesCount);
      mediaQueryTablet.removeEventListener('change', updateArticlesCount);
    };
  }, [popularArticles]);

  const articlesToRender = popularArticles.slice(0, articlesToDisplayCount);

  return (
    <section className={styles['popular-articles-section']}>
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
            <use href="/public/icons/sprite.svg#top-right" />
          </svg>
        </Link>
      </div>

      {isLoading ? (
        <p className={styles.loadingText}>Loading popular articles...</p>
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
