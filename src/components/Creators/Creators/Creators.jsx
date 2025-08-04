import React from 'react';
import { useEffect } from 'react';
import css from './Creators.module.css';
import { Link } from 'react-router-dom';
import CreatorsList from '../CreatorsList/CreatorsList';
import { useDispatch, useSelector } from 'react-redux';
import { selectTopCreators } from '../../../redux/authors/selectors.js';
import { fetchTopCreators } from '../../../redux/authors/operations.js';

const Creators = () => {
  const dispatch = useDispatch();
  const creators = useSelector(selectTopCreators);

  useEffect(() => {
    dispatch(fetchTopCreators());
  }, [dispatch]);
  return (
    <section className={css.creators}>
      <div className={css.creatorsTop}>
        <h2 className={css.creatorsTitle}>Top Creators</h2>
        <Link to="/authors" className={css.creatorsLink}>
          Go to all Creators
          <svg
            className={css.creatorsLinkIcon}
            width={24}
            height={24}
            aria-hidden="true"
          >
            <use href="/icons/sprite.svg#top-right" />
          </svg>
        </Link>
      </div>
      <CreatorsList creators={creators} />
    </section>
  );
};

export default Creators;
