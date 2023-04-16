/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import React from 'react';

import { Canvas } from '@react-three/fiber';

// Main Pages
import Home from './pages/Home/Home';
import Customizer from './pages/Customizer/Customizer';

// Custom components
import AnimationCanvas from './components/AnimationCanvas/AnimationCanvas';

function App() {
  return (
    <main className="App">
      <AnimationCanvas />
      <Home />
      <Customizer />
    </main>
  );
}

export default App;
