import type { ReactNode } from 'react';
import Header from '@organisms/Header';
import Footer from '@organisms/Footer';
import './PageWrapper.scss';

const PageWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-background transition-colors duration-400">
        <Header
          favoritesCount={10}
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
