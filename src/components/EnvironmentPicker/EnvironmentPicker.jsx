/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import './EnvironmentPicker.css';

// Animation modules
import { motion, AnimatePresence } from 'framer-motion';

// Animation components
import { slideAnimation } from '../../config/motion';

// This component allows the user to pick a environment for the animation.
function EnvironmentPicker() {
  const enviornments = [
    {
      title: 'vibe',
    },
    {
      title: 'daytime',
    },
    {
      title: 'nighttime',
    },
  ];

  return (
    <AnimatePresence>
      <motion.div id="environment-picker" {...slideAnimation('down', 500)}>
        {enviornments.map((env) => (
          <input className="environment" type="button" value={env.title} />
        ))}
      </motion.div>
    </AnimatePresence>
  );
}

export default EnvironmentPicker;
