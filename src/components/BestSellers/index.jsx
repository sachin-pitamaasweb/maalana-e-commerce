// import React, { useState, useEffect } from "react";
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel/dist/assets/owl.theme.default.css';
// import OwlCarousel from 'react-owl-carousel';
// import './style.css';

// import ProductDrawer from "../ProductDrawer/index";
// import { useAuth } from '../../context/AuthContext'; // Adjust the import path

// const BestSellers = ({ products, title }) => {
//     const [filteredProducts, setFilteredProducts] = useState([]);
//     const [drawerOpen, setDrawerOpen] = useState(false);
//     const [selectedProduct, setSelectedProduct] = useState(null);
//     const { userId, updateCartItemCount } = useAuth();
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
//         autoplay: true,
//         autoplayTimeout: 3000,
//         responsive: {
//             0: {
//                 items: 1,
//                 margin: 20
//             },
//             600: {
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


//     const colors = ['#E0F2FF', '#E2FFB2', '#FFE4BE', '#FFBEBE'];

//     const handleAddToCart = async (product) => {
//         setSelectedProduct(product);
//         setDrawerOpen(true);

//         try {
//             const response = await fetch('http://localhost:8000/api/add-to-cart', {
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
//                 setCartId(data.cart._id);
//                 updateCartItemCount(data.totalQuantity);
//                 // Update cart item count in context
//                 console.log('Product added to cart successfully');
//             } else {
//                 console.error('Failed to add product to cart:', data.message);
//             }
//         } catch (error) {
//             console.error('Error adding product to cart:', error);
//         }
//     };

//     if (!userId) {
//         return null;
//     }

//     const productsToShow = filteredProducts.slice(0, 4);

//     if (productsToShow.length === 0) {
//         return (
//             <div className="no-products">
//                 <h2 style={{ textAlign: 'center' }}>No products found</h2>
//             </div>
//         );
//     }

//     return (
//         <div className="best-sellers">
//             <h2>{title}</h2>
//             <OwlCarousel {...options} className="products">
//                 {productsToShow.map((product, index) => (
//                     <div
//                         key={product._id}
//                         className="product-card"
//                         style={{ backgroundColor: colors[index % colors.length] }}
//                     >
//                         <div className="product-image">
//                             <img src={product.images.mainImage} alt={product.name} /> {/* Ensure `product.imageUrl` and `product.name` exist */}
//                         </div>
//                         <h3>{product.name}</h3>
//                         <p className="price">₹{product.price}</p>
//                         <div style={{ display: 'flex', justifyContent: 'center' }}>
//                             <button className="add-to-cart" onClick={() => handleAddToCart(product)}>ADD TO CART</button>
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

// export default BestSellers;


import React from "react";

import CommonCard from "../CommonCard/index";

const BestSellers = ({ products, title }) => {
    return (
        <>
            <CommonCard
                products={products}
                title={title}
            />
        </>
    );
};
export default BestSellers;