import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDevice } from '@/hooks/useDevice';
import Navbar from '@organisms/Navbar';
import './Header.scss';
import MobileMenuOverlay from '@organisms/MobileMenuOverlay';

interface HeaderProps {
  cartCount?: number;
  favoritesCount?: number;
}

const Header = ({ cartCount = 0, favoritesCount = 0 }: HeaderProps) => {
  const { isMobile, isTablet } = useDevice();
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedSearch, setExpandedSearch] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setExpandedSearch(false);
    if (isMobile) setMenuOpen(false);
  }, [location.pathname, isMobile]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isMobile && menuOpen) setMenuOpen(false);
        if (isTablet && expandedSearch) setExpandedSearch(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isMobile, isTablet, menuOpen, expandedSearch]);

  return (
    <div className="header-wrapper">
      <header className="header">
        <Navbar
          cartCount={cartCount}
          favoritesCount={favoritesCount}
          expandedSearch={expandedSearch}
          setExpandedSearch={setExpandedSearch}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />
      </header>

      {isMobile && (
        <MobileMenuOverlay
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          cartCount={cartCount}
          favoritesCount={favoritesCount}
        />
      )}

      <div className="header-border"></div>
    </div>
  );
};
export default Header;
