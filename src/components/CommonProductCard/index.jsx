// import React from 'react';
// import { Typography, Button } from '@mui/material';

// import './CommonProductCard.scss';

// const CommonProductCard = ({ title, products, handleAddToCart}) => {
//     return (
//         <>
//          <div className="best-sellers">
//             <Typography variant="h4" className="best-sellers-title">
//                {title}
//             </Typography>
//             <div className="best-sellers-items">
//                 {products.map((product) => (
//                     <div className="best-sellers-item-circle" key={product.id}>
//                         <div className="best-sellers-item-image-container" style={{ backgroundColor: product.backgroundColor }} >
//                            <div className="best-sellers-item-image"> 
//                             <img src={product.image} alt={product.name} />
//                             </div>
//                             <p className="best-sellers-item-name">{product.name}</p>
//                             <p className="best-sellers-item-price">{product.price}</p>
//                            <div className="best-sellers-item-image">
//                            <Button variant="contained" color="primary" onClick={() => handleAddToCart(product)}>
//                                 Add to Cart
//                             </Button>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//         </>
//     );
// };
// export default CommonProductCard;


import React from 'react';
import { Typography, Button } from '@mui/material';
import Slider from 'react-slick';
import './CommonProductCard.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CommonProductCard = ({ title, products, handleAddToCart }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 1000,
        slidesToShow: 3, // Show 3 products at a time by default
        slidesToScroll: 1,
        arrows: true,
        responsive: [
            {
                breakpoint: 768, // For tablets and smaller
                settings: {
                    slidesToShow: 2, // Show 2 products at a time
                },
            },
            {
                breakpoint: 480, // For mobile devices
                settings: {
                    slidesToShow: 1, // Show 1 product at a time
                    arrows: false, // Hide arrows for mobile for cleaner UI
                },
            },
        ],
    };

    return (
        <div className="best-sellers">
            <Typography variant="h4" className="best-sellers-title">
                {title}
            </Typography>
            <Slider {...settings} className="best-sellers-slider">
                {products.map((product) => (
                    <div className="best-sellers-item-circle" key={product.id}>
                        <div
                            className="best-sellers-item-image-container"
                            style={{ backgroundColor: product.backgroundColor }}
                        >
                            <div className="best-sellers-item-image">
                                <img src={product.image} alt={product.name} />
                            </div>
                            <p className="best-sellers-item-name">
                                {product.name}
                            </p>
                            <p className="best-sellers-item-price">
                                {product.price}
                            </p>
                            <div className="best-sellers-item-image">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleAddToCart(product)}
                                >
                                    Add to Cart
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default CommonProductCard;
