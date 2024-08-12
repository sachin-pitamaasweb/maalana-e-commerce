// // import React from 'react';
// // import Grid from '@mui/material/Grid';
// // import Button from '@mui/material/Button';
// // import './style.scss';

// // const products = [
// //     {
// //         id: 1,
// //         image: 'https://via.placeholder.com/300x300',
// //         name: 'Assorted Fruit Lollipop - 150 g',
// //         price: '₹150',
// //     },
// //     {
// //         id: 2,
// //         image: 'https://via.placeholder.com/300x300',
// //         name: 'Assorted Fruit Pop - 150 g',
// //         price: '₹150',
// //     },
// //     {
// //         id: 3,
// //         image: 'https://via.placeholder.com/300x300',
// //         name: 'Assorted Fruit Lollipop - 150 g',
// //         price: '₹150',
// //     },
// // ];

// // const ProductGrid = () => {
// //     return (
// //         <div>
// //             <div className="product-grid">
// //                 <Grid container justifyContent="space-between" alignItems="center" className="filter">
// //                     <Button variant="contained" color="primary">Show Filter</Button>
// //                     <h2>3 Products</h2>
// //                 </Grid>
// //                 <Grid container spacing={2} className="grid" justifyContent="center">
// //                     {products.map((product) => (
// //                         <Grid item xs={12} sm={6} md={4} key={product.id} className="product-item">
// //                             <div className="product-card">
// //                                 <img src={product.image} alt={product.name} className="product-image" />
// //                                 <div className="product-info">
// //                                     <p className="product-name">{product.name}</p>
// //                                     <p className="product-price">{product.price}</p>
// //                                     <Button variant="outlined" color="primary" className="add-to-cart">
// //                                         ADD TO CART
// //                                     </Button>
// //                                 </div>
// //                             </div>
// //                         </Grid>
// //                     ))}
// //                 </Grid>
// //             </div>
// //         </div>
// //     );
// // };

// // export default ProductGrid;


// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Grid, Drawer, Snackbar, Alert, Button } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
// import './style.scss';
// import IncrementDecrementButton from '../IncrementDecrementButton/index';

// const products = [
//     { id: '66910e73740e745cef3b98d2', img: require('../../assets/product-cate/img-1.png'), name: 'Imli soft candy pouch - 100 g', price: 50 },
//     { id: '66910f73740e745cef3b98d4', img: require('../../assets/product-cate/img-1.png'), name: 'Imli soft candy pouch - 100 g', price: 50 },
//     { id: '66910f74740e745cef3b98d6', img: require('../../assets/product-cate/img-1.png'), name: 'Imli soft candy pouch - 100 g', price: 50 },
//     { id: '66910f75740e745cef3b98d8', img: require('../../assets/product-cate/img-1.png'), name: 'Imli soft candy pouch - 100 g', price: 50 },
//     { id: '66910f75740e745cef3b98da', img: require('../../assets/product-cate/img-1.png'), name: 'Imli soft candy pouch - 100 g', price: 50 }
// ];

// const ProductGrid = () => {
//     const navigate = useNavigate();
//     const [drawerOpen, setDrawerOpen] = useState(false);
//     const [selectedProduct, setSelectedProduct] = useState(null);
//     const [snackbar, setSnackbar] = useState({
//         open: false,
//         message: '',
//         severity: 'success', // 'success' or 'error'
//     });

//     useEffect(() => {
//         const drawerShown = sessionStorage.getItem('drawerShown');
//         if (!drawerShown) {
//             sessionStorage.setItem('drawerShown', 'false');
//         }
//     }, []);

//     const toggleDrawer = (open, product = null) => (event) => {
//         if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
//             return;
//         }

//         const drawerShown = sessionStorage.getItem('drawerShown') === 'true';

//         if (!drawerShown || !open) {
//             setDrawerOpen(open);
//             setSelectedProduct(product);
//             if (open) {
//                 sessionStorage.setItem('drawerShown', 'true');
//             }
//         }
//     };

//     const handleDetailProduct = (id) => {
//         navigate(`/product/${id}`);
//     };

//     const handleCloseSnackbar = () => {
//         setSnackbar({ ...snackbar, open: false });
//     };

