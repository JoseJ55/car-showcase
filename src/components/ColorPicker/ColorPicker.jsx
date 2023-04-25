/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-return-assign */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
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

  const [currentColor, setCurrentColor] = useState(snap.color);

  const addNewColor = (color, past = false) => {
    const pickColor = {
      hex: color.hex,
      r: past ? color.r : color.rgb.r,
      g: past ? color.g : color.rgb.g,
      b: past ? color.b : color.rgb.b,
    };

    state.color = pickColor;

    if (past) {
      const indexOfColor = state.pastColors.findIndex((obj) => obj.hex === color.hex);
      state.pastColors.splice(indexOfColor, 1);
    } else {
      state.pastColors.shift();
    }

    state.pastColors.push(pickColor);

    if (past) setCurrentColor(pickColor);
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
              onClick={() => addNewColor(item, true)}
            />
        ))}
      </motion.div>

        <AnimatePresence>
            {snap.colorPickerOpen && (
                <motion.section>
                    <motion.div id="color-picker" {...slideAnimation('left', 500)}>
                        <SketchPicker
                          id="color-picker-box"
                          color={currentColor}
                          disableAlpha
                          onChange={(color) => setCurrentColor(color)}
                          onChangeComplete={(color) => addNewColor(color)}
                        />
                    </motion.div>
                </motion.section>
            )}
        </AnimatePresence>
    </>
  );
}

export default ColorPicker;
