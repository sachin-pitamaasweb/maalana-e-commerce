import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './style.scss';

const FifthBanner = () => {
    const [scrollY, setScrollY] = useState(0);

    const handleScroll = () => {
        setScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        // Initialize AOS
        AOS.init({
            duration: 1000, // duration of the animations in milliseconds
            once: true, // whether animation should happen only once - while scrolling down
        });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="fifth-banner">
            <img
                className="fifth-top-center fifth-product-image"
                src={require('../../assets/products/2-img-3.png')}
                alt="Top Product"
                data-aos="zoom-in" 
                style={{
                    transform: `scale(${0.2 + scrollY * 0.001})`, // Zoom-in effect
                }}
            />
            <img
                className="fifth-mid-center fifth-cloud-image"
                src={require('../../assets/products/cloud-1.png')}
                alt="Cloud"
            />
            <div className="fifth-mid-center fifth-product-images">
                <img
                    className="fifth-mid-product"
                    src={require('../../assets/products/5-img-4.png')}
                    alt="Mid Product 1"
                    data-aos="zoom-in"
                />
                <img
                    className="fifth-mid-product"
                    src={require('../../assets/products/5-img-3.png')}
                    alt="Mid Product 2"
                    data-aos="zoom-in"
                />
                <img
                    className="fifth-mid-product"
                    src={require('../../assets/products/5-img-2.png')}
                    alt="Mid Product 3"
                    data-aos="zoom-in"
                />
                <img
                    className="fifth-mid-product"
                    src={require('../../assets/products/5-img-1.png')}
                    alt="Mid Product 4"
                     data-aos="zoom-in"
                />
            </div>
            <img
                className="fifth-bottom-center fifth-view-more-image"
                src={require('../../assets/products/view-more.png')}
                alt="View More"
                style={{
                    transform: `scale(${1 + scrollY * 0.001})`, // Zoom-in effect
                }}
            />
        </div>
    );
};

export default FifthBanner;
