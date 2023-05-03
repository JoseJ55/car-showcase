import React from 'react';
import './Loading.css';

// import loadingIcon from '/Double-Ring-1.4s-200px.svg';

// This is the main loading page for when everything is loading.
function Loading() {
  return (
    <div id="loading">
      {/* <img src={loadingIcon} alt="Loading Icon" /> */}
      <p id="loadingText">Loading...</p>
    </div>
  );
}

export default Loading;
