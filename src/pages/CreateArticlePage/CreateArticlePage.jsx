import Container from "../../components/Container/Container";
import CreateArticleForm from "../../components/createArticleForm/createArticleForm";
import css from "./CreateArticlePage.module.css"


const CreateArticlePage = () => {
  return (
      <div className={css.container}>
        <h1 className={css.title}>Create an article</h1>
        <p className={css.txt}>Title</p>
        <CreateArticleForm/>
      </div>
  )
};

export default CreateArticlePage;
