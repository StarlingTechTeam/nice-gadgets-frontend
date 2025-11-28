import { useState, useEffect } from 'react';

export const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState<'xs' | 'xm' | 'xl'>('xs');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setScreenSize('xs');
      } else if (window.innerWidth >= 640) {
        setScreenSize('xm');
      } else if (window.innerWidth >= 1200) {
        setScreenSize('xl');
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenSize;
};
