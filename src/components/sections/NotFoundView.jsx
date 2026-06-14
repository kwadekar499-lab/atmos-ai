import { motion } from 'framer-motion';
import GlassCard from '../common/GlassCard';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFoundView = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="layout-centered"
      style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <div className="error-state">
        <GlassCard className="error-card" style={{ textAlign: 'center', padding: 'var(--spacing-xl)' }}>
          <AlertTriangle size={48} className="error-icon" style={{ margin: '0 auto var(--spacing-md)', color: 'var(--accent-cyan)' }} aria-hidden="true" />
          <h2 className="error-heading" style={{ fontSize: '3rem', margin: '0 0 var(--spacing-xs)', lineHeight: 1 }}>404</h2>
          <h3 className="error-heading" style={{ fontSize: '1.25rem', margin: '0 0 var(--spacing-md)', color: 'var(--text-secondary)' }}>Endpoint Offline</h3>
          <p className="error-desc" style={{ marginBottom: 'var(--spacing-lg)', maxWidth: '320px', marginLeft: 'auto', marginRight: 'auto' }}>
            The requested atmospheric vector does not exist or has been decommissioned.
          </p>
          
          <Link 
            to="/" 
            className="retry-btn" 
            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', margin: '0 auto' }}
            aria-label="Return to Dashboard"
          >
            <span>Return to Dashboard</span>
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </GlassCard>
      </div>
    </motion.div>
  );
};

export default NotFoundView;
