
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BestSellers.module.css';
import { useAuth } from '../../context/AuthContext';
import Drawer from '@mui/material/Drawer';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import IncrementDecrementButton from '../IncrementDecrementButton'; // Import your IncrementDecrementButton component


const BestSellers = ({ products }) => {
    const navigate = useNavigate();
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { userId, updateCartItemCount } = useAuth();

    useEffect(() => {
        if (products) {
            setFilteredProducts(products);
        }
    }, [products]);

    const getBackgroundColor = () => {
        const randomLightColor = () => Math.floor(Math.random() * 156) + 100; 
        return `rgb(${randomLightColor()}, ${randomLightColor()}, ${randomLightColor()})`;
    };

    const handleAddtoCart = async (product) => {
        setSelectedProduct(product);
        setDrawerOpen(true);

        // Perform the fetch request to add the product to the cart
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
            // Update cart item count in context
            const updatedResponse = await fetch(`https://maalana-backend.onrender.com/api/get-all-cart-by-user/${userId}`);
            const updatedData = await updatedResponse.json();
            if (updatedData.success) {
                const totalItems = updatedData.cart.reduce((acc, cartItem) => acc + cartItem.items.length, 0);
                updateCartItemCount(totalItems);
            }

            console.log('Product added to cart successfully');
        } else {
            console.error('Failed to add product to cart:', data.message);
        }

    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    const handleGotoCart = () => {
        navigate('/cart');
    }

    if (!userId) {
        return null;
    }

    const productsToShow = filteredProducts.slice(0, 4);

    if (productsToShow.length === 0) {
        return (
            <div className={styles.moreProducts}>
                <h2 style={{ textAlign: 'center' }}>No products found</h2>
            </div>
        );
    }

    return (
        <div className={styles.bestSellers}>
            <h2>Best Sellers</h2>
            <div className={styles.products}>
                {productsToShow.map((product, index) => (
                    <div
                        key={product.id}
                        className={styles.productCard}
                        style={{ backgroundColor: getBackgroundColor(index) }}
                    >
                        <div className={styles.productImage}>
                            <img src={product.images.mainImage} alt={product.name} />
                        </div>
                        <h3>{product.name}</h3>
                        <p className={styles.price}>₹{product.price}</p> {/* Added rupee symbol */}
                        <button className={styles.addToCart} onClick={() => handleAddtoCart(product)}>
                            ADD TO CART
                        </button>
                    </div>
                ))}
            </div>

            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={handleDrawerClose}
                ModalProps={{ keepMounted: true }}
            >
                {selectedProduct && (
                    <div className="add-drawer-container">
                        <div className="add-drawer">
                            <ShoppingBagIcon className="add-icon-drawer" />
                            <CloseIcon className="close-icon" onClick={handleDrawerClose} />
                        </div>
                        <div className="drawer-product-info">
                            <img src={selectedProduct.images.mainImage} alt={selectedProduct.name} />
                            <div className="drawer-product-details">
                                <p>{selectedProduct.name}</p>
                                <p>₹<span>{selectedProduct.price}</span></p>
                                <IncrementDecrementButton />
                                <p className="remove-btn">Remove</p>
                            </div>
                        </div>
                        <Button variant="contained" className="go-to-cart-btn" onClick={handleGotoCart}>
                            GO TO CART
                        </Button>
                    </div>
                )}
            </Drawer>
        </div>
    );
};

export default BestSellers;
