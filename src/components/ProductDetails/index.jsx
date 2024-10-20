import React, { useState, useEffect } from "react";
import { Helmet } from 'react-helmet';
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress for loader
import { useAuth } from "../../context/AuthContext";
import './style.css';

const ProductDetails = () => {
    const { userId, updateCartItemCount, cartItem, setCartItem } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location;
    const { product, productId } = state || {}; // Destructure product from state if available
    // console.log('cartItem',  cartItem);
    // State Variables
    const [mainImage, setMainImage] = useState(product?.images?.mainImage || "https://via.placeholder.com/500x500");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [activeTab, setActiveTab] = useState('nutrition');
    const [quantity, setQuantity] = useState(1); // Quantity state
    const [isAddedToCart, setIsAddedToCart] = useState(false); // Track if the product is added to the cart
    const [loading, setLoading] = useState(false);
    const [cartId, setCartId] = useState(null);
    useEffect(() => {
        // Check if cartItem is defined and is an array
        if (cartItem && Array.isArray(cartItem)) {
            console.log('cartItem is an array:', cartItem);

            // Flatten the items from all objects in the cartItem array
            const allItems = cartItem.reduce((acc, currentItem) => {
                if (Array.isArray(currentItem.items)) {
                    return [...acc, ...currentItem.items];
                }
                return acc;
            }, []);

            console.log('All items from cartItem:', allItems);

            // Check if any item's productId._id matches the target productId
            const foundItem = allItems.find(item => item.productId._id === productId);

            // If a matching item is found, set the cartId and set isAddedToCart to true
            if (foundItem) {
                const cartWithProduct = cartItem.find(cart => cart.items.some(item => item.productId._id === productId));
                if (cartWithProduct) {
                    setCartId(cartWithProduct._id);
                    setQuantity(foundItem.quantity);
                }
                setIsAddedToCart(true);
            } else {
                setIsAddedToCart(false);
                setCartId(null);
            }
        } else {
            console.error('cartItem is not an array or is undefined');
        }
    }, [cartItem, productId]);

    // Handle Thumbnail Click
    const handleThumbnailClick = (imageUrl) => {
        setMainImage(imageUrl);
    };

    // Handle Snackbar Close
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    // Handle Increment Quantity
    const handleIncrement = () => {
        if (!loading) {
            const newQuantity = quantity + 1;
            updateCart(newQuantity); // Update the cart with new quantity
            setQuantity(newQuantity);
        }
    };

    // // Handle Decrement Quantity
    // const handleDecrement = () => {
    //     if (!loading && quantity > 1) {
    //         const newQuantity = quantity - 1;
    //         updateCart(newQuantity); // Update the cart with new quantity
    //         setQuantity(newQuantity);
    //     }
    // };

    // Handle Decrement Quantity
    const handleDecrement = async () => {
        if (!loading && quantity === 1) {
            setLoading(true);
            try {
                // Call the delete API if quantity is 1 (i.e., last item)
                const response = await axios.delete('http://localhost:8000/api/delete-cart-product', {
                    data: { userId, productId, cartId }
                });

                if (response.status === 200) {
                    updateCartItemCount(response.data.totalQuantity);
                    setQuantity(1); // Reset to default quantity
                    setIsAddedToCart(false);
                    setCartId(null);
                    setCartItem(prevItems => prevItems.filter(item => item.productId !== productId)); // Remove from UI
                }
            } catch (error) {
                console.error('Error removing item from cart', error);
                setSnackbarMessage(`Error removing item from cart: ${error.message}`);
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            } finally {
                setLoading(false);
            }
        } else if (!loading && quantity > 1) {
            const newQuantity = quantity - 1;
            updateCart(newQuantity); // Update the cart with new quantity
            setQuantity(newQuantity);
        }
    };

    // Handle Add to Cart
    const handleAddToCart = async () => {
        setLoading(true); // Start loading state
        try {
            const response = await fetch('http://localhost:8000/api/add-to-cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productId: product._id,
                    quantity: quantity,
                    shippingPrice: 50,
                    CoupanCode: 'DISCOUNT10',
                    id: userId || '',
                }),
            });

            const data = await response.json();
            if (data.success) {
                updateCartItemCount(data.totalQuantity);
                setSnackbarMessage("Product added to cart successfully!");
                setSnackbarSeverity('success');
                setIsAddedToCart(true); // Show "Go to Cart" button after adding to cart
            } else {
                setSnackbarMessage(`Failed to add product to cart: ${data.message}`);
                setSnackbarSeverity('error');
            }
        } catch (error) {
            setSnackbarMessage(`Error adding product to cart: ${error.message}`);
            setSnackbarSeverity('error');
        } finally {
            setLoading(false); // End loading state
            setSnackbarOpen(true);
        }
    };

    // Update Cart with Increment/Decrement
    const updateCart = async (newQuantity) => {
        setLoading(true); // Start loading state
        try {
            const response = await fetch('http://localhost:8000/api/update-cart', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId,
                    productId: productId,
                    quantity: newQuantity,
                    cartId: cartId,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            updateCartItemCount(data.totalQuantity);
            // Fetch updated cart items
            const updatedCartResponse = await fetch(`http://localhost:8000/api/get-all-cart-by-user/${userId}`);
            const updatedCartData = await updatedCartResponse.json();
            if (updatedCartData.success) {
                setCartItem(Array.isArray(updatedCartData.cart) ? updatedCartData.cart : []);
                setCartId(updatedCartData.cart._id);
            }
        } catch (error) {
            console.error('Error updating cart:', error);
        } finally {
            setLoading(false); // End loading state
        }
    };

    const handleBackButton = () => {
        navigate(-1);
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
            // left: 0,
            // behavior: 'smooth'
        });
    };

    // Show Loading or Error Message if Product is not available
    if (!product) {
        return <div>Loading Product Details...</div>;
    }

    return (
        <div className="ProductDetails-container">
            {/* Add Helmet for better SEO */}
            <Helmet>
                <title>{product.name} - Product Details</title>
                <meta name="description" content={product.description} />
            </Helmet>

            <header className="ProductDetails-header">
                <button className="ProductDetails-back-button" onClick={handleBackButton}>←</button>
                <h1 className="ProductDetails-product-title">Product Details</h1>
            </header>

            <main>
                <div className="ProductDetails-product-grid">
                    <div>
                        <div className="ProductDetails-product-image">
                            <img src={mainImage} alt={product.name || "Product Image"} id="main-image" />
                        </div>
                        <div className="ProductDetails-thumbnails">
                            {product?.images?.thumbnails?.map((src, index) => (
                                <button key={index} className="ProductDetails-thumbnail" onClick={() => handleThumbnailClick(src)}>
                                    <img src={src} alt={`Thumbnail ${index + 1}`} />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="ProductDetails-product-info">
                        <div>
                            <h2 className="ProductDetails-product-name">{product.name}</h2>
                            <p className="ProductDetails-product-weight">{product.weight}</p>
                        </div>

                        <p className="ProductDetails-product-description">
                            {product.description}
                        </p>

                        <div className="ProductDetails-product-price">
                            ₹{product.price} <span className="ProductDetails-price-note">(inclusive of all taxes)</span>
                        </div>

                        {!isAddedToCart ? (
                            loading ? (
                                <CircularProgress size={24} /> // Show loader instead of button
                            ) : (
                                <button className="ProductDetails-add-to-cart" onClick={handleAddToCart}>ADD TO CART</button>
                            )
                        ) : (
                            <div className="ProductDetails-cart-controls">
                                <div className="item-quantity" style={{ marginBottom: '10px' }}>
                                    <button aria-label="Decrease quantity" onClick={handleDecrement} disabled={loading}>-</button>
                                    {loading ? (
                                        <CircularProgress size={24} />
                                    ) : (
                                        <input type="number" value={quantity} readOnly min="1" aria-label="Quantity" />
                                    )}
                                    <button aria-label="Increase quantity" onClick={handleIncrement} disabled={loading}>+</button>
                                </div>
                                <button className="ProductDetails-go-to-cart" onClick={() => navigate('/cart')} disabled={loading}>
                                    Go to Cart
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="ProductDetails-tabs">
                    <div className="ProductDetails-tab-list">
                        <button className={`ProductDetails-tab-button ${activeTab === 'nutrition' ? 'active' : ''}`} onClick={() => setActiveTab('nutrition')}>
                            Nutritional Information
                        </button>
                        <button className={`ProductDetails-tab-button ${activeTab === 'ingredients' ? 'active' : ''}`} onClick={() => setActiveTab('ingredients')}>
                            Ingredients
                        </button>
                    </div>
                    {activeTab === 'nutrition' && (
                        <div className="ProductDetails-tab-content" id="nutrition-content">
                            <h3 className="ProductDetails-tab-title">Nutritional Information</h3>
                            <table>
                                <tbody>
                                    {product?.nutrition?.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.name}</td>
                                            <td>{item.value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    {activeTab === 'ingredients' && (
                        <div className="ProductDetails-tab-content" id="ingredients-content">
                            <h3 className="ProductDetails-tab-title">Ingredients</h3>
                            <p>{product.ingredients}</p>
                        </div>
                    )}
                </div>
            </main>

            {/* Snackbar for feedback */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default ProductDetails;
