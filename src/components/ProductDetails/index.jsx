// import React, { useState, useEffect } from "react";
// import { Helmet } from 'react-helmet';
// import axios from "axios";
// import { useLocation, useNavigate } from "react-router-dom";
// import Snackbar from '@mui/material/Snackbar';
// import Alert from '@mui/material/Alert';
// import ReactImageMagnify from 'react-image-magnify';
// import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress for loader
// import { useAuth } from "../../context/AuthContext";
// import './style.css';

// const ProductDetails = () => {
//     const { userId, updateCartItemCount, cartItem, setCartItem } = useAuth();
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { state } = location;
//     const { product, productId } = state || {}; // Destructure product from state if available
//     // console.log('cartItem',  cartItem);
//     // State Variables
//     const [mainImage, setMainImage] = useState(product?.images?.mainImage || "https://via.placeholder.com/500x500");
//     const [snackbarOpen, setSnackbarOpen] = useState(false);
//     const [snackbarMessage, setSnackbarMessage] = useState("");

//     const [snackbarSeverity, setSnackbarSeverity] = useState("success");
//     const [activeTab, setActiveTab] = useState('nutrition');
//     const [quantity, setQuantity] = useState(1); // Quantity state
//     const [isAddedToCart, setIsAddedToCart] = useState(false); // Track if the product is added to the cart
//     const [loading, setLoading] = useState(false);
//     const [cartId, setCartId] = useState(null);
//     useEffect(() => {
//         // Check if cartItem is defined and is an array
//         if (cartItem && Array.isArray(cartItem)) {
//             console.log('cartItem is an array:', cartItem);

//             // Flatten the items from all objects in the cartItem array
//             const allItems = cartItem.reduce((acc, currentItem) => {
//                 if (Array.isArray(currentItem.items)) {
//                     return [...acc, ...currentItem.items];
//                 }
//                 return acc;
//             }, []);

//             console.log('All items from cartItem:', allItems);

//             // Check if any item's productId._id matches the target productId
//             const foundItem = allItems.find(item => item.productId._id === productId);

//             // If a matching item is found, set the cartId and set isAddedToCart to true
//             if (foundItem) {
//                 const cartWithProduct = cartItem.find(cart => cart.items.some(item => item.productId._id === productId));
//                 if (cartWithProduct) {
//                     setCartId(cartWithProduct._id);
//                     setQuantity(foundItem.quantity);
//                 }
//                 setIsAddedToCart(true);
//             } else {
//                 setIsAddedToCart(false);
//                 setCartId(null);
//             }
//         } else {
//             console.error('cartItem is not an array or is undefined');
//         }
//     }, [cartItem, productId]);

//     // Handle Thumbnail Click
//     const handleThumbnailClick = (imageUrl) => {
//         setMainImage(imageUrl);
//     };

//     // Handle Snackbar Close
//     const handleSnackbarClose = () => {
//         setSnackbarOpen(false);
//     };

//     // Handle Increment Quantity
//     const handleIncrement = () => {
//         if (!loading) {
//             const newQuantity = quantity + 1;
//             updateCart(newQuantity); // Update the cart with new quantity
//             setQuantity(newQuantity);
//         }
//     };

//     // // Handle Decrement Quantity
//     // const handleDecrement = () => {
//     //     if (!loading && quantity > 1) {
//     //         const newQuantity = quantity - 1;
//     //         updateCart(newQuantity); // Update the cart with new quantity
//     //         setQuantity(newQuantity);
//     //     }
//     // };

//     // Handle Decrement Quantity
//     const handleDecrement = async () => {
//         if (!loading && quantity === 1) {
//             setLoading(true);
//             try {
//                 // Call the delete API if quantity is 1 (i.e., last item)
//                 const response = await axios.delete('http://localhost:8000/api/delete-cart-product', {
//                     data: { userId, productId, cartId }
//                 });

