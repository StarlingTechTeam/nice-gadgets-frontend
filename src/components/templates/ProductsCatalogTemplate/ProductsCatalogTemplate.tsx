import ProductList from '@organisms/ProductList';
import type { Product } from '@/shared/api/products';
import ProductsCatalogHeader from '@molecules/ProductsCatalogHeader';
import type { SortOption } from '@molecules/FiltersBar';
import './ProductsCatalogTemplate.scss';

type ProductsCatalogTemplateProps = {
  products: Product[];
  category: string;
  sortValue: SortOption;
  onSortChange: (value: SortOption) => void;
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
}: ProductsCatalogTemplateProps) => {
  return (
    <div className="catalog-grid inline-wrapper">
      <ProductsCatalogHeader
        title={formatCategoryTitle(category)}
        modelsCount={products.length}
        sortValue={sortValue}
        onSortChange={onSortChange}
      />

      <ProductList products={products} />
    </div>
  );
};

export default ProductsCatalogTemplate;
