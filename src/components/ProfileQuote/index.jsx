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




import React from 'react';

import './style.scss';

const ProfileQuote = () => {
    return (
        <>
            <div className="profile-container">
                <div className="profile-quote">
                    <p className="profile-quote-text">
                        "Crafting Sweet Memories: Maalana, Where Every Confection Tells a Story."
                    </p>
                </div>
                <img src={require('../../assets/about/img-8.png')} alt="Profile" className="profile-img" />
                <div className="profile-name">
                    <p className="profile-name-text">NAVEEN ANAND</p>
                    <img src={require('../../assets/about/img-7.png')} alt="Profile" className="profile-name-img" />
                </div>
            </div>
        </>
    );
};

export default ProfileQuote;