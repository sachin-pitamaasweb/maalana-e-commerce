import React from "react";
// import { useTheme, useMediaQuery } from "@mui/material";

// mobile views
// import WelcomeBanner from "../../MobilesViews/WelcomeBanner/index.jsx";
// import SecondBanner from "../../MobilesViews/secondBanner/index.jsx";
// import ThirdBanner from "../../MobilesViews/ThirdBanner/index.jsx";
// import FourthBanner from "../../MobilesViews/FourthBanner/index.jsx";
// import FifthBanner from "../../MobilesViews/FifthBanner/index.jsx";
// import SixthBanner from "../../MobilesViews/SixthBanner/index.jsx";

// desktop views
import WelcomeBannerDesktop from "../../components/Desktop/WelcomeBannerDesktop/index.jsx";
import SecondBannerDesktop from "../../components/Desktop/SecondBannerDesktop/index.jsx";
import Events from "../../components/Desktop/Events/index.jsx";
import CustomerKiKahani from "../../components/Desktop/CustomerKiKahani/index.jsx";
import Candies from "../../components/Desktop/Candies/index.jsx";
import FruitKatli from "../../components/Desktop/FruitKatli/index.jsx";
import Lollipop from "../../components/Desktop/Lollipop/index.jsx";
import Imli from "../../components/Desktop/Imli/index.jsx";

const Home = () => {
    // const theme = useTheme();
    // const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Adjust the breakpoint as necessary

    return (
        <>
            {/* {isMobile ? (
                <>
                    <WelcomeBanner />
                    <SecondBanner />
                    <ThirdBanner />
                    <FourthBanner />
                    <FifthBanner />
                    <SixthBanner />
                </>
            ) : (
                <>
                    <WelcomeBannerDesktop />
                    <SecondBannerDesktop />
                  
                </>
            )} */}
              <WelcomeBannerDesktop />
                 <SecondBannerDesktop />
                 <Imli />
                 <Lollipop />
                 <FruitKatli />
                 <Candies />
                 <Events />
              <CustomerKiKahani />
           
        </>
    );
};

export default Home;
