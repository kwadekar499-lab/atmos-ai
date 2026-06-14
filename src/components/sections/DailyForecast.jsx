import GlassCard from '../common/GlassCard';
import { mapConditionToIcon } from '../../services/weatherService';

const DailyForecast = ({ data }) => {
  if (!data) return null;

  const { daily } = data;

  return (
    <GlassCard className="daily-forecast-card" delay={0.25}>
      <h3 className="section-title">Forecast Trends</h3>
      <div className="daily-list">
        {daily.map((item, idx) => {
          const IconComponent = mapConditionToIcon(item.conditionCode, false);
          return (
            <div key={idx} className="daily-row">
              <span className="daily-day">{item.day}</span>
              
              <div className="daily-icon-wrapper">
                <IconComponent size={20} className={`daily-icon ${item.iconClass}`} aria-hidden="true" />
              </div>

              <div className="daily-temp-range">
                <span className="daily-temp-min font-mono">{item.min}°</span>
                
                <div className="daily-progress-bar">
                  <div 
                    className="daily-progress-fill" 
                    style={{ left: item.barLeft, width: item.barWidth }}
                  ></div>
                </div>

                <span className="daily-temp-max font-mono">{item.max}°</span>
              </div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
};

export default DailyForecast;
