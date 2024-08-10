import React from "react";

import './style.scss';

const AboutText = () => {
    return (
        <>
            <div className="about-text-container">
                <div className="about-text">
                    <img src={require("../../assets/about/img-1.png")} alt="About Text" className="about-text-image" />
                    <img src={require("../../assets/about/img-2.png")} alt="About Text" className="about-text-image-1" />
                    <img src={require("../../assets/about/img-3.png")} alt="About Text" className="about-text-image-2" />
                    <img src={require("../../assets/about/img-4.png")} alt="About Text" className="about-text-image-3" />
                    <div className="about-text-content">
                        <p>"At MAAlana, we're all about crafting sweet memories! From our whimsical lollipops to our delightful candies,
                            join us on a journey of flavor and fun. Welcome to the world of MAAlana – where sweetness is our specialty!"</p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AboutText