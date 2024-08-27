// import React from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import './Banner.scss';

// const BannerSlider = ({ banners }) => {
//     const settings = {
//         dots: true,
//         infinite: true,
//         speed: 500,
//         slidesToShow: 1, // Show one banner at a time
//         slidesToScroll: 1,
//         arrows: true,
//         autoplay: true,
//         autoplaySpeed: 3000,
//     };

//     return (
//         <div className="banner-slider">
//             <Slider {...settings}>
//                 {banners.map((banner, index) => (
//                     <div key={index} className="banner-slide">
//                         <img
//                             src={banner.img}
//                             alt={banner.title}
//                             className="banner"
//                         />
//                         {/* <div className="banner-title">{banner.title}</div> */}
//                     </div>
//                 ))}
//             </Slider>
//         </div>
//     );
// };

// export default BannerSlider;


import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useMediaQuery, useTheme } from '@mui/material';
import './Banner.scss';

const BannerSlider = ({ banners }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isLaptop = useMediaQuery(theme.breakpoints.between('md', 'lg'));
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1, 
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <div className="banner-slider">
            <Slider {...settings}>
                {banners.map((banner, index) => {
                    let selectedImg;

                    if (isDesktop) {
                        selectedImg = banner.img;
                    } else if (isLaptop) {
                        selectedImg = banner.imgLaptop;
                    } else if (isTablet) {
                        selectedImg = banner.imgTablet;
                    } else if (isMobile) {
                        selectedImg = banner.imgMobile;
                    }

                    return (
                        <div key={index} className="banner-slide">
                            <img
                                src={selectedImg}
                                alt={banner.title}
                                className="banner"
                            />
                            {/* <div className="banner-title">{banner.title}</div> */}
                        </div>
                    );
                })}
            </Slider>
        </div>
    );
};

export default BannerSlider;
