import { Routes, Route } from 'react-router-dom';
import { ProductsCatalogPage } from '../../pages/ProductsCatalogPage';
import { ProductDetailsPage } from '../../pages/ProductDetailsPage';
import { CartPage } from '../../pages/CartPage';
import { FavoritesPage } from '../../pages/FavoritesPage';
import { NotFoundPage } from '../../pages/NotFoundPage';
import HomePage from '../../pages/HomePage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/">
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
