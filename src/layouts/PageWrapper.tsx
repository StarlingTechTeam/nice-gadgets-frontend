import type { ReactNode } from 'react';
import Header from '@organisms/Header';
import Footer from '@organisms/Footer';
import Divider from '@/components/atoms/Divider';

const PageWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Divider />
      <main className="grow bg-background main">
        <div className="content-wrapper"> {children}</div>
      </main>
      <Divider />
      <div className="footer-wrapper">
        <Footer />
      </div>
    </div>
  );
};
export default PageWrapper;
