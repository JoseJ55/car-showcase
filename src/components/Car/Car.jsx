/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import React, { lazy } from 'react';

// import CorvetteC7 from '../../models/CorvetteC7';
// import MclarenP1 from '../../models/MclarenP1';
// import PorsheTaycan from '../../models/PorsheTaycan';

// State management
import { useSnapshot } from 'valtio';
import state from '../../store';

const CorvetteC7 = lazy(() => import('../../models/CorvetteC7'));
const MclarenP1 = lazy(() => import('../../models/MclarenP1'));
const PorsheTaycan = lazy(() => import('../../models/PorsheTaycan'));

export default function Car() {
  const snap = useSnapshot(state);

  // 'corvette_c7', 'mclaren_p1', 'porshe_taycan',
  if (snap.currentVehicle === 'corvette_c7') {
    if (snap.showCar) return <CorvetteC7 />;
  }

  if (snap.currentVehicle === 'mclaren_p1') {
    if (snap.showCar) return <MclarenP1 />;
  }

  if (snap.currentVehicle === 'porshe_taycan') {
    if (snap.showCar) return <PorsheTaycan />;
  }

  return null;
}
