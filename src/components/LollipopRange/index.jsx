// import React from 'react';
// import Slider from 'react-slick';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import './style.scss';

// import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';  

// const LollipopRange = () => {
//     const settings = {
//         dots: true,
//         infinite: true,
//         speed: 500,
//         slidesToShow: 3,
//         slidesToScroll: 1,
//         arrows: true,
//         autoplay: true,
//         autoplaySpeed: 3000,
//         responsive: [
//             {
//                 breakpoint: 1500,
//                 settings: {
//                     slidesToShow: 2,
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
//         // Add more products if needed
//     ];

//     return (
//         <div className="lollipop-range">
//             <h2>Lollipop Range</h2>
//             <div className="lollipop-slider-container">
//                 <Slider {...settings}>
//                     {products.map((product, index) => (
//                         <div key={index} className="lollipop-slide">
//                             <div className="lollipop-circle" style={{ backgroundColor: product.bgColor }}>
//                                 <div className="lollipop-image-container">
//                                     <img src={product.img} alt={product.name} className="lollipop-image" />
//                                 </div>
//                                 <p className="lollipop-name">{product.name}</p>
//                                 <p className="lollipop-price">{product.price}</p>
//                                 <button className="lollipop-button">
//                                     Add to Cart
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </Slider>
//                 {/* <div className="lollipop-slide">
//                     <div className="lollipop-circle" style={{ backgroundColor: 'transparent !important', border: '1px solid #333' }}>
//                         <div className="lollipop-image-container">
//                             <div>
//                                 <p className="lollipop-name-view">View All</p>
//                                 <ArrowRightAltIcon className="lollipop-arrow" />
//                             </div>
//                         </div>
//                     </div>
//                 </div> */}
//             </div>
//         </div>
//     );
// };

// export default LollipopRange;



// import React from 'react';
// import Slider from 'react-slick';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import './style.scss';

// const LollipopRange = () => {
//     const settings = {
//         dots: true,
//         infinite: true,
//         speed: 500,
//         slidesToShow: 3,
//         slidesToScroll: 1,
//         arrows: true,
//         autoplay: true,
//         autoplaySpeed: 300000,
//         responsive: [
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
//     ];

//     return (
//         <div className="more-products" style={{ marginTop: '100px' }}>
//             <h2>Lollipop Range</h2>
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
//                                     <button className="lollipop-button">
//                                         Add to Cart
//                                     </button>
//                                 </div>
//                             </div>
//                         </>
//                     ))}
//                 </Slider>
//             </div>
//             <button className="lollipop-button-view">View More</button>
//         </div>
//     );
// };

// export default LollipopRange;


import React, { useState, useEffect } from 'react';
import styles from './LollipopRange.module.css';
import { useAuth } from '../../context/AuthContext';

const LollipopRange = ({ products }) => {
    console.log(products);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { userId } = useAuth();

  useEffect(() => {
    const fetchImliRange = async () => {
      if (products) {
        const filtered = products.filter(product => product.category === 'Lollipops');
        setFilteredProducts(filtered);
      }
    };
    fetchImliRange();
  }, [products]);

  // const getBackgroundColor = (index) => {
  //   const colors = ['#E0F2FF', '#E2FFB2', '#FFE4BE', '#FFBEBE'];
  //   return colors[index % colors.length];
  // };

  const getBackgroundColor = () => {
    const randomLightColor = () => Math.floor(Math.random() * 156) + 100; 
    return `rgb(${randomLightColor()}, ${randomLightColor()}, ${randomLightColor()})`;
};

  const handleAddtoCart = () => {
    console.log('Add to cart clicked');
  };

  if (!userId) {
    return null;
  }

  // Display only the first 4 products
  console.log(filteredProducts);
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
      <h2>Lollipop Range</h2>
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
            <button className={styles.addToCart} onClick={handleAddtoCart}>
              ADD TO CART
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LollipopRange;