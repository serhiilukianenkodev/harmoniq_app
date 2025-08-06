import { useState } from 'react';
import ModalErrorSave from '../ModalErrorSave/ModalErrorSave';
import { BookmarkIcon } from './BookmarkIcon';
import styles from './ButtonAddToBookmarks.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToSavedArticles,
  deleteFromSavedArticles,
} from '../../redux/articles/operations.js';
import {
  selectIsLoggedIn,
  selectSavedArticles,
} from '../../redux/auth/selectors.js';
import { selectisArticleEditable } from '../../redux/articles/selectors.js';
import { useNavigate } from 'react-router-dom';

const EditIcon = () => (
  <svg width={15} height={15} aria-hidden="true" className={`${styles.icon}`}>
    <use href="/icons/sprite.svg#pencil" />
  </svg>
); 

const ButtonAddToBookmarks = ({ articleId }) => {
  const navigate = useNavigate();
  const isEditable = useSelector(selectisArticleEditable);

  const isBookmarked = useSelector(selectSavedArticles).find(
    id => id === articleId
  );

  const isAuthenticated = useSelector(selectIsLoggedIn);

  // const isLoading = useSelector(state => state.auth.isFetching);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleEditClick = () => {
    navigate(`/create/${articleId}`);
  };

  const [localLoading, setLocalLoading] = useState(false);

  const handleBookmark = async () => {
    if (!isAuthenticated) {
      setIsModalOpen(true);
      return;
    }

  setLocalLoading(true);
  try {
    if (isBookmarked) {
      await dispatch(deleteFromSavedArticles(articleId)).unwrap();
    } else {
      await dispatch(addToSavedArticles(articleId)).unwrap();
    }
  } catch (error) {
    console.error('Error saving bookmark:', error);
  } finally {
    setLocalLoading(false);
  }
};

  return (
    <>
      {isEditable ? (
        <button
          onClick={handleEditClick}
          className={`${styles.button}`}
        >
          <EditIcon />
        </button>
      ) : (
        <button
          onClick={handleBookmark}
          className={`${styles.button} ${
            isBookmarked ? styles.bookmarked : styles.default
          }`}
          disabled={localLoading}
        >
          {localLoading ? '...' : <BookmarkIcon />}
        </button>
      )}

      <ModalErrorSave
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default ButtonAddToBookmarks;
