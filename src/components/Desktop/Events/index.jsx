import React, { useState, useEffect } from "react";
import "./style.scss";

const Events = () => {
    const [imageSrc, setImageSrc] = useState(null); // Initially set to null

    const getDefaultImageSrc = (screenWidth) => {
        if (screenWidth >= 1101) {
            return require('../../../assets/desktop-banner/e-1.png');
        } else if (screenWidth >= 600 && screenWidth <= 950) {
            return require('../../../assets/desktop-banner/e-1.png');
        } else if (screenWidth >= 325 && screenWidth < 600) {
            return require('../../../assets/desktop-banner/e-1.png');
        } else {
            return require('../../../assets/desktop-banner/e-1.png'); // Fallback for very small screens
        }
    };

    const updateImageSrcOnScroll = () => {
        const scrollPosition = window.scrollY;
        const screenWidth = window.innerWidth;

        if (scrollPosition > 0) {
            if (screenWidth >= 1101) {
                setImageSrc(require('../../../assets/desktop-banner/e-1.png'));
            } else if (screenWidth >= 600 && screenWidth <= 950) {
                setImageSrc(require('../../../assets/desktop-banner/e-1.png'));
            }  else if(screenWidth >= 951 && screenWidth < 1100) {
                setImageSrc(require('../../../assets/desktop-banner/e-1.png'));
            }
            else if (screenWidth >= 325 && screenWidth < 600) {
                setImageSrc(require('../../../assets/desktop-banner/e-1.png'));
            }
        } else {
            setImageSrc(getDefaultImageSrc(screenWidth)); // Set back to default on scroll reset
        }
    };

    useEffect(() => {
        // Set the initial default image based on screen width
        setImageSrc(getDefaultImageSrc(window.innerWidth));

        // Add scroll and resize event listeners
        window.addEventListener("scroll", updateImageSrcOnScroll);
        window.addEventListener("resize", () => {
            setImageSrc(getDefaultImageSrc(window.innerWidth));
        });

        return () => {
            window.removeEventListener("scroll", updateImageSrcOnScroll);
            window.removeEventListener("resize", () => {
                setImageSrc(getDefaultImageSrc(window.innerWidth));
            });
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="events-Desktop">
            <img
                src={imageSrc}
                alt="Welcome Banner"
                className="events-image"
            />
        </div>
    );
};

export default Events;
