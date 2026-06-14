import { motion } from 'framer-motion';
import GlassCard from '../common/GlassCard';
import { Cpu, Send, MessageSquare, Bot, ArrowRight, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const AssistantComingSoon = () => {
  const mockConversations = [
    {
      icon: "umbrella",
      question: "Should I pack an umbrella for my walk in Tokyo around 6 PM?",
      answer: "Yes, you should. The hourly forecast indicates a precipitation probability rising to 65% between 5 PM and 7 PM as a local rain shower passes through. Pack a light umbrella."
    },
    {
      icon: "clothing",
      question: "What should I wear for a meeting in London today? It's currently 14°C.",
      answer: "I recommend layering. Pair a breathable inner shirt with a light sweater or trench coat. Winds are moderate (18 kph) and skies are overcast, so a wind-resistant top layer is perfect."
    },
    {
      icon: "travel",
      question: "I'm traveling from Paris to Geneva tomorrow. Any weather hazards?",
      answer: "Paris remains calm, but Geneva is forecasting a cold front starting tomorrow morning. Expect heavy cloud cover and a sudden temperature drop to 8°C. Prepare for wet roads in the evening."
    },
    {
      icon: "jogging",
      question: "Is 7 AM tomorrow a good time for a jog in New York?",
      answer: "Excellent choice! 7 AM will be 16°C with clean air quality (AQI 1: Good) and low wind speeds. It's the optimal window before temperatures climb to 24°C in the afternoon."
    }
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
          <ArrowRight className="back-arrow-icon" size={16} aria-hidden="true" />
          <span>Back to Telemetry Dashboard</span>
        </Link>
      </div>

      <header className="view-header">
        <div className="view-icon-title">
          <Bot className="view-title-icon" size={28} aria-hidden="true" />
          <h1 className="view-title">Meteorological AI Assistant</h1>
        </div>
        <p className="view-subtitle font-mono">Personalized AI Weather Guidance — Powered by Gemini</p>
      </header>

      <div className="coming-soon-grid">
        {/* Left Column: AI Orb Animation & Description */}
        <div className="animation-column">
          <GlassCard className="animation-display-card ai-assistant-orb-card">
            {/* Pulsing AI Orb */}
            <div className="orb-animation-container">
              <div className="orb-glow-ring ring-1"></div>
              <div className="orb-glow-ring ring-2"></div>
              <div className="orb-glow-ring ring-3"></div>
              <div className="core-orb">
                <Cpu size={32} className="core-orb-icon" aria-hidden="true" />
              </div>
            </div>
            
            <div className="radar-status-badge font-mono">
              <span className="pulse-dot ai-pulse"></span>
              <span>ORB COGNITIVE MATRIX ACTIVE...</span>
            </div>
            
            <p className="orb-intro-desc">
              Interact with a context-aware LLM that directly queries the Atmos telemetry database to provide natural language advice tailored to your daily schedule, hobbies, and locations.
            </p>
          </GlassCard>
        </div>

        {/* Right Column: Realistic Conversations */}
        <div className="details-column chat-details-column">
          <GlassCard className="chat-demo-card">
            <h3 className="section-subtitle-cs">Simulated AI Capabilities</h3>
            
            <div className="chat-simulation-container">
              {mockConversations.map((item, idx) => (
                <div key={idx} className="simulated-chat-pair">
                  <div className="chat-bubble user">
                    <User size={14} className="bubble-icon" aria-hidden="true" />
                    <div className="bubble-content">
                      <p className="chat-text">{item.question}</p>
                    </div>
                  </div>
                  
                  <div className="chat-bubble assistant">
                    <Bot size={14} className="bubble-icon" aria-hidden="true" />
                    <div className="bubble-content">
                      <p className="chat-text">{item.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="technical-card">
            <div className="input-field-placeholder">
              <MessageSquare size={16} className="placeholder-chat-icon" aria-hidden="true" />
              <input
                type="text"
                className="placeholder-text"
                placeholder="Ask Atmos AI anything... (Coming Soon)"
                disabled
                aria-disabled="true"
              />
              <button 
                className="placeholder-send-btn" 
                disabled 
                aria-disabled="true"
                style={{ cursor: 'not-allowed' }}
                aria-label="Send message"
              >
                <Send size={14} aria-hidden="true" />
              </button>
            </div>
          </GlassCard>
        </div>
      </div>
    </motion.div>
  );
};

export default AssistantComingSoon;
