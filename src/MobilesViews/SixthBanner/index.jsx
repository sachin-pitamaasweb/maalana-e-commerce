import React, { useEffect, useState } from 'react';
import './style.scss';

const SixthBanner = () => {
    const [scrollY, setScrollY] = useState(0);

    const handleScroll = () => {
        setScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="third-banner">
            <img
                className="top-center product-image"
                src={require('../../assets/products/2-img-4.png')}
                alt="Top Product"
                style={{
                    transform: `scale(${scrollY * 0.001})`, // Zoom-in effect
                }}
            />
            <img
                className="mid-center cloud-image"
                src={require('../../assets/products/cloud-1.png')}
                alt="Cloud"
                // style={{
                //     transform: `translateY(${scrollY * 0.5}px)`,
                // }}
            />
            <div className="mid-center product-images">
                <img
                    className="mid-product"
                    src={require('../../assets/products/6-img-1.png')}
                    alt="Mid Product 1"
                    style={{
                        transform: `scale(${scrollY * 0.001})`, // Zoom-in effect
                    }}
                />
                <img
                    className="mid-product"
                    src={require('../../assets/products/6-img-2.png')}
                    alt="Mid Product 2"
                    style={{
                        transform: `scale(${1 + scrollY * 0.001})`, // Zoom-in effect
                    }}
                />
                <img
                    className="mid-product"
                    src={require('../../assets/products/6-img-3.png')}
                    alt="Mid Product 3"
                    style={{
                        transform: `scale(${scrollY * 0.001})`, // Zoom-in effect
                    }}
                />
            </div>
            <img
                className="bottom-center view-more-image"
                src={require('../../assets/products/view-more.png')}
                alt="View More"
                style={{
                    transform: `scale(${scrollY * 0.001})`, // Zoom-in effect
                }}
            />
        </div>
    );
};

export default SixthBanner;
