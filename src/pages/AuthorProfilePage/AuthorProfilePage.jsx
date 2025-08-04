import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { selectUser } from '../../redux/auth/selectors';
import { fetchAuthorById } from '../../redux/authors/operations';
import { selectAuthor } from '../../redux/authors/selectors';

import {
  fetchArticlesByAuthor,
  fetchSavedArticles,
  clearArticles,
} from '../../redux/articles/operations';
import {
  selectArticles,
  selectLoading as selectIsLoading,
  selectTotalPages,
} from '../../redux/articles/selectors';

import { ArticlesList } from '../../components/ArticlesList/ArticlesList';
import Tabs from '../../components/Tabs/Tabs';
import Loader from '../../components/Loader/Loader';
import css from './AuthorProfilePage.module.css';

const AuthorProfilePage = () => {
  const tabs = [
    { id: 'my', label: 'My Articles' },
    { id: 'saved', label: 'Saved Articles' },
  ];

  const [activeTab, setActiveTab] = useState('my');

  const { id } = useParams();
  const dispatch = useDispatch();

  const currentUser = useSelector(selectUser);
  const isCurrentUser = currentUser?._id === id;

  const author = useSelector(selectAuthor);
  const articles = useSelector(selectArticles);
  const isLoading = useSelector(selectIsLoading);
  const totalPages = useSelector(selectTotalPages);

  // 'my' or 'saved'
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchAuthorById(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(clearArticles()); // очищуємо попередній список
    setPage(1);

    if (activeTab === 'my') {
      dispatch(fetchArticlesByAuthor({ authorId: id, page: 1 }));
    } else if (activeTab === 'saved' && isCurrentUser) {
      dispatch(fetchSavedArticles({ page: 1 }));
    }
  }, [dispatch, id, activeTab, isCurrentUser]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);

    if (activeTab === 'my') {
      dispatch(fetchArticlesByAuthor({ authorId: id, page: nextPage }));
    } else if (activeTab === 'saved' && isCurrentUser) {
      dispatch(fetchSavedArticles({ page: nextPage }));
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const hasMorePages = page < totalPages;

  return (
    <div className={css.wrapper}>
      <div className={css.profileHeader}>
        <img
          src={author?.avatarURL}
          alt={author?.name}
          className={css.avatar}
        />
        <div>
          <h1 className={css.name}>{author?.name}</h1>
          <p className={css.count}>{author?.articlesCount} articles</p>
        </div>
      </div>

      {isCurrentUser && (
        <Tabs
          tabs={[
            { id: 'my', label: 'My Articles' },
            { id: 'saved', label: 'Saved Articles' },
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
      )}

      {isLoading && <Loader />}

      {!isLoading && Array.isArray(articles) && articles.length === 0 && (
        <p className={css.noArticles}>No articles found.</p>
      )}

      <ArticlesList articles={articles} />

      {hasMorePages && !isLoading && (
        <button className={css.loadMoreBtn} onClick={handleLoadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

export default AuthorProfilePage;
