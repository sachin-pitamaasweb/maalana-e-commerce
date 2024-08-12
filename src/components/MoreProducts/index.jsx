import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './style.scss';

const MoreProducts = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000,
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
            img: require('../../assets/more-product/img-5.png'),
            bgColor: '#FFD8B7',
        },
        {
            name: 'Green Mango',
            img: require('../../assets/more-product/img-6.png'),
            bgColor: '#E2FFB2',
        },
        {
            name: 'Orange Fruit Katli',
            img: require('../../assets/more-product/img-4.png'),
            bgColor: '#FFD191',
        },
        // {
        //     name: 'Orange Fruit Katli',
        //     img: require('../../assets/more-product/img-4.png'),
        //     bgColor: '#FFD191',
        // },
        // Add more products if needed
    ];

    return (
        <div className="more-products">
            <h2>More Products</h2>
            <div className='more'>
                <Slider {...settings}>
                    {products.map((product, index) => (
                        <>
                            <div key={index} className="product-slide">
                                <div className="product-circle" style={{ backgroundColor: product.bgColor }}>
                                    <div className='product-center-image'>
                                        <img src={product.img} alt={product.name} className="product-image" />
                                    </div>
                                    <p className="product-name">{product.name}</p>
                                </div>
                            </div>
                        </>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default MoreProducts;
