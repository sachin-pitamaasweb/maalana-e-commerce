import React from "react";
import './style.css';

const Banners = ({ title = "Sample Banner", img="https://via.placeholder.com/1900x400?text=Desktop+Banner" }) => {
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
