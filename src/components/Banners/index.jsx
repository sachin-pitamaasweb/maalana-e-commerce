import React from "react";
import './style.scss';

const Banners = ({ img = "https://via.placeholder.com/800x400", title = "Sample Banner" }) => {
    return (
        <div className="banner-container">
            <img 
                src={img}
                alt={title}
                className="banner"
            />
        </div>
    );
};

export default Banners;
