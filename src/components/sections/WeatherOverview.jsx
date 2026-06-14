import { createElement } from 'react';
import GlassCard from '../common/GlassCard';
import { mapConditionToIcon } from '../../services/weatherService';

const WeatherOverview = ({ data }) => {
  if (!data) return null;

  const { location, current, daily } = data;
  const dateStr = new Date(location.localtime.replace(/-/g, '/')).toLocaleDateString([], { 
    weekday: 'long', 
    month: 'short', 
    day: 'numeric' 
  });

  // Get mapped weather icon component (lowercase variable prevents ESLint warning)
  const weatherIconComponent = mapConditionToIcon(current.conditionCode, current.isNight);

  // Today's forecast high and low bounds
  const todayForecast = daily[0] || { min: current.temp - 4, max: current.temp + 4 };

  // Format latitude/longitude labels
  const latStr = `${Math.abs(location.lat).toFixed(4)}° ${location.lat >= 0 ? 'N' : 'S'}`;
  const lonStr = `${Math.abs(location.lon).toFixed(4)}° ${location.lon >= 0 ? 'E' : 'W'}`;

  return (
    <GlassCard className="weather-overview-card" delay={0.1}>
      {/* Date and Location Header */}
      <div className="overview-header">
        <div>
          <span className="overview-date">{dateStr}</span>
          <h2 className="overview-city">{location.name}</h2>
          <span className="overview-country">{location.country}</span>
        </div>
        <div className="coordinates-badge">
          <span>{latStr}, {lonStr}</span>
        </div>
      </div>

      {/* Main Temperature and Icon Display */}
      <div className="overview-temp-display-wrapper">
        {createElement(weatherIconComponent, { size: 120, className: "condition-icon-primary", "aria-hidden": "true" })}
        <h1 className="overview-temp">{current.temp}<span className="temp-degree">°</span></h1>
      </div>

      {/* Weather status and feels like */}
      <div className="overview-status-row">
        <span className="condition-status">{current.conditionText}</span>
        <span className="condition-divider">•</span>
        <span className="condition-feels">Feels like {current.feelsLike}°</span>
      </div>

      {/* Temperature bounds & quick metrics */}
      <div className="overview-footer-stats">
        <div className="stat-pill">
          <span className="stat-label">High</span>
          <span className="stat-val font-mono">{todayForecast.max}°</span>
        </div>
        <div className="stat-pill">
          <span className="stat-label">Low</span>
          <span className="stat-val font-mono">{todayForecast.min}°</span>
        </div>
        <div className="stat-pill">
          <span className="stat-label">Humidity</span>
          <span className="stat-val font-mono">{current.humidity}%</span>
        </div>
      </div>
    </GlassCard>
  );
};

export default WeatherOverview;
