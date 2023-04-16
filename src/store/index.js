/* eslint-disable import/no-extraneous-dependencies */
// This is for the state management to have every working together.
import { proxy } from 'valtio';

const state = proxy({
  intro: true,
  color: '#EFBD48',
  vehicleColor: '#BA1F33',
  colorPickerOpen: false,
  pastColors: ['#F8E71C', '#D0021B', '#50E3C2', '#7ED321', '#9013FE'],
  environmentOpen: false,
});

export default state;
