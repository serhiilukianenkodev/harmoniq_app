import CreateArticleForm from "../../components/CreateArticleForm/CreateArticleForm";
import css from "./CreateArticlePage.module.css"


const CreateArticlePage = () => {
  return (
      <div className={css.container}>
        <h1 className={css.title}>Create an article</h1>
        <CreateArticleForm/>
      </div>
  )
};

export default CreateArticlePage;
