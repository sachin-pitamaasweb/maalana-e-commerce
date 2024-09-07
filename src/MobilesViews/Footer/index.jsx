import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  const navigate = useNavigate();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogo = () => {
    scrollToTop();
    navigate('/products');
  };

  return (
    <div className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.logo} onClick={handleLogo} aria-label="Logo" style={{ cursor: 'pointer' }}>
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
          <li><Link to="/" onClick={scrollToTop}>Home</Link></li>
          <li><Link to="/products" onClick={scrollToTop}>Dukaan</Link></li>
          <li><Link to="/about" onClick={scrollToTop}>Kahani</Link></li>
          <li><Link to="/contact" onClick={scrollToTop}>Baat Cheet</Link></li>
          <li><Link to="/become-partner" onClick={scrollToTop}>Humko join karlo!</Link></li>
          <li><Link to="/privacy-policy" onClick={scrollToTop}>Privacy Policy</Link></li>
          <li><Link to="/shipping-process" onClick={scrollToTop}>Shipping Process</Link></li>
          <li><Link to="/terms-and-conditions" onClick={scrollToTop}>Terms and Conditionss</Link></li>
        </ul>

        <div className={styles.contact}>
          <p>
            <a href="tel:+919764512486" style={{ textDecoration: 'none', color: '#000' }}>+91 97645-12486</a>
          </p>
          <p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Maalana+Foods,+Punjab,+India+141001"
              aria-label="Address"
              style={{ textDecoration: 'none', color: '#000' }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Maalana Foods, Punjab, India 141001
            </a>
          </p>
          <p>
            <a
              href="mailto:maalanafoods@gmail.com"
              style={{ textDecoration: 'none', color: '#000' }}
            >
              maalanafoods@gmail.com
            </a>
          </p>
        </div>
      </div>

      <div className={styles.bottomBar}>
        © 2024-25 Maalana Foods All Rights Reserved | Design & Developed by <a href="https://pitamaas.com">PITAMAAS</a>
      </div>
    </div>
  );
};

export default Footer;
