import React, { useEffect, useState } from 'react';
import './style.scss';

const FourthBanner = () => {
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
        <div className="fourth-banner">
            <img
                className="fourth-top-center fourth-product-image"
                src={require('../../assets/products/2-img-2.png')}
                alt="Top Product"
                data-aos="zoom-in" 
               style={{
                        transform: `scale(${0.2 + scrollY * 0.001})`, // Zoom-in effect
                    }}
            />
            <img
                className="fourth-mid-center fourth-cloud-image"
                src={require('../../assets/products/cloud-1.png')}
                alt="Cloud"
            />
            <div className="fourth-mid-center fourth-product-images">
                <img
                    className="fourth-mid-product"
                    src={require('../../assets/products/4-img-4.png')}
                    alt="Mid Product 1"
                     data-aos="fade-up"
                    // style={{
                    //     transform: `scale(${1 + scrollY * 0.001})`, // Zoom-in effect
                    // }}
                />
                <img
                    className="fourth-mid-product"
                    src={require('../../assets/products/4-img-3.png')}
                    alt="Mid Product 2"
                    data-aos="fade-right"
                    // style={{
                    //     transform: `scale(${1 + scrollY * 0.001})`, // Zoom-in effect
                    // }}
                />
                <img
                    className="fourth-mid-product"
                    src={require('../../assets/products/4-img-2.png')}
                    alt="Mid Product 3"
                    data-aos="fade-right"
                />
                 <img
                    className="fourth-mid-product"
                    src={require('../../assets/products/4-img-1.png')}
                    alt="Mid Product 3"
                    data-aos="fade-right"
                />
            </div>
            <img
                className="fourth-bottom-center fourth-view-more-image"
                src={require('../../assets/products/view-more.png')}
                alt="View More"
                
                style={{
                    transform: `scale(${1 + scrollY * 0.001})`, // Zoom-in effect
                }}
            />
        </div>
    );
};

export default FourthBanner;
