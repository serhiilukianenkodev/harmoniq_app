import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectUser } from '../../redux/auth/selectors';
import { fetchArticlesByAuthor, fetchSavedArticles, clearArticles } from '../../redux/articles/operations';
import { selectArticles, selectLoading, selectTotalPages } from '../../redux/articles/selectors';

import { ArticlesList } from '../../components/ArticlesList/ArticlesList';
import Loader from '../../components/Loader/Loader';
import Tabs from '../../components/Tabs/Tabs';

import css from './UserProfile.module.css';

const tabs = [
  { id: 'my', label: 'My Articles' },
  { id: 'saved', label: 'Saved Articles' },
];

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const articles = useSelector(selectArticles);
  const isLoading = useSelector(selectLoading);
  const totalPages = useSelector(selectTotalPages);

  const [activeTab, setActiveTab] = useState('my');
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(clearArticles());
    setPage(1);
    if (activeTab === 'my') {
      dispatch(fetchArticlesByAuthor({ authorId: user._id, page: 1 }));
    } else if (activeTab === 'saved') {
      dispatch(fetchSavedArticles({ page: 1 }));
    }
  }, [dispatch, user._id, activeTab]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    if (activeTab === 'my') {
      dispatch(fetchArticlesByAuthor({ authorId: user._id, page: nextPage }));
    } else if (activeTab === 'saved') {
      dispatch(fetchSavedArticles({ page: nextPage }));
    }
  };

  const articlesCount = Array.isArray(articles) ? articles.length : 0;

  return (
    <div className={css.profileWrapper}>
      <div className={css.profileHeader}>
        <img src={user.avatarUrl} alt={user.name} className={css.avatar} />
        <div>
          <div className={css.name}>{user.name}</div>
          <div className={css.articlesCount}>Articles: {articlesCount}</div>
        </div>
      </div>
      <div className={css.tabs}>
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>
      {isLoading && <Loader />}
      <ArticlesList articles={articles} />
      {page < totalPages && (
        <button className={css.loadMore} onClick={handleLoadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

export default UserProfile;