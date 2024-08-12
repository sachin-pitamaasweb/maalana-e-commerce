import React, { useState } from 'react';
import { Box } from '@mui/material';

import CategoryFilter from '../../components/CategoryFilter';
import Banner from '../../components/Banner';
import BestSellers from '../../components/BestSellers';
import MoreProducts from '../../components/MoreProducts';
import ImliRange from '../../components/ImliRange';
import Banners from '../../components/Banners';
import LollipopRange from '../../components/LollipopRange/index'
import FruitKatliRange from '../../components/FruitKatliRange';
// import StyledBox from '../../components/StyledBox';

//category filter component
// import ProductGrid from '../../components/ProductGrid';
// import ProductList from '../../components/ProductList/index';

// fliter components
import LollipopFliter from '../../components/LollipopFliter/index';
import FruitkatliFilter from '../../components/FruitkatliFilter/index';

const Products = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const banners = [
        { img: require('../../assets/product-banner/img-1.png'), title: "Banner 1" },
        { img: require('../../assets/product-banner/img-2.png'), title: "Banner 2" },
        { img: require('../../assets/product-banner/img-3.png'), title: "Banner 3" },
    ];
    
    const renderComponent = () => {
        console.log('selectedCategory', selectedCategory);
        if (!selectedCategory) {
            return (
                <>
                    <Banner
                        img={require('../../assets/product-banner/img-1.png')}
                        banners={banners}
                        title="Products"
                    />
                    <BestSellers />
                    <ImliRange />
                    <Banners
                        img={require('../../assets/product-banner/img-2.png')}
                    />
                    <LollipopRange />
                    <FruitKatliRange />
                    <Banners
                        img={require('../../assets/product-banner/img-3.png')}
                    />
                    {/* <StyledBox /> */}
                    <MoreProducts />
                </>
            )
        }
        switch (selectedCategory) {
            case "lollipop":
                return <LollipopFliter filter={'lollipop'} />;
            case "Fruit katli":
                return <FruitkatliFilter filter={'Fruit katli'} />;
            default:
                return (
                    <>
                        <Banner
                            img={require('../../assets/product-banner/img-1.png')}
                            banners={banners}
                            title="Products"
                        />
                        <BestSellers />
                        <ImliRange />
                        <Banners
                            img={require('../../assets/product-banner/img-2.png')}
                        />
                        <LollipopRange />
                        <FruitKatliRange />
                        <Banners
                            img={require('../../assets/product-banner/img-3.png')}
                        />
                        {/* <StyledBox /> */}
                        <MoreProducts />
                    </>
                );
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