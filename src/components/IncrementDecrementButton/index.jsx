import React, { useState } from 'react';
import './style.scss';

const IncrementDecrementButton = () => {
    const [count, setCount] = useState(1);

    const handleIncrement = () => {
        setCount(count + 1);
    };

    const handleDecrement = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };

    return (
        <div className="counter">
            <button className="counter-button decrement" onClick={handleDecrement}>-</button>
            <span className="counter-value">{count}</span>
            <button className="counter-button increment" onClick={handleIncrement}>+</button>
        </div>
    );
};

export default IncrementDecrementButton;
