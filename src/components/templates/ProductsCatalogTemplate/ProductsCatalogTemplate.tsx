import ProductList from '@organisms/ProductList';
import ProductsCatalogHeader from '@molecules/ProductsCatalogHeader';
import type { SortOption } from '@molecules/FiltersBar';
import './ProductsCatalogTemplate.scss';
import type { ProductCard } from '@/types/ProductCard ';

type ProductsCatalogTemplateProps = {
  products: ProductCard[];
  category: string;
  sortValue: SortOption;
  onSortChange: (value: SortOption) => void;
  loading: boolean;
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
  category,
  sortValue,
  onSortChange,
  loading,
}: ProductsCatalogTemplateProps) => {
  return (
    <div className="catalog-grid inline-wrapper">
      <ProductsCatalogHeader
        title={formatCategoryTitle(category)}
        modelsCount={products.length}
        sortValue={sortValue}
        onSortChange={onSortChange}
      />

      <ProductList
        products={products}
        loading={loading}
      />
    </div>
  );
};

export default ProductsCatalogTemplate;
