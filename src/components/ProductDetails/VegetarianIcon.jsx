import React from 'react';
import PropTypes from 'prop-types';

const VegetarianIcon = ({
  width = 49,
  height = 49,
  backgroundColor = 'white',
  borderColor = '#00B618',
  circleColor = '#00B618',
  style = {},
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 49 49"
    fill="none"
    style={{
      width: `${width}px`,
      height: `${height}px`,
      flexShrink: 0,
      ...style,
    }}
  >
    <rect
      x="1.5"
      y="1.5"
      width={width - 3}
      height={height - 3}
      rx="3.5"
      fill={backgroundColor}
      stroke={borderColor}
      strokeWidth="3"
    />
    <circle
      cx={width / 2}
      cy={height / 2}
      r={(Math.min(width, height) - 24) / 2} // Adjusts radius based on width/height
      fill={circleColor}
    />
  </svg>
);

VegetarianIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  backgroundColor: PropTypes.string,
  borderColor: PropTypes.string,
  circleColor: PropTypes.string,
  style: PropTypes.object,
};

export default VegetarianIcon;
