import React, { useEffect } from 'react';
import classNames from 'classnames';
import NavLinksPart from '@molecules/NavLinksPart';
import NavIcon from '@molecules/NavIcon';
import HeartIcon from '@assets/icons/heart-icon-outline.svg';
import CartIcon from '@assets/icons/cart-icon.svg';
import Search from '@organisms/Search';
import './MobileMenuOverlay.scss';

interface MobileMenuOverlayProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  cartCount?: number;
  favoritesCount?: number;
}

const MobileMenuOverlay: React.FC<MobileMenuOverlayProps> = ({
  menuOpen,
  setMenuOpen,
  cartCount = 0,
  favoritesCount = 0,
}) => {
  useEffect(() => {
    let timeoutId: number | undefined;

    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('menu-open');
    } else {
      timeoutId = window.setTimeout(() => {
        document.body.classList.remove('menu-open');
        document.body.style.overflow = '';
      }, 500);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [menuOpen]);

  return (
    <aside
      className={classNames('mobile-menu', { 'mobile-menu--open': menuOpen })}
      role="dialog"
      aria-modal="true"
      aria-hidden={!menuOpen}
    >
      <nav aria-label="Mobile menu">
        <NavLinksPart mobile />

        <div className="mobile-search-wrapper">
          <Search
            isMobile
            isOverlay
            menuOpen={menuOpen}
          />
        </div>

        <div className="mobile-bottom-nav">
          <NavIcon
            to="/favorites"
            count={favoritesCount}
            iconSrc={HeartIcon}
            label="Favorites"
            mobile
            onClick={() => setMenuOpen(false)}
          />
          <NavIcon
            to="/cart"
            count={cartCount}
            iconSrc={CartIcon}
            label="Cart"
            mobile
            onClick={() => setMenuOpen(false)}
          />
        </div>
      </nav>
    </aside>
  );
};

export default MobileMenuOverlay;
