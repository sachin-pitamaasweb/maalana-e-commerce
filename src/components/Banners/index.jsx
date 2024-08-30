import React from "react";
import './style.css';

const Banners = ({ title = "Sample Banner", img }) => {
    console.log(img);
    return (
        <div className="banner-container">
            <img 
                src='https://res.cloudinary.com/dtivafy25/image/upload/v1725013322/b-2_ger1wf.png'
                alt={title}
                className="banner"
            />
        </div>
    );
};

export default Banners;
