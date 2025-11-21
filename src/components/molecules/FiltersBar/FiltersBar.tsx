import Subtitle from '@atoms/Text/Subtitle';
import Select from '@atoms/Select/Select';

import './FiltersBar.scss';

const FiltersBar = () => {
  return (
    <div className="filters-bar">
      <div className="filters-bar__group">
        <Subtitle title="Sort by" />
        <Select />
      </div>

      <div className="filters-bar__group">
        <Subtitle title="Items on page" />
        <Select />
      </div>
    </div>
  );
};

export default FiltersBar;
