import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Drawer, Grid, Snackbar, Alert, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import './style.scss';
import IncrementDecrementButton from '../IncrementDecrementButton';

const ProductCard = ({ product }) => {
    console.log(product.length);
    const navigate = useNavigate();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success', // 'success' or 'error'
    });

    const handleDetailProduct = (id) => {
        navigate(`/product/${id}`);
        console.log(`Product ${id} clicked`);
    }

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <Grid item xs={12} sm={6} md={4}>
            <div className="product-card">
                <img src={product.img} alt={product.name} className="product-image" onClick={() => handleDetailProduct(product.id)} />
                <div className="product-info">
                    <p className="product-name">{product.name}</p>
                    <div className='product-price-with-btn'>
                        <p className="product-price">₹{product.price}</p>
                        <Button
                            variant="outlined"
                            color="primary"
                            className="add-to-cart-btn"
                            onClick={() => setDrawerOpen(true)}
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
                        <div className='add-drawer'>
                            <ShoppingBagIcon className="add-icon-drawer" />
                            <CloseIcon className="close-icon" onClick={() => setDrawerOpen(false)} />
                        </div>
                        <div className='product-image'>
                            <img src={product.img} alt={product.name} />
                            <p>
                                {product.name}
                                <br />
                                ₹<span>{product.price}</span>
                                <br />
                                <IncrementDecrementButton />
                                <p className="remove-btn">remove</p>
                            </p>
                        </div>
                        <div className='go-to-cart'>
                            <Button variant="contained" className='go-to-cart-btn'>
                                GO TO CART
                            </Button>
                        </div>
                    </div>
                </Drawer>
                <Snackbar 
                    open={snackbar.open} 
                    autoHideDuration={6000} 
                    onClose={handleCloseSnackbar}
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
