/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { useTheme } from '@hooks/useTheme';
import logo from '@assets/icons/Logo.svg';
import logoDark from '@assets/icons/Logo_dark.svg';
import './Logo.scss';

interface LogoProps {
  footer?: boolean;
}

const Logo: React.FC<LogoProps> = ({ footer = false }) => {
  const { theme } = useTheme();

  const logoSrc = theme === 'dark' ? logoDark : logo;
  const baseClass = footer ? 'logo-link--footer' : '';

  return (
    <Link
      to="/"
      className={`logo-link ${baseClass}`}
      aria-label="Nice Gadgets home"
    >
      <img
        className="logo-image"
        src={logoSrc}
        alt="Nice Gadgets logo"
      />
    </Link>
  );
};

export default Logo;
