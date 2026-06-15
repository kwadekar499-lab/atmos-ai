import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { CloudSun, BookOpen, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo" aria-label="Atmos AI home" onClick={() => setIsOpen(false)}>
          <div className="logo-icon-wrapper">
            <CloudSun size={24} className="logo-icon" aria-hidden="true" />
          </div>
          <span className="brand-name">Atmos <span className="brand-name-suffix">AI</span></span>
        </Link>

        {/* Navigation Links (Desktop) */}
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

        {/* System Status / Profile (Desktop) & Hamburger Button (Mobile) */}
        <div className="navbar-actions">
          <div className="system-status">
            <span className="status-dot"></span>
            <span className="status-text">All Systems Operational</span>
          </div>

          <button 
            className="mobile-menu-toggle"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav 
            id="mobile-nav" 
            className="mobile-nav-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <NavLink 
              to="/" 
              end
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </NavLink>
            <NavLink 
              to="/coming-soon/radar" 
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              Radar Maps
            </NavLink>
            <NavLink 
              to="/coming-soon/assistant" 
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              AI Assistant
            </NavLink>
            <NavLink 
              to="/docs" 
              className={({ isActive }) => `mobile-nav-link mobile-docs-link ${isActive ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              <BookOpen size={16} aria-hidden="true" />
              <span>Docs</span>
            </NavLink>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
