import type { ReactNode } from 'react';
import Header from '@organisms/Header';
import Footer from '@organisms/Footer';
import './PageWrapper.scss';
import { useProductsSelection } from '@/context/ProductsSelectionContext';

const PageWrapper = ({ children }: { children: ReactNode }) => {
  const { favorites } = useProductsSelection();

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-background transition-colors duration-400">
        <Header
          favoritesCount={favorites.length}
          cartCount={5}
        />
      </div>
      <main className="grow bg-background transition-colors duration-400">
        <div className="content-wrapper content-body"> {children}</div>
      </main>
      <div className="footer-wrapper bg-background transition-colors duration-400">
        <Footer />
      </div>
    </div>
  );
};
export default PageWrapper;
