/* eslint-disable no-return-assign */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';

// Animation modules
import { motion, AnimatePresence } from 'framer-motion';

// State management
import { useSnapshot } from 'valtio';
import state from '../../store';

function Customizer() {
  const snap = useSnapshot(state);

  return (
    <AnimatePresence>
      {!snap.intro && (
        <motion.section>
          <p>Customizer</p>
          <input type="button" aria-label="Customize" value="Customize" onClick={() => state.intro = true} />
        </motion.section>
      )}
    </AnimatePresence>
  );
}

export default Customizer;
