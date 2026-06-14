import { motion } from 'framer-motion';
import GlassCard from '../common/GlassCard';
import { BookOpen, HelpCircle, Code, Layers, Compass, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const DocsView = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="docs-view-container"
    >
      {/* Back to Dashboard Link */}
      <div className="view-back-bar">
        <Link to="/" className="back-link">
          <ArrowRight className="back-arrow-icon" size={16} aria-hidden="true" />
          <span>Back to Telemetry Dashboard</span>
        </Link>
      </div>

      <header className="view-header">
        <div className="view-icon-title">
          <BookOpen className="view-title-icon" size={28} aria-hidden="true" />
          <h1 className="view-title">System Documentation</h1>
        </div>
        <p className="view-subtitle font-mono">Atmos AI Software Specification & Roadmap</p>
      </header>

      <div className="docs-grid">
        {/* Left Side: Articles */}
        <div className="docs-main-content">
          <GlassCard className="docs-section-card">
            <h2 className="docs-section-heading">
              <Layers size={18} className="heading-icon" aria-hidden="true" />
              <span>1. System Architecture</span>
            </h2>
            <p className="docs-paragraph">
              Atmos AI is a premium, client-driven weather intelligence platform designed to showcase Apple-level spacing, modern glassmorphic visual systems, and clean asynchronous data state management.
            </p>
            <p className="docs-paragraph">
              The front-end is built using React 19 and Vite, styled using a scalable vanilla CSS system. It connects directly to the WeatherAPI.com telemetry gateway to parse, filter, and normalize real-time atmospheric metrics.
            </p>
          </GlassCard>

          <GlassCard className="docs-section-card">
            <h2 className="docs-section-heading">
              <Compass size={18} className="heading-icon" aria-hidden="true" />
              <span>2. Telemetry Interpretation</span>
            </h2>
            <p className="docs-paragraph">
              The dashboard displays five essential sensor widgets, mapping API data to premium UI elements:
            </p>
            <ul className="docs-list-bullets">
              <li><strong>UV Index</strong>: Gauges ultraviolet radiation levels using the WHO standard, presenting warnings for high exposure.</li>
              <li><strong>Air Quality Index (AQI)</strong>: Analyzes particulate counts (PM2.5, PM10) using the US-EPA 1-6 scale to provide health advisories.</li>
              <li><strong>Wind Direction Compass</strong>: Computes wind speed vectors and maps the wind angle dynamically to rotate a compass pointer.</li>
              <li><strong>Humidity & Dew Point</strong>: Correlates humidity percentages to ambient temp to calculate current air comfort metrics.</li>
              <li><strong>Atmospheric Pressure</strong>: Measures air weight in millibars (hPa) to track localized weather shifts (high/low pressure systems).</li>
            </ul>
          </GlassCard>

          <GlassCard className="docs-section-card">
            <h2 className="docs-section-heading">
              <Code size={18} className="heading-icon" aria-hidden="true" />
              <span>3. Data Caching & Privacy</span>
            </h2>
            <p className="docs-paragraph">
              Atmos AI values privacy. Geolocation queries are performed entirely client-side using browser-based geolocation telemetry. The coordinates are processed in-memory and never sent to or stored on Atmos AI servers.
            </p>
            <p className="docs-paragraph">
              To improve responsiveness, a local lookup table caches the last 5 successful city queries in the browser's <code>localStorage</code> cache. When the search bar is focused, these values are parsed to enable rapid dashboard resets.
            </p>
          </GlassCard>

          {/* New Section: Project Roadmap */}
          <GlassCard className="docs-section-card docs-roadmap-card">
            <h2 className="docs-section-heading">
              <HelpCircle size={18} className="heading-icon" aria-hidden="true" />
              <span>4. Project Roadmap</span>
            </h2>
            <p className="docs-paragraph">
              Follow the milestones of Atmos AI from initial layout creation to fully production-ready services:
            </p>
            
            <div className="roadmap-timeline">
              <div className="roadmap-item completed">
                <div className="roadmap-marker">
                  <CheckCircle size={16} aria-hidden="true" />
                </div>
                <div className="roadmap-details">
                  <h4 className="roadmap-phase font-mono">Phase 0: UI Foundation & Glassmorphism</h4>
                  <p className="roadmap-desc">Design custom CSS variables, establish the deep-ocean dark theme, and build reusable glassmorphism cards.</p>
                </div>
              </div>

              <div className="roadmap-item completed">
                <div className="roadmap-marker">
                  <CheckCircle size={16} aria-hidden="true" />
                </div>
                <div className="roadmap-details">
                  <h4 className="roadmap-phase font-mono">Phase 1: Layout Auditing & Viewport Constraints</h4>
                  <p className="roadmap-desc">Fix vertical-scrollbar-induced horizontal overflow, enforce responsive flex grid systems, and implement mobile layouts.</p>
                </div>
              </div>

              <div className="roadmap-item completed">
                <div className="roadmap-marker">
                  <CheckCircle size={16} aria-hidden="true" />
                </div>
                <div className="roadmap-details">
                  <h4 className="roadmap-phase font-mono">Phase 2: WeatherAPI Integration</h4>
                  <p className="roadmap-desc">Establish secure Vite environment endpoints, create normalizeWeather, and create custom state hooks with local storage caches.</p>
                </div>
              </div>

              <div className="roadmap-item completed">
                <div className="roadmap-marker">
                  <CheckCircle size={16} aria-hidden="true" />
                </div>
                <div className="roadmap-details">
                  <h4 className="roadmap-phase font-mono">Phase 3: Product Polish & Navigation</h4>
                  <p className="roadmap-desc">Integrate React Router routing, debounced autocomplete suggestions, browser location lookup, and detailed static pages.</p>
                </div>
              </div>

              <div className="roadmap-item planned">
                <div className="roadmap-marker">
                  <span className="planned-dot"></span>
                </div>
                <div className="roadmap-details">
                  <h4 className="roadmap-phase font-mono">Phase 4: Real-time Radar Maps</h4>
                  <p className="roadmap-desc">Implement precipitation, wind vectors, and severe warning overlays using Mapbox/Leaflet GL APIs.</p>
                </div>
              </div>

              <div className="roadmap-item planned">
                <div className="roadmap-marker">
                  <span className="planned-dot"></span>
                </div>
                <div className="roadmap-details">
                  <h4 className="roadmap-phase font-mono">Phase 5: Gemini AI Meteorological Assistant</h4>
                  <p className="roadmap-desc">Deploy LLM-powered context-aware assistant for personalized clothing, hiking, jogging, and travel forecasts.</p>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Right Side: Sidebar FAQ */}
        <div className="docs-sidebar">
          <GlassCard className="sidebar-faq-card">
            <h3 className="sidebar-title">Quick FAQ</h3>
            
            <div className="faq-item">
              <h4 className="faq-question">Why does the search bar show recent searches?</h4>
              <p className="faq-answer">To minimize typing friction. The 5 most recent cities are saved locally in the browser so you can trigger them with a single click.</p>
            </div>

            <div className="faq-item">
              <h4 className="faq-question">What is US-EPA Air Quality Index?</h4>
              <p className="faq-answer">It is a standard scale from 1 (Good) to 6 (Hazardous) mapping particulate concentrations to guide respiratory precautions.</p>
            </div>

            <div className="faq-item">
              <h4 className="faq-question">How is the wind compass computed?</h4>
              <p className="faq-answer">We map the wind degrees (0-360) retrieved from WeatherAPI into CSS transform variables to dynamically rotate the compass indicator.</p>
            </div>
          </GlassCard>
        </div>
      </div>
    </motion.div>
  );
};

export default DocsView;
