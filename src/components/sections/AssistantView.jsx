import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../common/GlassCard';
import { chatWithWeather } from '../../services/geminiService';
import { Cpu, Send, MessageSquare, Bot, User, Sparkles, Trash2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const AssistantView = ({ weatherData }) => {
  const [messages, setMessages] = useState([
    {
      role: 'model',
      text: "Hello! I am your Atmos AI Meteorological Assistant. Ask me anything about clothing, travel plans, or activity timings based on the current weather sensors."
    }
  ]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const chatEndRef = useRef(null);

  // Auto scroll to bottom of chat list on new messages or loading state
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isSending]);

  const handleSend = async (textToSend) => {
    const messageText = textToSend || input;
    if (!messageText.trim()) return;

    setErrorMsg('');
    setInput('');
    setIsSending(true);

    // Append user message locally
    const updatedMessages = [...messages, { role: 'user', text: messageText }];
    setMessages(updatedMessages);

    try {
      // Format chat history for Gemini API: mapping to role 'user' and 'model'
      const chatHistory = updatedMessages.slice(1, -1).map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }));

      const responseText = await chatWithWeather(messageText, weatherData, chatHistory);

      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "An unknown error occurred while communicating with Gemini AI.");
    } finally {
      setIsSending(false);
    }
  };

  const handleClear = () => {
    setMessages([
      {
        role: 'model',
        text: "Matrix reset. How can I assist you with weather telemetry queries?"
      }
    ]);
    setErrorMsg('');
  };

  const suggestionPills = [
    "What clothing should I wear?",
    "Should I pack an umbrella today?",
    "Is it a good time for a jog?",
    "Any wind warnings for my route?"
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="coming-soon-container"
    >
      <div className="view-back-bar">
        <Link to="/" className="back-link">
          <span>Back to Telemetry Dashboard</span>
        </Link>
      </div>

      <header className="view-header">
        <div className="view-icon-title">
          <Bot className="view-title-icon" size={28} aria-hidden="true" />
          <h1 className="view-title">Meteorological AI Assistant</h1>
        </div>
        <p className="view-subtitle font-mono">Personalized Weather Advice — Powered by Gemini 2.5 Flash</p>
      </header>

      {/* Weather telemetry status banner */}
      <GlassCard className="ai-telemetry-banner-card">
        <div className="ai-status-banner-content">
          <Sparkles size={16} className="sparkles-icon" aria-hidden="true" />
          <span className="banner-status-text">
            {weatherData ? (
              <>
                Active sensors loaded: <strong>{weatherData.location.name}, {weatherData.location.country}</strong> ({weatherData.current.temp}°C, {weatherData.current.conditionText})
              </>
            ) : (
              "General Weather Mode. Search for a city on the Dashboard to feed real-time sensor streams into the AI model."
            )}
          </span>
        </div>
      </GlassCard>

      <div className="coming-soon-grid">
        {/* Left Column: Visual AI Orb Animation (existing layout structure) */}
        <div className="animation-column">
          <GlassCard className="animation-display-card ai-assistant-orb-card">
            <div className="orb-animation-container">
              <div className="orb-glow-ring ring-1"></div>
              <div className="orb-glow-ring ring-2"></div>
              <div className="orb-glow-ring ring-3"></div>
              <div className="core-orb">
                <Cpu size={32} className="core-orb-icon" aria-hidden="true" />
              </div>
            </div>
            
            <div className="radar-status-badge font-mono">
              <span className={`pulse-dot ${isSending ? 'pulse-error' : 'ai-pulse'}`}></span>
              <span>{isSending ? 'AI THINKING...' : 'ORB COGNITIVE MATRIX ACTIVE'}</span>
            </div>
            
            <p className="orb-intro-desc">
              Ask Atmos AI advice on how to plan your day. The model directly queries the live sensor context for temperature, humidity, wind speed, and conditions to deliver hyper-local advice.
            </p>
          </GlassCard>
        </div>

        {/* Right Column: Interactive Chat Interface */}
        <div className="details-column chat-details-column">
          <GlassCard className="chat-demo-card active-chat-card">
            <div className="chat-header-actions">
              <h3 className="section-subtitle-cs" style={{ borderBottom: 'none', marginBottom: 0, paddingBottom: 0 }}>Dialogue Session</h3>
              <button onClick={handleClear} className="clear-chat-btn font-mono" title="Clear chat session">
                <Trash2 size={13} aria-hidden="true" />
                <span>Reset</span>
              </button>
            </div>

            <div className="chat-simulation-container active-chat-container">
              {messages.map((item, idx) => (
                <div key={idx} className={`chat-bubble ${item.role === 'user' ? 'user' : 'assistant'}`}>
                  {item.role === 'user' ? (
                    <User size={14} className="bubble-icon" aria-hidden="true" />
                  ) : (
                    <Bot size={14} className="bubble-icon" aria-hidden="true" />
                  )}
                  <div className="bubble-content">
                    <p className="chat-text" style={{ whiteSpace: 'pre-wrap' }}>{item.text}</p>
                  </div>
                </div>
              ))}
              {isSending && (
                <div className="chat-bubble assistant">
                  <Bot size={14} className="bubble-icon" aria-hidden="true" />
                  <div className="bubble-content loading">
                    <div className="typing-loader">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
          </GlassCard>

          {/* Prompt Suggestion Chips */}
          <div className="suggestion-chips-container">
            {suggestionPills.map((pill, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(pill)}
                disabled={isSending}
                className="suggestion-chip font-mono"
              >
                {pill}
              </button>
            ))}
          </div>

          {/* Graceful Error Banner */}
          {errorMsg && (
            <div className="chat-error-banner" role="alert">
              <AlertCircle size={16} className="error-banner-icon" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Active Chat Inputs */}
          <GlassCard className="technical-card active-chat-inputs-card">
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="input-field-placeholder active-chat-inputs">
              <MessageSquare size={16} className="placeholder-chat-icon" aria-hidden="true" />
              <input
                type="text"
                className="placeholder-text active-chat-input"
                placeholder={isSending ? "Processing request..." : "Ask Atmos AI weather advice..."}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isSending}
                aria-label="Ask Atmos AI weather advice"
              />
              <button 
                type="submit"
                className={`placeholder-send-btn active-chat-send-btn ${input.trim() && !isSending ? 'active' : ''}`}
                disabled={isSending || !input.trim()}
                aria-label="Send message"
              >
                <Send size={14} aria-hidden="true" />
              </button>
            </form>
          </GlassCard>
        </div>
      </div>
    </motion.div>
  );
};

export default AssistantView;
