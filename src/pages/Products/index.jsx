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
import StyledBox from '../../components/StyledBox';
import OverlayImage from '../../components/OverlayImage/index'

// fliter components
import LollipopFliter from '../../components/LollipopFliter/index';
import FruitkatliFilter from '../../components/FruitkatliFilter/index';
import ImliFilter from '../../components/ImliFliter';
import CandyFilter from '../../components/CandyFilter';
import AampapadFilter from '../../components/AampapadFilter';
import FamilycandypackFilter from '../../components/FamilycandypackFilter/index';

const Products = ({ products }) => {
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
                    <BestSellers products={products} />
                    <ImliRange products={products} />
                    <Banners
                        img={require('../../assets/product-banner/img-2.png')}
                    />
                    <LollipopRange products={products} />
                    <FruitKatliRange products={products} />
                    <Banners
                        img={require('../../assets/product-banner/img-3.png')}
                    />
                    <StyledBox />
                    <OverlayImage />
                    <MoreProducts />
                </>
            )
        }
        switch (selectedCategory) {
            case "lollipop":
                return <LollipopFliter filter={'Lollipops'} products={products} />;
            case "Fruit katli":
                return <FruitkatliFilter filter={'Fruit katli'} products={products} />;
            case "Imli Range":
                return <ImliFilter filter={'Imli Range'} products={products} />
                case "Candy": 
                return <CandyFilter filter={'Candy'} products={products} />
                case "Aam papad": 
                return <AampapadFilter filter={'Aam papad'} products={products} />
                case "Family candy pack":
                   return <FamilycandypackFilter filter={'Family Candy Pack'} products={products} />
            default:
                return (
                    <>
                        <Banner
                            img={require('../../assets/product-banner/img-1.png')}
                            banners={banners}
                            title="Products"
                        />
                        <BestSellers products={products} />
                        <ImliRange products={products} />
                        <Banners
                            img={require('../../assets/product-banner/img-2.png')}
                        />
                        <LollipopRange products={products} />
                        <FruitKatliRange products={products} />
                        <Banners
                            img={require('../../assets/product-banner/img-3.png')}
                        />
                        <StyledBox />
                        <OverlayImage />
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