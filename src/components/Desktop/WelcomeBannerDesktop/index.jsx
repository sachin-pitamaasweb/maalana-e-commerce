// import React, { useEffect, useState } from 'react';
// import './style.scss';

// import Imag1 from '../../../assets/products/img-1.png';
// import Imag2 from '../../../assets/products/img-2.png';
// import Imag3 from '../../../assets/products/img-3.png';
// import Imag4 from '../../../assets/products/img-4.png';

// //bg 
// import Bg from '../../../assets/desktop-banner/img.png';
// import Bg2 from '../../../assets/desktop-banner/img-5.jpeg  ';

// const WelcomeBannerDesktop = () => {
//   const [scrollY, setScrollY] = useState(0);
//   const [bgImage, setBgImage] = useState(Bg);

//   const handleScroll = () => {
//     setScrollY(window.scrollY);
//     if (window.scrollY > 0) {
//       setBgImage(Bg2);
//     } else {
//       setBgImage(Bg);
//     }
//   };

//   useEffect(() => {
//     window.addEventListener('scroll', handleScroll);

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);


//   const getTransformValue = (initial, direction) => {
//     const factor = 0.4; // 40% scroll pass-through
//     const translate = scrollY * factor * direction;
//     return `translate(${translate}px, ${translate}px)`;
//   };

//   return (
//     <div 
//     className={`container-desktop ${scrollY > 0 ? 'scrolled' : ''}`}
//     style={{ backgroundImage: `url(${bgImage})`, backgroundColor: '#B9D514' }}
//     >
//       <img
//         className="item item1"
//         src={Imag1}
//         alt="Item 1"
//         style={{ transform: getTransformValue(-40, 1) }}
//       />
//       <img
//         className="item item2"
//         src={Imag2}
//         alt="Item 2"
//         style={{ transform: getTransformValue(-40, -1) }}
//       />
//       <img
//         className="item item3"
//         src={Imag3}
//         alt="Item 3"
//         style={{ transform: getTransformValue(40, 1) }}
//       />
//       <img
//         className="item item4"
//         src={Imag4}
//         alt="Item 4"
//         style={{ transform: getTransformValue(40, -1) }}
//       />
//     </div>
//   );
// };

// export default WelcomeBannerDesktop;


// import React, { useState, useEffect } from "react";
// import "./style.scss";

// const WelcomeBannerDesktop = () => {
//     const [imageSrc, setImageSrc] = useState(
//         require('../../../assets/desktop-banner/img-1.png')
//     );

//     const handleScroll = () => {
//         const scrollPosition = window.scrollY;
//         if (scrollPosition > 0) {
//             setImageSrc(require('../../../assets/desktop-banner/img-3.png'));
//         } else {
//             setImageSrc(require('../../../assets/desktop-banner/img-1.png'));
//         }
//     };

//     useEffect(() => {
//         window.addEventListener("scroll", handleScroll);
//         return () => {
//             window.removeEventListener("scroll", handleScroll);
//         };
//     }, []);

//     return (
//         <div className="banner-Desktop">
//             <img
//                 src={imageSrc}
//                 alt="Welcome Banner"
//                 className="banner-image"
//             />
//         </div>
//     );
// };

// export default WelcomeBannerDesktop;


import React, { useState, useEffect } from "react";
import "./style.scss";

const WelcomeBannerDesktop = () => {
    const [imageSrc, setImageSrc] = useState(null); // Initially set to null

    const getDefaultImageSrc = (screenWidth) => {
        if (screenWidth >= 1101) {
            return require('../../../assets/desktop-banner/img-1.png');
        } else if (screenWidth >= 600 && screenWidth <= 950) {
            return require('../../../assets/desktop-banner/ipad/img-1.png');
        } else if (screenWidth >= 325 && screenWidth < 600) {
            return require('../../../assets/desktop-banner/img-1.png');
        } else {
            return require('../../../assets/desktop-banner/img-1.png'); // Fallback for very small screens
        }
    };

    const updateImageSrcOnScroll = () => {
        const scrollPosition = window.scrollY;
        const screenWidth = window.innerWidth;

        if (scrollPosition > 0) {
            if (screenWidth >= 1101) {
                setImageSrc(require('../../../assets/desktop-banner/img-3.png'));
            } else if (screenWidth >= 600 && screenWidth <= 950) {
                setImageSrc(require('../../../assets/desktop-banner/ipad/img-3.png'));
            }  else if(screenWidth >= 951 && screenWidth < 1100) {
                setImageSrc(require('../../../assets/desktop-banner/ipad/img-3.png'));
            }
            else if (screenWidth >= 325 && screenWidth < 600) {
                setImageSrc(require('../../../assets/desktop-banner/mobile/img-1.png'));
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
        <div className="banner-Desktop">
            <img
                src={imageSrc}
                alt="Welcome Banner"
                className="banner-image"
            />
        </div>
    );
};

export default WelcomeBannerDesktop;
