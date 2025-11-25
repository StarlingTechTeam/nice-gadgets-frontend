import './App.scss';
import { HashRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '../context/ThemeProvider';
import { FavoritesProvider } from '@context/FavoritesContext';
import AppRoutes from './router/AppRoutes';
import PageWrapper from '@layouts/PageWrapper';
import ScrollToTop from '@utils/ScrollToTop';

const App = () => {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <Router>
          <PageWrapper>
            <ScrollToTop />
            <AppRoutes />
          </PageWrapper>
        </Router>
      </FavoritesProvider>
    </ThemeProvider>
  );
};

export default App;
