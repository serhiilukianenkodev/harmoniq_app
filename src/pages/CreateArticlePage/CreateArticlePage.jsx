import { Container } from "@mui/material";
import css from "./CreateArticlePage.module.css"

const Photo = () => (
  <svg width={96} height={80} aria-hidden="true">
    <use href="/icons/sprite.svg#photo" />
  </svg>
);

const CreateArticlePage = () => {
  return (
    <div className={css.container}>
      <h1 className={css.title}>Create an article</h1>
      <p className={css.txt}>Title</p>
      <div className={css.formFileContainer}>
        <div className={css.formContainer}>
          <input type="text" placeholder="Enter the title" className={css.input} />
          <textarea name="article-text" id="" placeholder="Enter a text" className={css.txtarea}></textarea>
          <button type="submit" className={css.createBtn}>Publish Article</button>
        </div>
        <button className={css.photoBtn} type="button" style={{ position: 'relative', overflow: 'hidden' }}>
          <Photo />
          <input
            type="file"
            name="article-photo"
            className={css.inputFile}
          />
        </button>       
      </div>
    </div>
  )
};

export default CreateArticlePage;
