import React from 'react';
import ProductList from '../ProductList/index.jsx';

const LollipopFliter = ({ filter, products }) => {
    const filteredProducts = products.filter(product => product.category === filter);
    return (
        <ProductList 
            products={filteredProducts}
            filter={filter}
        />
    );
};

export default LollipopFliter;
