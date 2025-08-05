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

const ButtonAddToBookmarks = ({ articleId }) => {
  const isBookmarked = useSelector(selectSavedArticles).find(
    id => id === articleId
  );
  const isAuthenticated = useSelector(selectIsLoggedIn);

  const isLoading = useSelector(state => state.auth.isFetching);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handleBookmark = async () => {
    if (!isAuthenticated) {
      setIsModalOpen(true);
      return;
    }

    try {
      if (isBookmarked) {
        dispatch(deleteFromSavedArticles(articleId));
      } else {
        dispatch(addToSavedArticles(articleId));
      }
    } catch (error) {
      console.error('Error saving bookmark:', error);
    }
  };

  return (
    <>
      <button
        onClick={handleBookmark}
        className={`${styles.button} ${
          isBookmarked ? styles.bookmarked : styles.default
        }`}
        disabled={isLoading}
      >
        {isLoading ? '...' : <BookmarkIcon />}
      </button>
      <ModalErrorSave
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default ButtonAddToBookmarks;
