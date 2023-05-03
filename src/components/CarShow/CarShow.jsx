/* eslint-disable react/no-unknown-property */
/* eslint-disable semi */
/* eslint-disable import/no-extraneous-dependencies */
import React, { lazy, useEffect } from 'react';
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
const Ground = lazy(() => import('../Ground/Ground'));
const Lights = lazy(() => import('../Lights/Lights'));
const Car = lazy(() => import('../Car/Car'));

function CarShow() {
  const snap = useSnapshot(state);

  useEffect(() => {
    if (!snap.showCar) {
      setTimeout(() => {
        state.showCar = true;
      }, '3000');
    }
  }, [snap.showCar]);

  useEffect(() => {
    state.loaded.models = true;
  }, []);

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
        {(texture) => {
          if (snap.showCar) {
            return (
              <>
                <Environment map={texture} />
                <Car />
              </>
            )
          }
          return null;
        }}
      </CubeCamera>
    </>
  );
}

export default CarShow;
