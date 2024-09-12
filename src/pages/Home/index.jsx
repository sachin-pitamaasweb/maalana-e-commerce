// import React from "react";
// import { Helmet } from "react-helmet";
// // import { useTheme, useMediaQuery } from "@mui/material";

// // mobile views
// // import WelcomeBanner from "../../MobilesViews/WelcomeBanner/index.jsx";
// // import SecondBanner from "../../MobilesViews/secondBanner/index.jsx";
// // import ThirdBanner from "../../MobilesViews/ThirdBanner/index.jsx";
// // import FourthBanner from "../../MobilesViews/FourthBanner/index.jsx";
// // import FifthBanner from "../../MobilesViews/FifthBanner/index.jsx";
// // import SixthBanner from "../../MobilesViews/SixthBanner/index.jsx";

// // desktop views
// import WelcomeBannerDesktop from "../../components/Desktop/WelcomeBannerDesktop/index.jsx";
// import SecondBannerDesktop from "../../components/Desktop/SecondBannerDesktop/index.jsx";
// import Events from "../../components/Desktop/Events/index.jsx";
// import CustomerKiKahani from "../../components/Desktop/CustomerKiKahani/index.jsx";
// import Candies from "../../components/Desktop/Candies/index.jsx";
// import FruitKatli from "../../components/Desktop/FruitKatli/index.jsx";
// import Lollipop from "../../components/Desktop/Lollipop/index.jsx";
// import Imli from "../../components/Desktop/Imli/index.jsx";

// const Home = () => {
//     // const theme = useTheme();
//     // const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Adjust the breakpoint as necessary

//     return (
//         <>
//             {/* {isMobile ? (
//                 <>
//                     <WelcomeBanner />
//                     <SecondBanner />
//                     <ThirdBanner />
//                     <FourthBanner />
//                     <FifthBanner />
//                     <SixthBanner />
//                 </>
//             ) : (
//                 <>
//                     <WelcomeBannerDesktop />
//                     <SecondBannerDesktop />

//                 </>
//             )} */}
//             <Helmet>
//                 <title>Maalana-Home</title>
//             </Helmet>
//             <WelcomeBannerDesktop />
//             <SecondBannerDesktop />
//             <Imli />
//             <Lollipop />
//             <FruitKatli />
//             <Candies />
//             <Events />
//             <CustomerKiKahani />

//         </>
//     );
// };

// export default Home;


import React, { useState, useEffect } from "react"
import DesktopHomeView from '../../components/DesktopHomeView/index.jsx'
import MobileHomeView from "../../components/MobileHomeView/index.jsx"

const Home = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 450)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 450)
        }

        window.addEventListener("resize", handleResize)
        // Cleanup event listener on component unmount
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
        <>
            {isMobile ? <MobileHomeView /> : <DesktopHomeView />}
        </>
    )
}

export default Home
