import ArticlesItem from "../ArticlesItem/ArticlesItem";
import NoArticles from "../NoArticles/NoArticles";
import styles from "./ArticlesList.module.css";

export const ArticlesList = ({ articles, isLoading }) => {
  if (isLoading) {
    return (
      <div className={styles.loading}>
        <p>Loading articles...</p>
      </div>
    );
  }

  if (!articles || articles.length === 0) {
    return <NoArticles />;
  }

  return (
    <ul className={styles.list}>
      {articles.map((article) => (
        <ArticlesItem key={article._id} article={article} />
      ))}
    </ul>
  );
};
