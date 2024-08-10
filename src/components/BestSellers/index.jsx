import React from 'react';


import './BestSellers.scss';


import CommonProductCard from '../CommonProductCard/index';

const products = [
    {
        id: 1,
        name: 'Orange Fruit Katli - 250 g',
        price: '₹150',
        image: 'https://res.cloudinary.com/dtivafy25/image/upload/v1723291645/img-1_am4eu8.png',
        backgroundColor: '#E0F2FF',
    },
    {
        id: 2,
        name: 'Imli Soft Candy - 250 g',
        price: '₹150',
        image: 'https://res.cloudinary.com/dtivafy25/image/upload/v1723291645/img-2_wfkfcq.png',
        backgroundColor: '#E2FFB2',
    },
    {
        id: 3,
        name: 'Mix Fruit Candies - 250 g',
        price: '₹150',
        image: 'https://res.cloudinary.com/dtivafy25/image/upload/v1723291645/img-3_amsa42.png',
        backgroundColor: '#FFE4BE',
    },
    {
        id: 4,
        name: 'Lollipop Fruit Flavour - 250 g',
        price: '₹150',
        image: 'https://res.cloudinary.com/dtivafy25/image/upload/v1723291645/img-4_xk2ukt.png',
        backgroundColor: '#FFBEBE',
    },
];

const BestSellers = () => {
    const handleAddToCart = (product) => {
        console.log(`Added ${product.name} to cart.`);
    }
    return (
        <>
            <CommonProductCard
                title={'Best Sellers'}
                products={products}
                handleAddToCart={handleAddToCart}
            />
        </>
    );
};

export default BestSellers;
