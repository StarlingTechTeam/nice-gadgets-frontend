import type { ReactNode } from 'react';
import Footer from '../components/organisms/Footer/Footer';

const PageWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <header>HEADER</header>
      {children}
      <footer>
        <Footer />
      </footer>
    </>
  );
};
export default PageWrapper;
