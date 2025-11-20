import logo from '../../../assets/icons/Logo.svg';
import logoDark from '../../../assets/icons/Logo_dark.svg';
import { useTheme } from '../../../hooks/useTheme';

const Footer = () => {
  const darkTheme = useTheme();

  return (
    <div>
      {darkTheme.theme === 'dark' ?
        <img
          className="h-auto max-w-lg rounded-base"
          src={logoDark}
        />
      : <img
          className="h-auto max-w-lg rounded-base"
          src={logo}
        />
      }
      <div>Footer</div>
    </div>
  );
};
export default Footer;
