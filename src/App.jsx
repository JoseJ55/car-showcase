/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import React, { lazy } from 'react';

import { Canvas } from '@react-three/fiber';

// Main Pages
const Home = lazy(() => import('./pages/Home/Home'));
const Customizer = lazy(() => import('./pages/Customizer/Customizer'));

// Custom components
const AnimationCanvas = lazy(() => import('./components/AnimationCanvas/AnimationCanvas'));
// import Loading from './pages/Loading/Loading';

function App() {
  return (
    <main className="App">
      {/* <Loading /> */}
      <AnimationCanvas />
      <Home />
      <Customizer />
    </main>
  );
}

export default App;
