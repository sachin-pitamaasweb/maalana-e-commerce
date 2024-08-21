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
              {/* <SecondBannerDesktop /> */}
        </>
    );
};

export default Home;
