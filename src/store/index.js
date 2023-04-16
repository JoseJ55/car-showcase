/* eslint-disable import/no-extraneous-dependencies */
// This is for the state management to have every working together.
import { proxy } from 'valtio';

const state = proxy({
  intro: true,
  color: '#EFBD48',
  vehicleColor: '#BA1F33',
});

export default state;
