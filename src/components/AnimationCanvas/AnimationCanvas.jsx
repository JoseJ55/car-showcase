/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import './AnimationCanvas.css';

// Three.js elements
import { Canvas } from '@react-three/fiber';

// Custom component
import CarShow from '../CarShow/CarShow';

function AnimationCanvas() {
  return (
    <Canvas shadows>
      <CarShow />
    </Canvas>
  );
}

export default AnimationCanvas;
