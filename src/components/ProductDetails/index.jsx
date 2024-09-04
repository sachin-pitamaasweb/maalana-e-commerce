import React, { useState } from "react";
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import { useAuth } from "../../context/AuthContext";


import "./style.css";

const ProductDetails = () => {
    const { userId, updateCartItemCount } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location;
    const { product } = state || {};
    const [mainImage, setMainImage] = useState(product.images?.mainImage || "https://via.placeholder.com/500x500");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    const handleThumbnailClick = (imageUrl) => {
        setMainImage(imageUrl);
    };


    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleAddToCart = async (product) => {
        try {
            const response = await fetch('https://maalana-backend.onrender.com/api/add-to-cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productId: product._id,
                    quantity: 1,
                    shippingPrice: 50,
                    CoupanCode: 'DISCOUNT10',
                    id: userId || '',
                }),
            });

            const data = await response.json();
            if (data.success) {
                updateCartItemCount(data.totalQuantity);
                // Update cart item count in context
                navigate('/cart');
            } else {
                // console.error('Failed to add product to cart:', data.message);
                setSnackbarMessage(`Failed to add product to cart: ${data.message}`);
                setSnackbarSeverity('error');
            }
        } catch (error) {
            // console.error('Error adding product to cart:', error);
            setSnackbarMessage(`Error adding product to cart: ${error.message}`);
            setSnackbarSeverity('error');
        } finally {
            setSnackbarOpen(true);
        }
    };

    return (
        <>
            <div className="product-grid-card-main">
            <Helmet>
                <title>Maalana-Product-Details</title>
            </Helmet>
                <div className="container-product-details">
                    <div className="product-image-details">
                        <div className="main-image-container-details">
                            <img src={mainImage || "https://via.placeholder.com/500x500"} alt="Strawberry Fruit Katli" className="main-image" />
                        </div>
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
                        <h1 className="name">{product.name || 'N/A'}</h1>
                        <p className="weight">{product.weight || 'N/A'}</p>
                        <p className="description">
                            {product.description || 'N/A'}
                        </p>
                        <div className="rating">★★★★★</div>
                        <p className="reviews">(548 Reviews)</p>
                        <p className="price">
                            ₹{product.price || 'N/A'} <span style={{ fontSize: "16px" }}>(inclusive of all taxes)</span>
                        </p>
                        {/* <div className="item-quantity" style={{ marginBottom: "20px" }}>
                            <button aria-label="Decrease quantity">-</button>
                            <input type="number" value={1} min="1" aria-label="Quantity" />
                            <button aria-label="Increase quantity">+</button>
                        </div> */}
                        <button className="add-to-cart" onClick={() => handleAddToCart(product)}>ADD TO CART</button>
                        {/* <button className="buy-now">BUY NOW</button> */}
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
                                    {product.ingredients || ['N/A'].map((ingredient) => (
                                        <span key={ingredient}>{ingredient}</span>
                                    ))}
                                </p>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbarSeverity}
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
}

export default ProductDetails;