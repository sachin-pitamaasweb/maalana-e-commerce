// import React, { useEffect } from "react";
// import './style.scss'; 

// import AboutText from "../../components/AboutText";
// import OurJourney from "../../components/OurJourney";
// import ProfileQuote from "../../components/ProfileQuote";

// const About = () => {
//     useEffect(() => {
//         document.body.style.backgroundColor = "#B9D514";

//         // Clean up the effect by resetting the background color when the component is unmounted
//         return () => {
//             document.body.style.backgroundColor = "";
//         };
//     }, []);

//     return (
//         <div className="about-container">
//             <h1 className="title">Who We Are</h1>
//             <h2 className="subtitle">Creations, Sweet Memories</h2>
//             <AboutText />
//             <OurJourney />
//             <ProfileQuote />
//         </div>
//     );
// };

// export default About;


import React, { useEffect } from "react";
import './style.scss';

import AboutText from "../../components/AboutText";
import OurJourney from "../../components/OurJourney";
import ProfileQuote from "../../components/ProfileQuote";

const About = () => {
    useEffect(() => {
        document.body.style.backgroundColor = "#B9D514";

        // Clean up the effect by resetting the background color when the component is unmounted
        return () => {
            document.body.style.backgroundColor = "";
        };
    }, []);

    return (
        <div className="about-container">
            <h1 className="title">Who We Are</h1>
            <h2 className="subtitle">Creations, Sweet Memories</h2>
            <AboutText />
            <OurJourney />
            <ProfileQuote
                clientImage={require('../../assets/about/profile.png')}
                quote="Maalana has the best sweets! My kids love them, and I always look forward to trying their new products."
                clientName="Navneen Anand"
            />
            {/* <OurJourney />
            <ProfileQuote /> */}
        </div>
    );
};

export default About;