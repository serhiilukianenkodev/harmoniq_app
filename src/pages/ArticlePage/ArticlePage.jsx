import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import {
  fetchArticleById,
  fetchRecommendedArticles,
  saveArticleToBookmarks,
} from '../../redux/articles/operations.js';
import {
  selectCurrentArticle,
  selectRecommendedArticles,
  selectArticlesLoading,
} from '../../redux/articles/selectors.js';
import css from './ArticlePage.module.css';
import Loader from '../../components/Loader/Loader.jsx';
import NoArticles from '../../components/NoArticles/NoArticles.jsx';

const ArticlePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const article = useSelector(selectCurrentArticle);
  const recommendations = useSelector(selectRecommendedArticles);
  const loading = useSelector(selectArticlesLoading);

  useEffect(() => {
    if (id) {
      dispatch(fetchArticleById(id));
      dispatch(fetchRecommendedArticles({ excludeId: id, perPage: 10 }));
    }
  }, [dispatch, id]);

  // console.log(id);

  const handleSave = () => dispatch(saveArticleToBookmarks(id));

  if (loading) return <Loader />;
  if (!article) return <NoArticles />;

  const { title, img, desc, ownerName, date } = article;
  // console.log(desc);
  // console.log(title);
  return (
    <div className={css.page}>
      <h2 className={css.title}>{title}</h2>
      {img && <img src={img} alt={title} className={css.img} />}
      <div className={css.articles}>
        <div className={css.text}>
          {desc
            .replace(/\/n/g, '<br><br>')
            .split('<br>')
            .map((paragraph, id) => (
              <p key={id} className={css.paragraph}>
                {paragraph}
              </p>
            ))}
        </div>
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
              Save
              <svg
                className={css.btnIcon}
                width={24}
                height={24}
                aria-hidden="true"
              >
                <use href="/icons/sprite.svg#Vector-flag" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
