import React from "react";
import ProductList from "../ProductList";


const FruitkatliFilter = ({filter, products}) => {
    const filteredProducts = products.filter(product => product.category === filter);
    return (
        <>
        <ProductList
            products={filteredProducts}
            filter={filter}
        />
        </>
    );
};
export default FruitkatliFilter;