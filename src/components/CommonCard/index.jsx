import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import { CircularProgress } from '@mui/material';

import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import OwlCarousel from 'react-owl-carousel';
import './style.css';

import ProductDrawer from "../ProductDrawer/index";
import { useAuth } from '../../context/AuthContext'; // Adjust the import path

const CommonCard = ({ products, title }) => {
    const navigate = useNavigate();
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [loadingProductId, setLoadingProductId] = useState(null);
    const { userId, updateCartItemCount, isUserAuthenticated, cartItem } = useAuth();
    const [cartId, setCartId] = useState(null);

    useEffect(() => {
        if (products) {
            setFilteredProducts(products);
        }
    }, [products]);

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


    // Define colors and background settings for different titles
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

    const handleAddToCart = async (product) => {
        if (!isUserAuthenticated) {
            // Redirect to login page if user is not authenticated
            navigate('/login');
            window.scrollTo(0, 0);
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
            if (data.success) {
                setSelectedProduct(product);
                setDrawerOpen(true);
                setCartId(data.cart._id);
                updateCartItemCount(data.totalQuantity);

                // Update cart item count in context
                console.log('Product added to cart successfully');
            } else {
                console.error('Failed to add product to cart:', data.message);
            }
        } catch (error) {
            console.error('Error adding product to cart:', error);
        } finally {
            setLoadingProductId(null);
        }
    };

    const handleNavigateToDetails = (productId, product) => {
        navigate(`/products-details/${productId}`, { state: { product } });
    };

    if (!userId) {
        return null;
    }

    const productsToShow = filteredProducts.slice(0, 4);

    if (productsToShow.length === 0) {
        return (
            <div className="no-products">
                <h2 style={{ textAlign: 'center' }}> No products found for {title}</h2>
            </div>
        );
    }

    const { backgroundColor, borderColors } = getDynamicStyles(title);
    return (
        <div className="best-sellers">
            <h2>{title}</h2>
            <OwlCarousel {...options} className="products" style={{ backgroundColor }} >
                {productsToShow.map((product, index) => (
                    <div
                        key={product._id}
                        className="product-card"
                        style={{ backgroundColor: borderColors[index % borderColors.length] }}
                    >
                        <div className="product-image" onClick={() => handleNavigateToDetails(product._id, product)} style={{ cursor: 'pointer' }}>
                            <img src={product.images.mainImage} alt={product.name} className="product-image-common" /> {/* Ensure `product.imageUrl` and `product.name` exist */}
                        </div>
                        <h3>{product.name}</h3>
                        <p className="price">₹{product.price}</p>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <button
                                className="add-to-cart"
                                onClick={() => handleAddToCart(product)}
                                disabled={loadingProductId === product._id}
                            >
                                {loadingProductId === product._id ? (
                                    <CircularProgress size={24} />
                                ) : (
                                    "ADD TO CART"
                                )}
                            </button>
                        </div>
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
    );
};

export default CommonCard;
