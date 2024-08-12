import React from "react";
import ProductList from "../ProductList";

const products = [
    { id: '66910e73740e745cef3b98d2', img: require('../../assets/product-cate/img-1.png'), name: 'Imli soft candy pouch - 100 g', price: 50 },
    { id: '66910f73740e745cef3b98d4', img: require('../../assets/product-cate/img-1.png'), name: 'Imli soft candy pouch - 100 g', price: 50 },
    { id: '66910f74740e745cef3b98d6', img: require('../../assets/product-cate/img-1.png'), name: 'Imli soft candy pouch - 100 g', price: 50 },
    { id: '66910f75740e745cef3b98d8', img: require('../../assets/product-cate/img-1.png'), name: 'Imli soft candy pouch - 100 g', price: 50 },
    { id: '66910f75740e745cef3b98da', img: require('../../assets/product-cate/img-1.png'), name: 'Imli soft candy pouch - 100 g', price: 50 },
    { id: '66910f75740e745cef3b98d8', img: require('../../assets/product-cate/img-1.png'), name: 'Imli soft candy pouch - 100 g', price: 50 },
    { id: '66910f75740e745cef3b98da', img: require('../../assets/product-cate/img-1.png'), name: 'Imli soft candy pouch - 100 g', price: 50 },
    { id: '66910f75740e745cef3b98d8', img: require('../../assets/product-cate/img-1.png'), name: 'Imli soft candy pouch - 100 g', price: 50 },
    { id: '66910f75740e745cef3b98da', img: require('../../assets/product-cate/img-1.png'), name: 'Imli soft candy pouch - 100 g', price: 50 },
  ];

const FruitkatliFilter = () => {
    return (
        <>
        <ProductList
            products={products}
        />
        </>
    );
};
export default FruitkatliFilter;