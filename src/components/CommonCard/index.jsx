// import React, { useState, useEffect } from "react";
// import { useNavigate } from 'react-router-dom';

// import { CircularProgress } from '@mui/material';

// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel/dist/assets/owl.theme.default.css';
// import OwlCarousel from 'react-owl-carousel';
// import './style.css';

// import ProductDrawer from "../ProductDrawer/index";
// import { useAuth } from '../../context/AuthContext'; // Adjust the import path

// const CommonCard = ({ products, title }) => {
//     const navigate = useNavigate();
//     const [filteredProducts, setFilteredProducts] = useState([]);
//     const [drawerOpen, setDrawerOpen] = useState(false);
//     const [selectedProduct, setSelectedProduct] = useState(null);
//     const [loadingProductId, setLoadingProductId] = useState(null);
//     const { userId, updateCartItemCount, isUserAuthenticated, cartItem, setCartItem } = useAuth();
//     const [cartId, setCartId] = useState(null);

//     useEffect(() => {
//         if (products) {
//             setFilteredProducts(products);
//         }
//     }, [products]);

//     const options = {
//         loop: true,
//         margin: 10,
//         nav: false,
//         dots: false,
//         responsive: {
//             0: {
//                 autoplay: true,
//                 autoplayTimeout: 3000,
//                 items: 1,
//                 margin: 20
//             },
//             600: {
//                 autoplay: true,
//                 autoplayTimeout: 3000,
//                 items: 2
//             },
//             1000: {
//                 items: 3
//             },
//             1920: {
//                 items: 4
//             }
//         }
//     };


//     // Define colors and background settings for different titles
//     const getDynamicStyles = (title) => {
//         switch (title) {
//             case 'Best Sellers':
//                 return { backgroundColor: '#FFDCF7', borderColors: ['#E0F2FF', '#E2FFB2', '#FFE4BE', '#FFBEBE'] };
//             case 'Imli Range':
//                 return { backgroundColor: '#FEFFDC', borderColors: ['#E0F2FF', '#E2FFB2', '#FFE4BE', '#BEFFCC'] };
//             case 'Lollipops':
//                 return { backgroundColor: '#FFD4A8', borderColors: ['#E0F2FF', '#E2FFB2', '#FFE4BE', '#FFBEBE', '#BEFFCC'] };
//             case 'Fruit Katli Range':
//                 return { backgroundColor: '#CAFFCF', borderColors: ['#E0F2FF', '#E2FFB2', '#FFE4BE', '#FFBEBE', '#BEFFCC'] };
//             default:
//                 return { backgroundColor: '#FFFFFF', borderColors: ['#E0E0E0'] }; // Default case
//         }
//     };

//     const handleAddToCart = async (product) => {
//         if (!isUserAuthenticated) {
//             // Redirect to login page if user is not authenticated
//             navigate('/login');
//             window.scrollTo(0, 0);
//             return;
//         }
//         setLoadingProductId(product._id);
//         try {
//             const response = await fetch('https://maalana-backend.onrender.com/api/add-to-cart', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     productId: product._id,
//                     quantity: 1,
//                     shippingPrice: 50,
//                     CoupanCode: 'DISCOUNT10',
//                     id: userId || '',
//                 }),
//             });

//             const data = await response.json();
//             if (data.success) {
//                 setSelectedProduct(product);
//                 setDrawerOpen(true);
//                 setCartId(data.cart._id);
//                 updateCartItemCount(data.totalQuantity);

//                 // Update cart item count in context
//                 console.log('Product added to cart successfully');
//             } else {
//                 console.error('Failed to add product to cart:', data.message);
//             }
//         } catch (error) {
//             console.error('Error adding product to cart:', error);
//         } finally {
//             setLoadingProductId(null);
//         }
//     };

//     const handleNavigateToDetails = (productId, product) => {
//         navigate(`/products-details/${productId}`, { state: { product } });
//     };

//     if (!userId) {
//         return null;
//     }

//     const productsToShow = filteredProducts.slice(0, 4);

//     if (productsToShow.length === 0) {
//         return (
//             <div className="no-products">
//                 <h2 style={{ textAlign: 'center' }}> No products found for {title}</h2>
//             </div>
//         );
//     }

//     const { backgroundColor, borderColors } = getDynamicStyles(title);
//     return (
//         <div className="best-sellers">
//             <h2 className="best-sellers-title" >{title}</h2>
//             <OwlCarousel {...options} className="products" style={{ backgroundColor }} >
//                 {productsToShow.map((product, index) => (
//                     <div
//                         key={product._id}
//                         className="product-card"
//                         style={{ backgroundColor: borderColors[index % borderColors.length] }}
//                     >
//                         <div className="product-image" onClick={() => handleNavigateToDetails(product._id, product)} style={{ cursor: 'pointer' }}>
//                             <img src={product.images.mainImage} alt={product.name} className="product-image-common" /> {/* Ensure `product.imageUrl` and `product.name` exist */}
//                         </div>
//                         <h3>{product.name}</h3>
//                         <p className="price">₹{product.price}</p>
//                         <div style={{ display: 'flex', justifyContent: 'center' }}>
//                             <button
//                                 className="add-to-cart"
//                                 onClick={() => handleAddToCart(product)}
//                                 disabled={loadingProductId === product._id}
//                             >
//                                 {loadingProductId === product._id ? (
//                                     <CircularProgress size={24} />
//                                 ) : (
//                                     "ADD TO CART"
//                                 )}
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </OwlCarousel>
//             {selectedProduct && (
//                 <ProductDrawer
//                     drawerOpen={drawerOpen}
//                     setDrawerOpen={setDrawerOpen}
//                     product={selectedProduct}
//                     cartId={cartId}
//                 />
//             )}

