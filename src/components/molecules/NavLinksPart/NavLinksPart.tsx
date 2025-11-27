import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import './NavLinksPart.scss';

interface NavLinksPartProps {
  mobile?: boolean;
}

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/phones', label: 'Phones' },
  { to: '/tablets', label: 'Tablets' },
  { to: '/accessories', label: 'Accessories' },
];

const NavLinksPart = ({ mobile = false }: NavLinksPartProps) => {
  const baseClass = mobile ? 'nav-item-mobile' : 'nav-item';

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames(baseClass, { [`${baseClass}--active`]: isActive });

  return (
    <nav
      className={classNames('nav-content', { 'nav-content--mobile': mobile })}
      aria-label="Navigation content"
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
