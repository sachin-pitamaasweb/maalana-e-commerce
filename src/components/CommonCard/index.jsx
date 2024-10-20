import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import OwlCarousel from 'react-owl-carousel';
import { CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

import './style.css';
import ProductDrawer from "../ProductDrawer/index";
import { useAuth } from '../../context/AuthContext';

import axios from "axios";

const CommonCard = React.memo(({ products, title }) => {
    const navigate = useNavigate();
    const { userId, isUserAuthenticated, cartItem, setCartItem, updateCartItemCount } = useAuth();
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [loginPromptOpen, setLoginPromptOpen] = useState(false);
    const [cartId, setCartId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingProductId, setLoadingProductId] = useState(null); // For Add to Cart loader
    const [countLoading, setCountLoading] = useState(null);
    const [quantities, setQuantities] = useState({});

    // Define cartItems and setCartItems using useState
    const [cartItems, setCartItems] = useState(cartItem || []);

    const fetchCartData = useCallback(async () => {
        if (!userId) return;

        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8000/api/get-all-cart-by-user/${userId}`);
            const data = await response.json();
            if (data.success) {
                setCartItem(Array.isArray(data.cart) ? data.cart : []);
                setCartId(data.cart._id);

                // Initialize quantities based on fetched cart data
                const initialQuantities = {};
                data.cart.forEach(cart => {
                    cart.items.forEach(item => {
                        initialQuantities[item.productId._id] = item.quantity;
                    });
                });
                setQuantities(initialQuantities);
                setCartItems(data.cart); // Update the local cartItems state
            }
        } catch (error) {
            console.error('Error fetching cart data:', error);
        }
        setLoading(false);
    }, [userId, setCartItem]);

    useEffect(() => {
        if (products) {
            setFilteredProducts(products);
        }
    }, [products]);

    useEffect(() => {
        fetchCartData();
    }, [fetchCartData]);

    const handleAddToCart = async (product) => {
        if (!isUserAuthenticated) {
            setLoginPromptOpen(true);
            return;
        }

        setLoading(true);
        setLoadingProductId(product._id)
        try {
            const response = await fetch('http://localhost:8000/api/add-to-cart', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    productId: product._id,
                    quantity: 1,
                    shippingPrice: 50,
                    CoupanCode: 'DISCOUNT10',
                    id: userId || '',
                }),
            });
            const result = await response.json();
            if (result.success) {
                await fetchCartData(); // Re-fetch the cart data after adding an item
                updateCartItemCount(result.totalQuantity || 1); // Update cart item count in real-time
            }
        } catch (error) {
            console.error('Error adding product to cart:', error);
        } finally {
            setLoadingProductId(null);
            setLoading(false);
        }
    };

    const handleIncrement = async (productId) => {
        if (!productId) return;
        let cartId = '';
        let currentQuantity = 0;

        // Optimistically update the cart items in state
        const updatedItems = cartItems.map(cartItem => {
            const newItems = cartItem.items.map(item => {
                if (item.productId._id === productId) {
                    const newQuantity = item.quantity + 1;
                    if (cartItem._id) {
                        cartId = cartItem._id;
                    }
                    currentQuantity = item.quantity;
                    return { ...item, quantity: newQuantity }; // Increment the quantity optimistically
                }
                return item;
            });
            return { ...cartItem, items: newItems };
        });

        if (!cartId) {
            console.error("Error: cartId is not set.");
            return;
        }

        setCartItems(updatedItems); // Set the updated cart items in the state
        setCountLoading(productId);
        try {
            // Call the API to persist the quantity increment
            const response = await axios.put('http://localhost:8000/api/increase-quantity', {
                userId,
                cartId,
                productId,
                quantity: 1,
            });
            updateCartItemCount(response.data.totalQuantity);
            setQuantities(prev => ({
                ...prev,
                [productId]: response.data.cartQuantity, // Update the quantity state
            }));
        } catch (error) {
            console.error('Error updating quantity:', error);
            rollbackUpdate(productId, currentQuantity); // Rollback in case of error
        } finally {
            setCountLoading(null);
        }
    };

    const handleDecrement = async (productId) => {
        if (!productId) return;
        let cartId = '';
        let currentQuantity = 0;

        // Optimistically update the cart items in state
        const updatedItems = cartItems.map(cartItem => {
            const newItems = cartItem.items.map(item => {
                if (item.productId._id === productId) {
                    cartId = cartItem._id;
                    currentQuantity = item.quantity;
                    if (item.quantity > 1) {
                        return { ...item, quantity: item.quantity - 1 }; // Decrement the quantity optimistically
                    } else if (item.quantity === 1) {
                        return null; // Remove the item when quantity is 1
                    }
                }
                return item;
            }).filter(item => item !== null); // Remove null items (when quantity is 1)
            return { ...cartItem, items: newItems };
        }).filter(cart => cart.items.length > 0); // Remove empty carts

        setCartItems(updatedItems); // Set the updated cart items in the state
        setCountLoading(productId);
        try {
            if (currentQuantity > 1) {
                // Call the API to persist the quantity decrement
                const response = await axios.put('http://localhost:8000/api/decrease-quantity', {
                    userId,
                    cartId,
                    productId,
                    quantity: 1,
                });
                updateCartItemCount(response.data.totalQuantity);
                setQuantities(prev => ({
                    ...prev,
                    [productId]: response.data.cartQuantity, // Update the quantity state
                }));
            } else {
                // Delete the product from the cart if quantity is 1
                await axios.delete('http://localhost:8000/api/delete-cart-product', {
                    data: { userId, productId, cartId },
                });

                // After successful deletion, remove the product from the quantities state
                setQuantities(prev => {
                    const updatedQuantities = { ...prev };
                    delete updatedQuantities[productId]; // Remove the product's quantity
                    return updatedQuantities;
                });

                // Optionally, fetch the updated cart items from the server after deletion
                const updatedCartResponse = await axios.get(`http://localhost:8000/api/get-all-cart-by-user/${userId}`);
                const updatedCartData = updatedCartResponse.data;
                if (updatedCartData.success) {
                    setCartItem(updatedCartData.cart);
                    updateCartItemCount(updatedCartData.totalQuantity); // Update the cart count
                }
            }
        } catch (error) {
            console.error('Error updating cart:', error);
            rollbackUpdate(productId, currentQuantity); // Rollback in case of error
        } finally {
            setCountLoading(null);
        }
    };

    const rollbackUpdate = (productId, originalQuantity) => {
        const rolledBackItems = cartItems.map(cartItem => {
            const originalItems = cartItem.items.map(item => {
                if (item.productId._id === productId) {
                    return { ...item, quantity: originalQuantity }; // Rollback to original quantity
                }
                return item;
            });
            return { ...cartItem, items: originalItems };
        });
        setCartItems(rolledBackItems); // Rollback the cart items in the state
    };

    const isProductInCart = (productId) => {
        return cartItem.some(cart =>
            cart.items.some(item => item.productId && item.productId._id === productId)
        );
    };

    const getProductQuantityInCart = (productId) => {
        return quantities[productId] || 1;
    };

    const handleNavigateToDetails = (productId, product) => {
        navigate(`/products-details/${productId}`, { state: { product } });
    };

    const handleCloseLoginPrompt = () => {
        setLoginPromptOpen(false);
    };

    const handleNavigateLogin = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        navigate('/login');
    };

    const getDynamicStyles = (title) => {
        switch (title) {
            case 'Best Sellers':
                return { backgroundColor: '#FFDCF7', borderColors: ['#E0F2FF', '#E2FFB2', '#FFE4BE', '#FFBEBE'] };
            case 'Imli Range':
                return { backgroundColor: '#FEFFDC', borderColors: ['#E0F2FF', '#E2FFB2', '#FFE4BE', '#BEFFCC'] };
            case 'Lollipops':
                return { backgroundColor: '#FFD4A8', borderColors: ['#E0F2FF', '#E2FFB2', '#FFE4BE', '#FFBEBE', '#BEFFCC'] };
            case 'Fruit Katli Range':
                return { backgroundColor: '#CAFFCF', borderColors: ['#E0F2FF', '#E2FFB2', '#FFE4BE', '#FFBEBE', '#BEFFCC'] };
            default:
                return { backgroundColor: '#FFFFFF', borderColors: ['#E0E0E0'] }; // Default case
        }
    };

    const options = {
        loop: true,
        margin: 10,
        nav: false,
        dots: false,
        responsive: {
            0: {
                autoplay: true,
                autoplayTimeout: 3000,
                items: 1,
                margin: 20
            },
            600: {
                autoplay: true,
                autoplayTimeout: 3000,
                items: 2
            },
            1000: {
                items: 3
            },
            1920: {
                items: 4
            }
        }
    };

    const { backgroundColor, borderColors } = getDynamicStyles(title);

    return (
        <>
            <div className="best-sellers">
                <h2 className="best-sellers-title">{title}</h2>
                <OwlCarousel {...options} className="products" style={{ backgroundColor }}>
                    {filteredProducts.slice(0, 4).map((product, index) => (
                        <div
                            key={product._id}
                            className="product-card"
                            style={{ backgroundColor: borderColors[index % borderColors.length] }}
                        >
                            <div className="product-image" onClick={() => handleNavigateToDetails(product._id, product)} style={{ cursor: 'pointer' }}>
                                <img src={product.images.mainImage} alt={product.name} className="product-image-common" />
                            </div>
                            <h3>{product.name}</h3>
                            <p className="price">₹{product.price}</p>
                            {isProductInCart(product._id) ? (
                                <div className="item-quantity" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <button aria-label="Decrease quantity" onClick={() => handleDecrement(product._id)}>-</button>
                                    <input type="number" value={getProductQuantityInCart(product._id)} min="1" aria-label="Quantity" readOnly />
                                    <button aria-label="Increase quantity" onClick={() => handleIncrement(product._id)}>+</button>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <button
                                        className="add-to-cart"
                                        onClick={() => handleAddToCart(product)}
                                    >
                                        ADD TO CART
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </OwlCarousel>
                {selectedProduct && (
                    <ProductDrawer
                        drawerOpen={drawerOpen}
                        setDrawerOpen={setDrawerOpen}
                        product={selectedProduct}
                        cartId={cartId}
                    />
                )}
            </div>
            {/* Login Prompt Modal */}
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
});

export default CommonCard;
