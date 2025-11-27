import FavoritesPageTemplate from '@templates/FavoritesPageTemplate';
import { useProductsSelection } from '@context/ProductsSelectionContext';
import './FavoritesPage.scss';

const FavoritesPage = () => {
  const { favorites } = useProductsSelection();

  return <FavoritesPageTemplate products={favorites} />;
};

export default FavoritesPage;
