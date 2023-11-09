import { useDispatch, useSelector } from 'react-redux';
import { changeSearchField } from '../../reducers/searchServices';

export const FilterServices = () => {
  const dispatch = useDispatch();

  const { searchField } = useSelector((state) => state.searchServices);

  const onChange = ({ target: { value } }) => {
    dispatch(changeSearchField(value));
  };

  return (
    <div className="filter-services">
      <label className="filter-services_label">
        <span className="filter-services_text">Search</span>
        <input
          type="text"
          className="filter-services_input"
          onChange={onChange}
          value={searchField}
          placeholder="Type something to search..."
        />
      </label>
    </div>
  );
};
