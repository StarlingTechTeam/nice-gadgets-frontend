import { useState } from 'react';
import Subtitle from '@atoms/Text/Subtitle';
import Select from '@atoms/Select';
import './FiltersBar.scss';

export const SORT_OPTIONS = [
  'Newest',
  'Oldest',
  'Price low to high',
  'Price high to low',
] as const;

export type SortOption = (typeof SORT_OPTIONS)[number];

export const DEFAULT_SORT: SortOption = SORT_OPTIONS[0];

type FiltersBarProps = {
  sortValue: SortOption;
  onSortChange: (value: SortOption) => void;
};

const FiltersBar = ({ sortValue, onSortChange }: FiltersBarProps) => {
  const [itemsOnPage, setItemsOnPage] = useState('16');
  const handleSortChange = (value: string) => {
    onSortChange(value as SortOption);
  };

  return (
    <div className="filters-bar flex">
      <div className="filters-bar__group">
        <Subtitle title="Sort by" />
        <Select
          value={sortValue}
          items={SORT_OPTIONS}
          onChange={handleSortChange}
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
