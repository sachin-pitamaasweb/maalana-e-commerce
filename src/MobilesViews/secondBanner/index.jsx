import React, { useEffect, useState } from 'react';
import './style.scss';

const BlurBanner = () => {
    const [bgImage, setBgImage] = useState(require('../../assets/banner/img-1.png'));
    const [scrollY, setScrollY] = useState(0);

    const handleScroll = () => {
        setScrollY(window.scrollY);
        if (window.scrollY > 0) {
            setBgImage(require('../../assets/banner/img-2.png'));
        } else {
            setBgImage(require('../../assets/banner/img-1.png'));
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="snd-banner">
            <img
                className="banner-image top-left"
                src={require('../../assets/products/2-img-1.png')}
                alt="Top Left"
                style={{
                    transform: `scale(${1 + scrollY * 0.001})`, // Zoom-in effect
                }}
            />
            <img
                className="banner-image top-right"
                src={require('../../assets/products/2-img-2.png')}
                alt="Top Right"
                style={{
                    transform: `scale(${1 + scrollY * 0.001})`, // Zoom-in effect
                }}
            />
            <img
                className="banner-image bottom-left"
                src={require('../../assets/products/2-img-3.png')}
                alt="Bottom Left"
                style={{
                    transform: `scale(${1 + scrollY * 0.001})`, // Zoom-in effect
                }}
            />
            <img
                className="banner-image bottom-right"
                src={require('../../assets/products/2-img-4.png')}
                alt="Bottom Right"
                style={{
                    transform: `scale(${1 + scrollY * 0.001})`, // Zoom-in effect
                }}
            />
            <div className="banner-content">
                <div className="banner-text">
                    <img src={bgImage} alt="Welcome" />
                </div>
            </div>
        </div>
    );
};

export default BlurBanner;
