import { Sun, Moon, Cloud, CloudSun, CloudMoon, CloudRain, CloudDrizzle, CloudLightning, CloudSnow } from 'lucide-react';
import { API_BASE_URL } from '../constants/config';

/**
 * Maps WeatherAPI condition codes to Lucide icon components.
 * @param {number} code Condition code
 * @param {boolean} isNight Whether it is night time
 * @returns {React.Component}
 */
export const mapConditionToIcon = (code, isNight = false) => {
  // Sunny/Clear
  if (code === 1000) return isNight ? Moon : Sun;
  // Partly Cloudy
  if (code === 1003) return isNight ? CloudMoon : CloudSun;
  // Cloudy, Overcast, Mist, Fog
  if ([1006, 1009, 1030, 1135, 1147].includes(code)) return Cloud;
  // Drizzle / Light Rain / Light Shower
  if ([1063, 1150, 1153, 1180, 1183, 1240].includes(code)) return CloudDrizzle;
  // Heavy / Moderate Rain
  if ([1186, 1189, 1192, 1195, 1243, 1246].includes(code)) return CloudRain;
  // Lightning / Thunderstorms
  if ([1087, 1273, 1276, 1279, 1282].includes(code)) return CloudLightning;
  // Snow / Sleet
  if ([1066, 1069, 1072, 1114, 1117, 1201, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258].includes(code)) return CloudSnow;
  
  return Cloud; // Fallback
};

/**
 * Maps WeatherAPI condition codes to theme color classes.
 * @param {number} code Condition code
 * @returns {string}
 */
export const mapConditionToClass = (code) => {
  if (code === 1000) return 'day';
  if ([1006, 1009, 1030, 1135, 1147].includes(code)) return 'cloudy';
  if ([1063, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243, 1246, 1273, 1276].includes(code)) return 'rainy';
  if ([1066, 1069, 1072, 1114, 1117, 1201, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258].includes(code)) return 'snowy';
  return 'day';
};

/**
 * Normalizes WeatherAPI raw payload to match UI component requirements.
 * @param {object} data Raw JSON weather data
 * @returns {object} Normalized weather dataset
 */
const normalizeWeatherData = (data) => {
  // Combine today and tomorrow's hours to allow seamless 12-hour timelines near day transitions
  const todayHours = data.forecast.forecastday[0].hour;
  const tomorrowHours = data.forecast.forecastday[1] ? data.forecast.forecastday[1].hour : [];
  const combinedHours = [...todayHours, ...tomorrowHours];

  const hourly = combinedHours.map(h => {
    const timeDate = new Date(h.time.replace(/-/g, '/'));
    return {
      time: timeDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      hourNum: timeDate.getHours(),
      epoch: h.time_epoch,
      temp: Math.round(h.temp_c),
      conditionCode: h.condition.code,
      pop: h.chance_of_rain || h.chance_of_snow || 0,
      isNight: h.is_day === 0
    };
  });

  // Normalize Daily forecast (WeatherAPI Free provides up to 3 days, paid supports more)
  const daily = data.forecast.forecastday.map((day, index) => {
    const date = new Date(day.date);
    const dayName = index === 0 ? 'Today' : date.toLocaleDateString([], { weekday: 'long' });
    
    // Scale ranges visually
    const barLeft = `${12 + index * 4}%`;
    const barWidth = `${45 + (index % 2) * 8}%`;

    return {
      day: dayName,
      conditionCode: day.day.condition.code,
      min: Math.round(day.day.mintemp_c),
      max: Math.round(day.day.maxtemp_c),
      iconClass: mapConditionToClass(day.day.condition.code),
      barLeft,
      barWidth
    };
  });

  const sunrise = data.forecast.forecastday[0].astro.sunrise;
  const sunset = data.forecast.forecastday[0].astro.sunset;
  const epaIndex = data.current.air_quality['us-epa-index'] || 1;
  const pm2_5 = data.current.air_quality.pm2_5 || 0;

  return {
    location: {
      name: data.location.name,
      country: data.location.country,
      lat: Number(data.location.lat.toFixed(4)),
      lon: Number(data.location.lon.toFixed(4)),
      localtime: data.location.localtime
    },
    current: {
      temp: Math.round(data.current.temp_c),
      feelsLike: Math.round(data.current.feelslike_c),
      conditionText: data.current.condition.text,
      conditionCode: data.current.condition.code,
      humidity: data.current.humidity,
      windSpeed: Math.round(data.current.wind_kph),
      windGust: Math.round(data.current.gust_kph || data.current.wind_kph * 1.2),
      windDir: data.current.wind_dir,
      uv: Math.round(data.current.uv),
      visibility: Math.round(data.current.vis_km),
      pressure: Math.round(data.current.pressure_mb),
      aqi: epaIndex, // US-EPA standard 1-6
      pm2_5: Math.round(pm2_5),
      isNight: data.current.is_day === 0
    },
    sunrise,
    sunset,
    hourly,
    daily
  };
};

/**
 * Fetches location search/autocomplete suggestions from WeatherAPI.
 * @param {string} query The input query prefix
 * @returns {Promise<Array>} List of matching suggestions
 */
export const getSuggestions = async (query) => {
  if (!query || query.trim().length < 2) return [];

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  if (!apiKey || apiKey === 'your_weatherapi_key_here') {
    return [];
  }

  const url = `${API_BASE_URL}/search.json?key=${apiKey}&q=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url);
    if (!response.ok) return [];
    const data = await response.json();
    return data.map(item => ({
      name: item.name,
      region: item.region,
      country: item.country,
      lat: item.lat,
      lon: item.lon,
      fullName: `${item.name}${item.region ? ', ' + item.region : ''}, ${item.country}`
    }));
  } catch (error) {
    console.error('Failed to fetch autocomplete suggestions:', error);
    return [];
  }
};

/**
 * Exposes a clean endpoint to fetch and normalize weather.
 * @param {string} city City name
 * @returns {Promise<object>} Normalized weather data promise
 */
export const getWeather = async (city) => {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  if (!apiKey || apiKey === 'your_weatherapi_key_here') {
    throw new Error('API Key Missing: Please configure VITE_WEATHER_API_KEY in your .env file.');
  }

  const url = `${API_BASE_URL}/forecast.json?key=${apiKey}&q=${encodeURIComponent(city)}&days=7&aqi=yes&alerts=no`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      const errorMsg = errData?.error?.message || `HTTP Error ${response.status}`;
      throw new Error(errorMsg);
    }
    const data = await response.json();
    return normalizeWeatherData(data);
  } catch (error) {
    if (error.message.includes('API Key Missing')) {
      throw error;
    }
    throw new Error(error.message || 'Connection failed: Unable to fetch weather data.', { cause: error });
  }
};
