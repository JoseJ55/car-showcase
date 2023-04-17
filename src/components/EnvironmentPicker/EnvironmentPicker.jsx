/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import './EnvironmentPicker.css';

// Animation modules
import { motion } from 'framer-motion';

// Animation components
import { slideAnimation } from '../../config/motion';

// Custom Component
import CustomButton from '../CustomButton/CustomButton';

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
    <motion.div id="environment-picker" {...slideAnimation('up', 500)}>
      {enviornments.map((env, key) => (
        // eslint-disable-next-line react/no-array-index-key
        <CustomButton title={env.title} key={key} className="environment" />
        // <input key={key} className="environment" type="button" value={env.title} />
      ))}
    </motion.div>
  );
}

export default EnvironmentPicker;
