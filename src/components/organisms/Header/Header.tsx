/* eslint-disable react/prop-types */
import Logo from '@molecules/Logo';
import NavLinksPart from '@molecules/NavLinksPart';
import ThemeToggleButton from '@molecules/ThemeToggleButton';
import './Header.scss';
import NavIcon from '@molecules/NavIcon';
import HeartIcon from '@assets/icons/heart-icon-outline.svg';
import CartIcon from '@assets/icons/cart-icon.svg';

interface HeaderProps {
  cartCount?: number;
  favoritesCount?: number;
}

const Header: React.FC<HeaderProps> = ({
  cartCount = 0,
  favoritesCount = 0,
}) => {
  return (
    <div className="header-wrapper">
      <header className="header">
        <div className="header-bar">
          <div className="header-bar__left">
            <Logo />

            <NavLinksPart />
          </div>

          <div className="header-bar__right">
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
            <ThemeToggleButton />
          </div>
        </div>
      </header>

      <div className="header-border"></div>
    </div>
  );
};
export default Header;
