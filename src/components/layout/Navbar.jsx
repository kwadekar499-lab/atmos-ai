import { Link, NavLink } from 'react-router-dom';
import { CloudSun, BookOpen } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo">
          <div className="logo-icon-wrapper">
            <CloudSun size={24} className="logo-icon" aria-hidden="true" />
          </div>
          <span className="brand-name">Atmos <span className="brand-name-suffix">AI</span></span>
        </Link>

        {/* Navigation Links */}
        <nav className="nav-menu">
          <NavLink 
            to="/" 
            end
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Dashboard
          </NavLink>
          <NavLink 
            to="/coming-soon/radar" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Radar Maps
          </NavLink>
          <NavLink 
            to="/coming-soon/assistant" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            AI Assistant
          </NavLink>
          <NavLink 
            to="/docs" 
            className={({ isActive }) => `nav-link docs-link ${isActive ? 'active' : ''}`}
          >
            <BookOpen size={16} aria-hidden="true" />
            <span>Docs</span>
          </NavLink>
        </nav>

        {/* System Status and Profile */}
        <div className="navbar-actions">
          <div className="system-status">
            <span className="status-dot"></span>
            <span className="status-text">All Systems Operational</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
