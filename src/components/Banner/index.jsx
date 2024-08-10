// import React from "react";

// import './Banner.scss';

// const Banner = ({ img, title }) => {
//     return (
//         <>
//          <div className="banner-container">
//             <img 
//              src={img}
//              alt={title}
//              className="banner"
//             />
//          </div>
//         </>
//     );
// };
// export default Banner;

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Banner.scss';

const BannerSlider = ({ banners }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1, // Show one banner at a time
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <div className="banner-slider">
            <Slider {...settings}>
                {banners.map((banner, index) => (
                    <div key={index} className="banner-slide">
                        <img
                            src={banner.img}
                            alt={banner.title}
                            className="banner"
                        />
                        {/* <div className="banner-title">{banner.title}</div> */}
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default BannerSlider;
