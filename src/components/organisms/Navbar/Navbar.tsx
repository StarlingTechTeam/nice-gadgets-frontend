import React from 'react';
import Logo from '@molecules/Logo';
import ThemeToggleButton from '@molecules/ThemeToggleButton';
import { useDevice } from '@/hooks/useDevice';
import NavLinksPart from '@molecules/NavLinksPart';
import NavIcon from '@molecules/NavIcon';
import BurgerMenuButton from '@molecules/BurgerMenuButton';
import HeartIcon from '@assets/icons/heart-icon-outline.svg';
import CartIcon from '@assets/icons/cart-icon.svg';
import './Navbar.scss';
import Search from '@organisms/Search';

interface NavbarProps {
  cartCount?: number;
  favoritesCount?: number;
  expandedSearch?: boolean;
  setExpandedSearch?: (v: boolean) => void;
  menuOpen: boolean;
  setMenuOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  cartCount = 0,
  favoritesCount = 0,
  expandedSearch = false,
  setExpandedSearch,
  menuOpen,
  setMenuOpen,
}) => {
  const { isMobile, isTablet, isDesktop } = useDevice();
  const hideControls = isTablet && expandedSearch;

  const renderSearch = () => {
    if (isDesktop) {
      return <Search isMobile={false} />;
    }

    if (isTablet) {
      return (
        <Search
          isMobile={true}
          expanded={expandedSearch}
          setExpanded={setExpandedSearch}
        />
      );
    }
    return null;
  };

  return (
    <div className="navbar">
      <div className="navbar__left">
        <Logo />
        {!isMobile && <NavLinksPart />}
      </div>

      <div className="navbar__right">
        {renderSearch()}

        {(!isMobile || (isMobile && menuOpen)) && !hideControls && (
          <ThemeToggleButton />
        )}

        {!hideControls && (
          <>
            {(isDesktop || isTablet) && (
              <nav aria-label="Utilities">
                <NavIcon
                  to="/favorites"
                  count={favoritesCount}
                  iconSrc={HeartIcon}
                  label="Favorites"
                />
                <NavIcon
                  to="/cart"
                  count={cartCount}
                  iconSrc={CartIcon}
                  label="Cart"
                />
              </nav>
            )}

            {isMobile && (
              <BurgerMenuButton
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
