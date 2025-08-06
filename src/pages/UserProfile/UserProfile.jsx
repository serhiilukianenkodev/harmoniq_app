import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectUser } from '../../redux/auth/selectors';
import {
  fetchArticlesByAuthor,
  fetchSavedArticles,
  clearArticles,
  getAuthorsArticles,
  getUsersSavedArticles,
} from '../../redux/articles/operations';
import {
  selectArticles,
  selectAuthorsArticles,
  selectLoading,
  selectTotalPages,
  selectUsersSavedArticles,
} from '../../redux/articles/selectors';

import { ArticlesList } from '../../components/ArticlesList/ArticlesList';
import Loader from '../../components/Loader/Loader';
import Tabs from '../../components/Tabs/Tabs';

import css from './UserProfile.module.css';
import { changeIsArticleEditable } from '../../redux/articles/slice.js';

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
  const authorsArticles = useSelector(selectAuthorsArticles);
  const usersSavedArticles = useSelector(selectUsersSavedArticles);

  const [activeTab, setActiveTab] = useState('my');
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (activeTab === 'my') {
      dispatch(changeIsArticleEditable(true));

      return () => dispatch(changeIsArticleEditable(false));
    }
  });

  useEffect(() => {
    dispatch(getUsersSavedArticles({}));
    dispatch(getAuthorsArticles({ authorId: user._id }));
  }, [user]);

  // useEffect(() => {
  //   dispatch(clearArticles());
  //   setPage(1);
  //   if (activeTab === 'my') {
  //     dispatch(fetchArticlesByAuthor({ authorId: user._id, page: 1 }));
  //   } else if (activeTab === 'saved') {
  //     // dispatch(fetchSavedArticles({ page: 1 }));
  //   }
  // }, [dispatch, user._id, activeTab]);

  // const handleLoadMore = () => {
  //   const nextPage = page + 1;
  //   setPage(nextPage);
  //   if (activeTab === 'my') {
  //     dispatch(fetchArticlesByAuthor({ authorId: user._id, page: nextPage }));
  //   } else if (activeTab === 'saved') {
  //     dispatch(fetchSavedArticles({ page: nextPage }));
  //   }
  // };

  const articlesCount =
    activeTab === 'my' ? authorsArticles.length : usersSavedArticles.length;

  return (
    <div className={css.profileWrapper}>
      <h1 className={css.title}>My Profile</h1>
      <div className={css.profileHeader}>       
        <img src={user.avatarUrl} alt={user.name} className={css.avatar} />
        <div>
          <p className={css.name}>{user.name}</p>
          <p className={css.articlesCount}>{articlesCount} articles</p>
        </div>
      </div>
      <div>
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
      {isLoading && <Loader />}
      <ArticlesList
        articles={activeTab === 'my' ? authorsArticles : usersSavedArticles}
      />
      {/* {page < totalPages && (
        <button className={css.loadMore} onClick={handleLoadMore}>
          Load More
        </button>
      )} */}
    </div>
  );
};

export default UserProfile;
