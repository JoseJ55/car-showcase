/* eslint-disable react/no-unknown-property */
/* eslint-disable semi */
/* eslint-disable import/no-extraneous-dependencies */
import React, { lazy, Suspense } from 'react';
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

const Loading = lazy(() => import('../../pages/Loading/Loading'));

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

      {/* <Suspense> */}
      <Lights />
      <Ground />

      <CubeCamera resolution={128} frames={Infinity}>
        {(texture) => (
          <>
            <Environment map={texture} />
            {/* <Suspense fallback={<Loading />}> */}
              <Car />
            {/* </Suspense> */}
          </>
        )}
      </CubeCamera>
      {/* </Suspense> */}
    </>
  );
}

export default CarShow;
