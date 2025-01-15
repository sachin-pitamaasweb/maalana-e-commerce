import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import ProductDrawer from "../ProductDrawer/index";
import { useAuth } from '../../context/AuthContext';
import './style.css';

const ProductGridCard = ({ products, title }) => {
    const navigate = useNavigate();
    const { userId, updateCartItemCount, isUserAuthenticated, cartItem, setCartItem } = useAuth();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [cartIdByAddToCart, setCartIdByAddToCart] = useState(null);
    const [cartItems, setCartItems] = useState(cartItem || []);
    const [loadingProductId, setLoadingProductId] = useState(null);
    const [countLoading, setCountLoading] = useState(null);
    const [quantities, setQuantities] = useState({});
    const [loginPromptOpen, setLoginPromptOpen] = useState(false);

    useEffect(() => {
        const initialQuantities = {};
        cartItems.forEach(cart => {
            cart.items.forEach(item => {
                initialQuantities[item.productId._id] = item.quantity;
            });
        });
        setQuantities(initialQuantities);
    }, [cartItems]);

    const handleQuantityChange = (productId, newQuantity) => {
        setQuantities(prev => ({
            ...prev,
            [productId]: newQuantity > 0 ? newQuantity : 1,
        }));
    };

    const handleDetails = (productId, product) => {
        navigate(`/products-details/${productId}`, { state: { product, productId } });
        window.scrollTo(0, 0);
    };

    const handleOpenDrawer = async (product) => {
        if (!isUserAuthenticated) {
            setLoginPromptOpen(true);
            return;
        }
        setLoadingProductId(product._id);
        try {
            const response = await fetch('https://maalana.ritaz.in/api/add-to-cart', {
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
                setSelectedProduct(product);
                setDrawerOpen(true);
                setCartIdByAddToCart(data.cart._id);
                updateCartItemCount(data.totalQuantity);

                // Fetch updated cart items after adding the product
                const updatedCartResponse = await fetch(`https://maalana.ritaz.in/api/get-all-cart-by-user/${userId}`);
                const updatedCartData = await updatedCartResponse.json();
                if (updatedCartData.success) {
                    setCartItem(updatedCartData.cart);

                    // Update the quantities state for the newly added product
                    const initialQuantities = {};
                    updatedCartData.cart.forEach(cart => {
                        cart.items.forEach(item => {
                            initialQuantities[item.productId._id] = item.quantity;
                        });
                    });
                    setQuantities(initialQuantities); // This updates the quantities for the newly added product
                }
            } else {
                console.error('Failed to add product to cart:', data.message);
            }

        } catch (error) {
            console.error(error);
        } finally {
            setLoadingProductId(null);
        }
    };

    const isProductInCart = (productId) => {
        if (!Array.isArray(cartItem) || cartItem.length === 0) return false;
        return cartItem.some(cart =>
            cart.items.some(item => item.productId && item.productId._id === productId)
        );
    };

    const handleIncrement = async (productId) => {
        console.log('productId', productId);
        if (!productId) return;
        let cartId = cartIdByAddToCart || '';
        let currentQuantity = 0;
        console.log('productId1', productId);
        const updatedItems = cartItems.map(cartItem => {
            const newItems = cartItem.items.map(item => {
                if (item.productId._id === productId) {
                    const newQuantity = item.quantity + 1;
                    if (cartItem._id) {
                        cartId = cartId || cartItem._id;
                    }
                    currentQuantity = item.quantity;
                    return { ...item, quantity: newQuantity };
                }
                return item;
            });
            return { ...cartItem, items: newItems };
        });

        if (!cartId) {
            console.error("Error: cartId is not set.");
            return;
        }
        setCartItems(updatedItems);

        try {
            const response = await axios.put('https://maalana.ritaz.in/api/increase-quantity', {
                userId,
                cartId,
                productId,
                quantity: 1,
            });
            console.log('response.data', response.data);
            if (!response.data.success) {
                console.error('Error updating quantity:', response.data.message);
                rollbackUpdate(productId, currentQuantity);
                return;
            }
            updateCartItemCount(response.data.totalQuantity);
            setQuantities(prev => ({
                ...prev,
                [productId]: response.data.cartQuantity,
            }));
        } catch (error) {
            console.error('Error updating quantity:', error);
            rollbackUpdate(productId, currentQuantity);
        }
    };

    const handleDecrement = async (productId) => {
        if (!productId) return;
        let cartId = cartIdByAddToCart || '';
        let currentQuantity = 0;
        console.log('cartId', cartId);
        // Optimistically update the cart items in state
        const updatedItems = cartItems.map(cartItem => {
            const newItems = cartItem.items.map(item => {
                console.log('item.productId._id', item.productId._id);
                console.log('item.productId._id === productId', item.productId._id === productId);
                if (item.productId._id === productId) {
                    console.log(' cartItem._id', cartItem._id);
                    cartId = cartId || cartItem._id;
                    currentQuantity = item.quantity;
                    console.log('currentQuantity', currentQuantity);
                    if (item.quantity > 1) {
                        return { ...item, quantity: item.quantity - 1 };
                    } else if (item.quantity === 1) {
                        return null; // Remove the item when quantity is 1
                    }
                }
                return item;
            }).filter(item => item !== null); // Remove null items (when quantity is 1)
            return { ...cartItem, items: newItems };
        }).filter(cart => cart.items.length > 0); // Remove empty carts

        setCartItems(updatedItems);

        try {
            if (currentQuantity !== 1) {
                console.log('currentQuantity', currentQuantity);
                // Decrease the quantity
                const response = await axios.put('https://maalana.ritaz.in/api/decrease-quantity', {
                    userId,
                    cartId,
                    productId,
                    quantity: 1,
                });
                updateCartItemCount(response.data.totalQuantity);
                setQuantities(prev => ({
                    ...prev,
                    [productId]: response.data.cartQuantity, // Update the quantity state for the decreased quantity
                }));
            } else {
                // If quantity is 1, delete the product from the cart
                const responseDelete = await axios.delete('https://maalana.ritaz.in/api/delete-cart-product', {
                    data: { userId, productId, cartId },
                });

                if (!responseDelete.data.success) {
                    console.error('Error deleting product:', responseDelete.data.message);
                    return;
                }

                // After successful deletion, remove the product from the quantities state
                setQuantities(prev => {
                    const updatedQuantities = { ...prev };
                    delete updatedQuantities[productId]; // Remove the product's quantity
                    return updatedQuantities;
                });

                // Optionally, fetch the updated cart items from the server after deletion
                const updatedCartResponse = await axios.get(`https://maalana.ritaz.in/api/get-all-cart-by-user/${userId}`);
                const updatedCartData = updatedCartResponse.data;
                if (updatedCartData.success) {
                    setCartItem(updatedCartData.cart);
                    updateCartItemCount(updatedCartData.totalQuantity); // Update the cart count
                }
            }
        } catch (error) {
            console.error('Error updating cart:', error);
            rollbackUpdate(productId, currentQuantity);
        }
    };


    const rollbackUpdate = (productId, originalQuantity) => {
        const rolledBackItems = cartItems.map(cartItem => {
            const originalItems = cartItem.items.map(item => {
                if (item.productId._id === productId) {
                    return { ...item, quantity: originalQuantity };
                }
                return item;
            });
            return { ...cartItem, items: originalItems };
        });
        setCartItems(rolledBackItems);
    };

    const handleCloseLoginPrompt = () => setLoginPromptOpen(false);

    const handleNavigateLogin = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        navigate('/login');
    };

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
                            <div className="product-card-content-card" key={index}>
                                <img
                                    src={product.images.mainImage || "default-image-url"}
                                    alt={product.name}
                                    className="product-image-card-grid"
                                    onClick={() => handleDetails(product._id, product)}
                                />
                                <div className="product-info">
                                    <h2 className="product-name">{product.name || "N/A"}</h2>
                                    <div className="product-price-cart">
                                        <span className="product-price">₹{product.price || "N/A"}</span>
                                        {isProductInCart(product._id) ? (
                                            <div className="item-quantity">
                                                {countLoading === product._id ? <CircularProgress size={24} /> :
                                                    <>
                                                        <button onClick={() => handleDecrement(product._id)}>-</button>
                                                        <input
                                                            type="number"
                                                            value={quantities[product._id]}
                                                            min="1"
                                                            disabled={true}
                                                            onChange={(e) => handleQuantityChange(product._id, parseInt(e.target.value))}
                                                        />
                                                        <button onClick={() => handleIncrement(product._id)}>+</button>
                                                    </>
                                                }
                                            </div>
                                        ) : (
                                            <button
                                                className="add-to-cart-card"
                                                disabled={loadingProductId === product._id}
                                                onClick={() => handleOpenDrawer(product)}
                                            >
                                                {loadingProductId === product._id ? <CircularProgress size={24} /> : "ADD TO CART"}
                                            </button>
                                        )}
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
            {/* {selectedProduct && (
                <ProductDrawer
                    drawerOpen={drawerOpen}
                    setDrawerOpen={setDrawerOpen}
                    product={selectedProduct}
                    cartId={cartIdByAddToCart || null}
                />
            )} */}
            <Dialog open={loginPromptOpen} onClose={handleCloseLoginPrompt}>
                <DialogTitle>Login Required</DialogTitle>
                <DialogContent>
                    <p>You need to log in to add items to your cart.</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleNavigateLogin} color="primary">
                        Go to Login
                    </Button>
                    <Button onClick={handleCloseLoginPrompt} color="secondary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ProductGridCard;
