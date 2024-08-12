import React, { useState } from 'react';
import Slider from 'react-slider';
import './style.scss'; // Import your SCSS file for styling

const RangeSlider = () => {
    // State to keep track of the slider values
    const [values, setValues] = useState([40, 200]);

    // Handler for slider value change
    const handleChange = (newValues) => {
        setValues(newValues);
    };

    return (
        <div className="price-range-slider">
            <Slider
                className="range-bar"
                value={values}
                onChange={handleChange}
                min={40}
                max={1000}
                ariaLabel={['Lower thumb', 'Upper thumb']}
                thumbClassName="ui-slider-handle"
                trackClassName="ui-slider-range"
            />
             <p className="range-value">
               <div className="value-div">
               <input
                    type="text"
                    value={`₹${values[0]}`}
                    readOnly
                    className='value-1'
                />
                <input
                    type="text"
                    value={`₹${values[1]}`}
                    readOnly
                    className='value-2'
                />
               </div>
            </p>
        </div>
    );
};

export default RangeSlider;