//                 if (response.status === 200) {
//                     updateCartItemCount(response.data.totalQuantity);
//                     setQuantity(1); // Reset to default quantity
//                     setIsAddedToCart(false);
//                     setCartId(null);
//                     setCartItem(prevItems => prevItems.filter(item => item.productId !== productId)); // Remove from UI
//                 }
//             } catch (error) {
//                 console.error('Error removing item from cart', error);
//                 setSnackbarMessage(`Error removing item from cart: ${error.message}`);
//                 setSnackbarSeverity('error');
//                 setSnackbarOpen(true);
//             } finally {
//                 setLoading(false);
//             }
//         } else if (!loading && quantity > 1) {
//             const newQuantity = quantity - 1;
//             updateCart(newQuantity); // Update the cart with new quantity
//             setQuantity(newQuantity);
//         }
//     };

//     // Handle Add to Cart
//     const handleAddToCart = async () => {
//         setLoading(true); // Start loading state
//         try {
//             const response = await fetch('http://localhost:8000/api/add-to-cart', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     productId: product._id,
//                     quantity: quantity,
//                     shippingPrice: 50,
//                     CoupanCode: 'DISCOUNT10',
//                     id: userId || '',
//                 }),
//             });

//             const data = await response.json();
//             if (data.success) {
//                 updateCartItemCount(data.totalQuantity);
//                 setSnackbarMessage("Product added to cart successfully!");
//                 setSnackbarSeverity('success');
//                 setIsAddedToCart(true); // Show "Go to Cart" button after adding to cart
//             } else {
//                 setSnackbarMessage(`Failed to add product to cart: ${data.message}`);
//                 setSnackbarSeverity('error');
//             }
//         } catch (error) {
//             setSnackbarMessage(`Error adding product to cart: ${error.message}`);
//             setSnackbarSeverity('error');
//         } finally {
//             setLoading(false); // End loading state
//             setSnackbarOpen(true);
//         }
//     };

//     // Update Cart with Increment/Decrement
//     const updateCart = async (newQuantity) => {
//         setLoading(true); // Start loading state
//         try {
//             const response = await fetch('http://localhost:8000/api/update-cart', {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     userId: userId,
//                     productId: productId,
//                     quantity: newQuantity,
//                     cartId: cartId,
//                 }),
//             });

//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }

//             const data = await response.json();
//             updateCartItemCount(data.totalQuantity);
//             // Fetch updated cart items
//             const updatedCartResponse = await fetch(`http://localhost:8000/api/get-all-cart-by-user/${userId}`);
//             const updatedCartData = await updatedCartResponse.json();
//             if (updatedCartData.success) {
//                 setCartItem(Array.isArray(updatedCartData.cart) ? updatedCartData.cart : []);
//                 setCartId(updatedCartData.cart._id);
//             }
//         } catch (error) {
//             console.error('Error updating cart:', error);
//         } finally {
//             setLoading(false); // End loading state
//         }
//     };

//     const handleBackButton = () => {
//         navigate(-1);
//         window.scrollTo({
//             top: 0,
//             behavior: 'smooth',
//             // left: 0,
//             // behavior: 'smooth'
//         });
//     };

//     // Show Loading or Error Message if Product is not available
//     if (!product) {
//         return <div>Loading Product Details...</div>;
//     }

//     console.log('product', product);

//     return (
//         <div classNameName="ProductDetails-container">
//             {/* Add Helmet for better SEO */}
//             <Helmet>
//                 <title>{product.name} - Product Details</title>
//                 <meta name="description" content={product.description} />
//             </Helmet>

//             <header classNameName="ProductDetails-header">
//                 <button classNameName="ProductDetails-back-button" onClick={handleBackButton}>←</button>
//                 <h1 classNameName="ProductDetails-product-title">Product Details</h1>
//             </header>

