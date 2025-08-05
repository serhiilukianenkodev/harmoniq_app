import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { fetchAuthorById } from '../../redux/authors/operations';
import { selectAuthor } from '../../redux/authors/selectors';
import {
  fetchArticlesByAuthor,
  clearArticles,
  getAuthorsArticles,
} from '../../redux/articles/operations';
import {
  selectArticles,
  selectAuthorsArticles,
  selectLoading,
  selectTotalPages,
} from '../../redux/articles/selectors';

import { ArticlesList } from '../../components/ArticlesList/ArticlesList';
import Loader from '../../components/Loader/Loader';

import css from './AuthorProfilePage.module.css';

const AuthorProfilePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const author = useSelector(selectAuthor);
  const articles = useSelector(selectArticles);
  const isLoading = useSelector(selectLoading);
  const totalPages = useSelector(selectTotalPages);
  const authorsArticles = useSelector(selectAuthorsArticles);
  // const articlesAmount = authorsArticles.length();
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchAuthorById(id));
    dispatch(clearArticles());
    setPage(1);
    dispatch(getAuthorsArticles({ authorId: id, page: 1 }));
  }, [dispatch, id]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    dispatch(fetchArticlesByAuthor({ authorId: id, page: nextPage }));
  };

  const articlesCount = Array.isArray(authorsArticles)
    ? authorsArticles.length
    : 0;

  return (
    <div className={css.wrapper}>
      <div className={css.header}>
        <img
          src={author?.avatarUrl}
          alt={author?.name}
          className={css.avatar}
        />
        <div>
          <div className={css.name}>{author?.name}</div>
          <div className={css.count}>Articles: {articlesCount}</div>
        </div>
      </div>
      {isLoading && <Loader />}
      <ArticlesList articles={authorsArticles} />
      {page < totalPages && (
        <button className={css.loadMore} onClick={handleLoadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

export default AuthorProfilePage;
