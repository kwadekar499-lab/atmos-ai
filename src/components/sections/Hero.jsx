import { motion } from 'framer-motion';

const Hero = ({ locationName, conditionText }) => {
  // Get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 5) return 'Good night';
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    if (hour < 22) return 'Good evening';
    return 'Good night';
  };

  const greeting = getGreeting();

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="hero-section"
    >
      <h1 className="hero-greeting">
        {greeting}, <span className="text-gradient-cyan">Observer</span>
      </h1>
      <p className="hero-insight">
        Atmospheric telemetry is operational. {locationName || 'The location'} is currently displaying {conditionText ? conditionText.toLowerCase() : 'loading conditions'}. 
        The local system is fully synchronized.
      </p>
    </motion.section>
  );
};

export default Hero;
