import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Typography } from '@mui/material';
import './style.scss';

import Img1 from '../../assets/cate/img-1.png'
import Img2 from '../../assets/cate/img-2.png'
import Img3 from '../../assets/cate/img-3.png'
import Img4 from '../../assets/cate/img-4.png'
import Img5 from '../../assets/cate/img-5.png'
import Img6 from '../../assets/cate/img-6.png'
import Img7 from '../../assets/cate/all.png'


const CategoryFilter = ({ setSelectedCategory, selectedCategory }) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 7, // Adjust the number of slides based on screen size
        slidesToScroll: 1,
        arrows: false,
        autoplay: false,
        // autoplaySpeed: 300000,
        centerMode: true,
        centerPadding: '0',
        draggable: false,  // Disable dragging
        swipe: false,      // Disable swiping
        responsive: [
            {
                breakpoint: 1500,
                settings: {
                    
                    slidesToShow: 7,
                    arrows: false,
                    autoplay: false,
                    // autoplaySpeed: 300000,
                    centerMode: true,
                },
            },
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 7,
                },
            },
            {
                breakpoint: 1025,
                settings: {
                    autoplaySpeed: 3000,
                    autoplay: true,
                    slidesToShow: 4,
                    draggable: true,  // Disable dragging
                    swipe: true,      // Disable swiping
                },
            },
            {
                breakpoint: 600,
                settings: {
                    autoplaySpeed: 3000,
                    autoplay: true,
                    slidesToShow: 3,
                    draggable: true,  // Disable dragging
                    swipe: true,      // Disable swiping
                },
            },
            {


                breakpoint: 400,
                settings: {
                    autoplay: true,
                    autoplaySpeed: 3000,
                    slidesToShow: 2,
                    draggable: true,  // Disable dragging
                    swipe: true,      // Disable swiping
                },
            },
        ],
    };

    const categories = [
        { name: 'All', img: Img7 },
        { name: 'Imli Range', img: Img1 },
        { name: 'Family Candy Pack', img: Img2 },
        { name: 'Lollipops', img: Img3 },
        { name: 'Candy', img: Img4 },
        { name: 'Aam papad', img: Img5 },
        { name: 'Fruit katli', img: Img6 },
        // Add more categories as needed
    ];

    const handleCategoryClick = (name) => {
        setSelectedCategory(name);
    };

    return (
        <Box className="category-filter">
            <Box className="category-slider">
                <Slider {...settings}>
                    {categories.map((category, index) => (
                        <Box
                            key={index}
                            className={`category-option ${selectedCategory === category.name ? 'selected' : ''}`}
                            onClick={() => handleCategoryClick(category.name)}
                        >
                            <Box className="image-container">
                                <img src={category.img} alt={category.name} className="category-image" />
                            </Box>
                            <Typography variant="body1" className="category-name">
                                {category.name}
                            </Typography>
                        </Box>
                    ))}
                </Slider>
            </Box>
        </Box>
    );
};

export default CategoryFilter;
