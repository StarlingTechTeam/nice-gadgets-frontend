import Breadcrumbs from '@molecules/Breadcrumbs';
import PageTitle from '@atoms/PageTitle';
import FiltersBar from '@molecules/FiltersBar';
import type { SortOption } from '@molecules/FiltersBar';
import './ProductsCatalogHeader.scss';

type ProductsCatalogHeaderProps = {
  title: string;
  modelsCount: number;
  sortValue: SortOption;
  onSortChange: (value: SortOption) => void;
};

const ProductsCatalogHeader = ({
  title,
  modelsCount,
  sortValue,
  onSortChange,
}: ProductsCatalogHeaderProps) => {
  return (
    <div className="catalog-header">
      <Breadcrumbs />

      <PageTitle>{title}</PageTitle>

      <span className="catalog-header__models-count">{modelsCount} models</span>

      <FiltersBar
        sortValue={sortValue}
        onSortChange={onSortChange}
      />
    </div>
  );
};

export default ProductsCatalogHeader;
