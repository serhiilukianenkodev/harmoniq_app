import css from "./UploadForm.module.css";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadUserPhoto } from '../../redux/authors/operations';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UploadForm = ({ image, setImage, file, setFile }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const token = useSelector(state => state.auth.token);
    console.log('TOKEN:', token);

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


    const handleSave = async () => {
  if (!file) return;
  setLoading(true);
  setError(null);

  try {
    if (!token) {
      const msg = 'Токен авторизації відсутній. Будь ласка, увійдіть в систему.';
      setError(msg);
      toast.error(msg);
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('photo', file);

    const result = await dispatch(uploadUserPhoto(formData)).unwrap();
    console.log('Результат завантаження:', result);

    if (result?.data.avatarUrl) {
      toast.success('Фото завантажено успішно!');
      navigate('/');
    } else {
      const msg = 'Щось пішло не так при завантаженні фото.';
      setError(msg);
      toast.error(msg);
    }
  } catch (err) {
    console.error('Помилка при завантаженні фото:', err);
    const msg = err?.response?.data?.message || 'Не вдалося завантажити фото.';
    setError(msg);
    toast.error(msg);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className={css.containerUploadForm}>
        <ToastContainer />
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
                onClick={handleSave}
                disabled={!file || loading}
            >
                Save
            </button>
       </div>
    );
};

export default UploadForm;
