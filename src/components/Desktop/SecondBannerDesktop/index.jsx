import React, { useState, useEffect } from "react";
import "./style.scss";

const SecondBannerDesktop = () => {
    const [zoomClass, setZoomClass] = useState("");

    const handleScroll = () => {
        const scrollPosition = window.scrollY;
        if (scrollPosition > 500) {
            setZoomClass("zoom-in");
        } else {
            setZoomClass("zoom-out");
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className={`second-banner-Desktop ${zoomClass}`}>
            <img
                src={require('../../../assets/desktop-banner/img-4.png')}
                alt="Welcome Banner"
                className="second-banner-image"
            />
        </div>
    );
};

export default SecondBannerDesktop;
