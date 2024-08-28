import React, { useState } from "react";

import { useLocation } from "react-router-dom";

import "./style.css";

const ProductDetails = () => {
    const location = useLocation();
    const { state } = location;
    const { product } = state || {};
    console.log("product", product);
    const [mainImage, setMainImage] = useState(product.images.mainImage || "https://via.placeholder.com/500x500");

    const handleThumbnailClick = (imageUrl) => {
        setMainImage(imageUrl);
    };

    return (
        <>
            <div className="product-grid-card-main">
                <div className="container-product-details">
                    <div className="product-image">
                        <img src={mainImage} alt="Strawberry Fruit Katli" className="main-image" />
                        <div className="thumbnail-container">
                            {product.images.mainImage && <img
                                src={product.images.mainImage || "https://via.placeholder.com/500x500"}
                                alt="Thumbnail 1"
                                className="thumbnail"
                                onClick={() => handleThumbnailClick(product.images.mainImage || "https://via.placeholder.com/500x500")}
                            />}
                            {product.images.backImage && <img
                                src={product.images.backImage || "https://via.placeholder.com/80x80"}
                                alt="Thumbnail 2"
                                className="thumbnail"
                                onClick={() => handleThumbnailClick(product.images.backImage || "https://via.placeholder.com/80x80")}
                            />}
                            {product.images.frontImage && <img
                                src={product.images.frontImage || "https://via.placeholder.com/80x80"}
                                alt="Thumbnail 3"
                                className="thumbnail"
                                onClick={() => handleThumbnailClick(product.images.frontImage || "https://via.placeholder.com/80x80")}
                            />}
                            {product.images.leftImage && <img
                                src={product.images.leftImage || "https://via.placeholder.com/80x80"}
                                alt="Thumbnail 4"
                                className="thumbnail"
                                onClick={() => handleThumbnailClick(product.images.leftImage || "https://via.placeholder.com/80x80")}
                            />}
                        </div>
                    </div>
                    <div className="product-info">
                        <h1>{product.name || 'N/A'}</h1>
                        <p className="weight">{product.weight || 'N/A'}</p>
                        <p className="description">
                            {product.description || 'N/A'}
                        </p>
                        <div className="rating">★★★★★</div>
                        <p className="reviews">(548 Reviews)</p>
                        <p className="price">
                            ₹{product.price || 'N/A'} <span style={{ fontSize: "16px" }}>(inclusive of all taxes)</span>
                        </p>
                        <div className="item-quantity" style={{ marginBottom: "20px" }}>
                            <button aria-label="Decrease quantity">-</button>
                            <input type="number" value={1} min="1" aria-label="Quantity" />
                            <button aria-label="Increase quantity">+</button>
                        </div>
                        <button className="add-to-cart">ADD TO CART</button>
                        <button className="buy-now">BUY NOW</button>
                    </div>
                    <div className="product-details">
                        <div className="nutritional-info">
                            <h2>NUTRITIONAL INFORMATION</h2>
                            <table>
                                {
                                    Object.entries(product.nutritionalInfo).map(([key, value]) => (
                                        <tr key={key}>
                                            <td>{key}</td>
                                            <td>{value}</td>
                                        </tr>
                                    ))
                                }
                            </table>
                        </div>
                        <div className="ingredients">
                            <h2>INGREDIENTS</h2>
                            <p>
                                {/* Sugar, Liquid Glucose, 25% Strawberry Pulp, Pectin (INS-440), Acidity Regulators (INS-331, INS-330). */}
                            </p>
                            {
                                <p>
                                    {product.ingredients.map((ingredient) => (
                                        <span key={ingredient}>{ingredient}</span>
                                    ))}
                                </p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductDetails;