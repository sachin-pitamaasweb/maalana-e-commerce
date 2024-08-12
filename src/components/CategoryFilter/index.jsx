import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import './style.scss';

import Img1 from '../../assets/cate/img-1.png'
import Img2 from '../../assets/cate/img-2.png'
import Img3 from '../../assets/cate/img-3.png'
import Img4 from '../../assets/cate/img-4.png'
import Img5 from '../../assets/cate/img-5.png'
import Img6 from '../../assets/cate/img-6.png'


const CategoryFilter = ({ setSelectedCategory, selectedCategory }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: isMobile ? 3 : 6, // Adjust the number of slides based on screen size
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        centerMode: true, // Enable center mode
        centerPadding: '0', // Remove extra padding on the sides
    };

    const categories = [
        { name: 'Imli ladoo', img: Img1 },
        { name: 'Family candy pack', img: Img2 },
        { name: 'lollipop', img: Img3 },
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
                            {!isMobile && <Typography variant="body1" className="category-name">
                                {category.name}
                            </Typography>}
                        </Box>
                    ))}
                </Slider>
            </Box>
        </Box>
    );
};

export default CategoryFilter;
