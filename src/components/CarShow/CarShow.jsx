/* eslint-disable react/no-unknown-property */
/* eslint-disable semi */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import './CarShow.css';

// Postprocessing elements
import {
  EffectComposer,
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

// State Management
import { useSnapshot } from 'valtio';
import state from '../../store';

// Custom Component
import Ground from '../Ground/Ground';
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
      />

      <PerspectiveCamera
        makeDefault
        near={0.1}
        fov={50}
        position={[3, 2, 5]}
      />

      <color args={[0, 0, 0]} attach="background" />

      <spotLight
        color={[1, 0.25, 0.7]}
        intensity={0.4}
        angle={0.6}
        penumbra={0.5}
        position={[5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />
      <spotLight
        color={[0.14, 0.5, 1]}
        intensity={0.4}
        angle={0.6}
        penumbra={0.5}
        position={[-5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />

      <Ground />

      <CubeCamera resolution={256} frames={Infinity}>
        {(texture) => (
          <>
            <Environment map={texture} />
            <Car />
          </>
        )}
      </CubeCamera>

      <EffectComposer>
        <Bloom
          blendFunction={BlendFunction.ADD}
          intensity={0.1} // The bloom intensity.
          width={800} // render width
          height={800} // render height
          kernelSize={2} // blur kernel size
          // eslint-disable-next-line max-len
          luminanceThreshold={0.10} // luminance threshold. Raise this value to mask out darker elements in the scene.
          luminanceSmoothing={0.15} // smoothness of the luminance threshold. Range is [0, 1]
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL} // blend mode
          offset={[0.0002, 0.0002]} // color offset
        />
      </EffectComposer>
    </>
  );
}

export default CarShow;
