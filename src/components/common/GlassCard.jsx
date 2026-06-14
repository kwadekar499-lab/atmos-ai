import { motion } from 'framer-motion';

/**
 * Reusable premium GlassCard container component.
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @param {string} [props.className]
 * @param {boolean} [props.hoverEffect]
 * @param {number} [props.delay]
 * @param {object} [props.style]
 * @param {Function} [props.onClick]
 */
const GlassCard = ({
  children,
  className = '',
  hoverEffect = false,
  delay = 0,
  style = {},
  onClick,
  ...rest
}) => {
  const isInteractive = hoverEffect || !!onClick;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1], // Apple-style custom cubic-bezier
        delay: delay
      }}
      whileHover={isInteractive ? { scale: 1.01, y: -2 } : undefined}
      whileTap={isInteractive ? { scale: 0.99 } : undefined}
      onClick={onClick}
      style={style}
      className={`glass-card ${isInteractive ? 'interactive' : ''} ${className}`}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
