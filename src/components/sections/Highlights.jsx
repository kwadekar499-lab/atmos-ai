import GlassCard from '../common/GlassCard';
import { Sun, Wind, Sunset, Activity, Droplets, Eye, Navigation } from 'lucide-react';
import { getUVCategory, getAQICategory } from '../../utils/formatters';

const Highlights = ({ data }) => {
  if (!data) return null;

  const { current, sunrise, sunset } = data;

  // Approximate dew point using Magnus-Tetens approximation
  const dewPoint = Math.round(current.temp - ((100 - current.humidity) / 5));

  // Determine qualitative humidity description
  const getHumidityDesc = (hum) => {
    if (hum < 30) return 'Very Dry';
    if (hum < 55) return 'Comfortable';
    if (hum < 70) return 'Sticky';
    return 'Humid';
  };

  // Maps wind direction string to rotation degrees
  const getWindRotation = (dir) => {
    const dirs = {
      N: 0, NNE: 22.5, NE: 45, ENE: 67.5,
      E: 90, ESE: 112.5, SE: 135, SSE: 157.5,
      S: 180, SSW: 202.5, SW: 225, WSW: 247.5,
      W: 270, WNW: 292.5, NW: 315, NNW: 337.5
    };
    // Lucide Navigation icon points NE (45deg) by default, adjust rotation
    return (dirs[dir.toUpperCase()] || 0) - 45;
  };

  const uvCat = getUVCategory(current.uv);
  const aqiCat = getAQICategory(current.aqi);

  // Position indicator for EPA AQI index (1-6 scale mapped to 0-100%)
  const aqiPosition = ((current.aqi - 1) / 5) * 100;

  return (
    <div className="highlights-section">
      <h3 className="section-title">Today's Highlights</h3>
      
      <div className="highlights-grid">
        {/* UV Index */}
        <GlassCard className="highlight-widget" delay={0.3}>
          <div className="widget-header">
            <Sun size={16} className="widget-icon text-muted" aria-hidden="true" />
            <span className="widget-label">UV Index</span>
          </div>
          <div className="widget-main">
            <span className="widget-value">{current.uv}</span>
            <span className="widget-subtitle">{uvCat.label}</span>
          </div>
          <div className="widget-footer uv-bar-container">
            <div className="uv-bar-track">
              <div className="uv-bar-indicator" style={{ left: `${Math.min(100, (current.uv / 11) * 100)}%` }}></div>
            </div>
            <span className="uv-footer-desc">{uvCat.label} protection required.</span>
          </div>
        </GlassCard>

        {/* Wind Status */}
        <GlassCard className="highlight-widget" delay={0.35}>
          <div className="widget-header">
            <Wind size={16} className="widget-icon text-muted" aria-hidden="true" />
            <span className="widget-label">Wind Status</span>
          </div>
          <div className="widget-main wind-container">
            <div>
              <span className="widget-value font-mono">{current.windSpeed}</span>
              <span className="widget-unit">km/h</span>
            </div>
            <div className="compass-wrapper">
              <Navigation 
                className="compass-needle" 
                size={20} 
                style={{ transform: `rotate(${getWindRotation(current.windDir)}deg)` }} 
                aria-hidden="true"
              />
              <span className="compass-dir font-mono">{current.windDir}</span>
            </div>
          </div>
          <div className="widget-footer">
            <span className="footer-details">Gusts up to <strong className="font-mono">{current.windGust} km/h</strong></span>
          </div>
        </GlassCard>

        {/* Sunrise & Sunset */}
        <GlassCard className="highlight-widget" delay={0.4}>
          <div className="widget-header">
            <Sunset size={16} className="widget-icon text-muted" aria-hidden="true" />
            <span className="widget-label">Sunrise & Sunset</span>
          </div>
          <div className="widget-main sunrise-sunset-container">
            <svg viewBox="0 0 100 40" className="sun-arc-svg" aria-hidden="true">
              <path d="M 10 35 Q 50 5 90 35" fill="none" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="2" strokeDasharray="3,3" />
              {/* Position sun middle-right by default */}
              <circle cx="68" cy="16" r="4" fill="var(--color-warning)" filter="drop-shadow(0 0 4px rgba(245, 158, 11, 0.6))" />
              <line x1="5" y1="35" x2="95" y2="35" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
            </svg>
            <div className="sunrise-sunset-times">
              <div className="time-node">
                <span className="time-label">Sunrise</span>
                <span className="time-val font-mono">{sunrise}</span>
              </div>
              <div className="time-node">
                <span className="time-label">Sunset</span>
                <span className="time-val font-mono">{sunset}</span>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Air Quality */}
        <GlassCard className="highlight-widget" delay={0.45}>
          <div className="widget-header">
            <Activity size={16} className="widget-icon text-muted" aria-hidden="true" />
            <span className="widget-label">Air Quality</span>
          </div>
          <div className="widget-main">
            <span className="widget-value">{current.pm2_5}</span>
            <span className="widget-subtitle" style={{ color: aqiCat.color }}>{aqiCat.label}</span>
          </div>
          <div className="widget-footer aqi-scale-container">
            <div className="aqi-track">
              <div className="aqi-indicator" style={{ left: `${aqiPosition}%`, backgroundColor: aqiCat.color, boxShadow: `0 0 6px ${aqiCat.color}` }}></div>
            </div>
            <span className="aqi-footer-desc">{aqiCat.desc}</span>
          </div>
        </GlassCard>

        {/* Humidity & Dew Point */}
        <GlassCard className="highlight-widget" delay={0.5}>
          <div className="widget-header">
            <Droplets size={16} className="widget-icon text-muted" aria-hidden="true" />
            <span className="widget-label">Humidity</span>
          </div>
          <div className="widget-main">
            <span className="widget-value font-mono">{current.humidity}%</span>
            <span className="widget-subtitle">{getHumidityDesc(current.humidity)}</span>
          </div>
          <div className="widget-footer humidity-footer">
            <div className="humidity-progress">
              <div className="humidity-fill" style={{ width: `${current.humidity}%` }}></div>
            </div>
            <span className="footer-details">The dew point is <strong className="font-mono">{dewPoint}°C</strong> right now.</span>
          </div>
        </GlassCard>

        {/* Visibility & Pressure */}
        <GlassCard className="highlight-widget" delay={0.55}>
          <div className="widget-header">
            <Eye size={16} className="widget-icon text-muted" aria-hidden="true" />
            <span className="widget-label">Visibility</span>
          </div>
          <div className="widget-main visibility-container">
            <span className="widget-value font-mono">{current.visibility} <span className="value-label-inline">km</span></span>
            <span className="widget-subtitle">{current.visibility >= 10 ? 'Perfect visibility' : 'Hazy air'}</span>
          </div>
          <div className="widget-footer pressure-footer">
            <span className="pressure-val font-mono">{current.pressure} hPa</span>
            <span className="pressure-trend">Steady</span>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default Highlights;
