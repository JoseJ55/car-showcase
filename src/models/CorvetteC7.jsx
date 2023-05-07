/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useMemo, useEffect } from 'react';

// Three.js elements
import { useFrame, useLoader } from '@react-three/fiber';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import {
  Mesh,
  Vector3,
  // CatmullRomCurve3
} from 'three';

// State management
import { useSnapshot } from 'valtio';
import state from '../store';

// based on "Chevrolet Corvette (C7)" (https://sketchfab.com/3d-models/chevrolet-corvette-c7-2b509d1bce104224b147c81757f6f43a)
// by Martin Trafas (https://sketchfab.com/Bexxie) licensed under CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
export default function CorvetteC7() {
  const snap = useSnapshot(state);

  const lightScaler = 2.5; // This is for the lighting since some colors come out darker.

  const dracoLoader = useMemo(() => {
    const loader = new DRACOLoader();
    loader.setDecoderPath('/draco-gltf/');
    return loader;
  }, []);

  const gltf = useLoader(
    GLTFLoader,
    '/models/corvette_c7/scene.gltf',
    (loader) => {
      loader.setDRACOLoader(dracoLoader);
    },
  );

  useMemo(() => {
    gltf.materials.Car_Paint.color.r = (snap.color.r / 255) * lightScaler;
    gltf.materials.Car_Paint.color.g = (snap.color.g / 255) * lightScaler;
    gltf.materials.Car_Paint.color.b = (snap.color.b / 255) * lightScaler;
  }, [snap.color]);

  useFrame((s, delta) => {
    if (snap.moveCar) { // Animation to change to another vehicle.
      const t = s.clock.getElapsedTime();
      const speed = 5;

      const group = gltf.scene.children[0].children[0].children[0];
      group.children[0].rotation.x = t * speed;
      group.children[2].rotation.x = t * speed;
      group.children[4].rotation.x = t * speed;
      group.children[6].rotation.x = t * speed;

      const direction = new Vector3(0, 0, 1); // (0.2, -0.035, 0)

      gltf.scene.position.addScaledVector(direction, speed * delta);
    }

    if (snap.newCar) { // Animation to move the vehicle on screen.
      // starting position (6, -0.035, -10)
      const t = s.clock.getElapsedTime();
      const speed = 10;

      const group = gltf.scene.children[0].children[0].children[0];
      group.children[0].rotation.x = t * speed;
      group.children[2].rotation.x = t * speed;
      group.children[4].rotation.x = t * speed;
      group.children[6].rotation.x = t * speed;

      const direction = new Vector3(0, 0, 1);
      // const startPosition = new Vector3(6, -0.035, -10);
      const targetPosition = new Vector3(0, -0.035, 0);

      gltf.scene.position.addScaledVector(direction, speed * delta);

      // ******************************************************************************
      // These are for making a curve.

      // const curve = new CatmullRomCurve3([
      //   targetPosition,
      //   new Vector3(targetPosition.x - 5, targetPosition.y, targetPosition.z - 1),
      //   new Vector3(startPosition.x - 2, startPosition.y, startPosition.z - 1),
      //   startPosition,
      // ]);

      // const curve = new CatmullRomCurve3([
      //   startPosition,
      //   // new Vector3(3, startPosition.y, -5),
      //   new Vector3(1, startPosition.y, -5),
      //   // new Vector3(startPosition.x - 1, startPosition.y, startPosition.z + 1),
      //   new Vector3(2, startPosition.y, -3),
      //   targetPosition,
      //   // new Vector3(-5, 0, 0),
      //   // new Vector3(0, 0, 0),
      //   // new Vector3(5, 0, 0),
      //   // new Vector3(10, 0, 0),
      // ]);

      // // const positionOnCurve = curve.getPointAt((t * speed) / 100);
      // const positionOnCurve = curve.getPoint((t * speed) / 100);
      // // console.log('po ', positionOnCurve);

      // gltf.scene.position.copy(positionOnCurve);

      // console.log(positionOnCurve.distanceTo(targetPosition));
      // if (positionOnCurve.distanceTo(targetPosition) < 0.01) {

      // *****************************************************************

      if (gltf.scene.position.z >= targetPosition.z) {
        state.moveCar = false;
        state.newCar = false;
      }

      setTimeout(() => {
        state.moveCar = false;
        state.newCar = false;
      }, 5000);
    }
  });

  useEffect(() => {
    let clearTime;

    if (snap.moveCar) {
      clearTime = setTimeout(() => {
        gltf.scene.position.set(0, -0.035, -10);
        // gltf.scene.position.set(6, -0.035, -10); // This is used for the curve.
        state.moveCar = false;
        state.newCar = true;
      }, 5000);
    }

    return () => {
      clearTimeout(clearTime);
    };
  }, [snap.moveCar]);

  useMemo(() => {
    // Need this is the model for the corvette is not scaled right.
    gltf.scene.scale.set(0.0055, 0.0055, 0.0055);
    gltf.materials.Car_Paint.color.r = (snap.color.r / 255) * lightScaler;
    gltf.materials.Car_Paint.color.g = (snap.color.g / 255) * lightScaler;
    gltf.materials.Car_Paint.color.b = (snap.color.b / 255) * lightScaler;

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
