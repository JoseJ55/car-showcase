/* eslint-disable import/no-extraneous-dependencies */
// This is for the state management to have every working together.
import { proxy } from 'valtio';

const state = proxy({
  intro: true,
  color: {
    hex: '#EFBD48',
    r: 239,
    g: 189,
    b: 72,
  },
  vehicleColor: '#BA1F33',
  colorPickerOpen: false,
  pastColors: [{
    hex: '#F8E71C',
    rgb: {
      r: 248,
      g: 231,
      b: 28,
    },
  }, {
    hex: '#D0021B',
    rgb: {
      r: 208,
      g: 2,
      b: 27,
    },
  }, {
    hex: '#50E3C2',
    rgb: {
      r: 80,
      g: 227,
      b: 194,
    },
  }, {
    hex: '#7ED321',
    rgb: {
      r: 126,
      g: 211,
      b: 33,
    },
  }, {
    hex: '#9013FE',
    rgb: {
      r: 144,
      g: 19,
      b: 254,
    },
  }],
  environmentOpen: false,
  currentEnvironment: 'vibe',
  brightEnvironment: false,
});

export default state;
