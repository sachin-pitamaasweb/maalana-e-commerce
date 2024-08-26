// import React from 'react';
// import Slider from 'react-slick';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import './BestSellers.scss';

// import { useAuth } from '../../context/AuthContext';

// const BestSellers = () => {
//     const settings = {
//         dots: true,
//         infinite: true,
//         speed: 500,
//         slidesToShow: 4,
//         slidesToScroll: 1,
//         arrows: true,
//         responsive: [
//             {
//                 breakpoint: 1500,
//                 settings: {
//                     slidesToShow: 3,
//                     slidesToScroll: 1,
//                     infinite: true,
//                     dots: true,
//                 },
//             },
//             {
//                 breakpoint: 1024,
//                 settings: {
//                     slidesToShow: 2,
//                     slidesToScroll: 1,
//                     infinite: true,
//                     dots: true,
//                 },
//             },
//             {
//                 breakpoint: 600,
//                 settings: {
//                     autoplay: true,
//                     autoplaySpeed: 3000,
//                     slidesToShow: 1,
//                     slidesToScroll: 1,
//                 },
//             },
//         ],
//     };

//     const products = [
//         {
//             name: 'Imli Ladoo',
//             img: require('../../assets/more-product/img-4.png'),
//             price: '₹200',
//             bgColor: '#FFD8B7',
//         },
//         {
//             name: 'Green Mango',
//             img: require('../../assets/more-product/img-4.png'),
//             price: '₹200',
//             bgColor: '#E2FFB2',
//         },
//         {
//             name: 'Orange Fruit Katli',
//             img: require('../../assets/more-product/img-4.png'),
//             price: '₹200',
//             bgColor: '#FFD191',
//         },
//         {
//             name: 'Orange Fruit Katli',
//             img: require('../../assets/more-product/img-4.png'),
//             price: '₹200',
//             bgColor: '#FFD191',
//         },
//          {
//             name: 'Orange Fruit Katli',
//             img: require('../../assets/more-product/img-4.png'),
//             price: '₹200',
//             bgColor: '#FFD191',
//         },
//         // Add more products if needed
//     ];


//     const { userId } = useAuth();

//     const handleAddtoCart = () => {
//         console.log('Add to cart clicked');
//     };

//     if (!userId) {
//         return null;
//     }

//     if (products.length === 0) {
//         return (
//             <div className="more-products">
//                 <h2>No products found</h2>
//             </div>
//         );
//     }

//     return (
//         <div className="more-products">
//             <h2>Best Sellers</h2>
//             <div className='more'>
//                 <Slider {...settings}>
//                     {products.map((product, index) => (
//                         <>
//                             <div key={index} className="product-slide">
//                                 <div className="product-circle" style={{ backgroundColor: product.bgColor }}>
//                                     <div className='product-center-image'>
//                                         <img src={product.img} alt={product.name} className="product-image" />
//                                     </div>
//                                     <p className="lollipop-name">{product.name}</p>
//                                     <p className="lollipop-price">{product.price}</p>
//                                     <button className="lollipop-button" onClick={handleAddtoCart}>
//                                         Add to Cart
//                                     </button>
//                                 </div>
//                             </div>
//                         </>
//                     ))}
//                 </Slider>
//             </div>
//         </div>
//     );
// };

// export default BestSellers;


// import React, { useEffect, useState } from 'react';
// import Slider from 'react-slick';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import './BestSellers.scss';

// import { useAuth } from '../../context/AuthContext';

// const BestSellers = () => {
//     const [products, setProducts] = useState([]);
//     const { userId } = useAuth();

//     const settings = {
//         dots: true,
//         infinite: true,
//         speed: 500,
//         slidesToShow: 4,
//         slidesToScroll: 1,
//         arrows: true,
//         responsive: [
//             {
//                 breakpoint: 1500,
//                 settings: {
//                     slidesToShow: 3,
//                     slidesToScroll: 1,
//                     infinite: true,
//                     dots: true,
//                 },
//             },
//             {
//                 breakpoint: 1024,
//                 settings: {
//                     slidesToShow: 2,
//                     slidesToScroll: 1,
//                     infinite: true,
//                     dots: true,
//                 },
//             },
//             {
//                 breakpoint: 600,
//                 settings: {
//                     autoplay: true,
//                     autoplaySpeed: 3000,
//                     slidesToShow: 1,
//                     slidesToScroll: 1,
//                 },
//             },
//         ],
//     };

