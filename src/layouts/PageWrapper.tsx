import type { ReactNode } from 'react';
import Header from '@organisms/Header';
import Footer from '@organisms/Footer';

const PageWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
export default PageWrapper;
