/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-unknown-property */
import React, { useMemo } from 'react';

// State management.
import { useSnapshot } from 'valtio';
import state from '../../store';

function Lights() {
  const snap = useSnapshot(state);

  const mainEnvironment = useMemo(() => {
    if (snap.currentEnvironment === 'nighttime') {
      return (
        <>
          <directionalLight
            color={[0.86, 0.95, 1]}
            intensity={0.043}
            castShadow
            isDirectionalLight
            position={[-2, 12, 3]}
          />
          <ambientLight
            color={[0.86, 0.95, 1]}
            intensity={0.005}
          />
          <spotLight
            color={[0.76, 0.85, 1]}
            intensity={0.13}
            angle={0.5}
            penumbra={0.5}
            position={[7, 6, 3]}
            castShadow
            shadow-bias={-0.0001}
          />
        </>
      );
    } if (snap.currentEnvironment === 'daytime') {
      return (
        <>
          <directionalLight
            color={[0.76, 0.85, 0.89]}
            intensity={0.1}
            castShadow
            position={[4, 20, -2]}
          />
          <ambientLight
            color={[0.76, 0.85, 0.89]}
            intensity={0.1}
          />
        </>
      );
    }
    return (
      <>
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
      </>
    );
  }, [snap.currentEnvironment]);

  return mainEnvironment;
}

export default Lights;