//             <main>
//                 <div classNameName="ProductDetails-product-grid">
//                     <div>
//                         <div classNameName="ProductDetails-product-image">
//                             {/* <img src={mainImage} alt={product.name || "Product Image"} id="main-image" /> */}
//                             <ReactImageMagnify {...{
//                                 smallImage: {
//                                     alt: product.name,
//                                     isFluidWidth: true,
//                                     src: mainImage,
//                                     width: 800,
//                                     height: 1200,
//                                     classNameName: "smallZoom",
//                                 },
//                                 largeImage: {
//                                     src: mainImage,
//                                     alt: product.name,
//                                     width: 1800,
//                                     height: 1800,
//                                     classNameName: "largeZoom",
//                                     style: {
//                                       backgroundColor: "#000"
//                                     }
//                                   },
//                                   enlargedImagePosition: 'beside',
//                                   // isHintEnabled: true,
//                                   shouldHideHintAfterFirstActivation: false
//                             }} />
//                         </div>
//                         <div classNameName="ProductDetails-thumbnails">
//                             {Object.entries(product?.images ?? {}).map(([key, src], index) => (
//                                 src && (  // Skip empty images
//                                     <button key={index} classNameName="ProductDetails-thumbnail" onClick={() => handleThumbnailClick(src)}>
//                                         <img src={src} alt={`Thumbnail ${key}`} />
//                                     </button>
//                                 )
//                             ))}
//                         </div>

//                     </div>

//                     <div classNameName="ProductDetails-product-info">
//                         <div>
//                             <h2 classNameName="ProductDetails-product-name">{product.name}</h2>
//                             <p classNameName="ProductDetails-product-weight">{product.weight}</p>
//                         </div>

//                         <p classNameName="ProductDetails-product-description">
//                             {product.description}
//                         </p>

//                         <div classNameName="ProductDetails-product-price">
//                             ₹{product.price} <span classNameName="ProductDetails-price-note">(inclusive of all taxes)</span>
//                         </div>

//                         {!isAddedToCart ? (
//                             loading ? (
//                                 <CircularProgress size={24} /> // Show loader instead of button
//                             ) : (
//                                 <button classNameName="ProductDetails-add-to-cart" onClick={handleAddToCart}>ADD TO CART</button>
//                             )
//                         ) : (
//                             <div classNameName="ProductDetails-cart-controls">
//                                 <div classNameName="item-quantity" style={{ marginBottom: '10px' }}>
//                                     <button aria-label="Decrease quantity" onClick={handleDecrement} disabled={loading}>-</button>
//                                     {loading ? (
//                                         <CircularProgress size={24} />
//                                     ) : (
//                                         <input type="number" value={quantity} readOnly min="1" aria-label="Quantity" />
//                                     )}
//                                     <button aria-label="Increase quantity" onClick={handleIncrement} disabled={loading}>+</button>
//                                 </div>
//                                 <button classNameName="ProductDetails-go-to-cart" onClick={() => navigate('/cart')} disabled={loading}>
//                                     Go to Cart
//                                 </button>
//                             </div>
//                         )}
//                     </div>
//                 </div>

//                 <div classNameName="ProductDetails-tabs">
//                     <div classNameName="ProductDetails-tab-list">
//                         <button classNameName={`ProductDetails-tab-button ${activeTab === 'nutrition' ? 'active' : ''}`} onClick={() => setActiveTab('nutrition')}>
//                             Nutritional Information
//                         </button>
//                         <button classNameName={`ProductDetails-tab-button ${activeTab === 'ingredients' ? 'active' : ''}`} onClick={() => setActiveTab('ingredients')}>
//                             Ingredients
//                         </button>
//                     </div>
//                     {activeTab === 'nutrition' && (
//                         <div classNameName="ProductDetails-tab-content" id="nutrition-content">
//                             <h3 classNameName="ProductDetails-tab-title">Nutritional Information</h3>
//                             <table>
//                                 <tbody>
//                                     {product?.nutrition?.map((item, index) => (
//                                         <tr key={index}>
//                                             <td>{item.name}</td>
//                                             <td>{item.value}</td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     )}
//                     {activeTab === 'ingredients' && (
//                         <div classNameName="ProductDetails-tab-content" id="ingredients-content">
//                             <h3 classNameName="ProductDetails-tab-title">Ingredients</h3>
//                             <p>{product.ingredients}</p>
//                         </div>
//                     )}
//                 </div>
//             </main>

//             {/* Snackbar for feedback */}
//             <Snackbar
//                 open={snackbarOpen}
//                 autoHideDuration={6000}
//                 onClose={handleSnackbarClose}
//             >
//                 <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
//                     {snackbarMessage}
//                 </Alert>
//             </Snackbar>
//         </div>
//     );
// };

