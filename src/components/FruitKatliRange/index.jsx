import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './style.scss';

const FruitKatliRange = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 300000,
        responsive: [
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
    ];

    return (
        <div className="more-products">
            <h2>Fruit Katli Range</h2>
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
                                    <button className="lollipop-button">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </>
                    ))}
                </Slider>
            </div>
            <button className="lollipop-button-view">View More</button>
        </div>
    );
};

export default FruitKatliRange;
