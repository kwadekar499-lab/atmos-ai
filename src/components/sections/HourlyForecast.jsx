import GlassCard from '../common/GlassCard';
import { mapConditionToIcon } from '../../services/weatherService';

const HourlyForecast = ({ data }) => {
  if (!data) return null;

  const { location, hourly } = data;

  // Find local current epoch time (relative to location localtime)
  const localEpoch = new Date(location.localtime.replace(/-/g, '/')).getTime() / 1000;

  // Find index of first hourly forecast block after/equal to local epoch minus 30 mins (to capture current hour)
  const startIdx = hourly.findIndex(h => h.epoch >= localEpoch - 1800);

  // Slice next 12 hours from the combined 48-hour dataset
  const next12Hours = hourly.slice(startIdx >= 0 ? startIdx : 0, (startIdx >= 0 ? startIdx : 0) + 12);

  return (
    <GlassCard className="hourly-forecast-card" delay={0.2}>
      <h3 className="section-title">Hourly Forecast</h3>
      <div className="hourly-scroll-container">
        {next12Hours.map((item, idx) => {
          const IconComponent = mapConditionToIcon(item.conditionCode, item.isNight);
          
          // Formats display time: if first item, render "Now"
          const displayTime = idx === 0 ? 'Now' : item.time;

          return (
            <div key={idx} className="hourly-item">
              <span className="hourly-time">{displayTime}</span>
              <div className="hourly-icon-wrapper">
                <IconComponent 
                  size={24} 
                  className={`hourly-icon ${item.isNight ? 'night' : 'day'} ${item.pop > 50 ? 'rainy' : ''}`} 
                  aria-hidden="true"
                />
                {item.pop > 0 && (
                  <span className="hourly-pop font-mono">{item.pop}%</span>
                )}
              </div>
              <span className="hourly-temp font-mono">{item.temp}°</span>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
};

export default HourlyForecast;
