/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-return-assign */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import './Customizer.css';

// import icons
import { AiOutlineDoubleLeft } from 'react-icons/ai';

// Animation modules
import { motion, AnimatePresence } from 'framer-motion';

// State management
import { useSnapshot } from 'valtio';
import state from '../../store';

// Animation components
import { slideAnimation } from '../../config/motion';

// Custom components
import ColorPicker from '../../components/ColorPicker/ColorPicker';
import EnvironmentPicker from '../../components/EnvironmentPicker/EnvironmentPicker';
import CarPicker from '../../components/CarPicker/CarPicker';

function Customizer() {
  const snap = useSnapshot(state);

  return (
    <AnimatePresence>
      {!snap.intro && (
        <motion.section>
          <ColorPicker />
          <EnvironmentPicker />
          <CarPicker />

          <motion.div id="customizer-back" {...slideAnimation('left', 500)}>
            <button
              id="customizer-back-button"
              type="button"
              aria-label="Customize"
              onClick={() => {
                state.intro = true;
                state.colorPickerOpen = false;
              }}
            >
              <AiOutlineDoubleLeft id="customizer-back-button-icon" />
            </button>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}

export default Customizer;
