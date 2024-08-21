import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './BestSellers.scss';

import { useAuth } from '../../context/AuthContext';

const BestSellers = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
            {
                breakpoint: 1500,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    autoplay: true,
                    autoplaySpeed: 3000,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const products = [
        {
            name: 'Imli Ladoo',
            img: require('../../assets/more-product/img-4.png'),
            price: '₹200',
            bgColor: '#FFD8B7',
        },
        {
            name: 'Green Mango',
            img: require('../../assets/more-product/img-4.png'),
            price: '₹200',
            bgColor: '#E2FFB2',
        },
        {
            name: 'Orange Fruit Katli',
            img: require('../../assets/more-product/img-4.png'),
            price: '₹200',
            bgColor: '#FFD191',
        },
        {
            name: 'Orange Fruit Katli',
            img: require('../../assets/more-product/img-4.png'),
            price: '₹200',
            bgColor: '#FFD191',
        },
         {
            name: 'Orange Fruit Katli',
            img: require('../../assets/more-product/img-4.png'),
            price: '₹200',
            bgColor: '#FFD191',
        },
        // Add more products if needed
    ];
    

    const { userId } = useAuth();

    const handleAddtoCart = () => {
        console.log('Add to cart clicked');
    };

    if (!userId) {
        return null;
    }

    if (products.length === 0) {
        return (
            <div className="more-products">
                <h2>No products found</h2>
            </div>
        );
    }

    return (
        <div className="more-products">
            <h2>Best Sellers</h2>
            <div className='more'>
                <Slider {...settings}>
                    {products.map((product, index) => (
                        <>
                            <div key={index} className="product-slide">
                                <div className="product-circle" style={{ backgroundColor: product.bgColor }}>
                                    <div className='product-center-image'>
                                        <img src={product.img} alt={product.name} className="product-image" />
                                    </div>
                                    <p className="lollipop-name">{product.name}</p>
                                    <p className="lollipop-price">{product.price}</p>
                                    <button className="lollipop-button" onClick={handleAddtoCart}>
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default BestSellers;
