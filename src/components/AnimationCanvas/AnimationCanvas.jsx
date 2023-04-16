/* eslint-disable import/no-extraneous-dependencies */
import React, { Suspense } from 'react';
import './AnimationCanvas.css';

// Three.js elements
import { Canvas } from '@react-three/fiber';

// Custom component
import CarShow from '../CarShow/CarShow';

function AnimationCanvas() {
  return (
    <Suspense fallback={null}>
      <Canvas shadows>
        <CarShow />
      </Canvas>
    </Suspense>
  );
}

export default AnimationCanvas;
