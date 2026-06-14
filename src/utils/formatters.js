/**
 * Formats a temperature value with unit.
 * @param {number} temp 
 * @returns {string}
 */
export const formatTemp = (temp) => {
  return `${Math.round(temp)}°`;
};

/**
 * Formats a speed value with unit.
 * @param {number} speed 
 * @returns {string}
 */
export const formatWind = (speed) => {
  return `${speed} km/h`;
};

/**
 * Formats pressure in hPa.
 * @param {number} pressure 
 * @returns {string}
 */
export const formatPressure = (pressure) => {
  return `${pressure.toLocaleString()} hPa`;
};

/**
 * Formats a time string or date.
 * @param {Date|string} time 
 * @returns {string}
 */
export const formatTime = (time) => {
  const date = new Date(time);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

/**
 * Formats a full date string: e.g., "Monday, June 15"
 * @param {Date|string} dateVal 
 * @returns {string}
 */
export const formatDate = (dateVal) => {
  const date = new Date(dateVal);
  return date.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });
};

/**
 * Maps UV index to qualitative description.
 * @param {number} index 
 * @returns {{label: string, class: string}}
 */
export const getUVCategory = (index) => {
  if (index <= 2) return { label: 'Low', class: 'uv-low' };
  if (index <= 5) return { label: 'Moderate', class: 'uv-mod' };
  if (index <= 7) return { label: 'High', class: 'uv-high' };
  if (index <= 10) return { label: 'Very High', class: 'uv-vhigh' };
  return { label: 'Extreme', class: 'uv-extreme' };
};

/**
 * Maps Air Quality Index (AQI) to qualitative description.
 * @param {number} aqi 
 * @returns {{label: string, color: string}}
 */
export const getAQICategory = (aqi) => {
  // Handle US-EPA standard index (1-6)
  if (aqi >= 1 && aqi <= 6) {
    const epaMap = {
      1: { label: 'Good', color: 'var(--color-success)', desc: 'Ideal air quality for everyone.' },
      2: { label: 'Moderate', color: 'var(--color-warning)', desc: 'Acceptable air quality for most.' },
      3: { label: 'Moderate-Poor', color: 'var(--color-warning)', desc: 'Sensitive groups may feel effects.' },
      4: { label: 'Unhealthy', color: 'var(--color-error)', desc: 'Health effects visible to all.' },
      5: { label: 'Very Unhealthy', color: 'var(--color-error)', desc: 'Health alert: serious effects.' },
      6: { label: 'Hazardous', color: 'var(--color-error)', desc: 'Emergency health warnings.' }
    };
    return epaMap[aqi];
  }
  
  // Fallback for standard 0-500 scale
  if (aqi <= 50) return { label: 'Good', color: 'var(--color-success)', desc: 'Ideal air quality for everyone.' };
  if (aqi <= 100) return { label: 'Moderate', color: 'var(--color-warning)', desc: 'Acceptable air quality for most.' };
  return { label: 'Poor', color: 'var(--color-error)', desc: 'Unhealthy air conditions.' };
};
