/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useMemo } from 'react';

// Three.js elements
import { useLoader } from '@react-three/fiber';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Mesh } from 'three';

// State management
import { useSnapshot } from 'valtio';
import state from '../store';

export default function PorsheTaycan() {
  const snap = useSnapshot(state);

  const lightScaler = 1; // This is for the lighting since some colors come out darker.

  const dracoLoader = useMemo(() => {
    const loader = new DRACOLoader();
    loader.setDecoderPath('/draco-gltf/');
    return loader;
  }, []);

  const gltf = useLoader(
    GLTFLoader,
    '/models/porshe_taycan/scene.gltf',
    (loader) => {
      loader.setDRACOLoader(dracoLoader);
    },
  );

  useMemo(() => {
    gltf.materials.corpus1.color.r = (snap.color.r / 255) * lightScaler;
    gltf.materials.corpus1.color.g = (snap.color.g / 255) * lightScaler;
    gltf.materials.corpus1.color.b = (snap.color.b / 255) * lightScaler;
  }, [snap.color]);

  useMemo(() => {
    gltf.materials.corpus1.color.r = (snap.color.r / 255) * lightScaler;
    gltf.materials.corpus1.color.g = (snap.color.g / 255) * lightScaler;
    gltf.materials.corpus1.color.b = (snap.color.b / 255) * lightScaler;

    gltf.scene.position.set(0, -0.035, 0);
    gltf.scene.traverse((object) => {
      if (object instanceof Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
        object.material.envMapIntensity = 20;
      }
    });
  }, [gltf]);

  return <primitive object={gltf.scene} />;
}
