/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import React, { lazy, Suspense, useEffect } from 'react';

import { useSnapshot } from 'valtio';
import state from './store';

import Loading from './pages/Loading/Loading';

// Main Pages
const Home = lazy(() => import('./pages/Home/Home'));
const Customizer = lazy(() => import('./pages/Customizer/Customizer'));

// Custom components
const AnimationCanvas = lazy(() => import('./components/AnimationCanvas/AnimationCanvas'));

function App() {
  const snap = useSnapshot(state);

  useEffect(() => {
    if (snap.loaded.elements && snap.loaded.models) {
      state.loaded.all = true;
    }
  }, [snap.loaded]);

  return (
    <main className="App">
      { !snap.loaded.all ? <Loading /> : null }

      <Suspense fallback={null}>
        <AnimationCanvas />
      </Suspense>

      <Home />
      <Customizer />
    </main>
  );
}

export default App;
