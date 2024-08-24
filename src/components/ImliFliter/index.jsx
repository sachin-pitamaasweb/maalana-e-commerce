import React from "react";
import ProductList from "../ProductList/index.jsx";


const ImliFilter = ({filter, products}) => {
    const filteredProducts = products.filter(product => product.category === filter);
    console.log('filteredProducts', filteredProducts);
    return (
        <>
        <ProductList
            products={filteredProducts}
            filter={filter}
        />
        </>
    );
};
export default ImliFilter;