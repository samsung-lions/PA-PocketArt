import React from 'react';
import ReactLoading from 'react-loading';

const Spinner = () => (
  <div className="back-drop">
    <ReactLoading type="spin" color="#FFD400" height={100} width={100} />
  </div>
);

export default Spinner;
