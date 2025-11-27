import Subtitle from '@atoms/Text/Subtitle';
import './FilterSection.scss';

type FilterSectionProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

const FilterSection = ({ title, children, className }: FilterSectionProps) => {
  return (
    <div className={`filter-section ${className || ''}`}>
      <Subtitle title={title} />
      <div className="filter-section__content">{children}</div>
    </div>
  );
};

export default FilterSection;
