import { motion } from 'framer-motion';
import GlassCard from '../common/GlassCard';
import { Scale, FileText, Ban, AlertTriangle, HelpCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsView = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="terms-view-container"
    >
      <div className="view-back-bar">
        <Link to="/" className="back-link">
          <ArrowRight className="back-arrow-icon" size={16} aria-hidden="true" />
          <span>Back to Telemetry Dashboard</span>
        </Link>
      </div>

      <header className="view-header">
        <div className="view-icon-title">
          <Scale className="view-title-icon" size={28} aria-hidden="true" />
          <h1 className="view-title">Terms of Service</h1>
        </div>
        <p className="view-subtitle font-mono">Last Updated: June 15, 2026</p>
      </header>

      <div className="policy-container">
        <GlassCard className="policy-intro-card">
          <p className="policy-intro-text">
            Welcome to Atmos AI. By accessing this platform, you agree to comply with and be bound by the following Terms of Service. Please read these terms carefully before utilizing our weather intelligence dashboards.
          </p>
        </GlassCard>

        <div className="policy-sections-grid">
          <GlassCard className="policy-card">
            <h3 className="policy-section-title">
              <FileText size={16} className="section-icon" aria-hidden="true" />
              <span>1. Intellectual Property & License</span>
            </h3>
            <p className="policy-detail">
              The Atmos AI UI design system, code templates, dashboard layout structures, and animated canvas effects are the exclusive intellectual property of Atmos AI and its contributors.
            </p>
            <p className="policy-detail">
              You are granted a limited, non-exclusive, non-transferable, revocable license to access the dashboards for personal and informational use. Any reverse engineering or redistribution of core UI assets without consent is prohibited.
            </p>
          </GlassCard>

          <GlassCard className="policy-card">
            <h3 className="policy-section-title">
              <AlertTriangle size={16} className="section-icon" aria-hidden="true" />
              <span>2. Telemetry Liability Waiver</span>
            </h3>
            <p className="policy-detail">
              Atmos AI aggregates raw meteorological telemetry from third-party networks (specifically WeatherAPI.com). We do not guarantee the completeness, accuracy, or real-time reliability of weather predictions, air quality alerts, or storm paths.
            </p>
            <p className="policy-detail">
              All dashboard readings are provided <strong>"as is"</strong> for general information. Atmos AI is not liable for any damages, flight disruptions, agricultural losses, or health incidents resulting from weather prediction inaccuracies.
            </p>
          </GlassCard>

          <GlassCard className="policy-card">
            <h3 className="policy-section-title">
              <Ban size={16} className="section-icon" aria-hidden="true" />
              <span>3. API Fair Use & Quotas</span>
            </h3>
            <p className="policy-detail">
              Atmos AI utilizes API keys bound to specific request limits. Users agree not to scrape, automate, or spam queries using the search forms or current location triggers.
            </p>
            <p className="policy-detail">
              We reserve the right to temporarily suspend dashboard access, throttle search suggestions, or disable location lookups for clients demonstrating abusive request volumes that exceed fair-use guidelines.
            </p>
          </GlassCard>

          <GlassCard className="policy-card">
            <h3 className="policy-section-title">
              <HelpCircle size={16} className="section-icon" aria-hidden="true" />
              <span>4. Modification of Services</span>
            </h3>
            <p className="policy-detail">
              Atmos AI reserves the right to update, modify, or decommission dashboard sections, custom hook endpoints, and page integrations at any time without prior notice.
            </p>
            <p className="policy-detail">
              These terms are governed by and construed in accordance with standard international software distribution guidelines.
            </p>
          </GlassCard>
        </div>

        <GlassCard className="policy-contact-card">
          <h4 className="contact-title">Legal & License Contact</h4>
          <p className="contact-desc">
            For permission requests, enterprise licensing terms, or custom service agreements, reach out to our legal representatives at <a href="mailto:legal@atmos-ai.com" className="email-link" aria-label="Send email to legal@atmos-ai.com"><code>legal@atmos-ai.com</code></a>.
          </p>
        </GlassCard>
      </div>
    </motion.div>
  );
};

export default TermsView;
