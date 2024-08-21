import React from 'react';
import './style.scss'; // Import your SCSS file

const OverlayImage = () => {
  return (
    <div className="container">
      <img src={require('../../assets/Every/img-2.png')} alt="Overlay" className="rounded-image" />
    </div>
  );
};

export default OverlayImage;
