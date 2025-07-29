import React from 'react';
import { HiArrowUpRight } from 'react-icons/hi2';
import { useEffect, useState } from 'react';
import { fetchTopCreators } from '../../redux/authors/operations';
import css from './Creators.module.css';
import { Link } from 'react-router-dom';

const Creators = () => {
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    const loadTopCreators = async () => {
      const topCreators = await fetchTopCreators();
      setCreators(topCreators);
    };

    loadTopCreators();
  }, []);
  return (
    <section className={css.creators}>
      <div className={css.creatorsTop}>
        <h2 className={css.creatorsTitle}>Top Creators</h2>
        <Link to="/authors" className={css.creatorsLink}>
          Go to all Creators{' '}
          <HiArrowUpRight className="icon-creators" size="16" />
        </Link>
      </div>
      <ul className={css.creatorsList}>
        {creators.map(user => (
          <li className={css.creatorsItem} key={user._id.$oid}>
            <div className={css.creatorsImgWrapper}>
              <img
                className={css.creatorsImg}
                src={user.avatarUrl}
                width="148"
                height="148"
                alt={user.name}
              />
            </div>
            <p className={css.creatorsName}>{user.name}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Creators;
