/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import React from 'react';
import './CustomButton.css';

// This component is a custom component that makes a button with the custom look and is adaptive to
// what the user needs.
function CustomButton({ title, handleClick, style }) {
  return (
    <button className="custom-button" onClick={handleClick} type="button" aria-label="Customize" style={{ ...style }}>
      {title}
    </button>
  );
}

export default CustomButton;
