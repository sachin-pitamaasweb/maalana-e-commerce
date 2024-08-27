import React, { useState } from "react";

import "./style.css";

const ProductDetails = () => {
    const [mainImage, setMainImage] = useState("https://via.placeholder.com/500x500");

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
                            <img
                                src="https://via.placeholder.com/500x500"
                                alt="Thumbnail 1"
                                className="thumbnail"
                                onClick={() => handleThumbnailClick("https://via.placeholder.com/500x500")}
                            />
                            <img
                                src="https://via.placeholder.com/80x80"
                                alt="Thumbnail 2"
                                className="thumbnail"
                                onClick={() => handleThumbnailClick("https://via.placeholder.com/80x80")}
                            />
                            <img
                                src="https://via.placeholder.com/80x80"
                                alt="Thumbnail 3"
                                className="thumbnail"
                                onClick={() => handleThumbnailClick("https://via.placeholder.com/80x80")}
                            />
                            <img
                                src="https://via.placeholder.com/80x80"
                                alt="Thumbnail 4"
                                className="thumbnail"
                                onClick={() => handleThumbnailClick("https://via.placeholder.com/80x80")}
                            />
                        </div>
                    </div>
                    <div className="product-info">
                        <h1>Strawberry Fruit Katli</h1>
                        <p className="weight">250 g</p>
                        <p className="description">
                            Indulge in the perfect blend of tradition and modern taste with our Strawberry Fruit Katli. Combining the
                            delicious flavor of ripe strawberries with classic katli texture, this sweet treat is simply irresistible.
                        </p>
                        <div className="rating">★★★★★</div>
                        <p className="reviews">(548 Reviews)</p>
                        <p className="price">
                            ₹130 <span style={{ fontSize: "16px" }}>(inclusive of all taxes)</span>
                        </p>
                        <div className="item-quantity" style={{marginBottom: "20px"}}>
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
                                <tr>
                                    <td>Energy</td>
                                    <td>343 kcal</td>
                                </tr>
                                <tr>
                                    <td>Total Fat</td>
                                    <td>0.04 g</td>
                                </tr>
                                <tr>
                                    <td>Protein</td>
                                    <td>0.15 g</td>
                                </tr>
                                <tr>
                                    <td>Carbohydrates</td>
                                    <td>85.56 g</td>
                                </tr>
                                <tr>
                                    <td>Sugar</td>
                                    <td>68.56 g</td>
                                </tr>
                            </table>
                        </div>
                        <div className="ingredients">
                            <h2>INGREDIENTS</h2>
                            <p>
                                Sugar, Liquid Glucose, 25% Strawberry Pulp, Pectin (INS-440), Acidity Regulators (INS-331, INS-330).
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductDetails;