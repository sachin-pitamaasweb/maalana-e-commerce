import React from 'react';
import './style.scss';

import candy from '../../assets/styled-box/s-1.svg';
import tasty from '../../assets/styled-box/s-2.svg';
import sweet from '../../assets/styled-box/s-3.svg';

// const dummyImage = 'https://via.placeholder.com/150';

const StyledBox = () => {
  return (
    <div className="styled-box">
      <div className="label candy"><img src={candy} alt="" className="candy-img1" /></div>
      <div className="label tasty"><img src={tasty} alt="" className="tasty-img2" /></div>
      <div className="label sweet"><img src={sweet} alt="" className="sweet-img3" /></div>
      <div className="content">
        Founded in 2019 by Naveen Anand, Maalana is a dynamic Indian consumer goods company
        committed to excellence. With a deep understanding of our consumer base, we thrive on
        delivering hygienic, high-quality products that cater to various needs and preferences.
      </div>
    </div>
  );
};

export default StyledBox;
