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

// Custom components
import ColorPicker from '../../components/ColorPicker/ColorPicker';

function Customizer() {
  const snap = useSnapshot(state);

  return (
    <AnimatePresence>
      {!snap.intro && (
        <motion.section>
          <ColorPicker />
          <button id="customizer-back-button" type="button" aria-label="Customize" onClick={() => state.intro = true}>
            <AiOutlineDoubleLeft id="customizer-back-button-icon" />
          </button>
        </motion.section>
      )}
    </AnimatePresence>
  );
}

export default Customizer;
