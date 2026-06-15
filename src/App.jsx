import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import SearchBar from './components/common/SearchBar';
import WeatherOverview from './components/sections/WeatherOverview';
import HourlyForecast from './components/sections/HourlyForecast';
import DailyForecast from './components/sections/DailyForecast';
import Highlights from './components/sections/Highlights';
import GlassCard from './components/common/GlassCard';
import useWeather from './hooks/useWeather';
import { DEFAULT_CITY } from './constants/config';
import { AlertCircle, RefreshCw } from 'lucide-react';

// Import polished content views
import DocsView from './components/sections/DocsView';
import ApiView from './components/sections/ApiView';
import PrivacyView from './components/sections/PrivacyView';
import TermsView from './components/sections/TermsView';
import RadarComingSoon from './components/sections/RadarComingSoon';
import AssistantComingSoon from './components/sections/AssistantComingSoon';
import AssistantView from './components/sections/AssistantView';
import NotFoundView from './components/sections/NotFoundView';
import BackToTop from './components/common/BackToTop';

import './styles/global.css';

function App() {
  const location = useLocation();
  const { 
    weatherData, 
    isLoading, 
    error, 
    fetchWeather, 
    fetchWeatherByLocation, 
    spellingSuggestions 
  } = useWeather();

  // Load default city on initial mount
  useEffect(() => {
    fetchWeather(DEFAULT_CITY);
  }, [fetchWeather]);

  const handleSearch = (city) => {
    fetchWeather(city);
  };

  return (
    <div className="app-wrapper">
      {/* Animated Aurora Backdrop */}
      <div className="aurora-container" aria-hidden="true">
        <div className="aurora-blur aurora-1"></div>
        <div className="aurora-blur aurora-2"></div>
        <div className="aurora-blur aurora-3"></div>
      </div>

      <Navbar />

      <main className="app-container">
        <Routes>
          {/* Dashboard Route */}
          <Route path="/" element={
            <>
              {/* Header Hero Section */}
              <Hero 
                locationName={weatherData ? weatherData.location.name : DEFAULT_CITY} 
                conditionText={weatherData ? weatherData.current.conditionText : 'Synchronizing...'} 
              />

              {/* Search Operations Bar */}
              <SearchBar onSearch={handleSearch} onLocationClick={fetchWeatherByLocation} />

              {isLoading ? (
                <div className="layout-centered">
                  <div className="loading-state">
                    <div className="spinner-ring"></div>
                    <p className="loading-text font-mono">Calibrating Atmos Sensors...</p>
                  </div>
                </div>
              ) : error ? (
                <div className="layout-centered">
                  <div className="error-state">
                    <GlassCard className="error-card">
                      <AlertCircle size={40} className="error-icon" />
                      <h3 className="error-heading">Telemetry Offline</h3>
                      <p className="error-desc">{error}</p>
                      
                      {/* Typo Correction spelling suggestions list */}
                      {spellingSuggestions.length > 0 && (
                        <div className="error-suggestions-list">
                          <span className="suggestions-prompt">Did you mean:</span>
                          <div className="suggestions-buttons">
                            {spellingSuggestions.map((item, idx) => (
                              <button 
                                key={idx} 
                                className="suggestion-pill-btn font-mono"
                                onClick={() => handleSearch(item.name)}
                              >
                                {item.fullName}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <button 
                        className="retry-btn" 
                        onClick={() => fetchWeather(DEFAULT_CITY)}
                        aria-label="Retry Connection"
                      >
                        <RefreshCw size={14} className="retry-icon" />
                        <span>Reset to Default ({DEFAULT_CITY})</span>
                      </button>
                    </GlassCard>
                  </div>
                </div>
              ) : weatherData ? (
                /* Master Dashboard Grid */
                <div className="dashboard-grid">
                  {/* Left Column: Core Current Metrics & Extended Forecast */}
                  <div className="main-column">
                    <WeatherOverview data={weatherData} />
                    <DailyForecast data={weatherData} />
                  </div>

                  {/* Right Column: Dynamic Hourly Trends & Detailed Highlights Grid */}
                  <div className="main-column">
                    <HourlyForecast data={weatherData} />
                    <Highlights data={weatherData} />
                  </div>
                </div>
              ) : null}
            </>
          } />

          {/* Full static content pages */}
          <Route path="/docs" element={<DocsView />} />
          <Route path="/api" element={<ApiView />} />
          <Route path="/privacy" element={<PrivacyView />} />
          <Route path="/terms" element={<TermsView />} />

          {/* Coming Soon pages */}
          <Route path="/coming-soon/radar" element={<RadarComingSoon />} />
          <Route path="/coming-soon/assistant" element={<AssistantComingSoon />} />
          <Route path="/assistant" element={<AssistantView weatherData={weatherData} />} />

          {/* Custom 404 Not Found Page */}
          <Route path="*" element={<NotFoundView />} />
        </Routes>
      </main>

      {location.pathname !== '/' && <BackToTop />}
      <Footer />
    </div>
  );
}

export default App;
