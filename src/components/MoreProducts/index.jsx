import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './style.scss';

const MoreProducts = ({setSelectedCategory}) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
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
                    autoplay: true,
                    autoplaySpeed: 3000,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const product = [
        {
            name: 'Imli Ladoo',
            img: require('../../assets/more-product/img-5.png'),
            bgColor: '#FFD8B7',
            cate: 'Imli Range',
        },
        {
            name: 'Green Mango',
            img: require('../../assets/more-product/img-6.png'),
            bgColor: '#E2FFB2',
            cate: 'Lollipops',
        },
        {
            name: 'Orange Fruit Katli',
            img: require('../../assets/more-product/img-4.png'),
            bgColor: '#FFD191',
            cate: 'Fruit katli',
        },
    ];

    const handleClick = (cate) => {
        setSelectedCategory(cate);
        window.scrollTo(0, 0);
    };

    return (
        <div className="more-products">
            <h2>More Products</h2>
            <div className='more'>
                <Slider {...settings}>
                    {product.map((product, index) => (
                        <>
                            <div key={index} className="product-slide">
                                <div className="product-circle" style={{ backgroundColor: product.bgColor, cursor: 'pointer' }}  onClick={() => handleClick(product.cate)}>
                                    <div className='product-center-image-more-products'>
                                        <img src={product.img} alt={product.name} className="product-image-more-products" />
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
