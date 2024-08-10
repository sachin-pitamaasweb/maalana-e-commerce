import React from "react";

import WelcomeBanner from "../../MobilesViews/WelcomeBanner/index.jsx";
import SecondBanner from "../../MobilesViews/secondBanner/index.jsx";
import ThirdBanner from "../../MobilesViews/ThirdBanner/index.jsx";
import FourthBanner from "../../MobilesViews/FourthBanner/index.jsx";
import FifthBanner from "../../MobilesViews/FifthBanner/index.jsx";
import SixthBanner from "../../MobilesViews/SixthBanner/index.jsx";


const Home = () => {
    return (
        <>
            <WelcomeBanner />
            <SecondBanner />
            <ThirdBanner />
            <FourthBanner />
            <FifthBanner />
            <SixthBanner />
        </>
    );
};

export default Home;