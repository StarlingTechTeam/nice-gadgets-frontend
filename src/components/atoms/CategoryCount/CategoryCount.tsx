import './CategoryCount.scss';

type CategoryCountProps = {
  count: number;
  label: string;
};

const CategoryCount = ({ count, label }: CategoryCountProps) => (
  <span className="homepage__category-subtitle text-secondary">
    {count} {label}
  </span>
);

export default CategoryCount;
