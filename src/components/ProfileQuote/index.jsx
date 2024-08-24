// // ProfileQuote.js
// import React from 'react';
// import './style.scss'; // Import the CSS file

// const ProfileQuote = () => {
//     return (
//         <div className="profile">
//             <div className="profile-im">
//                 <div className="profile-img"></div>
//             </div>
//             <div>
//                 <div className="profile-text">
//                 "Crafting Sweet Memories: MAAlana, Where Every Confection Tells a Story."
//                 </div>
//                 <div className="profile-text2">
//                     <p>NAVEEN ANAND</p>
//                     <img src={require('../../assets/about/img-7.png')} alt="Profile" />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProfileQuote;




// import React from 'react';

// import './style.scss';

// const ProfileQuote = () => {
//     return (
//         <>
//             <div className="profile-container">
//                 <div className="profile-quote">
//                     <p className="profile-quote-text">
//                         "Crafting Sweet Memories: Maalana, Where Every Confection Tells a Story."
//                     </p>
//                 </div>
//                 <img src={require('../../assets/about/img-8.png')} alt="Profile" className="profile-img" />
//                 <div className="profile-name">
//                     <p className="profile-name-text">NAVEEN ANAND</p>
//                     <img src={require('../../assets/about/img-7.png')} alt="Profile" className="profile-name-img" />
//                 </div>
//             </div>
//         </>
//     );
// };

// export default ProfileQuote;


import React from 'react';
import './style.scss';

const ProfileQuote = ({ clientImage, quote, clientName }) => {
    return (
        <div className="profile-quote-container">
            <img src={clientImage} alt={`${clientName}'s profile`} className="client-image" />
            <p className="client-quote">"{quote}"</p>
            <p className="client-name">- {clientName}</p>
        </div>
    );
}

export default ProfileQuote;

// import React from 'react';
// import styles from './ProfileQuote.module.css';

// const ProfileQuote = ({ clientImage, quote, clientName }) => {
//     return (
//         <div className={styles.container}>
//             <div className={styles.imageContainer}>
//                 <img src={clientImage || "https://via.placeholder.com/400x400"} alt="Naveen Anand" />
//             </div>
//             <div className={styles.textContainer}>
//                 <p>
//                     "Our Journey: From a single idea to a sweet sensation, Maalana's story is one of passion, creativity, 
//                     and the love for all things sweet. Join us as we embark on a delicious journey filled with lollipops, 
//                     candies, and endless moments of joy. Welcome to the Maalana experience, where every step is a sweet 
//                     adventure!"
//                 </p>
//                 <div className={styles.name}>NAVEEN ANAND</div>
//             </div>
//         </div>
//     );
// };

// export default ProfileQuote;
