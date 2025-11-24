import { useState } from 'react';
import Subtitle from '@atoms/Text/Subtitle';
import Select from '@atoms/Select';
import './FiltersBar.scss';

const FiltersBar = () => {
  const [sortBy, setSortBy] = useState('Newest');
  const [itemsOnPage, setItemsOnPage] = useState('16');

  return (
    <div className="filters-bar flex">
      <div className="filters-bar__group">
        <Subtitle title="Sort by" />
        <Select
          value={sortBy}
          items={['Newest', 'Oldest', 'Price low to high', 'Price high to low']}
          onChange={setSortBy}
        />
      </div>

      <div className="filters-bar__group">
        <Subtitle title="Items on page" />
        <Select
          value={itemsOnPage}
          items={['8', '16', '24', '48']}
          onChange={setItemsOnPage}
        />
      </div>
    </div>
  );
};

export default FiltersBar;
