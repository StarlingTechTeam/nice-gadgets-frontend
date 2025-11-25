import ProductList from '@organisms/ProductList';
import FavoritesPageHeader from '@molecules/FavoritesPageHeader';
import type { ProductCard } from '@/types/ProductCard';
import './FavoritesPageTemplate.scss';

type FavoritesPageTemplateProps = {
  products: ProductCard[];
};

const FavoritesPageTemplate = ({ products }: FavoritesPageTemplateProps) => {
  const hasFavorites = products.length > 0;

  return (
    <div className="favorites-grid inline-wrapper">
      <FavoritesPageHeader favoritesCount={products.length} />

      {hasFavorites ?
        <ProductList products={products} />
      : <div className="favorites-page__empty">
          <p className="favorites-page__empty-title">
            You have no favorites yet
          </p>
          <p className="favorites-page__empty-subtitle">
            Tap the heart icon on any product card to add it to this list.
          </p>
        </div>
      }
    </div>
  );
};

export default FavoritesPageTemplate;
