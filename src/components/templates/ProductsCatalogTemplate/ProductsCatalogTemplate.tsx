import ProductList from '@organisms/ProductList';
import ProductsCatalogHeader from '@molecules/ProductsCatalogHeader';
import type { SortOption } from '@molecules/SortingBar';
import type { ProductFilters, FilterOptions } from '@/types/ProductFilters';
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
  filters: ProductFilters;
  filterOptions: FilterOptions;
  onFiltersChange: (filters: ProductFilters) => void;
  allProducts?: ProductCard[];
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
  filters,
  filterOptions,
  onFiltersChange,
  allProducts = [],
}: ProductsCatalogTemplateProps) => {
  return (
    <div className="catalog-grid inline-wrapper">
      <ProductsCatalogHeader
        title={formatCategoryTitle(category)}
        modelsCount={totalCount}
        sortValue={sortValue}
        onSortChange={onSortChange}
        category={category}
        filters={filters}
        filterOptions={filterOptions}
        onFiltersChange={onFiltersChange}
        allProducts={allProducts}
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
