import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
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

import SpecialOfferModel from '../../components/SpecialOfferModel';

import { useAuth } from '../../context/AuthContext';


const Products = ({ products }) => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [showOffer, setShowOffer] = useState(false);
    const { isUserAuthenticated } = useAuth();
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


    useEffect(() => {
        // Check if the offer has been shown before
        const hasVisited = sessionStorage.getItem('hasVisited');

        // Only show the offer if the user is not authenticated and hasn't visited the page before
        if (!isUserAuthenticated && !hasVisited) {
            setShowOffer(true);
            sessionStorage.setItem('hasVisited', 'true'); // Mark that the user has visited
        }
    }, [isUserAuthenticated]);

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
                        {/* <Banners
                            title="lollipops"
                            img='https://res.cloudinary.com/dtivafy25/image/upload/v1725013318/b-3_yia19h.png'
                        /> */}
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
                return <PrductGridCard products={filteredProducts} title={"Candy"} />;
            case "Imli Range":
                return <PrductGridCard products={filteredProducts} title={"Imli Range"} />;
            case "Lollipops":
                return <PrductGridCard products={filteredProducts} title={"Lollipops"} />;
            case "Fruit katli":
                return <PrductGridCard products={filteredProducts} title={"Fruit Katli Range"} />;
            default:
                return <PrductGridCard products={filteredProducts} title={"Fruit Katli Range"} />;
        }
    };

    return (
        <>
            <Helmet>
                <title>Maalana-Products</title>
            </Helmet>
            <SpecialOfferModel open={showOffer} handleClose={() => setShowOffer(false)} />
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