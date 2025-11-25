import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import './NavLinksPart.scss';

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/phones', label: 'Phones' },
  { to: '/tablets', label: 'Tablets' },
  { to: '/accessories', label: 'Accessories' },
];

const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames('nav__item', {
    'nav__item--active': isActive,
  });

const NavLinksPart = () => {
  return (
    <nav
      className={classNames('nav')}
      aria-label="Primary"
    >
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={getNavLinkClass}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
};

export default NavLinksPart;
