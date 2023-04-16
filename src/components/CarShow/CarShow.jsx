/* eslint-disable react/no-unknown-property */
/* eslint-disable semi */
/* eslint-disable import/no-extraneous-dependencies */
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import './CarShow.css';

// Postprocessing elements
import {
  EffectComposer,
  DepthOfField,
  Bloom,
  ChromaticAberration,
} from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing';

// Three.js element
import {
  CubeCamera,
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from '@react-three/drei';

// Custom Component
import Ground from '../Ground/Ground';

function CarShow() {
  return (
    <>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />

      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />

      <color args={[0, 0, 0]} attach="background" />

      <spotLight
        color={[1, 0.25, 0.7]}
        intensity={1.5}
        angle={0.6}
        penumbra={0.5}
        position={[5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />
      <spotLight
        color={[0.14, 0.5, 1]}
        intensity={2}
        angle={0.6}
        penumbra={0.5}
        position={[-5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />

      <Ground />
    </>
  );
}

export default CarShow;
