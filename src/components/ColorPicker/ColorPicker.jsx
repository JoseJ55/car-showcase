/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-return-assign */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import './ColorPicker.css';

// Animation modules
import { motion, AnimatePresence } from 'framer-motion';

// Color picker module
import { SketchPicker } from 'react-color';

// State management
import { useSnapshot } from 'valtio';
import state from '../../store';

// Animation components
import { slideAnimation } from '../../config/motion';

function ColorPicker() {
  const snap = useSnapshot(state);

  const addNewColor = (color) => {
    const pickColor = {
      hex: color.hex,
      r: color.rgb.r,
      g: color.rgb.g,
      b: color.rgb.b,
    };

    state.color = pickColor;
    state.pastColors.shift();
    state.pastColors.push(pickColor);
  };

  return (
    <>
      <motion.div id="color-history" {...slideAnimation('left', 500)}>
        <input type="button" id="toggle-picker" onClick={() => state.colorPickerOpen = !snap.colorPickerOpen} />

        {snap.pastColors.map((item, key) => (
            <input
              type="button"
              className="past-color"
              key={key}
              style={{ backgroundColor: item.hex }}
              onClick={() => addNewColor(item)}
            />
        ))}
      </motion.div>

        <AnimatePresence>
            {snap.colorPickerOpen && (
                <motion.section>
                    <motion.div id="color-picker" {...slideAnimation('left', 500)}>
                        <SketchPicker
                          id="color-picker-box"
                          color={snap.color.hex}
                          disableAlpha
                          onChange={(color) => addNewColor(color)}
                        />
                    </motion.div>
                </motion.section>
            )}
        </AnimatePresence>
    </>
  );
}

export default ColorPicker;
