import React, { useState } from 'react';
import { Box } from '@mui/material';

import CategoryFilter from '../../components/CategoryFilter';
import Banner from '../../components/Banner';
import BestSellers from '../../components/BestSellers';
import ImliRange from '../../components/ImliRange';
import Banners from '../../components/Banners';
import LollipopRange from '../../components/LollipopRange/index'
import FruitKatliRange from '../../components/FruitKatliRange';
import StyledBox from '../../components/StyledBox';
import OverlayImage from '../../components/OverlayImage/index'
import MoreProducts from '../../components/MoreProducts';

import PrductGridCard from '../../components/ProductGridCard';

const Products = ({ products }) => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const banners = [
        {
            img: 'https://res.cloudinary.com/dtivafy25/image/upload/v1725013325/b-1_mgxyez.png',    // Desktop Image
            imgLaptop: 'https://res.cloudinary.com/dtivafy25/image/upload/v1725013325/b-1_mgxyez.png',  // Laptop Image
            imgTablet: 'https://res.cloudinary.com/dtivafy25/image/upload/v1725013325/b-1_mgxyez.png',  // Tablet Image
            imgMobile: 'https://res.cloudinary.com/dtivafy25/image/upload/v1725013325/b-1_mgxyez.png',   // Mobile Image
            title: "Banner 1",
        },
        {
            img: 'https://res.cloudinary.com/dtivafy25/image/upload/v1725013322/b-2_ger1wf.png',    // Desktop Image
            imgLaptop: 'https://res.cloudinary.com/dtivafy25/image/upload/v1725013322/b-2_ger1wf.png',  // Laptop Image
            imgTablet: 'https://res.cloudinary.com/dtivafy25/image/upload/v1725013322/b-2_ger1wf.png',  // Tablet Image
            imgMobile: 'https://res.cloudinary.com/dtivafy25/image/upload/v1725013322/b-2_ger1wf.png',   // Mobile Image
            title: "Banner 2",
        },
        {
            img: 'https://res.cloudinary.com/dtivafy25/image/upload/v1725013318/b-3_yia19h.png',    // Desktop Image
            imgLaptop: 'https://res.cloudinary.com/dtivafy25/image/upload/v1725013318/b-3_yia19h.png',  // Laptop Image
            imgTablet: 'https://res.cloudinary.com/dtivafy25/image/upload/v1725013318/b-3_yia19h.png',  // Tablet Image
            imgMobile: 'https://res.cloudinary.com/dtivafy25/image/upload/v1725013318/b-3_yia19h.png',   // Mobile Image
            title: "Banner 3",
        },
    ];

    const renderComponent = () => {
        let filteredProducts = products;

        if (selectedCategory !== 'All') {
            filteredProducts = products.filter(product => product.category === selectedCategory);
        }
        let imliRange = products.filter(product => product.category === 'Imli Range');
        let lollipopRange = products.filter(product => product.category === 'Lollipops');
        let fruitKatliRange = products.filter(product => product.category === 'Fruit katli');
        switch (selectedCategory) {
            case "All":
                return (
                    <>
                        <Banner
                            img={require('../../assets/product-banner/img-1.png')}
                            banners={banners}
                            title="Products"
                        />
                        <BestSellers
                            products={products}
                            title={"Best Sellers"}
                        />
                        <ImliRange
                            products={imliRange}
                            title={"Imli Range"}
                        />
                        <Banners
                            title="lollipops"
                            img='https://res.cloudinary.com/dtivafy25/image/upload/v1725013322/b-2_ger1wf.png'
                        />
                        <LollipopRange
                            products={lollipopRange}
                            title={"Lollipops"}
                        />
                        <FruitKatliRange
                            products={fruitKatliRange}
                            title={"Fruit Katli Range"}
                        />
                        <Banners
                            title="lollipops"
                            img='https://res.cloudinary.com/dtivafy25/image/upload/v1725013318/b-3_yia19h.png'
                        />
                        <StyledBox />
                        <OverlayImage />
                        <MoreProducts products={products} setSelectedCategory={setSelectedCategory} />
                    </>
                );
            case "Family Candy Pack":
                return <PrductGridCard products={filteredProducts} title={"Family Candy Pack"} />;
            case "Aam papad":
                return <PrductGridCard products={filteredProducts} title={"Aam papad"} />;
            case "Candy":
                return <PrductGridCard products={filteredProducts}  title={"Candy"}/>;
            case "Imli Range":
                return <PrductGridCard products={filteredProducts}  title={"Imli Range"}/>;
            case "Lollipops":
                return <PrductGridCard products={filteredProducts} title={"Lollipops"} />;
            case "Fruit katli":
                return <PrductGridCard products={filteredProducts}  title={"Fruit Katli Range"}/>;
            default:
                return <PrductGridCard products={filteredProducts}  title={"Fruit Katli Range"}/>;
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