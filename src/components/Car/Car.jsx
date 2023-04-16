/* eslint-disable react/no-unknown-property */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect } from 'react';

// Three.js elements
import { useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Mesh } from 'three';

// State management
import { useSnapshot } from 'valtio';
import state from '../../store';

// based on "Chevrolet Corvette (C7)" (https://sketchfab.com/3d-models/chevrolet-corvette-c7-2b509d1bce104224b147c81757f6f43a)
// by Martin Trafas (https://sketchfab.com/Bexxie) licensed under CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
export default function Car() {
  const snap = useSnapshot(state);

  const gltf = useLoader(
    GLTFLoader,
    '/models/car/scene.gltf',
  );

  useEffect(() => {
    gltf.materials.Car_Paint.color.r = snap.color.r;
    gltf.materials.Car_Paint.color.g = snap.color.g;
    gltf.materials.Car_Paint.color.b = snap.color.b;
  }, [state.color]);

  useEffect(() => {
    gltf.scene.scale.set(0.005, 0.005, 0.005);
    gltf.scene.position.set(0, -0.035, 0);
    gltf.scene.traverse((object) => {
      if (object instanceof Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
        object.material.envMapIntensity = 20;
      }
    });
  }, [gltf]);

  // Animates the wheels
  //   useFrame((state, delta) => {
  //     const t = state.clock.getElapsedTime();

  //     const group = gltf.scene.children[0].children[0].children[0];
  //     group.children[0].rotation.x = t * 2;
  //     group.children[2].rotation.x = t * 2;
  //     group.children[4].rotation.x = t * 2;
  //     group.children[6].rotation.x = t * 2;
  //   });

  return <primitive object={gltf.scene} />;
}
