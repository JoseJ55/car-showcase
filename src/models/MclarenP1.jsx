/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useMemo, useEffect, useRef } from 'react';

// Three.js elements
import { useLoader, useFrame } from '@react-three/fiber';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Mesh, Vector3 } from 'three';

// State management
import { useSnapshot } from 'valtio';
import state from '../store';

// based on "Chevrolet Corvette (C7)" (https://sketchfab.com/3d-models/chevrolet-corvette-c7-2b509d1bce104224b147c81757f6f43a)
// by Martin Trafas (https://sketchfab.com/Bexxie) licensed under CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
export default function MclarenP1() {
  const snap = useSnapshot(state);

  const lightScaler = 1.2; // This is for the lighting since some colors come out darker.

  const shouldAnimate = useRef(false);

  const dracoLoader = useMemo(() => {
    const loader = new DRACOLoader();
    loader.setDecoderPath('/draco-gltf/');
    return loader;
  }, []);

  const gltf = useLoader(
    GLTFLoader,
    '/models/mclaren_p1/scene.gltf',
    (loader) => {
      loader.setDRACOLoader(dracoLoader);
    },
  );

  useMemo(() => {
    gltf.materials.Carpaint.color.r = (snap.color.r / 255) * lightScaler;
    gltf.materials.Carpaint.color.g = (snap.color.g / 255) * lightScaler;
    gltf.materials.Carpaint.color.b = (snap.color.b / 255) * lightScaler;
  }, [snap.color]);

  useEffect(() => {
    if (snap.newCar || snap.moveCar) {
      shouldAnimate.current = true;
    }
  }, [snap.newCar, snap.moveCar]);

  useFrame((s, delta) => {
    if (!shouldAnimate.current) {
      return;
    }

    if (snap.moveCar) { // Animation to change to another vehicle.
      const t = s.clock.getElapsedTime();
      const speed = 5;

      const group = gltf.scene.children[0].children[0].children[0].children[0];
      group.children[0].rotation.x = t * speed;
      group.children[7].rotation.x = t * speed;
      group.children[12].rotation.x = t * speed;
      group.children[31].rotation.x = t * speed;

      const direction = new Vector3(0, 0, 1); // (0.2, -0.035, 0)

      gltf.scene.position.addScaledVector(direction, speed * delta);
    }

    if (snap.newCar) { // Animation to move the vehicle on screen.
      const t = s.clock.getElapsedTime();
      const speed = 10;

      const group = gltf.scene.children[0].children[0].children[0].children[0];
      group.children[0].rotation.x = t * speed;
      group.children[7].rotation.x = t * speed;
      group.children[12].rotation.x = t * speed;
      group.children[31].rotation.x = t * speed;

      const direction = new Vector3(0, 0, 1);

      gltf.scene.position.addScaledVector(direction, speed * delta);
    }

    if (gltf.scene.position.z >= 0 && (snap.newCar || snap.moveCar)) {
      state.newCar = false;
      state.moveCar = false;
      shouldAnimate.current = false;
    }
  });

  useMemo(() => {
    gltf.scene.scale.set(0.9, 0.9, 0.9);
    gltf.materials.Carpaint.color.r = (snap.color.r / 255) * lightScaler;
    gltf.materials.Carpaint.color.g = (snap.color.g / 255) * lightScaler;
    gltf.materials.Carpaint.color.b = (snap.color.b / 255) * lightScaler;

    // gltf.scene.position.set(0, -0.035, 0);
    gltf.scene.position.set(0, -0.035, -10);
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
