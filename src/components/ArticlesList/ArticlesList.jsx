import ArticlesItem from "../ArticlesItem/ArticlesItem";
import NoArticles from "../NoArticles/NoArticles";
import styles from "./ArticlesList.module.css";

export const ArticlesList = ({ articles }) => {
  if (!articles || articles.length === 0) {
    return <NoArticles />;
  }

  return (
    <ul className={styles.list}>
      {articles.map((article) => (
        <ArticlesItem key={article.id} article={article} />
      ))}
    </ul>
  );
};
