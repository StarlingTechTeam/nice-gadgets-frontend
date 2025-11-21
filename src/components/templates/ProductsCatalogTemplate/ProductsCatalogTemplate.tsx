import ProductsCatalogHeader from '@/components/molecules/ProductsCatalogHeader/ProductsCatalogHeader';
import ProductList from '@/components/organisms/ProductList/ProductsList';
import type { Product } from '@/shared/api/products';
import './ProductsCatalogTemplate.scss';

type ProductsCatalogTemplateProps = {
  products: Product[];
  category: string;
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
}: ProductsCatalogTemplateProps) => {
  return (
    <div className="catalog-grid inline-wrapper">
      <ProductsCatalogHeader
        title={formatCategoryTitle(category)}
        modelsCount={products.length}
      />

      <ProductList products={products} />
    </div>
  );
};

export default ProductsCatalogTemplate;
