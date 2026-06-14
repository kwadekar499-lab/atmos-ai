import { motion } from 'framer-motion';
import GlassCard from '../common/GlassCard';
import { Navigation, Compass, CloudRain, ShieldAlert, ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const RadarComingSoon = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="coming-soon-container"
    >
      <div className="view-back-bar">
        <Link to="/" className="back-link">
          <ArrowRight className="back-arrow-icon" size={16} aria-hidden="true" />
          <span>Back to Telemetry Dashboard</span>
        </Link>
      </div>

      <header className="view-header">
        <div className="view-icon-title">
          <Navigation className="view-title-icon rotate-45" size={28} aria-hidden="true" />
          <h1 className="view-title">Dynamic Radar Maps</h1>
        </div>
        <p className="view-subtitle font-mono">Real-time Weather Vector Mapping — Launching Q4 2026</p>
      </header>

      <div className="coming-soon-grid">
        {/* Left Column: Micro-animation Card */}
        <div className="animation-column">
          <GlassCard className="animation-display-card">
            {/* Spinning SVG Radar */}
            <div className="radar-animation-wrapper" aria-hidden="true">
              <div className="radar-sweep"></div>
              <svg className="radar-svg" viewBox="0 0 200 200">
                {/* Concentric Circles */}
                <circle cx="100" cy="100" r="90" className="radar-circle" />
                <circle cx="100" cy="100" r="60" className="radar-circle" />
                <circle cx="100" cy="100" r="30" className="radar-circle" />
                
                {/* Crosshairs */}
                <line x1="10" y1="100" x2="190" y2="100" className="radar-axis" />
                <line x1="100" y1="10" x2="100" y2="190" className="radar-axis" />
                
                {/* Fading Radar Target Blips */}
                <circle cx="130" cy="70" r="4" className="radar-blip blip-1" />
                <circle cx="60" cy="140" r="3" className="radar-blip blip-2" />
                <circle cx="85" cy="65" r="5" className="radar-blip blip-3" />
              </svg>
            </div>
            
            <div className="radar-status-badge font-mono">
              <span className="pulse-dot"></span>
              <span>SIMULATING DOPPLER SCAN...</span>
            </div>
          </GlassCard>
        </div>

        {/* Right Column: Planned Features & Roadmap */}
        <div className="details-column">
          <GlassCard className="details-card">
            <h3 className="section-subtitle-cs">Planned Vector Streams</h3>
            
            <div className="feature-item-cs">
              <CloudRain size={20} className="feature-icon-cs" aria-hidden="true" />
              <div className="feature-info-cs">
                <h4 className="feature-title-cs">1. Precipitation & Storm Cell Tracking</h4>
                <p className="feature-desc-cs">
                  High-frequency radar overlays tracing rain intensity (dBZ), snow accumulation, and sleet mixtures with smooth framerate panning.
                </p>
              </div>
            </div>

            <div className="feature-item-cs">
              <Compass size={20} className="feature-icon-cs" aria-hidden="true" />
              <div className="feature-info-cs">
                <h4 className="feature-title-cs">2. Wind Velocity Vector Fields</h4>
                <p className="feature-desc-cs">
                  Animated aerodynamic particles showcasing local wind direction, speed gradients, and upper-level jetstream vectors.
                </p>
              </div>
            </div>

            <div className="feature-item-cs">
              <ShieldAlert size={20} className="feature-icon-cs" aria-hidden="true" />
              <div className="feature-info-cs">
                <h4 className="feature-title-cs">3. Local Severe Weather Polygons</h4>
                <p className="feature-desc-cs">
                  Immediate alerts rendering regional warning polygons for flash floods, severe thunderstorms, and tornado cells.
                </p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="technical-card">
            <h3 className="technical-title">
              <Zap size={16} className="tech-icon" aria-hidden="true" />
              <span>Future Capabilities</span>
            </h3>
            <p className="technical-desc">
              We plan to integrate <strong>Mapbox GL JS</strong> vector tiles and <strong>Leaflet</strong> canvas layers to support responsive WebGL 3D rotating globes. Interactive timelines will allow users to scrub through 24-hour historical loops and 3-hour prospective forecasts.
            </p>
          </GlassCard>
        </div>
      </div>
    </motion.div>
  );
};

export default RadarComingSoon;
