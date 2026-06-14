import { motion } from 'framer-motion';
import GlassCard from '../common/GlassCard';
import { Shield, Eye, Lock, Globe, Server, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyView = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="privacy-view-container"
    >
      <div className="view-back-bar">
        <Link to="/" className="back-link">
          <ArrowRight className="back-arrow-icon" size={16} aria-hidden="true" />
          <span>Back to Telemetry Dashboard</span>
        </Link>
      </div>

      <header className="view-header">
        <div className="view-icon-title">
          <Shield className="view-title-icon" size={28} aria-hidden="true" />
          <h1 className="view-title">Privacy Policy</h1>
        </div>
        <p className="view-subtitle font-mono">Last Updated: June 15, 2026</p>
      </header>

      <div className="policy-container">
        <GlassCard className="policy-intro-card">
          <p className="policy-intro-text">
            At Atmos AI, we are committed to safeguarding your privacy. This policy describes how we collect, process, and protect data when you use our weather intelligence dashboard.
          </p>
        </GlassCard>

        <div className="policy-sections-grid">
          <GlassCard className="policy-card">
            <h3 className="policy-section-title">
              <Eye size={16} className="section-icon" aria-hidden="true" />
              <span>1. Geolocation Telemetry</span>
            </h3>
            <p className="policy-detail">
              When you click the "Location" button to fetch weather data for your current area, Atmos AI requests access to your device's geographical coordinates via your browser's geolocation API.
            </p>
            <p className="policy-detail">
              These coordinates are processed <strong>entirely in-memory</strong> on your local machine to make the weather request. We never transmit your latitude and longitude coordinates to Atmos AI servers, and they are never stored or tracked.
            </p>
          </GlassCard>

          <GlassCard className="policy-card">
            <h3 className="policy-section-title">
              <Lock size={16} className="section-icon" aria-hidden="true" />
              <span>2. Client-Side Search Caching</span>
            </h3>
            <p className="policy-detail">
              Atmos AI uses your browser's local storage (<code>localStorage</code>) to cache the last 5 successfully searched cities. This cache is used to provide the "Recent Searches" history for quick dashboard navigation.
            </p>
            <p className="policy-detail">
              This data remains on your physical device. You can clear this history at any time by clearing your browser cache or site data.
            </p>
          </GlassCard>

          <GlassCard className="policy-card">
            <h3 className="policy-section-title">
              <Globe size={16} className="section-icon" aria-hidden="true" />
              <span>3. Third-Party Data Integrations</span>
            </h3>
            <p className="policy-detail">
              To provide real-time atmospheric readings, weather telemetry queries (such as city names or latitude/longitude coordinates) are forwarded to our API provider, <strong>WeatherAPI.com</strong>.
            </p>
            <p className="policy-detail">
              These queries are governed by WeatherAPI's privacy regulations. We do not transmit any personal identifiers or user accounts to third parties.
            </p>
          </GlassCard>

          <GlassCard className="policy-card">
            <h3 className="policy-section-title">
              <Server size={16} className="section-icon" aria-hidden="true" />
              <span>4. Server Logs & Cookies</span>
            </h3>
            <p className="policy-detail">
              Atmos AI is a static web application hosted on secure, distributed cloud servers. Standard server access logs (including IP address, browser type, and access timestamps) may be generated for network security and analytics.
            </p>
            <p className="policy-detail">
              We do not utilize tracking cookies, advertising trackers, or marketing trackers on this platform.
            </p>
          </GlassCard>
        </div>

        <GlassCard className="policy-contact-card">
          <h4 className="contact-title">Privacy Questions & Audits</h4>
          <p className="contact-desc">
            Since Atmos AI processes weather query telemetry directly on the client side, we maintain full transparency. For compliance questions or developer audits, contact us at <a href="mailto:privacy@atmos-ai.com" className="email-link" aria-label="Send email to privacy@atmos-ai.com"><code>privacy@atmos-ai.com</code></a>.
          </p>
        </GlassCard>
      </div>
    </motion.div>
  );
};

export default PrivacyView;
