import { Routes, Route } from 'react-router-dom';

import App from '../App';
import { HomePage } from '../../components/pages/HomePage';
import { ProductsCatalogPage } from '../../components/pages/ProductsCatalogPage';
import { ProductDetailsPage } from '../../components/pages/ProductDetailsPage';
import { CartPage } from '../../components/pages/CartPage';
import { FavoritesPage } from '../../components/pages/FavoritesPage';
import { NotFoundPage } from '../../components/pages/NotFoundPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<App />}
      >
        <Route
          index
          element={<HomePage />}
        />
        <Route
          path="cart"
          element={<CartPage />}
        />
        <Route
          path="favorites"
          element={<FavoritesPage />}
        />
        <Route
          path=":categoryType"
          element={<ProductsCatalogPage />}
        />
        <Route
          path=":categoryType/:productId"
          element={<ProductDetailsPage />}
        />
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
