import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Drawer, Grid, Snackbar, Alert, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import './style.scss';
import IncrementDecrementButton from '../IncrementDecrementButton';

import { useAuth } from '../../context/AuthContext';

const ProductCard = ({ product, filter }) => {
    const navigate = useNavigate();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success',
    });

    const { userId } = useAuth();

    const handleDetailProduct = (id) => {
        navigate(`/product/${id}`);
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const handleAddToCart = async (product) => {
        console.log('handleAddToCart', product);
        try {
            const response = await fetch('http://localhost:8000/api/add-to-cart', {
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

            if (!response.ok) {
                throw new Error('Failed to add to cart');
            }

            const result = await response.json();

            console.log(result);

            setSnackbar({
                open: true,
                message: 'Product added to cart successfully!',
                severity: 'success',
            });
        } catch (error) {
            setSnackbar({
                open: true,
                message: 'Failed to add product to cart.',
                severity: 'error',
            });
        }
    };

    const handleGotoCart = () => {
        setDrawerOpen(false);
        navigate('/cart');
    }

    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <div className="product-card">
                <div className="product-image" onClick={() => handleDetailProduct(product.id)}>
                    <img src={product.images.mainImage || 'https://via.placeholder.com/600x400'} alt={product.name} />
                </div>
                <div className="product-info" style={{ width:'100%' }}>
                    <p className="product-name" style={{ textAlign: 'left' }}>{product.name}</p>
                   <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                   <p className="product-price" style={{ textAlign: 'left' }}>₹{product.price}</p>
                    <Button
                        variant="contained"
                        className="add-to-cart-btn"
                        sx={{
                            backgroundColor: 'transparent !important',
                            color: 'black !important',
                            border: '1px solid black',
                            '&:hover': {
                                backgroundColor: 'black !important',
                                color: 'white !important',
                            },
                        }}
                        onClick={() => {
                            handleAddToCart(product);
                            setDrawerOpen(true)
                        }}
                    >
                        ADD TO CART
                    </Button>
                   </div>
                </div>
                <Drawer
                    anchor="right"
                    open={drawerOpen}
                    onClose={() => setDrawerOpen(false)}
                    ModalProps={{
                        keepMounted: true,
                    }}
                >
                    <div className="add-drawer-container">
                        <div className="add-drawer">
                            <ShoppingBagIcon className="add-icon-drawer" />
                            <CloseIcon className="close-icon" onClick={() => setDrawerOpen(false)} />
                        </div>
                        <div className="drawer-product-info">
                            <img src={product.images.mainImage} alt={product.name} />
                            <div className="drawer-product-details">
                                <p>{product.name}</p>
                                <p>₹<span>{product.price}</span></p>
                                <IncrementDecrementButton />
                                <p className="remove-btn">Remove</p>
                            </div>
                        </div>
                        <Button variant="contained" className="go-to-cart-btn" onClick={handleGotoCart}>
                            GO TO CART
                        </Button>
                    </div>
                </Drawer>
                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert
                        onClose={handleCloseSnackbar}
                        severity={snackbar.severity}
                        sx={{ width: '100%' }}
                    >
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </div>
        </Grid>
    );
};

export default ProductCard;
