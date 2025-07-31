import css from "./UploadForm.module.css";
import { useState } from 'react';

const UploadForm = ({ image, setImage, file, setFile }) => {
    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(selectedFile);

        setFile(selectedFile);
    };

  return (
    <div className={css.containerUploadForm}>
      <h2 className={css.titleUploadForm}>Upload your photo</h2>
            <label className={css.labelUploadForm}>
                <input 
                    type="file" 
                    accept="image/*" 
                    className={css.inputUploadForm} 
                    onChange={handleImageChange}
                />
                <div 
                    className={css.circleButtonUploadForm}
                    style={image ? { backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
                > 
                {!image && (
                    <svg className={css.iconCircleButtonUploadForm}>
                    <use xlinkHref='/icons/sprite.svg#photo'></use>
                    </svg>
                )}
                </div>
            </label>

            <button 
            className={css.buttonUploadForm}
            disabled={!file}
            >
                Save
            </button>
       </div>
    );
};

export default UploadForm;