// export default ProductDetails;
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import VegetarianIcon from './VegetarianIcon';
import "./style.css";

const ProductDetails = () => {
  const location = useLocation();
  const { state } = location;
  const product = state?.product || {}; // Fallback to empty object if product data is missing
  
  const [mainImage, setMainImage] = useState(product.images?.mainImage || "https://via.placeholder.com/500x500");
  const [activeTab, setActiveTab] = useState("details");
  const [zoomPosition, setZoomPosition] = useState({ x: "50%", y: "50%" });

  const changeImage = (src) => setMainImage(src);

  const openTab = (tab) => setActiveTab(tab);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x: `${x}%`, y: `${y}%` });
  };

  const handleBackButton = () => window.history.back();

  // Filter images based on a valid source condition and handle missing images gracefully
  const images = product.images
    ? Object.values(product.images).filter((src) => src && src.startsWith("http://res.cloudinary.com"))
    : [];

  // Slider settings for react-slick
  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="product-details-container">
      <header className="product-details-header">
        <button className="product-details-back-button" onClick={handleBackButton}>←</button>
        <h1 className="product-details-product-title">Product Details</h1>
      </header>
      <div className="product-details-grid">
        <div>
          <div className="product-details-image" onMouseMove={handleMouseMove}>
            <img
              src={mainImage}
              alt={product.title || "Product Image"}
              id="main-image"
              style={{ transformOrigin: `${zoomPosition.x} ${zoomPosition.y}` }}
            />
          </div>
          {images.length > 0 && (
            images.length > 4 ? (
              <Slider {...sliderSettings} className="product-details-thumbnails-slider">
                {images.map((src, index) => (
                  <div key={index}>
                    <img
                      src={src}
                      alt={`Thumbnail ${index + 1}`}
                      onClick={() => changeImage(src)}
                      style={{ cursor: "pointer", padding: "5px" }}
                    />
                  </div>
                ))}
              </Slider>
            ) : (
              <div className="product-details-thumbnails">
                {images.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`Thumbnail ${index + 1}`}
                    onClick={() => changeImage(src)}
                    style={{ cursor: "pointer", padding: "5px" }}
                  />
                ))}
              </div>
            )
          )}
        </div>

        <div className="product-details-info">
          <h1 className="product-details-product-name">{product.name || "Product Name"}</h1>
          {product.isVegetarian !== undefined && (
            <div className="product-details-vegetarian">
              <VegetarianIcon width={46} height={46} />
              <span>{product.isVegetarian ? "This is a Vegetarian product" : "Non-Vegetarian product"}</span>
            </div>
          )}
          <p className="product-details-price">₹{product.price ?? "0.00"}</p>
          <p className="product-details-per-weight">₹{product.pricePerWeight ?? "0.00"} per 100g (Inclusive of all taxes)</p>
          {product.coupon && <button className="product-details-coupon">{product.coupon}</button>}
          {product.flavors?.length > 0 && (
            <div className="product-details-flavor-select">
              <h3 className="product-details-flavor-label">Flavour Name:</h3>
              {product.flavors.map((flavor, index) => (
                <label key={index} className="product-details-flavor-option">
                  <input type="radio" name="flavor" value={flavor} defaultChecked={index === 0} /> {flavor}
                </label>
              ))}
            </div>
          )}
          <button className="product-details-add-to-cart">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {/* SVG paths */}
            </svg>
            Add to Cart
          </button>
          <div className="product-details-tabs">
            <div className="product-details-tab-list">
              <button className={`product-details-tab ${activeTab === "details" ? "active" : ""}`} onClick={() => openTab("details")}>
                Product Details
              </button>
              <button className={`product-details-tab ${activeTab === "specifications" ? "active" : ""}`} onClick={() => openTab("specifications")}>
                Specifications
              </button>
            </div>
            <div id="details" className={`product-details-tab-content ${activeTab === "details" ? "active" : ""}`}>
              <p>{product.details || "Detailed information about the product goes here."}</p>
            </div>
            <div id="specifications" className={`product-details-tab-content ${activeTab === "specifications" ? "active" : ""}`}>
              <p>{product.specifications || "Specifications information goes here."}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
