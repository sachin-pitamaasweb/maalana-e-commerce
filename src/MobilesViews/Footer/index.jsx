import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.logo}>
          <img src="https://res.cloudinary.com/dtivafy25/image/upload/v1724395923/Group_76_wynoom.png" alt="Maalana Logo" />
        </div>

        <div className={styles.socialMedia}>
          <a href="https://www.instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
            <img src="https://res.cloudinary.com/dtivafy25/image/upload/v1724396717/Group_80_ykdnap.png" alt="Instagram" />
          </a>
          <a href="https://twitter.com" aria-label="X" target="_blank" rel="noopener noreferrer">
            <img src="https://res.cloudinary.com/dtivafy25/image/upload/v1724396866/Group_81_ljjn4e.png" alt="Twitter" />
          </a>
          <a href="https://www.facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
            <img src="https://res.cloudinary.com/dtivafy25/image/upload/v1724396717/Group_77_mgh1fm.png" alt="Facebook" />
          </a>
        </div>

        <ul className={styles.links}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/dukaan">Dukaan</Link></li>
          <li><Link to="/kahani">Kahani</Link></li>
          <li><Link to="/baat-cheet">Baat Cheet</Link></li>
          <li><Link to="/join">Humko join karlo!</Link></li>
        </ul>

        <div className={styles.contact}>
          <p>+91 97645-12486</p>
          <p>Maalana Foods, Punjab, India 141001</p>
          <p>maalanafoods@gmail.com</p>
        </div>
      </div>

      <div className={styles.bottomBar}>
        © 2024-25 Maalana Foods All Rights Reserved | Design & Developed by <a href="https://pitamaas.com">PITAMAAS</a>
      </div>
    </div>
  );
};

export default Footer;
