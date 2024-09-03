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