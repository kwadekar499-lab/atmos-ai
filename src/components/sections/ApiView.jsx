import { useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../common/GlassCard';
import { Terminal, Cpu, Key, RefreshCw, Copy, Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ApiView = () => {
  const [activeTab, setActiveTab] = useState('curl');
  const [copied, setCopied] = useState(false);

  const codeSnippets = {
    curl: `curl -X GET "https://api.atmos-ai.com/v1/weather?q=Tokyo" \\
  -H "Authorization: Bearer ATMOS_SEC_KEY_MOCK"`,
    js: `// Fetch Atmospheric Telemetry using ES6
const getWeatherData = async (location) => {
  const response = await fetch(\`https://api.atmos-ai.com/v1/weather?q=\${encodeURIComponent(location)}\`, {
    headers: {
      'Authorization': 'Bearer ATMOS_SEC_KEY_MOCK'
    }
  });
  
  if (!response.ok) throw new Error('Telemetry offline');
  return await response.json();
};

getWeatherData('Tokyo').then(console.log);`,
    python: `# Python 3.x requests implementation
import requests

url = "https://api.atmos-ai.com/v1/weather"
headers = {
    "Authorization": "Bearer ATMOS_SEC_KEY_MOCK"
}
params = {
    "q": "Tokyo"
}

response = requests.get(url, headers=headers, params=params)
if response.status_code == 200:
    data = response.json()
    print(f"Ambient Temperature: {data['current']['temp']}°C")
else:
    print("Telemetry fetch failed.")`
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="api-view-container"
    >
      {/* Visually hidden screen reader live region for copy success announcements */}
      <div className="sr-only" aria-live="polite">
        {copied ? 'Code snippet copied successfully' : ''}
      </div>

      <div className="view-back-bar">
        <Link to="/" className="back-link">
          <ArrowRight className="back-arrow-icon" size={16} aria-hidden="true" />
          <span>Back to Telemetry Dashboard</span>
        </Link>
      </div>

      <header className="view-header">
        <div className="view-icon-title">
          <Cpu className="view-title-icon" size={28} aria-hidden="true" />
          <h1 className="view-title">Developer API Integration</h1>
        </div>
        <p className="view-subtitle font-mono">Connect your platforms to the Atmos AI Data Stream</p>
      </header>

      {/* Architecture Flow Diagram Card */}
      <GlassCard className="architecture-card">
        <h3 className="arch-title">
          <Terminal size={16} className="title-icon" aria-hidden="true" />
          <span>Data Pipeline Architecture Flow</span>
        </h3>
        
        <div className="flow-diagram-container" aria-label="Data flow diagram from React UI down to WeatherAPI service">
          <div className="flow-node">
            <span className="node-title font-mono">React Core</span>
            <span className="node-desc">Render & UI Shell</span>
          </div>
          
          <div className="flow-arrow font-mono" aria-hidden="true">➔</div>
          
          <div className="flow-node highlight">
            <span className="node-title font-mono">useWeather() Hook</span>
            <span className="node-desc">State & Cache Orchestrator</span>
          </div>
          
          <div className="flow-arrow font-mono" aria-hidden="true">➔</div>
          
          <div className="flow-node">
            <span className="node-title font-mono">weatherService</span>
            <span className="node-desc">Normalizer & Mapper</span>
          </div>
          
          <div className="flow-arrow font-mono" aria-hidden="true">➔</div>
          
          <div className="flow-node gateway">
            <span className="node-title font-mono">WeatherAPI Core</span>
            <span className="node-desc">REST Telemetry API</span>
          </div>
          
          <div className="flow-arrow font-mono" aria-hidden="true">➔</div>
          
          <div className="flow-node components">
            <span className="node-title font-mono">UI Widgets</span>
            <span className="node-desc">Overview, Charts, Compass</span>
          </div>
        </div>
        
        <p className="arch-caption">
          <strong>Flow Explanation</strong>: The application mounts and invokes the custom <code>useWeather()</code> React hook. The hook communicates via the stateless <code>weatherService</code> utility wrapper to query WeatherAPI. The returned raw data is normalized, mapped to SVG assets, and piped directly into the focused UI Dashboard cards.
        </p>
      </GlassCard>

      <div className="docs-grid">
        {/* Left Column: API parameters */}
        <div className="docs-main-content">
          <GlassCard className="docs-section-card">
            <h2 className="docs-section-heading">
              <Key size={18} className="heading-icon" aria-hidden="true" />
              <span>Authentication & Limitations</span>
            </h2>
            <p className="docs-paragraph">
              All REST API calls to Atmos AI require authorization headers containing a bearer token. Generate your secure key from your Atmos Portal settings.
            </p>
            <div className="alert-message warning">
              <strong>Rate Limit Warning</strong>: Free Sandbox API requests are throttled at <strong>10,000 queries per month</strong>. For high-volume polling thresholds, contact our meteorological solutions desk to unlock custom tiers.
            </div>
          </GlassCard>

          <GlassCard className="docs-section-card">
            <h2 className="docs-section-heading">
              <RefreshCw size={18} className="heading-icon" aria-hidden="true" />
              <span>Query Endpoint Specification</span>
            </h2>
            <p className="docs-paragraph">
              Query current condition metrics and 7-day extended forecast tables in a single HTTP request:
            </p>
            <div className="endpoint-banner font-mono">
              <span className="method-badge get">GET</span>
              <span className="endpoint-path">/v1/weather</span>
            </div>
            
            <table className="api-param-table">
              <thead>
                <tr>
                  <th>Parameter</th>
                  <th>Type</th>
                  <th>Required</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="param-name font-mono">q</td>
                  <td>String</td>
                  <td>Yes</td>
                  <td>City name, ZIP code, or latitude/longitude coordinates (e.g. <code>q=48.856,2.352</code>).</td>
                </tr>
                <tr>
                  <td className="param-name font-mono">days</td>
                  <td>Integer</td>
                  <td>No</td>
                  <td>Forecast duration range. Default is <code>7</code>.</td>
                </tr>
                <tr>
                  <td className="param-name font-mono">aqi</td>
                  <td>String</td>
                  <td>No</td>
                  <td>Set to <code>yes</code> to fetch US-EPA indices. Default is <code>yes</code>.</td>
                </tr>
              </tbody>
            </table>
          </GlassCard>
        </div>

        {/* Right Column: Code Snippets & Response Mock */}
        <div className="docs-sidebar">
          <GlassCard className="api-code-card">
            <div className="code-header">
              <span className="code-title font-mono">Request Snippet</span>
              <button 
                className="copy-btn" 
                onClick={handleCopy} 
                title="Copy code"
                aria-label="Copy code snippet"
              >
                {copied ? <Check size={14} className="copied" aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
                <span>{copied ? '✓ Copied!' : 'Copy'}</span>
              </button>
            </div>
            
            <div className="code-tabs">
              <button 
                className={`code-tab ${activeTab === 'curl' ? 'active' : ''}`}
                onClick={() => setActiveTab('curl')}
              >
                cURL
              </button>
              <button 
                className={`code-tab ${activeTab === 'js' ? 'active' : ''}`}
                onClick={() => setActiveTab('js')}
              >
                JavaScript
              </button>
              <button 
                className={`code-tab ${activeTab === 'python' ? 'active' : ''}`}
                onClick={() => setActiveTab('python')}
              >
                Python
              </button>
            </div>
            
            <pre className="code-block font-mono">
              <code>{codeSnippets[activeTab]}</code>
            </pre>
          </GlassCard>

          <GlassCard className="api-response-card">
            <div className="code-header">
              <span className="code-title font-mono">Normalized JSON Response</span>
            </div>
            <pre className="code-block font-mono json-block">
{`{
  "location": {
    "name": "Tokyo",
    "country": "Japan",
    "lat": 35.6895,
    "lon": 139.6917
  },
  "current": {
    "temp": 22,
    "feelsLike": 23,
    "conditionText": "Partly Cloudy",
    "humidity": 64,
    "windSpeed": 12,
    "windDir": "NNE",
    "uv": 5,
    "aqi": 1,
    "isNight": false
  }
}`}
            </pre>
          </GlassCard>
        </div>
      </div>
    </motion.div>
  );
};

export default ApiView;
