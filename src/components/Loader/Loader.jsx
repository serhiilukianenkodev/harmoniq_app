import { useSelector } from "react-redux";
import { selectLoading } from "../../redux/articles/selectors";

const Loader = () => {
  const loading = useSelector(selectLoading);

  return <>{loading && <p>Loading...</p>}</>;
};

export default Loader;
