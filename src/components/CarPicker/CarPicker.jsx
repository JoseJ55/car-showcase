/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-return-assign */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import './CarPicker.css';

// Animation modules
import { motion } from 'framer-motion';

// State management
import { useSnapshot } from 'valtio';
import state from '../../store';

// Animation components
import { slideAnimation } from '../../config/motion';
import CustomButton from '../CustomButton/CustomButton';

function CarPicker() {
  const snap = useSnapshot(state);

  const changeName = (name) => {
    const nameSplit = name.split('_');

    const upperCased = nameSplit.map((n) => {
      const firstLetter = n[0].toUpperCase();
      const removeFirstLetter = n.substring(1);

      return firstLetter + removeFirstLetter;
    });

    return upperCased.join(' ');
  };

  return (
    <motion.div id="car-picker" {...slideAnimation('up', 500)}>
        {snap.vehicles.map((vehicle, index) => (
            <div className="car-picker-button">
                <CustomButton
                  key={index}
                  title={changeName(vehicle)}
                  handleClick={() => {
                    state.moveCar = true;

                    setTimeout(() => {
                      state.currentVehicle = vehicle;
                      // state.showCar = false;
                      state.newCar = true;
                    }, 5000);
                  }}
                />
            </div>
        ))}
    </motion.div>
  );
}

export default CarPicker;
