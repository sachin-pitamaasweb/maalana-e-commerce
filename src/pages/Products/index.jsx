import React from 'react';
import { Box } from '@mui/material';

import CategoryFilter from '../../components/CategoryFilter';
import Banner from '../../components/Banner';
import BestSellers from '../../components/BestSellers';

const Products = () => {

    const banners = [
        { img: require('../../assets/product-banner/img-1.png'), title: "Banner 1" },
        { img:  require('../../assets/product-banner/img-2.png'), title: "Banner 2" },
        { img:  require('../../assets/product-banner/img-3.png'), title: "Banner 3" },
    ];
    return (
        <>
            <Box className="products-container">
                <CategoryFilter />
                <Banner
                    img={require('../../assets/product-banner/img-1.png')}
                    banners={banners}
                    title="Products"
                />
                <BestSellers />
            </Box>
        </>
    );
};

export default Products;