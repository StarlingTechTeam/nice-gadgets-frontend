import React from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import Icon from '@atoms/Icon';
import './NavIcon.scss';

interface NavIconProps {
  to: string;
  count?: number;
  iconSrc: string;
  label?: string;
  mobile?: boolean;
  onClick?: () => void;
}

const NavIcon: React.FC<NavIconProps> = ({
  to,
  count = 0,
  iconSrc,
  label = '',
  mobile = false,
  onClick,
}) => {
  const baseClass = mobile ? 'nav-icon-area--mobile' : 'nav-icon-area';
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames(baseClass, { [`${baseClass}--active`]: isActive });

  return (
    <NavLink
      to={to}
      className={getNavLinkClass}
      aria-label={label}
      onClick={onClick}
    >
      <div className="nav-icon-wrapper">
        <Icon src={iconSrc} />
        {count > 0 && <span className="nav-icon-badge">{count}</span>}
      </div>
    </NavLink>
  );
};

export default NavIcon;
