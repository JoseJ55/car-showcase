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
import state from '../../store';

// based on "Chevrolet Corvette (C7)" (https://sketchfab.com/3d-models/chevrolet-corvette-c7-2b509d1bce104224b147c81757f6f43a)
// by Martin Trafas (https://sketchfab.com/Bexxie) licensed under CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
export default function Car() {
  const snap = useSnapshot(state);

  const dracoLoader = useMemo(() => {
    const loader = new DRACOLoader();
    loader.setDecoderPath('/draco-gltf/');
    return loader;
  }, []);

  // 'corvette_c7', 'mclaren_p1', porshe_taycan'
  const gltf = useLoader(
    GLTFLoader,
    `/models/${snap.currentVehicle}/scene.gltf`,
    (loader) => {
      loader.setDRACOLoader(dracoLoader);
    },
  );

  // useMemo(() => {
  //   gltf.materials.Car_Paint.color.r = snap.color.r;
  //   gltf.materials.Car_Paint.color.g = snap.color.g;
  //   gltf.materials.Car_Paint.color.b = snap.color.b;
  // }, [state.color]);

  useMemo(() => {
    if (snap.currentVehicle === 'corvette_c7') gltf.scene.scale.set(0.005, 0.005, 0.005); // Need this is the model for the corvette is not scaled right.
    else gltf.scene.scale.set(0.95, 0.95, 0.95);

    gltf.scene.position.set(0, -0.035, 0);
    gltf.scene.traverse((object) => {
      if (object instanceof Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
        object.material.envMapIntensity = 10;
      }
    });
  }, [gltf]);

  return <primitive object={gltf.scene} />;
}
