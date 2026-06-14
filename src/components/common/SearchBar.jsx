import { useState, useEffect, useRef } from 'react';
import { Search, LocateFixed, Clock, MapPin, Loader2 } from 'lucide-react';
import { getSuggestions } from '../../services/weatherService';

const SearchBar = ({ onSearch, onLocationClick }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [isSuggestionsLoading, setIsSuggestionsLoading] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  
  const containerRef = useRef(null);

  // Determine shortcut text based on platform
  const isMac = typeof window !== 'undefined' && 
    (navigator.platform || '').toUpperCase().indexOf('MAC') >= 0;
  const shortcutText = isMac ? '⌘K' : 'Ctrl+K';

  // Load recent searches when dropdown opens or on mount
  const refreshRecentSearches = () => {
    try {
      const raw = localStorage.getItem('atmos_search_history');
      setRecentSearches(raw ? JSON.parse(raw) : []);
    } catch (e) {
      console.error('Failed to load search history:', e);
    }
  };

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcut listener (Ctrl+K or Cmd+K) to focus search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const input = containerRef.current?.querySelector('.search-input');
        if (input) input.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Debounced suggestion fetching
  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < 2) {
      return;
    }

    const delayDebounce = setTimeout(async () => {
      setIsSuggestionsLoading(true);
      try {
        const res = await getSuggestions(trimmed);
        setSuggestions(res);
        setFocusedIndex(-1);
      } catch (err) {
        console.error(err);
        setSuggestions([]);
        setFocusedIndex(-1);
      } finally {
        setIsSuggestionsLoading(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) {
      setHasError(true);
      setTimeout(() => setHasError(false), 500); // Reset shake state after 500ms
      return;
    }
    setIsOpen(false);
    setFocusedIndex(-1);
    if (onSearch) {
      onSearch(trimmed);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    setIsOpen(true);
    setFocusedIndex(-1);
    refreshRecentSearches();
  };

  const handleSelect = (cityName) => {
    setQuery(cityName);
    setIsOpen(false);
    setFocusedIndex(-1);
    if (onSearch) {
      onSearch(cityName);
    }
  };

  const handleInputKeyDown = (e) => {
    if (!isOpen) return;

    const itemsList = query.trim().length < 2 ? recentSearches : suggestions;
    if (itemsList.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex(prev => (prev + 1) % itemsList.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex(prev => (prev - 1 + itemsList.length) % itemsList.length);
    } else if (e.key === 'Enter') {
      if (focusedIndex >= 0 && focusedIndex < itemsList.length) {
        e.preventDefault();
        const selected = query.trim().length < 2 ? itemsList[focusedIndex] : itemsList[focusedIndex].name;
        handleSelect(selected);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
      setFocusedIndex(-1);
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`search-container ${isFocused ? 'focused' : ''} ${hasError ? 'error-shake' : ''}`}
    >
      <form onSubmit={handleSubmit} className="search-form">
        <button type="submit" className="search-submit-btn" aria-label="Search weather">
          <Search className="search-icon" size={18} aria-hidden="true" />
        </button>
        <input
          type="text"
          placeholder="Search city, airport or region..."
          value={query}
          onChange={(e) => {
            const val = e.target.value;
            setQuery(val);
            setIsOpen(true);
            setFocusedIndex(-1);
            if (val.trim().length < 2) {
              setSuggestions([]);
            }
          }}
          onFocus={handleFocus}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleInputKeyDown}
          className="search-input"
          aria-label="Search city, airport or region"
          aria-autocomplete="list"
          aria-controls="search-suggestions-list"
          aria-expanded={isOpen}
        />
        <div className="search-shortcut">
          <kbd>{shortcutText}</kbd>
        </div>
      </form>

      <button
        type="button"
        onClick={onLocationClick}
        className="location-btn"
        title="Use Current Location"
        aria-label="Use current location"
      >
        <LocateFixed size={18} aria-hidden="true" />
        <span className="location-btn-text">Location</span>
      </button>

      {/* Floating Suggestions Panel */}
      {isOpen && (
        <div className="search-dropdown-panel glass-card">
          {query.trim().length < 2 ? (
            <div className="dropdown-section">
              <div className="dropdown-section-title">Recent Searches</div>
              {recentSearches.length === 0 ? (
                <div className="dropdown-empty">No recent searches</div>
              ) : (
                <ul 
                  id="search-suggestions-list" 
                  className="dropdown-list" 
                  role="listbox" 
                  aria-label="Search suggestions"
                >
                  {recentSearches.map((city, idx) => (
                    <li 
                      key={idx} 
                      className={`dropdown-item ${focusedIndex === idx ? 'keyboard-focused' : ''}`} 
                      onClick={() => handleSelect(city)}
                      role="option"
                      aria-selected={focusedIndex === idx}
                    >
                      <Clock size={14} className="dropdown-item-icon" aria-hidden="true" />
                      <span>{city}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <div className="dropdown-section">
              <div className="dropdown-section-title">Matching Locations</div>
              {isSuggestionsLoading ? (
                <div className="dropdown-loading">
                  <Loader2 size={16} className="dropdown-spinner" aria-hidden="true" />
                  <span>Scanning meteorological stations...</span>
                </div>
              ) : suggestions.length === 0 ? (
                <div className="dropdown-empty">No matching stations found</div>
              ) : (
                <ul 
                  id="search-suggestions-list" 
                  className="dropdown-list" 
                  role="listbox" 
                  aria-label="Search suggestions"
                >
                  {suggestions.map((item, idx) => (
                    <li 
                      key={idx} 
                      className={`dropdown-item ${focusedIndex === idx ? 'keyboard-focused' : ''}`} 
                      onClick={() => handleSelect(item.name)}
                      role="option"
                      aria-selected={focusedIndex === idx}
                    >
                      <MapPin size={14} className="dropdown-item-icon" aria-hidden="true" />
                      <div className="dropdown-item-details">
                        <span className="dropdown-item-name">{item.name}</span>
                        <span className="dropdown-item-region">
                          {item.region ? `${item.region}, ` : ''}{item.country}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
