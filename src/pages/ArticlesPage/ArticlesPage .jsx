import { useEffect, useState } from "react";

import { ArticlesList } from "../../components/ArticlesList/ArticlesList";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import styles from "./ArticlesPage.module.css";

const mockArticles = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  image: "https://placehold.co/600x400/gray/white",
  author: `Author ${i + 1}`,
  title: `Article Title ${i + 1}`,
  description: `This is a short description for article ${i + 1}.`,
  type: i % 2 === 0 ? "Popular" : "All",
}));

const mockFetchArticles = ({ page = 1, filter = "All", perPage = 10 }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered =
        filter === "All"
          ? mockArticles
          : mockArticles.filter((a) => a.type === filter);

      const paginated = filtered.slice((page - 1) * perPage, page * perPage);

      resolve({
        articles: paginated,
        total: filtered.length,
      });
    }, 500);
  });
};

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("All");
  const [totalArticles, setTotalArticles] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const articlesPerPage = 10;

  const fetchArticles = async (reset = false) => {
    setIsLoading(true);
    try {
      const result = await mockFetchArticles({
        page: reset ? 1 : page,
        filter,
        perPage: articlesPerPage,
      });

      setArticles((prev) =>
        reset ? result.articles : [...prev, ...result.articles]
      );
      setTotalArticles(result.total);
      setHasMore(
        (reset
          ? result.articles.length
          : articles.length + result.articles.length) < result.total
      );

      if (reset) {
        setPage(1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles(true);
  }, [filter]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchArticles(false);
  };

  const handleFilterChange = (newFilter) => {
    if (newFilter !== filter) {
      setFilter(newFilter);
      setArticles([]);
    }
  };

  return (
    <div className={styles.container}>
      <SectionTitle title="Articles" />
      <div className={styles.header}>
        <p className={styles.count}>{totalArticles} articles</p>
        <div className={styles.filters}>
          <CustomSelect
            options={["All", "Popular"]}
            defaultSelected={filter}
            onChange={(value) => handleFilterChange(value)}
          />
        </div>
      </div>

      <ArticlesList articles={articles} />

      {hasMore && (
        <div className={styles.loadMoreWrapper}>
          <button
            onClick={handleLoadMore}
            disabled={isLoading}
            className={styles.loadMore}
          >
            {isLoading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ArticlesPage;
