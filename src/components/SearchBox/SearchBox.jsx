import { useDispatch, useSelector } from "react-redux";
import css from "./SearchBox.module.css";
import { selectNameFilter } from "../../redux/filters/selectors";
import { changeFilter } from "../../redux/filters/slice";

const SearchBox = () => {
  const filter = useSelector(selectNameFilter);
  const dispatch = useDispatch();

  const handleChange = (evt) => {
    dispatch(changeFilter(evt.target.value));
  };
  return (
    <div className={css.searchBox}>
      <h2>Find contacts by name or number</h2>
      <input
        className={css.searchInput}
        type="text"
        name=""
        onChange={handleChange}
        value={filter}
      />
    </div>
  );
};

export default SearchBox;
