import React, { useEffect, useState } from 'react';
import './style.scss';

const WelcomeBanner = () => {
    const [bgColor, setBgColor] = useState(require('../../assets/banner/img-1.png'));
    const [scrollY, setScrollY] = useState(0);

    const handleScroll = () => {
        setScrollY(window.scrollY);
        if (window.scrollY > 0) {
            setBgColor(require('../../assets/banner/img-2.png'));
        } else {
            setBgColor(require('../../assets/banner/img-1.png'));
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <div className="banner">
                <img
                    className="product-image product-image1"
                    src={require('../../assets/products/img-1.png')}
                    alt="Product"
                    style={{ transform: `translate(${scrollY * 0.5}px, ${scrollY * 0.5}px)`, opacity: scrollY > 0 ? 1 : 0 }}
                />
                <img
                    className="product-image product-image2"
                    src={require('../../assets/products/img-2.png')}
                    alt="Product 2"
                    style={{
                        transform: `translate(${-scrollY * 0.5}px, ${scrollY * 0.5}px)`,
                        opacity: scrollY > 0 ? 1 : 0
                    }}
                />
                <div className="banner-container">
                    <div className="banner-content">
                        <div className="banner-text">
                            <img src={bgColor}
                                alt="welcome"
                            />
                        </div>
                    </div>
                </div>
                <img
                className="product-image product-image3"
                src={require('../../assets/products/img-4.png')}
                alt="Product 3"
                style={{
                    transform: `translate(${scrollY * 0.5}px, ${-scrollY * 0.5}px)`,
                    opacity: scrollY > 0 ? 1 : 0
                }}
            />
             <img
                className="product-image product-image4"
                src={require('../../assets/products/img-3.png')}
                alt="Product 4"
                style={{
                    transform: `translate(${scrollY * -0.5}px, ${scrollY * -0.5}px)`,
                    opacity: scrollY > 0 ? 1 : 0
                }}
            />
            </div>
        </>
    );
};

export default WelcomeBanner;
