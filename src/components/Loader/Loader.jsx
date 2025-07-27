 import { RotateLoader } from 'react-spinners';
import { selectLoading } from "../../redux/articles/selectors";
import { useSelector } from 'react-redux';
import styles from './Loader.module.css';

const Loader = () => {
  const loading = useSelector(selectLoading);
  if (!loading) return null;

  return (
    <div className={styles.overlay}>
      <RotateLoader
        color="#649179"
        margin={2}
        size={15}
        speedMultiplier={0.8}
      />
    </div>
  );
};

export default Loader;