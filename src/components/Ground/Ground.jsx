/* eslint-disable react/no-unknown-property */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import React, {
  useEffect, useState, useCallback, useMemo,
} from 'react';

// Three.js elements
import { useLoader } from '@react-three/fiber';
import { MeshReflectorMaterial } from '@react-three/drei';
import { LinearEncoding, RepeatWrapping, TextureLoader } from 'three';

// State management
import { useSnapshot } from 'valtio';
import state from '../../store';

export default function Ground() {
  const snap = useSnapshot(state);

  // const [groundColor, setGroundColor] = useState([0.015, 0.015, 0.015]);
  const groundColor = useMemo(() => {
    if (snap.currentEnvironment === 'daytime') {
      return [0.15, 0.15, 0.15];
    } if (snap.currentEnvironment === 'nighttime') {
      return [0.05, 0.05, 0.05];
    }
    return [0.015, 0.015, 0.015];
  }, [snap.currentEnvironment]);

  const [blurRatio, setBlurRatio] = useState(0.15);
  const [texture, setTexture] = useState({
    roughness: '/textures/terrain-roughness.jpg',
    normal: '/textures/terrain-normal.jpg',
  });

  // thanks to https://polyhaven.com/a/rough_plasterbrick_05 !
  const [roughness, normal] = useLoader(TextureLoader, [
    texture.roughness,
    texture.normal,
  ]);

  const configureTexture = useCallback(
    () => {
      [normal, roughness].forEach((t) => {
        t.wrapS = RepeatWrapping;
        t.wrapT = RepeatWrapping;
        t.repeat.set(5, 5);
        t.offset.set(0, 0);
      });

      normal.encoding = LinearEncoding;
    },
    [normal, roughness],
  );

  useEffect(() => {
    configureTexture();
  }, [configureTexture]);

  useMemo(() => {
    if (snap.currentEnvironment === 'daytime') {
      setBlurRatio(0.01);
      setTexture({
        roughness: '/textures/asphalt/asphalt-roughness.jpg',
        normal: '/textures/asphalt/asphalt-normal.jpg',
      });
    } else if (snap.currentEnvironment === 'nighttime') {
      setBlurRatio(0);
      setTexture({
        roughness: '/textures/terrain-roughness.jpg',
        normal: '/textures/terrain-normal.jpg',
      });
    } else {
      setBlurRatio(0.15);
      setTexture({
        roughness: '/textures/terrain-roughness.jpg',
        normal: '/textures/terrain-normal.jpg',
      });
    }
  }, [snap.currentEnvironment]);

  return (
    <mesh rotation-x={-Math.PI * 0.5} castShadow receiveShadow>
      <planeGeometry args={[30, 30]} />
      <MeshReflectorMaterial
        envMapIntensity={0}
        normalMap={normal}
        normalScale={[0.3, 0.3]}
        roughnessMap={roughness}
        dithering
        color={groundColor}
        roughness={0.7}
        // blur={[1000, 400]} // Blur ground reflections (width, height), 0 skips blur
        // mixBlur={30} // How much blur mixes with surface roughness (default = 1)
        mixStrength={10} // Strength of the reflections
        mixContrast={1} // Contrast of the reflections
        resolution={1024} // Off-buffer resolution, lower=faster, higher=better quality, slower
        mirror={0} // Mirror environment, 0 = texture colors, 1 = pick up env colors
        depthScale={0.01} // Scale the depth factor (0 = no depth, default = 0)
        minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
        maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
        // eslint-disable-next-line max-len
        depthToBlurRatioBias={blurRatio} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
        debug={0}
        // eslint-disable-next-line max-len
        reflectorOffset={0.2} // Offsets the virtual camera that projects the reflection. Useful when the reflective surface is some distance from the object's origin (default = 0)
      />
    </mesh>
  );
}