//         </div>
//     );
// };

// export default CommonCard;


import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import OwlCarousel from 'react-owl-carousel';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './style.css';
import ProductDrawer from "../ProductDrawer/index";
import { useAuth } from '../../context/AuthContext';

const CommonCard = React.memo(({ products, title }) => {
    const navigate = useNavigate();
    const { userId, isUserAuthenticated, cartItem, setCartItem, updateCartItemCount } = useAuth();
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [drawerOpen, setDrawerOpen] = useState(false); // Closed initially
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [cartId, setCartId] = useState(null);
    const [loading, setLoading] = useState(false); // Loading state

    const fetchCartData = useCallback(async () => {
        if (!userId) return;

        setLoading(true); // Show loader while fetching cart data
        try {
            const response = await fetch(`https://maalana-backend.onrender.com/api/get-all-cart-by-user/${userId}`);
            const data = await response.json();
            if (data.success) {
                setCartItem(Array.isArray(data.cart) ? data.cart : []);
                setCartId(data.cart._id);
            }
        } catch (error) {
            console.error('Error fetching cart data:', error);
        }
        setLoading(false); // Hide loader after fetching data
    }, [userId, setCartItem]);

    useEffect(() => {
        if (products) {
            setFilteredProducts(products);
        }
    }, [products]);

    useEffect(() => {
        fetchCartData();
    }, [fetchCartData]);

    // Carousel options defined without useMemo
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
            navigate('/login');
            window.scrollTo(0, 0);
            return;
        }

        setLoading(true); // Show loader when adding to cart
        try {
            const response = await fetch('https://maalana-backend.onrender.com/api/add-to-cart', {
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
            }
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
        setLoading(false); // Hide loader after adding to cart
    };

    const updateCart = async (newQuantity, cartId, productId) => {
        setLoading(true); // Show loader when updating cart
        try {
            const response = await fetch('https://maalana-backend.onrender.com/api/update-cart', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: userId,
                    productId: productId,
                    quantity: newQuantity,
                    cartId: cartId,
                }),
            });
            const result = await response.json();
            if (result.success) {
                await fetchCartData(); // Re-fetch the cart data after updating an item
            }
        } catch (error) {
            console.error('Error updating cart:', error);
        }
        setLoading(false); // Hide loader after updating cart
    };

    const handleIncrement = (productId) => {
        const cart = cartItem.find(cart => cart.items.some(item => item.productId._id === productId));
        if (cart) {
            const item = cart.items.find(item => item.productId._id === productId);
            if (item) {
                const newQuantity = item.quantity + 1;
                updateCart(newQuantity, cart._id, productId);
            }
        }
    };

    const handleDecrement = (productId) => {
        const cart = cartItem.find(cart => cart.items.some(item => item.productId._id === productId));
        if (cart) {
            const item = cart.items.find(item => item.productId._id === productId);
            if (item && item.quantity > 1) {
                const newQuantity = item.quantity - 1;
                updateCart(newQuantity, cart._id, productId);
            }
        }
    };

    const isProductInCart = (productId) => {
        return cartItem.some(cart =>
            cart.items.some(item => item.productId && item.productId._id === productId)
        );
    };

    const getProductQuantityInCart = (productId) => {
        const productInCart = cartItem.flatMap(cart =>
            cart.items.filter(item => item.productId && item.productId._id === productId)
        ).find(item => item.productId && item.productId._id === productId);
        return productInCart ? productInCart.quantity : 1;
    };

    const handleNavigateToDetails = (productId, product) => {
        navigate(`/products-details/${productId}`, { state: { product } });
    };

    // Directly filter the products without useMemo
    const productsToShow = filteredProducts ? filteredProducts.slice(0, 4) : [];

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!userId || productsToShow.length === 0) {
        return (
            <div className="no-products">
                <h2 style={{ textAlign: 'center' }}> No products found for {title}</h2>
            </div>
        );
    }

    const { backgroundColor, borderColors } = getDynamicStyles(title);

    return (
        <div className="best-sellers">
            <h2 className="best-sellers-title">{title}</h2>
            <OwlCarousel {...options} className="products" style={{ backgroundColor }}>
                {productsToShow.map((product, index) => (
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
    );
});

export default CommonCard;
