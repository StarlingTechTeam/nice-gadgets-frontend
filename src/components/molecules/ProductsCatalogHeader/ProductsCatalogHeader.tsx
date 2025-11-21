import './ProductsCatalogHeader.scss';
import Breadcrumbs from '@/components/molecules/Breadcrumbs/Breadcrumbs';
import PageTitle from '@/components/atoms/PageTitle';
import FiltersBar from '@/components/molecules/FiltersBar/FiltersBar';

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
