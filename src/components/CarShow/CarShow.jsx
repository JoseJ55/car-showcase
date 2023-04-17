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
      />

      <PerspectiveCamera
        makeDefault
        near={0.1}
        fov={50}
        position={[3, 2, 5]}
      />

      {/* <color args={snap.currentEnvironment === 'daytime' ? [255, 255, 255] : [0, 0, 0]} attach="background" /> */}
      <color args={[0, 0, 0]} attach="background" />

      <Lights />

      <Ground />

      <CubeCamera resolution={256} frames={Infinity}>
        {(texture) => (
          <>
            <Environment map={texture} />
            <Car />
          </>
        )}
      </CubeCamera>

      {/* <EffectComposer>
        <Bloom
          blendFunction={BlendFunction.ADD}
          intensity={0.2} // The bloom intensity.
          width={800} // render width
          height={800} // render height
          kernelSize={1} // blur kernel size
          // eslint-disable-next-line max-len
          luminanceThreshold={0.05}
          // luminance threshold. Raise this value to mask out darker elements in the scene.
          luminanceSmoothing={0.1} // smoothness of the luminance threshold. Range is [0, 1]
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL} // blend mode
          offset={[0.0002, 0.0002]} // color offset
        />
      </EffectComposer> */}
    </>
  );
}

export default CarShow;
