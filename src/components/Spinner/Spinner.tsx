import React from 'react';
import ReactLoading from 'react-loading';

const Spinner = () => (
  <div style={spinnerContainerStyle}>
    <ReactLoading type="spin" color="#FFD400" height={100} width={100} />
  </div>
);

const spinnerContainerStyle: React.CSSProperties = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 50
};

export default Spinner;
