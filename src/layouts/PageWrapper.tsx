import type { ReactNode } from 'react';
import Header from '../components/organisms/Header/Header';
import Footer from '../components/organisms/Footer/Footer';

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
