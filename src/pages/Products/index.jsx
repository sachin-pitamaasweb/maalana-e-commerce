import React, { useState } from 'react';
import { Box } from '@mui/material';

import CategoryFilter from '../../components/CategoryFilter';
import Banner from '../../components/Banner';
import BestSellers from '../../components/BestSellers';
// import MoreProducts from '../../components/MoreProducts';
// import ImliRange from '../../components/ImliRange';
// import Banners from '../../components/Banners';
// import LollipopRange from '../../components/LollipopRange/index'
// import FruitKatliRange from '../../components/FruitKatliRange';
// import StyledBox from '../../components/StyledBox';
// import OverlayImage from '../../components/OverlayImage/index'

// fliter components
// import LollipopFliter from '../../components/LollipopFliter/index';
// import FruitkatliFilter from '../../components/FruitkatliFilter/index';
// import ImliFilter from '../../components/ImliFliter';
// import CandyFilter from '../../components/CandyFilter';
// import AampapadFilter from '../../components/AampapadFilter';
// import FamilycandypackFilter from '../../components/FamilycandypackFilter/index';

import PrductGridCard from '../../components/ProductGridCard';

const Products = ({ products }) => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const banners = [
        {
            img: 'https://via.placeholder.com/1920x1080?text=Banner+1+-+Desktop',    // Desktop Image
            imgLaptop: 'https://via.placeholder.com/1366x768?text=Banner+1+-+Laptop',  // Laptop Image
            imgTablet: 'https://via.placeholder.com/768x1024?text=Banner+1+-+Tablet',  // Tablet Image
            imgMobile: 'https://via.placeholder.com/375x667?text=Banner+1+-+Mobile',   // Mobile Image
            title: "Banner 1",
        },
        {
            img: 'https://via.placeholder.com/1920x1080?text=Banner+2+-+Desktop',    // Desktop Image
            imgLaptop: 'https://via.placeholder.com/1366x768?text=Banner+2+-+Laptop',  // Laptop Image
            imgTablet: 'https://via.placeholder.com/768x1024?text=Banner+2+-+Tablet',  // Tablet Image
            imgMobile: 'https://via.placeholder.com/375x667?text=Banner+2+-+Mobile',   // Mobile Image
            title: "Banner 2",
        },
        {
            img: 'https://via.placeholder.com/1920x1080?text=Banner+3+-+Desktop',    // Desktop Image
            imgLaptop: 'https://via.placeholder.com/1366x768?text=Banner+3+-+Laptop',  // Laptop Image
            imgTablet: 'https://via.placeholder.com/768x1024?text=Banner+3+-+Tablet',  // Tablet Image
            imgMobile: 'https://via.placeholder.com/375x667?text=Banner+3+-+Mobile',   // Mobile Image
            title: "Banner 3",
        },
    ];

    const renderComponent = () => {
        let filteredProducts = products;

        if (selectedCategory !== 'All') {
            filteredProducts = products.filter(product => product.category === selectedCategory);
        }

        switch (selectedCategory) {
            case "All":
                return (
                    <>
                        <Banner
                            img={require('../../assets/product-banner/img-1.png')}
                            banners={banners}
                            title="Products"
                        />
                        <BestSellers products={products} />
                    </>
                );
                case "Family Candy Pack":
                return <PrductGridCard products={filteredProducts} />;
            case "Aam papad":
                return <PrductGridCard products={filteredProducts} />;
            case "Candy":
                return <PrductGridCard products={filteredProducts} />;
            case "Imli Range":
                return <PrductGridCard products={filteredProducts} />;
            case "Lollipops":
                return <PrductGridCard products={filteredProducts} />;
            default:
                return <PrductGridCard products={filteredProducts} />;
        }
    };

    return (
        <>
            <Box className="products-container">
                <CategoryFilter
                    setSelectedCategory={setSelectedCategory}
                    selectedCategory={selectedCategory}
                />
                {renderComponent()}
            </Box>
        </>
    );
};

export default Products;