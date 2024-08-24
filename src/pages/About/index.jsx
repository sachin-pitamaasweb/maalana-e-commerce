// // import React, { useEffect } from "react";
// // import './style.scss'; 

// // import AboutText from "../../components/AboutText";
// // import OurJourney from "../../components/OurJourney";
// // import ProfileQuote from "../../components/ProfileQuote";

// // const About = () => {
// //     useEffect(() => {
// //         document.body.style.backgroundColor = "#B9D514";

// //         // Clean up the effect by resetting the background color when the component is unmounted
// //         return () => {
// //             document.body.style.backgroundColor = "";
// //         };
// //     }, []);

// //     return (
// //         <div className="about-container">
// //             <h1 className="title">Who We Are</h1>
// //             <h2 className="subtitle">Creations, Sweet Memories</h2>
// //             <AboutText />
// //             <OurJourney />
// //             <ProfileQuote />
// //         </div>
// //     );
// // };

// // export default About;


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
//             <ProfileQuote
//                 clientImage={require('../../assets/about/profile.png')}
//                 quote="Maalana has the best sweets! My kids love them, and I always look forward to trying their new products."
//                 clientName="Navneen Anand"
//             />
//             {/* <OurJourney />
//             <ProfileQuote /> */}
//         </div>
//     );
// };

// export default About;


import React, { useEffect } from 'react';
import styles from './about.module.css';

const About = () => {

        useEffect(() => {
        document.body.style.backgroundColor = "#B9D514";

        // Clean up the effect by resetting the background color when the component is unmounted
        return () => {
            document.body.style.backgroundColor = "";
        };
    }, []);
  useEffect(() => {
    const animateOnScroll = () => {
      const sections = document.querySelectorAll(`.${styles.section}, .${styles.mainContent}, .${styles.container}`);
      const windowHeight = window.innerHeight;

      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;

        if (sectionTop < windowHeight - 100) {
          section.classList.add(styles.visible);
        } else {
          section.classList.remove(styles.visible);
        }
      });
    };

    window.addEventListener('scroll', animateOnScroll);
    document.addEventListener('DOMContentLoaded', animateOnScroll); // Trigger on page load

    return () => {
      window.removeEventListener('scroll', animateOnScroll);
    };
  }, []);

  return (
    <div className={styles.body}>
      <div className={styles.mainContent}>
        <h1 className={styles.heading}>Who We Are</h1>
        <h2 className={styles.subheading}>Creations, Sweet Memories</h2>

        {/* Company Details Section */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Company Details</div>
          <div className={styles.sectionContent}>
            <p>
                At Maalana, we blend passion with creativity to craft exceptional candies and sweets. Our commitment to quality and innovation drives us to continually create delightful experiences for our customers.
                <br />
                We are committed to sustainability, using eco-friendly packaging and sourcing ingredients responsibly. Our team is passionate about making a positive impact on the world, one candy at a time. Whether it's a childhood favorite or a new discovery, Maalana's candies are crafted with love and care, ensuring that each piece is a little moment of happiness.
                </p>
          </div>
        </div>

        {/* Company Journey Section */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Company Journey</div>
          <div className={styles.sectionContent}>
            <p>Our journey has been full of challenges and triumphs. We started small, with a dream to create the best candies in the world. Today, that dream is a reality, and we're just getting started. Thank you for being part of our journey.</p>
          </div>
        </div>

        {/* Founder Section */}
        <div className={styles.container}>
          <div className={styles.imageContainer}>
            <img src={require('../../assets/about/profile.png') || "https://via.placeholder.com/400x400"} alt="Naveen Anand" />
          </div>
          <div className={styles.textContainer}>
            <p>"Our Journey: From a single idea to a sweet sensation, Maalana's story is one of passion, creativity, and the love for all things sweet. Join us as we embark on a delicious journey filled with lollipops, candies, and endless moments of joy. Welcome to the Maalana experience, where every step is a sweet adventure!"</p>
            <div className={styles.name}>- Naveen Anand, Founder</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
