import { useState, useCallback } from 'react';
import { getWeather, getSuggestions } from '../services/weatherService';

/**
 * Custom React hook to manage weather data fetching, loading, error and retry states.
 * @returns {object} { weatherData, isLoading, error, fetchWeather, fetchWeatherByLocation, spellingSuggestions }
 */
export const useWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [spellingSuggestions, setSpellingSuggestions] = useState([]);

  /**
   * Caches successfully searched city in localStorage.
   */
  const saveToHistory = useCallback((cityName) => {
    try {
      const key = 'atmos_search_history';
      const raw = localStorage.getItem(key);
      let history = raw ? JSON.parse(raw) : [];

      // Check if it's consecutive duplicate
      if (history.length > 0 && history[0].toLowerCase() === cityName.toLowerCase()) {
        return;
      }

      // Filter out any other instances of this city to ensure uniqueness
      history = history.filter(c => c.toLowerCase() !== cityName.toLowerCase());

      // Prepend the latest search
      history.unshift(cityName);

      // Keep only top 5 recent searches
      history = history.slice(0, 5);

      localStorage.setItem(key, JSON.stringify(history));
    } catch (e) {
      console.error('Failed to update local search history cache:', e);
    }
  }, []);

  /**
   * Fetches weather data for a given city and updates the state.
   */
  const fetchWeather = useCallback(async (city) => {
    if (!city) return;
    
    setIsLoading(true);
    setError(null);
    setSpellingSuggestions([]);
    
    try {
      const data = await getWeather(city);
      setWeatherData(data);
      
      // Save successfully searched city name to search history
      if (data && data.location && data.location.name) {
        saveToHistory(data.location.name);
      }
    } catch (err) {
      let friendlyError = err.message || 'Failed to fetch weather data.';
      if (err.message.includes('API Key Missing') || err.message.includes('API key')) {
        friendlyError = 'System Configuration Error: Weather service configuration issue. Please verify credentials.';
      } else if (err.message.includes('No matching location found')) {
        friendlyError = `Location Not Found: We couldn't find a weather station matching "${city}". Please check the spelling or search for a nearby city.`;
        
        // Fetch typo corrections
        try {
          const suggestions = await getSuggestions(city);
          if (suggestions && suggestions.length > 0) {
            setSpellingSuggestions(suggestions.slice(0, 3));
          }
        } catch (suggestionErr) {
          console.error('Failed to retrieve spelling suggestions:', suggestionErr);
        }
      } else if (err.message.includes('Failed to fetch') || err.message.includes('Network') || err.message.includes('Connection failed')) {
        friendlyError = 'Connection Issue: Unable to reach Atmos telemetry. Please check your network connection and try again.';
      }
      
      setError(friendlyError);
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  }, [saveToHistory]);

  /**
   * Acquires browser geolocation and fetches the local weather.
   */
  const fetchWeatherByLocation = useCallback(async () => {
    if (!navigator.geolocation) {
      setError('Location Access Failed: Geolocation is not supported by your browser.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSpellingSuggestions([]);

    let permissionState = 'prompt';
    try {
      if (navigator.permissions && navigator.permissions.query) {
        const permissionStatus = await navigator.permissions.query({ name: 'geolocation' });
        permissionState = permissionStatus.state;
      }
    } catch (e) {
      console.warn('Permissions API query warning:', e);
    }

    if (permissionState === 'denied') {
      setError('Location Access Denied: Please enable location permissions in your browser settings or search manually.');
      setIsLoading(false);
      return;
    }

    const options = {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: permissionState === 'prompt' ? 60000 : 10000
    };

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const data = await getWeather(`${latitude},${longitude}`);
          setWeatherData(data);
          if (data && data.location && data.location.name) {
            saveToHistory(data.location.name);
          }
        } catch (err) {
          let friendlyError = err.message || 'Failed to fetch weather for your location.';
          if (err.message.includes('API Key Missing') || err.message.includes('API key')) {
            friendlyError = 'System Configuration Error: Weather service configuration issue. Please verify credentials.';
          } else if (err.message.includes('Failed to fetch') || err.message.includes('Network') || err.message.includes('Connection failed')) {
            friendlyError = 'Connection Issue: Unable to reach Atmos telemetry. Please check your network connection and try again.';
          }
          setError(friendlyError);
          setWeatherData(null);
        } finally {
          setIsLoading(false);
        }
      },
      (geoError) => {
        let friendlyMessage = 'Failed to acquire location. Please try searching manually.';
        if (geoError.code === geoError.PERMISSION_DENIED) {
          friendlyMessage = 'Location Access Denied: Please enable location permissions in your browser settings or search manually.';
        } else if (geoError.code === geoError.POSITION_UNAVAILABLE) {
          friendlyMessage = 'Location Unavailable: Network position or GPS sensor is offline. Please search manually.';
        } else if (geoError.code === geoError.TIMEOUT) {
          friendlyMessage = 'Location Request Timeout: The request timed out. Please try again or search manually.';
        }
        setError(friendlyMessage);
        setIsLoading(false);
      },
      options
    );
  }, [saveToHistory]);

  return {
    weatherData,
    isLoading,
    error,
    fetchWeather,
    fetchWeatherByLocation,
    spellingSuggestions
  };
};

export default useWeather;
