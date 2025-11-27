import Breadcrumbs from '@molecules/Breadcrumbs';
import PageTitle from '@atoms/PageTitle';
import type { SortOption } from '@molecules/SortingBar';
import './ProductsCatalogHeader.scss';
import SortingBar from '@molecules/SortingBar';

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

      <SortingBar
        sortValue={sortValue}
        onSortChange={onSortChange}
      />
    </div>
  );
};

export default ProductsCatalogHeader;
