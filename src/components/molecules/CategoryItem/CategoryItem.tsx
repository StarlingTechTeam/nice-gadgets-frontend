import { Link } from 'react-router-dom';
import CategoryCount from '@atoms/CategoryCount';
import './CategoryItem.scss';

type CategoryItemProps = {
  to: string;
  imageClass: string;
  title: string;
  count: number;
};

const CategoryItem = ({ to, imageClass, title, count }: CategoryItemProps) => (
  <Link
    to={to}
    className="category-item"
  >
    <div className={`category-item__image-block ${imageClass}`}></div>
    <div className="category-item__text-block">
      <h4 className="category-item__title text-primary">{title}</h4>
      <CategoryCount
        count={count}
        label="models"
      />
    </div>
  </Link>
);

export default CategoryItem;
