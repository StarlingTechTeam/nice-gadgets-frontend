import Subtitle from '@atoms/Text/Subtitle';
import Select from '@atoms/Select';
import './SortingBar.scss';

export const SORT_OPTIONS = [
  'Newest',
  'Oldest',
  'Price low to high',
  'Price high to low',
] as const;

export type SortOption = (typeof SORT_OPTIONS)[number];

export const DEFAULT_SORT: SortOption = SORT_OPTIONS[0];

type SortingBarProps = {
  sortValue: SortOption;
  onSortChange: (value: SortOption) => void;
};

const SortingBar = ({ sortValue, onSortChange }: SortingBarProps) => {
  const handleSortChange = (value: string) => {
    onSortChange(value as SortOption);
  };

  return (
    <div className="sorting-bar flex">
      <div className="sorting-bar__group">
        <Subtitle title="Sort by" />
        <Select
          value={sortValue}
          items={SORT_OPTIONS}
          onChange={handleSortChange}
        />
      </div>
    </div>
  );
};

export default SortingBar;