//     useEffect(() => {
//         // Fetch the best seller products
//         const fetchBestSellers = async () => {
//             try {
//                 const response = await fetch('https://maalana-backend.onrender.com/api/admin/get-best-seller-product');
//                 const data = await response.json();
//                 if (data.success) {
//                     setProducts(data.data);
//                 } else {
//                     console.error('Failed to fetch best sellers');
//                 }
//             } catch (error) {
//                 console.error('Error fetching best sellers:', error);
//             }
//         };

//         fetchBestSellers();
//     }, []);

//     const handleAddtoCart = () => {
//         console.log('Add to cart clicked');
//     };

//     if (!userId) {
//         return null;
//     }

//     if (products.length === 0) {
//         return (
//             <div className="more-products">
//                 <h2>No products found</h2>
//             </div>
//         );
//     }

//     return (
//         <div className="more-products">
//             <h2>Best Sellers</h2>
//             <div className='more'>
//                 <Slider {...settings}>
//                     {products.map((product, index) => (
//                         <div key={index} className="product-slide">
//                             <div className="product-circle" style={{ backgroundColor: '#FFD191' }}>
//                                 <div className='product-center-image'>
//                                     <img src={product.image} alt={product.name} className="product-image" />
//                                 </div>
//                                 <p className="lollipop-name">{product.name}</p>
//                                 <p className="lollipop-price">₹200</p> {/* Update price dynamically if available */}
//                                 <button className="lollipop-button" onClick={handleAddtoCart}>
//                                     Add to Cart
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </Slider>
//             </div>
//         </div>
//     );
// };

// export default BestSellers;


// import React from 'react';
// import './BestSellers.scss';

// const BestSellers = () => {
//   const products = [
//     {
//       id: 1,
//       name: 'Orange Fruit Katli - 250 g',
//       price: '₹150',
//       imageUrl: 'https://res.cloudinary.com/dtivafy25/image/upload/v1724310062/image/Project_-_2024-06-07T111927.445_gtqkc4.png',
//     },
//     {
//       id: 2,
//       name: 'Imli Soft Candy - 250 g',
//       price: '₹50',
//       imageUrl: 'https://res.cloudinary.com/dtivafy25/image/upload/v1724320412/image/img-2_zstjjc.png',
//     },
//     {
//       id: 3,
//       name: 'Mix Fruit Candies - 250 g',
//       price: '₹150',
//       imageUrl: 'https://via.placeholder.com/150',
//     },
//     {
//       id: 4,
//       name: 'Lollipop Fruit Flavour - 250 g',
//       price: '₹150',
//       imageUrl: 'https://via.placeholder.com/150',
//     },
//   ];

//   return (
//     <div className="best-sellers">
//       <h2>Our Best Sellers</h2>
//       <div className="products">
//         {products.map((product) => (
//           <div className="product-card-best-sellers" key={product.id}>
//             <div className="product-image">
//               <img src={product.imageUrl} alt={product.name} />
//             </div>
//             <h3>{product.name}</h3>
//             <p className="price">{product.price}</p>
//             <button className="add-to-cart">ADD TO CART</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BestSellers;


// import React from 'react';
// import Slider from 'react-slick';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import './BestSellers.scss';

