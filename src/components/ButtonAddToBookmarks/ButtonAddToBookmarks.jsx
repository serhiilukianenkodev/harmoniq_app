import { useState } from "react";
import ModalErrorSave from "../ModalErrorSave/ModalErrorSave";
import { BookmarkIcon } from "./BookmarkIcon";
import styles from "./ButtonAddToBookmarks.module.css";

const ButtonAddToBookmarks = ({ articleId }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isAuthenticated = true;

  const handleBookmark = async () => {
    if (!isAuthenticated) {
      setIsModalOpen(true);
      return;
    }

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsBookmarked(!isBookmarked);
    } catch (error) {
      console.error("Error saving bookmark:", error);
    } finally {
      setIsLoading(false);
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
        {isLoading ? "..." : <BookmarkIcon />}
      </button>
      <ModalErrorSave
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default ButtonAddToBookmarks;
