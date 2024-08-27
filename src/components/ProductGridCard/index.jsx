import React from "react";

import { useNavigate } from 'react-router-dom';

import FilterListIcon from '@mui/icons-material/FilterList';

import './style.css';

const ProductGridCard = () => {
    const navigate = useNavigate();
    const products = [
        {
            imageUrl: "http://res.cloudinary.com/dtivafy25/image/upload/v1724736713/image/f-1_fskvqz.png",
            name: "Strawberry Fruit Kotti",
            weight: "250 g",
            price: 130
        },
        {
            imageUrl: "http://res.cloudinary.com/dtivafy25/image/upload/v1724736713/image/f-1_fskvqz.png",
            name: "Pineapple Fruit Kotti",
            weight: "250 g",
            price: 130
        },
        {
            imageUrl: "http://res.cloudinary.com/dtivafy25/image/upload/v1724736713/image/f-1_fskvqz.png",
            name: "Pineapple Fruit Kotti",
            weight: "250 g",
            price: 130
        },
        {
            imageUrl: "http://res.cloudinary.com/dtivafy25/image/upload/v1724736713/image/f-1_fskvqz.png",
            name: "Pineapple Fruit Kotti",
            weight: "250 g",
            price: 130
        },
        {
            imageUrl: "http://res.cloudinary.com/dtivafy25/image/upload/v1724736713/image/f-1_fskvqz.png",
            name: "Pineapple Fruit Kotti",
            weight: "250 g",
            price: 130
        },
        {
            imageUrl: "http://res.cloudinary.com/dtivafy25/image/upload/v1724736713/image/f-1_fskvqz.png",
            name: "Pineapple Fruit Kotti",
            weight: "250 g",
            price: 130
        },
        // Add more products here...
    ];

    const handleDetails = (productId) => {
        navigate(`/products-details/${productId}`);
    }
    return (
        <>
            <div className="container-product-grid">
                <div className="header-product-grid">
                    <button className="filter-button-card-grid"><FilterListIcon /> Show Filter</button>
                    <span className="product-count-product-number">{products.length} Products</span>
                </div>
                <div className="product-grid-card-container">
                    {products.map((product, index) => (
                        <div className="product-card-content-card" key={index} >
                            <img src="http://res.cloudinary.com/dtivafy25/image/upload/v1724736713/image/f-1_fskvqz.png"
                                alt="Strawberry Fruit Kotti" className="product-image-card-grid" 
                                onClick={() => handleDetails(index)}
                                />
                            <div className="product-info">
                                <h2 className="product-name">{product.name || "N/A"}</h2>
                                <div className="product-price-cart">
                                    <span className="product-price">₹{product.price || "N/A"}</span>
                                    <button className="add-to-cart-card">ADD TO CART</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
};
export default ProductGridCard;