// const BestSellers = () => {
//     const products = [
//         {
//             id: 1,
//             name: 'Orange Fruit Katli - 250 g',
//             price: '₹150',
//             imageUrl: 'https://res.cloudinary.com/dtivafy25/image/upload/v1724310062/image/Project_-_2024-06-07T111927.445_gtqkc4.png',
//         },
//         {
//             id: 2,
//             name: 'Imli Soft Candy - 250 g',
//             price: '₹50',
//             imageUrl: 'https://res.cloudinary.com/dtivafy25/image/upload/v1724320412/image/img-2_zstjjc.png',
//         },
//         {
//             id: 3,
//             name: 'Mix Fruit Candies - 250 g',
//             price: '₹150',
//             imageUrl: 'https://via.placeholder.com/150',
//         },
//         {
//             id: 4,
//             name: 'Lollipop Fruit Flavour - 250 g',
//             price: '₹150',
//             imageUrl: 'https://via.placeholder.com/150',
//         },
//     ];

//     const settings = {
//         dots: true,
//         infinite: true,
//         speed: 500,
//         slidesToShow: 4,
//         slidesToScroll: 1,
//         responsive: [
//             {
//                 breakpoint: 768,
//                 settings: {
//                     slidesToShow: 2,
//                     slidesToScroll: 1,
//                 }
//             },
//             {
//                 breakpoint: 480,
//                 settings: {
//                     slidesToShow: 1,
//                     slidesToScroll: 1,
//                 }
//             }
//         ]
//     };

//     return (
//         <div className="best-sellers">
//             <h2>Our Best Sellers</h2>
//             <div>
//                 <Slider {...settings}>
//                     {products.map((product) => (
//                         <div className="product-card-best-sellers" key={product.id}>
//                             <div className="product-image">
//                                 <img src={product.imageUrl} alt={product.name} />
//                             </div>
//                             <h3>{product.name}</h3>
//                             <p className="price">{product.price}</p>
//                             <button className="add-to-cart">ADD TO CART</button>
//                         </div>
//                     ))}
//                 </Slider>
//             </div>
//         </div>
//     );
// };

// export default BestSellers;



// BestSellers.js
// import React from 'react';
// import styles from './BestSellers.module.css';

// const products = [
//   {
//     id: 1,
//     name: 'Orange Fruit Katli - 250 g',
//     price: '₹150',
//     image: 'https://res.cloudinary.com/dtivafy25/image/upload/v1724310062/image/Project_-_2024-06-07T111927.445_gtqkc4.png',
//     bgColor: '#E0F2FF'
//   },
//   {
//     id: 2,
//     name: 'Imli Soft Candy - 250 g',
//     price: '₹50',
//     image: 'https://res.cloudinary.com/dtivafy25/image/upload/v1724320412/image/img-2_zstjjc.png',
//      bgColor: '#E2FFB2'
//   },
//   {
//     id: 3,
//     name: 'Mix Fruit Candies - 250 g',
//     price: '₹150',
//     image: 'https://via.placeholder.com/150',
//      bgColor: '#FFE4BE'
//   },
//   {
//     id: 4,
//     name: 'Lollipop Fruit Flavour - 250 g',
//     price: '₹150',
//     image: 'https://via.placeholder.com/150',
//      bgColor: '#FFBEBE'
//   },
// ];

// const BestSellers = () => {
//   return (
//     <div className={styles.bestSellers}>
//       <h2>Our Best Sellers</h2>
//       <div className={styles.products}>
//         {products.map((product) => (
//           <div key={product.id} className={styles.productCard} style={{backgroundColor: product.bgColor}}>
//             <div className={styles.productImage}>
//               <img src={product.image} alt={product.name} />
//             </div>
//             <h3>{product.name}</h3>
//             <p className={styles.price}>{product.price}</p>
//             <button className={styles.addToCart}>ADD TO CART</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BestSellers;


// BestSellers.js
// import React, { useState, useEffect } from 'react';
// import styles from './BestSellers.module.css';
// import { useAuth } from '../../context/AuthContext';

// const BestSellers = () => {
//   const [products, setProducts] = useState([]);
//   const { userId } = useAuth();

//   useEffect(() => {
//     // Fetch the best seller products
//     const fetchBestSellers = async () => {
//       try {
//         const response = await fetch('https://maalana-backend.onrender.com/api/admin/get-best-seller-product');
//         const data = await response.json();
//         if (data.success) {
//             setProducts(data.data.map((product, index) => ({
//                 ...product,
//                 price: product.price || '₹150', // Set price from the fetched data
//                 backgroundColor: getBackgroundColor(index) // Set background color based on index
//               })));
//         } else {
//           console.error('Failed to fetch best sellers');
//         }
//       } catch (error) {
//         console.error('Error fetching best sellers:', error);
//       }
//     };

