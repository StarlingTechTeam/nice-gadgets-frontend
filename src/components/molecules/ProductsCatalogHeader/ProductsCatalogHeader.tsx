import Breadcrumbs from '@molecules/Breadcrumbs';
import PageTitle from '@atoms/PageTitle';
import FiltersBar from '@molecules/FiltersBar';
import './ProductsCatalogHeader.scss';

type ProductsCatalogHeaderProps = {
  title: string;
  modelsCount: number;
};

const ProductsCatalogHeader = ({
  title,
  modelsCount,
}: ProductsCatalogHeaderProps) => {
  return (
    <div className="catalog-header">
      <Breadcrumbs />

      <PageTitle>{title}</PageTitle>

      <span className="catalog-header__models-count">{modelsCount} models</span>

      <FiltersBar />
    </div>
  );
};

export default ProductsCatalogHeader;
