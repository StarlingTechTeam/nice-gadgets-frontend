import React from 'react';
import classNames from 'classnames';
import Icon from '@atoms/Icon';
import MenuIcon from '@assets/icons/menu-icon.svg';
import CloseIcon from '@assets/icons/close-icon.svg';
import Button from '@atoms/Button';

interface BurgerMenuButtonProps {
  menuOpen: boolean;
  setMenuOpen: (open: ((prev: boolean) => boolean) | boolean) => void;
}

const BurgerMenuButton: React.FC<BurgerMenuButtonProps> = ({
  menuOpen,
  setMenuOpen,
}) => (
  <Button
    variant="icon"
    className={classNames('icon-btn', {
      'is-open': menuOpen,
    })}
    aria-label={menuOpen ? 'Close mobile menu' : 'Open mobile menu'}
    onClick={() => setMenuOpen((s: boolean) => !s)}
    aria-expanded={menuOpen}
    icon={<Icon src={menuOpen ? CloseIcon : MenuIcon} />}
  />
);

export default BurgerMenuButton;
