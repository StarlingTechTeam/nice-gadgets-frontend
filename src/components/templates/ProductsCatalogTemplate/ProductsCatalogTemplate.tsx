import ProductList from '@organisms/ProductList';
import ProductsCatalogHeader from '@molecules/ProductsCatalogHeader';
import type { SortOption } from '@molecules/FiltersBar';
import './ProductsCatalogTemplate.scss';
import type { ProductCard } from '@/types/ProductCard';
import Pagination from '@molecules/Pagination';

type ProductsCatalogTemplateProps = {
  products: ProductCard[];
  totalCount: number;
  category: string;
  sortValue: SortOption;
  onSortChange: (value: SortOption) => void;
  loading: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const formatCategoryTitle = (category: string) => {
  switch (category) {
    case 'phones':
      return 'Mobile phones';
    case 'tablets':
      return 'Tablets';
    case 'accessories':
      return 'Accessories';
    default:
      return category;
  }
};

const ProductsCatalogTemplate = ({
  products,
  totalCount,
  category,
  sortValue,
  onSortChange,
  loading,
  currentPage,
  totalPages,
  onPageChange,
}: ProductsCatalogTemplateProps) => {
  return (
    <div className="catalog-grid inline-wrapper">
      <ProductsCatalogHeader
        title={formatCategoryTitle(category)}
        modelsCount={totalCount}
        sortValue={sortValue}
        onSortChange={onSortChange}
      />

      <ProductList
        products={products}
        loading={loading}
      />

      {!loading && (
        <Pagination
          current={currentPage}
          total={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default ProductsCatalogTemplate;
