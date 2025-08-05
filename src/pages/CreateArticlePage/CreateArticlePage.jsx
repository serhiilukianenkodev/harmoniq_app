import { useParams } from "react-router-dom";
import CreateArticleForm from "../../components/CreateArticleForm/CreateArticleForm";
import css from "./CreateArticlePage.module.css"


const CreateArticlePage = () => {
  const { id } = useParams();

  return (
      <div className={css.container}>
        <h1 className={css.title}>{id ? "Edit Article" : "Create an Article"}</h1>
        <CreateArticleForm articleId={id}/>
      </div>
  )
};

export default CreateArticlePage;
