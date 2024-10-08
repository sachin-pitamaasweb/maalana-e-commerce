// import React, { useState } from "react";
// import { Helmet } from 'react-helmet';
// import { useLocation, useNavigate } from "react-router-dom";
// import Snackbar from '@mui/material/Snackbar';
// import Alert from '@mui/material/Alert';

// import { useAuth } from "../../context/AuthContext";

// import "./style.css";

// const ProductDetails = () => {
//     const { userId, updateCartItemCount } = useAuth();
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { state } = location;
//     const { product } = state || {};
//     const [mainImage, setMainImage] = useState(product?.images?.mainImage || "https://via.placeholder.com/500x500");
//     const [snackbarOpen, setSnackbarOpen] = useState(false);
//     const [snackbarMessage, setSnackbarMessage] = useState("");
//     const [snackbarSeverity, setSnackbarSeverity] = useState("success");

//     const handleThumbnailClick = (imageUrl) => {
//         setMainImage(imageUrl);
//     };

//     const handleSnackbarClose = () => {
//         setSnackbarOpen(false);
//     };

//     const handleAddToCart = async (product) => {
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
//                 updateCartItemCount(data.totalQuantity);
//                 navigate('/cart');
//             } else {
//                 setSnackbarMessage(`Failed to add product to cart: ${data.message}`);
//                 setSnackbarSeverity('error');
//             }
//         } catch (error) {
//             setSnackbarMessage(`Error adding product to cart: ${error.message}`);
//             setSnackbarSeverity('error');
//         } finally {
//             setSnackbarOpen(true);
//         }
//     };

//     // Add a check to display a loading or error message if product is not available
//     if (!product) {
//         return <div>Loading Product Details...</div>;
//     }

//     return (
//         <>
//             <div className="product-grid-card-main">
//                 <Helmet>
//                     <title>Maalana-Product-Details</title>
//                 </Helmet>
//                 <div className="container-product-details">
//                     <div className="product-image-details">
//                         <div className="main-image-container-details">
//                             <img
//                                 src={mainImage}
//                                 alt={product.name || "Product Image"}
//                                 className="main-image"
//                             />
//                         </div>
//                         <div className="thumbnail-container">
//                             {product.images?.mainImage && (
//                                 <img
//                                     src={product.images.mainImage}
//                                     alt="Thumbnail 1"
//                                     className="thumbnail"
//                                     onClick={() => handleThumbnailClick(product.images.mainImage)}
//                                 />
//                             )}
//                             {product.images?.backImage && (
//                                 <img
//                                     src={product.images.backImage}
//                                     alt="Thumbnail 2"
//                                     className="thumbnail"
//                                     onClick={() => handleThumbnailClick(product.images.backImage)}
//                                 />
//                             )}
//                             {product.images?.frontImage && (
//                                 <img
//                                     src={product.images.frontImage}
//                                     alt="Thumbnail 3"
//                                     className="thumbnail"
//                                     onClick={() => handleThumbnailClick(product.images.frontImage)}
//                                 />
//                             )}
//                             {product.images?.leftImage && (
//                                 <img
//                                     src={product.images.leftImage}
//                                     alt="Thumbnail 4"
//                                     className="thumbnail"
//                                     onClick={() => handleThumbnailClick(product.images.leftImage)}
//                                 />
//                             )}
//                         </div>
//                     </div>
//                     <div className="product-info">
//                         <h1 className="name">{product.name || 'N/A'}</h1>
//                         <p className="weight">{product.weight || 'N/A'}</p>
//                         <p className="description">
//                             {product.description || 'N/A'}
//                         </p>
//                         <div className="rating">★★★★★</div>
//                         <p className="reviews">(548 Reviews)</p>
//                         <p className="price">
//                             ₹{product.price || 'N/A'} <span style={{ fontSize: "16px" }}>(inclusive of all taxes)</span>
//                         </p>
//                         <button className="add-to-cart" onClick={() => handleAddToCart(product)}>ADD TO CART</button>
//                     </div>
//                     <div className="product-details">
//                         <div className="nutritional-info">
//                             <h2>NUTRITIONAL INFORMATION</h2>
//                             <table>
//                                 {product.nutritionalInfo && Object.entries(product.nutritionalInfo).map(([key, value]) => (
//                                     <tr key={key}>
//                                         <td>{key}</td>
//                                         <td>{value}</td>
//                                     </tr>
//                                 ))}
//                             </table>
//                         </div>
//                         <div className="ingredients">
//                             <h2>INGREDIENTS</h2>
//                             <p>
//                                 {product.ingredients && product.ingredients.join(", ")}
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <Snackbar
//                 open={snackbarOpen}
//                 autoHideDuration={6000}
//                 onClose={handleSnackbarClose}
//                 anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//             >
//                 <Alert
//                     onClose={handleSnackbarClose}
//                     severity={snackbarSeverity}
//                     sx={{ width: '100%' }}
//                 >
//                     {snackbarMessage}
//                 </Alert>
//             </Snackbar>
//         </>
//     );
// };

// export default ProductDetails;


import React, { useState } from "react";
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import { useAuth } from "../../context/AuthContext";
import './style.css';

const ProductDetails = () => {
    const { userId, updateCartItemCount } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location;
    const { product } = state || {}; // Destructure product from state if available

    // State Variables
    const [mainImage, setMainImage] = useState(product?.images?.mainImage || "https://via.placeholder.com/500x500");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [activeTab, setActiveTab] = useState('nutrition');

    // Handle Thumbnail Click
    const handleThumbnailClick = (imageUrl) => {
        setMainImage(imageUrl);
    };

    // Handle Snackbar Close
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    // Handle Add to Cart
    const handleAddToCart = async () => {
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
                updateCartItemCount(data.totalQuantity);
                setSnackbarMessage("Product added to cart successfully!");
                setSnackbarSeverity('success');
                navigate('/cart');
            } else {
                setSnackbarMessage(`Failed to add product to cart: ${data.message}`);
                setSnackbarSeverity('error');
            }
        } catch (error) {
            setSnackbarMessage(`Error adding product to cart: ${error.message}`);
            setSnackbarSeverity('error');
        } finally {
            setSnackbarOpen(true);
        }
    };

    // Show Loading or Error Message if Product is not available
    if (!product) {
        return <div>Loading Product Details...</div>;
    }
console.log('product', product);
    return (
        <div className="ProductDetails-container">
            {/* Add Helmet for better SEO */}
            <Helmet>
                <title>{product.name} - Product Details</title>
                <meta name="description" content={product.description} />
            </Helmet>

            <header className="ProductDetails-header">
                <button className="ProductDetails-back-button" onClick={() => navigate(-1)}>←</button>
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

                        <button className="ProductDetails-add-to-cart" onClick={handleAddToCart}>ADD TO CART</button>
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
