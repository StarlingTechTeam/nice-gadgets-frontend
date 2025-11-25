import BackToTop from '@molecules/BackToTop';
import Logo from '@molecules/Logo';
import './Footer.scss';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <div className="footer-border"></div>
      <footer className="footer">
        <Logo footer />

        <nav className="footer-nav-company-information">
          <ul>
            <li>
              <a
                href="#"
                className="footer-navlink"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
            <li>
              <NavLink
                to="/"
                className="footer-navlink"
              >
                Contacts
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/"
                className="footer-navlink"
              >
                Rights
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="footer-back-to-top-wrapper">
          <BackToTop />
        </div>
      </footer>
    </>
  );
};

export default Footer;
