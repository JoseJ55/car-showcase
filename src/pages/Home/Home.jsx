/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-return-assign */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect } from 'react';
import './Home.css';

// Animation modules
import { motion, AnimatePresence } from 'framer-motion';

// State management
import { useSnapshot } from 'valtio';
import state from '../../store';

// Animation components
import { slideAnimation } from '../../config/motion';

// Custom components
import CustomButton from '../../components/CustomButton/CustomButton';

function Home() {
  const snap = useSnapshot(state);

  useEffect(() => {
    state.loaded.elements = true;

    return () => {
      state.loaded.elements = false;
    };
  }, []);

  return (
    <AnimatePresence>
      {snap.intro && (
        <motion.section className="home">
          <motion.div id="home-content" {...slideAnimation('left', 2500)}>
            <p id="home-content-title">Customize Your Car</p>
            <CustomButton title="Custom" handleClick={() => state.intro = false} />
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}

export default Home;
