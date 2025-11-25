import SectionTitle from '@atoms/SectionTitle';
import CategoryItem from '@molecules/CategoryItem';
import './CategorySection.scss';

type CategorySectionProps = {
  phones: number;
  tablets: number;
  accessories: number;
};

const CategorySection = ({
  phones,
  tablets,
  accessories,
}: CategorySectionProps) => (
  <div className="text-primary text-2xl inline-wrapper">
    <SectionTitle text="Shop by category" />
    <div className="category-block">
      <CategoryItem
        to="./phones"
        imageClass="image-block-1"
        title="Mobile phones"
        count={phones}
      />
      <CategoryItem
        to="./tablets"
        imageClass="image-block-2"
        title="Tablets"
        count={tablets}
      />
      <CategoryItem
        to="./accessories"
        imageClass="image-block-3"
        title="Accessories"
        count={accessories}
      />
    </div>
  </div>
);

export default CategorySection;
