import React from 'react';
import { motion } from 'framer-motion';
interface WaveAnimationProps {
  darkColor?: string;
  lightColor?: string;
  lightestColor?: string;
}
const WaveAnimation: React.FC<WaveAnimationProps> = ({darkColor='rgba(59, 130, 246, 0.5)', lightColor='rgba(37, 99, 235, 0.6)', lightestColor='rgba(29, 78, 216, 0.7)'}) => {
  return (
    <div className="absolute h-64 w-full bg-none overflow-hidden">
      {/* First Wave */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-24"
        style={{
          background: `linear-gradient(transparent, ${darkColor})`,
          filter: 'brightness(0.7)'
        }}
        animate={{
          y: [0, -20, 0],
          scaleY: [1, 1.2, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Second Wave */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-16"
        style={{
          background: `linear-gradient(transparent, ${lightColor})`,
          filter: 'brightness(0.7)'
        }}
        animate={{
          y: [0, -15, 0],
          scaleY: [1, 1.1, 1],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.2
        }}
      />
      
      {/* Third Wave */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-12"
        style={{
          background: `linear-gradient(transparent, ${lightestColor}`,
        }}
        animate={{
          y: [0, -10, 0],
          scaleY: [1, 1.15, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.4
        }}
      />
    </div>
  );
};

export default WaveAnimation;