import UploadForm from '../../components/UploadForm/UploadForm.jsx';
import css from './UploadPhoto.module.css';

const UploadPhoto = () => {
  return (
    <div className={css.containerUploadPhoto}>
      <div className={css.boxUploadPhoto}>
        <div class={css.boxIconCloseUploadPhoto}>
          <div class={css.iconCloseUploadPhoto}></div>
        </div>
        <UploadForm />
      </div>
    </div>
  );
};

export default UploadPhoto;
