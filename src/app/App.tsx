import './App.scss';
import { HashRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@context/ThemeProvider';
import { ProductsSelectionProvider } from '@context/ProductsSelectionProvider';
import AppRoutes from './router/AppRoutes';
import PageWrapper from '@layouts/PageWrapper';
import ScrollToTop from '@utils/ScrollToTop';
import ToastContainer from '@organisms/ToastContainer';

const App = () => {
  return (
    <ThemeProvider>
      <ProductsSelectionProvider>
        <Router>
          <PageWrapper>
            <ScrollToTop />
            <AppRoutes />
          </PageWrapper>
        </Router>
        <ToastContainer />
      </ProductsSelectionProvider>
    </ThemeProvider>
  );
};

export default App;