//     fetchBestSellers();
//   }, []);
//   console.log(products);

//   // const getBackgroundColor = (index) => {
//   //   const colors = ['#E0F2FF', '#E2FFB2', '#FFE4BE', '#FFBEBE'];
//   //   return colors[index % colors.length];
//   // };

//   const getBackgroundColor = () => {
//     const randomLightColor = () => Math.floor(Math.random() * 156) + 100; 
//     return `rgb(${randomLightColor()}, ${randomLightColor()}, ${randomLightColor()})`;
// };

//   const handleAddtoCart = () => {
//     console.log('Add to cart clicked');
//   };

//   if (!userId) {
//     return null;
//   }

//   if (products.length === 0) {
//     return (
//       <div className={styles.moreProducts}>
//         <h2 style={{textAlign: 'center'}}>No products found</h2>
//       </div>
//     );
//   }

//   return (
//     <div className={styles.bestSellers}>
//       <h2>Our Best Sellers</h2>
//       <div className={styles.products}>
//         {products.map((product) => (
//           <div key={product.id} className={styles.productCard} style={{backgroundColor: product.backgroundColor}}>
//             <div className={styles.productImage}>
//               <img src={product.image} alt={product.name} />
//             </div>
//             <h3>{product.name}</h3>
//             <p className={styles.price}>{product.price}</p>
//             <button className={styles.addToCart} onClick={handleAddtoCart}>ADD TO CART</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BestSellers;


// import React, { useState, useEffect } from 'react';
// import styles from './BestSellers.module.css';
// import { useAuth } from '../../context/AuthContext';

// const BestSellers = ({ products }) => {
//     console.log(products);
//     const [filteredProducts, setFilteredProducts] = useState([]);
//     const { userId } = useAuth();

//     useEffect(() => {
//         const fetchImliRange = async () => {
//             if (products) {
//                 // const filtered = products.filter(product => product.category === 'Fruit katli');
//                 setFilteredProducts(products);
//             }
//         };
//         fetchImliRange();
//     }, [products]);

//     // const getBackgroundColor = (index) => {
//     //     const colors = ['#E0F2FF', '#E2FFB2', '#FFE4BE', '#FFBEBE'];
//     //     return colors[index % colors.length];
//     // };

//     const getBackgroundColor = () => {
//         const randomLightColor = () => Math.floor(Math.random() * 156) + 100; 
//         return `rgb(${randomLightColor()}, ${randomLightColor()}, ${randomLightColor()})`;
//     };
    
//     const handleAddtoCart = () => {
//         console.log('Add to cart clicked');
//     };

//     if (!userId) {
//         return null;
//     }

//     // Display only the first 4 products
//     console.log('filteredProducts', filteredProducts);
//     const productsToShow = filteredProducts.slice(0, 4);

//     if (productsToShow.length === 0) {
//         return (
//             <div className={styles.moreProducts}>
//                 <h2 style={{ textAlign: 'center' }}>No products found</h2>
//             </div>
//         );
//     }

//     return (
//         <div className={styles.bestSellers}>
//             <h2>Best Sellers</h2>
//             <div className={styles.products}>
//                 {productsToShow.map((product, index) => (
//                     <div
//                         key={product.id}
//                         className={styles.productCard}
//                         style={{ backgroundColor: getBackgroundColor(index) }}
//                     >
//                         <div className={styles.productImage}>
//                             <img src={product.images.mainImage} alt={product.name} />
//                         </div>
//                         <h3>{product.name}</h3>
//                         <p className={styles.price}>₹{product.price}</p> {/* Added rupee symbol */}
//                         <button className={styles.addToCart} onClick={handleAddtoCart}>
//                             ADD TO CART
//                         </button>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default BestSellers;

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
