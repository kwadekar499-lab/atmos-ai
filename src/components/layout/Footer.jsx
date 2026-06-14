import { Link } from 'react-router-dom';
import { CloudSun } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-logo-wrapper">
            <CloudSun size={18} className="footer-logo" aria-hidden="true" />
          </div>
          <span className="footer-brand-name">Atmos <span className="brand-name-suffix">AI</span></span>
        </div>
        <p className="footer-tagline">Premium Weather Intelligence Platform</p>
        <div className="footer-links">
          <Link to="/docs" className="footer-link">Documentation</Link>
          <Link to="/api" className="footer-link">API Integration</Link>
          <Link to="/privacy" className="footer-link">Privacy Policy</Link>
          <Link to="/terms" className="footer-link">Terms of Service</Link>
        </div>
        <p className="footer-copyright">
          &copy; {currentYear} Atmos AI. All rights reserved. Designed for elite intelligence.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
