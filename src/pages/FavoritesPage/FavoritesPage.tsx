import FavoritesPageTemplate from '@templates/FavoritesPageTemplate';
import { useFavorites } from '@context/FavoritesContext';
import './FavoritesPage.scss';

const FavoritesPage = () => {
  const { favorites } = useFavorites();

  return <FavoritesPageTemplate products={favorites} />;
};

export default FavoritesPage;
