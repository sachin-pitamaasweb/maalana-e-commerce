import React, { useState } from "react";

import { useNavigate } from 'react-router-dom';

import { CircularProgress } from '@mui/material';


// import FilterListIcon from '@mui/icons-material/FilterList';

import ProductDrawer from "../ProductDrawer/index";

import { useAuth } from '../../context/AuthContext';

import './style.css';

const ProductGridCard = ({ products, title }) => {
    const navigate = useNavigate();
    const { userId, updateCartItemCount, isUserAuthenticated } = useAuth();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [cartId, setCartId] = useState(null);
    const [loadingProductId, setLoadingProductId] = useState(null);

    const handleDetails = (productId, product) => {
        navigate(`/products-details/${productId}`, { state: { product } });
    };


    const handleOpenDrawer = async (product) => {
        if (!isUserAuthenticated) {
            // Redirect to login page if user is not authenticated
            navigate('/login');
            return;
        }
        setLoadingProductId(product._id);
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
            console.log(data);
            if (data.success) {
                setSelectedProduct(product);
                setDrawerOpen(true);
                setCartId(data.cart._id);
                updateCartItemCount(data.totalQuantity);
                console.log('Product added to cart successfully');
            } else {
                console.error('Failed to add product to cart:', data.message);
            }

        } catch (error) {
            console.error(error);
        } finally {
            setLoadingProductId(null);
        }
    };



    // const updateCart = async (newQuantity, cartId, productId) => {
    //     console.log('newQuantity', newQuantity, 'cartId', cartId, 'productId', productId);
    //     try {
    //         const response = await fetch('http://localhost:8000/api/update-cart', {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 userId: userId,
    //                 productId: productId,
    //                 quantity: newQuantity,
    //                 cartId: cartId,
    //             }),
    //         });
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }

    //         const data = await response.json();
    //         updateCartItemCount(data.totalQuantity);
    //         setCartItems(data.cart);
    //     } catch (error) {
    //         console.error('Error updating cart:', error);
    //     }
    // };

    // const handleIncrement = (productId) => {
    //     const updatedItems = cartItems.map(cartItem => {
    //         const updatedItems = cartItem.items.map(item => {
    //             if (item.productId._id === productId) {
    //                 const newQuantity = item.quantity + 1;
    //                 console.log('cartItem._id', cartItem._id);
    //                 updateCart(newQuantity, cartItem._id, productId);
    //                 return { ...item, quantity: newQuantity };
    //             }
    //             return item;
    //         });
    //         return { ...cartItem, items: updatedItems };
    //     });
    //     setCartItems(updatedItems);
    // };

    // const handleDecrement = (productId) => {
    //     const updatedItems = cartItems.map(cartItem => {
    //         const updatedItems = cartItem.items.map(item => {
    //             if (item.productId._id === productId && item.quantity > 1) {
    //                 const newQuantity = item.quantity - 1;
    //                 console.log('cartItem._id', cartItem._id)
    //                 updateCart(newQuantity, cartItem._id, productId);
    //                 return { ...item, quantity: newQuantity };
    //             }
    //             return item;
    //         });
    //         return { ...cartItem, items: updatedItems };
    //     });
    //     setCartItems(updatedItems);
    // };

    return (
        <>
            <div className="container-product-grid">
                <div className="header-product-grid">
                    <button className="filter-button-card-grid">{title}</button>
                    <span className="product-count-product-number">{products.length} Products</span>
                </div>
                {products.length > 0 ? (
                    <div className="product-grid-card-container">
                        {products.map((product, index) => (
                            <div className="product-card-content-card" key={index} >
                                <img src={product.images.mainImage || "http://res.cloudinary.com/dtivafy25/image/upload/v1724736713/image/f-1_fskvqz.png"}
                                    alt="Strawberry Fruit Kotti" className="product-image-card-grid"
                                    onClick={() => handleDetails(product._id, product)}
                                />
                                <div className="product-info">
                                    <h2 className="product-name">{product.name || "N/A"}</h2>
                                    <div className="product-price-cart">
                                        <span className="product-price">₹{product.price || "N/A"}</span>
                                        <button className="add-to-cart-card" 
                                        disabled={loadingProductId === product._id} onClick={() => handleOpenDrawer(product)}>
                                            {loadingProductId === product._id ? (
                                                <CircularProgress size={24} />
                                            ) : (
                                                "ADD TO CART"
                                            )}
                                        </button>
                                        {/* {!isProductInCart(product._id) ? (
                                            <div className="item-quantity">
                                                <button
                                                    aria-label="Decrease quantity"
                                                    onClick={() => handleDecrement(product._id)}
                                                >
                                                    -
                                                </button>
                                                <input
                                                    type="number"
                                                    value={getProductQuantityInCart(product._id)}
                                                    min="1"
                                                    aria-label="Quantity"
                                                />
                                                <button
                                                    aria-label="Increase quantity"
                                                    onClick={() => handleIncrement(product._id)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        ) : (
                                            <button className="add-to-cart-card" onClick={() => handleOpenDrawer(product)}>ADD TO CART</button>
                                        )} */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="no-products-message">
                        No products available at the moment.
                    </div>
                )}
            </div>
            {selectedProduct && (
                <ProductDrawer
                    drawerOpen={drawerOpen}
                    setDrawerOpen={setDrawerOpen}
                    product={selectedProduct}
                    cartId={cartId}
                />
            )}
        </>
    )
};
export default ProductGridCard;


