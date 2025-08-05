import UploadForm from '../../components/UploadForm/UploadForm.jsx';
import css from "./UploadPhoto.module.css";
import { useState } from 'react';

const UploadPhoto = () => {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);

  return (
    <div className={css.containerUploadPhoto}>
      <div className={css.boxUploadPhoto}>
        <div 
          className={css.boxIconCloseUploadPhoto}
        >
          <div className={css.iconCloseUploadPhoto}></div>
        </div>
         <UploadForm
          image={image}
          setImage={setImage}
          file={file}
          setFile={setFile}
        />
      </div>
    </div>
  );
};

export default UploadPhoto;
