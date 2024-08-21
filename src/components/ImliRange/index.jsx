import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './style.scss';

const ImliRange = ({ products }) => {
    const [filteredProducts, setFilteredProducts] = useState([
        {
            name: '',
            img: '',
            price: '',
            bgColor: '',
        }
    ]);

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
                    slidesToShow: 4,
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

    const product = [
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
        // Add more products if needed
    ];

    // console.log('product', product);

    // console.log('filteredProducts', products);

    useEffect(() =>{
        const fetchImliRange = async () => {
           if(products) {
              const filteredProducts = products.filter((product) => {
                return product.category === 'Imli Range';
              });
              console.log('filteredProducts', filteredProducts);
              
              setFilteredProducts([{
                name: filteredProducts.name,
                img: filteredProducts.img,
                price: filteredProducts.price,
                bgColor: filteredProducts.bgColor,
              }]);
           }
        }
        fetchImliRange();
    }, [products]);

    console.log('filteredProducts', filteredProducts);

    return (
        <div className="more-products">
            <h2>Imli Range</h2>
            <div className='more'>
                <Slider {...settings}>
                    {product.map((product, index) => (
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

export default ImliRange;
