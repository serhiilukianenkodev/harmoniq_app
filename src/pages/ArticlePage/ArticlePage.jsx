import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import {
  addToSavedArticles,
  deleteFromSavedArticles,
  fetchArticleById,
  fetchRecommendedArticles,
} from '../../redux/articles/operations.js';
import {
  selectCurrentArticle,
  selectRecommendedArticles,
  selectArticlesLoading,
} from '../../redux/articles/selectors.js';
import css from './ArticlePage.module.css';
import Loader from '../../components/Loader/Loader.jsx';
import NoArticles from '../../components/NoArticles/NoArticles.jsx';
import {
  selectIsLoggedIn,
  selectSavedArticles,
} from '../../redux/auth/selectors.js';
import ModalErrorSave from '../../components/ModalErrorSave/ModalErrorSave.jsx';

const Flag = () => (
  <svg width={13} height={18} aria-hidden="true" className={css.iconFlag}>
    <use href="/icons/sprite.svg#Vector-flag" />
  </svg>
);

const ArticlePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id: articleId } = useParams();
  const isBookmarked = useSelector(selectSavedArticles).find(
    id => id === articleId
  );
  const isSaving = useSelector(state => state.auth.isFetching);

  const isAuthenticated = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  const article = useSelector(selectCurrentArticle);
  const recommendations = useSelector(selectRecommendedArticles);
  const loading = useSelector(selectArticlesLoading);
  useEffect(() => {
    if (articleId) {
      dispatch(fetchArticleById(articleId));
      dispatch(fetchRecommendedArticles({ excludeId: articleId, perPage: 10 }));
    }
  }, [dispatch, articleId]);

  const handleSave = () => {
    if (!isAuthenticated) {
      setIsModalOpen(true);
      return;
    }
    if (isBookmarked) {
      dispatch(deleteFromSavedArticles(articleId));
    } else {
      dispatch(addToSavedArticles(articleId));
    }
  };

  if (loading) return <Loader />;
  if (!article) return <NoArticles />;

  const { title, img, desc, ownerName, date } = article;

  return (
    <div className={css.page}>
      <h2 className={css.title}>{title}</h2>
      {img && <img src={img} alt={title} className={css.img} />}
      <div className={css.articles}>
        <div
          className={css.text}    
          dangerouslySetInnerHTML={{ __html: desc.replace(/\/n/g, '<br>') }}         
        />
        <div className={css.articlesBlock}>
          <div className={css.wrapper}>
            <p>
              <strong>Author: </strong>
              <span className={css.name}>{ownerName}</span>
            </p>
            <p>
              <strong>Publication date: </strong>
              {date}
            </p>
            <div className={css.recsBlock}>
              <h3 className={css.subTitle}>You can also interested</h3>
              <ul className={css.list}>
                {recommendations.map(item => (
                  <li key={item._id} className={css.item}>
                    <div className={css.titleWithIcon}>
                      <Link to={`/articles/${item._id}`} className={css.link}>
                        {item.title}
                      </Link>
                      <Link
                        to={`/articles/${item._id}`}
                        className={css.btnLink}
                      >
                        <svg
                          className={css.linkIcon}
                          width={24}
                          height={24}
                          aria-hidden="true"
                        >
                          <use href="/icons/sprite.svg#top-right" />
                        </svg>
                      </Link>
                    </div>
                    <p className={css.linkAuthor}>{item.ownerName}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <button className={css.saveBtn} onClick={handleSave}>
              {isBookmarked ? 'Unsave' : 'Save'}
              {isSaving && <span className={css.loading}>...</span>}
             <Flag/>
            </button>
          </div>
        </div>
      </div>
      <ModalErrorSave
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ArticlePage;
