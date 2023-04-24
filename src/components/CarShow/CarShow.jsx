/* eslint-disable react/no-unknown-property */
/* eslint-disable semi */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import './CarShow.css';

// Three.js element
import {
  CubeCamera,
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from '@react-three/drei';

// State Management
import { useSnapshot } from 'valtio';
import state from '../../store';

// Custom Component
import Ground from '../Ground/Ground';
import Lights from '../Lights/Lights';
import Car from '../Car/Car';

function CarShow() {
  const snap = useSnapshot(state);

  return (
    <>
      <OrbitControls
        target={[0, 0.35, 0]}
        maxPolarAngle={1.45}
        autoRotate={snap.intro}
        autoRotateSpeed={2}
        enableRotate={!snap.intro}
        enablePan={false}
        minDistance={3}
        maxDistance={8}
      />

      <PerspectiveCamera
        makeDefault
        near={0.1}
        fov={50}
        position={[3, 2, 5]}
      />

      <color args={[0, 0, 0]} attach="background" />

      <Lights />

      <Ground />

      <CubeCamera resolution={128} frames={Infinity}>
        {(texture) => (
          <>
            <Environment map={texture} />
            <Car />
          </>
        )}
      </CubeCamera>
    </>
  );
}

export default CarShow;