//     return (
//         <div className="product-grid">
//             <Grid container spacing={2} justifyContent="center">
//                 {products.map((product) => (
//                     <Grid item xs={12} sm={6} md={4} key={product.id}>
//                         <div className="product-card">
//                             <img
//                                 src={product.img}
//                                 alt={product.name}
//                                 className="product-image"
//                                 onClick={() => handleDetailProduct(product.id)}
//                             />
//                             <div className="product-info">
//                                 <p className="product-name">{product.name}</p>
//                                 <div className="product-price-with-btn">
//                                     <p className="product-price">₹{product.price}</p>
//                                     <Button
//                                         variant="outlined"
//                                         color="primary"
//                                         onClick={toggleDrawer(true, product)}
//                                     >
//                                         ADD TO CART
//                                     </Button>
//                                 </div>
//                             </div>
//                         </div>
//                     </Grid>
//                 ))}
//             </Grid>
//             <Drawer
//                 anchor="right"
//                 open={drawerOpen}
//                 onClose={toggleDrawer(false)}
//                 ModalProps={{
//                     keepMounted: true,
//                 }}
//             >
//                 {selectedProduct && (
//                     <div className="add-drawer-container">
//                         <div className="add-drawer">
//                             <ShoppingBagIcon className="add-icon-drawer" />
//                             <CloseIcon className="close-icon" onClick={toggleDrawer(false)} />
//                         </div>
//                         <div className="product-image">
//                             <img src={selectedProduct.img} alt={selectedProduct.name} />
//                             <p>
//                                 {selectedProduct.name}
//                                 <br />
//                                 ₹<span>{selectedProduct.price}</span>
//                                 <br />
//                                 <IncrementDecrementButton />
//                                 <p className="remove-btn">remove</p>
//                             </p>
//                         </div>
//                         <div className="go-to-cart">
//                             <Button variant="contained" className="go-to-cart-btn">
//                                 GO TO CART
//                             </Button>
//                         </div>
//                     </div>
//                 )}
//             </Drawer>
//             <Snackbar
//                 open={snackbar.open}
//                 autoHideDuration={6000}
//                 onClose={handleCloseSnackbar}
//             >
//                 <Alert
//                     onClose={handleCloseSnackbar}
//                     severity={snackbar.severity}
//                     sx={{ width: '100%' }}
//                 >
//                     {snackbar.message}
//                 </Alert>
//             </Snackbar>
//         </div>
//     );
// };

// export default ProductGrid;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Drawer } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import './style.scss';
import IncrementDecrementButton from '../IncrementDecrementButton/index.jsx';

const ProductGrid = ({ product }) => {
    const navigate = useNavigate();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success', // 'success' or 'error'
    });

    useEffect(() => {
        const drawerShown = sessionStorage.getItem('drawerShown');
        if (!drawerShown) {
            sessionStorage.setItem('drawerShown', 'false');
        }

    }, []);

    const toggleDrawer = (open) => (event) => {
        console.log("event", open);
        if (
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        const drawerShown = sessionStorage.getItem('drawerShown') === 'true';

        if (!drawerShown || !open) {
            setDrawerOpen(open);
            if (open) {
                sessionStorage.setItem('drawerShown', 'true');
            }
        }
    };

    const handleDetailProduct = (id) => {
        navigate(`/product/${id}`);
        console.log(`Product ${id} clicked`);
    }

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };
    
    return (
        <div className="product-card">
            <img src={product.img} alt={product.name} className="product-image" onClick={() => handleDetailProduct(product.id)} />
            <div className="product-info">
                <p className="product-name">{product.name}</p>
                <div className='product-price-with-btn'>
                    <p className="product-price">₹{product.price}</p>
                        <button
                            className={`add-to-cart-btn`}
                            onClick={toggleDrawer(true)}
                        >
                            ADD TO CART
                        </button>    
                </div>
            </div>
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                <div className="add-drawer-container">
                    <div className='add-drawer'>
                        <span className="add-icon-drawer" onClick={toggleDrawer(true)}><ShoppingBagIcon /></span>
                        <span className="close-icon" onClick={toggleDrawer(false)}><CloseIcon /></span>
                    </div>
                    <div className='product-image'>
                        <img src={product.img} alt={product.name} />
                        <p>
                            {product.name}
                            <br />
                            {' '}
                            ₹<span>{product.price}</span>
                            <br />
                            {' '}
                            <IncrementDecrementButton />
                            <p className="remove-btn">remove</p>
                        </p>
                    </div>
                    <div className='go-to-cart'>
                        <button className='go-to-cart-btn'>GO TO CART</button>
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
    );
};

export default ProductGrid;
