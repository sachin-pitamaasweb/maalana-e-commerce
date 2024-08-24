import React, { useState } from 'react';

import Drawer from '@mui/material/Drawer';

import CloseIcon from '@mui/icons-material/Close';
import TuneIcon from '@mui/icons-material/Tune';

import ProductCard from '../ProductCard/index.jsx';

import './ProductList.scss';

import RangeSlider from '../RangeSlider/index.jsx';


const productsCategory = [
  {
    img: require('../../assets/cate/img-1.png'),
    name: 'Imli Ladoo'
  },
  {
    img: require('../../assets/cate/img-2.png'),
    name: 'Family Candy Pack'
  },
  {
    img: require('../../assets/cate/img-3.png'),
    name: 'Lollipop'
  },
  {
    img: require('../../assets/cate/img-3.png'),
    name: 'Candy'
  },
  {
    img: require('../../assets/cate/img-4.png'),
    name: 'Aam Papad'
  },
  {
    img: require('../../assets/cate/img-5.png'),
    name: 'Fruit Katli'
  },
  {
    img: require('../../assets/cate/img-6.png'),
    name: 'View All',
  }
];


const ProductList = ({ products, filter }) => {

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(productsCategory.length - 1);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setDrawerOpen(open);
  };
  const handleClick = (index) => {
    setSelectedProduct(index);
  }

  console.log("selectedProduct", selectedProduct);

  return (
    <div className="product-list">
      <div className="filter-bar">
        {/* <span className="filter-icon" onClick={toggleDrawer(true)}>
          <TuneIcon />
        </span> */}
        {/* <span className="product-count">{`${products.length} Products`}</span> */}
      </div>
      <div className="products-container" onClick={() => handleClick(productsCategory.length - 1)}>
        {products.map((product, index) => (
          <ProductCard key={index} product={product} filter={filter} />
        ))}
      </div>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <div className="filter-drawer-container">
          <div className='filter-drawer'>
            <span className="filter-icon-drawer" onClick={toggleDrawer(true)}><TuneIcon /></span>
            <span className="close-icon" onClick={toggleDrawer(false)}><CloseIcon /></span>
          </div>
          <div className="categories">Categories</div>
          <div className="products-category">
            <h4>{productsCategory[selectedProduct].name}</h4>
          </div>
          <div className="price-range">PRICE RANGE</div>
          <RangeSlider />
          <div className='view-result'>
            <button className='view-result-btn'>View Result</button>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default ProductList;
