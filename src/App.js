import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AOS from 'aos';
import 'aos/dist/aos.css';

import Header from './MobilesViews/Header/index.jsx';

//pages
import Home from './pages/Home/index.jsx';
import About from './pages/About/index.jsx';
import Login from './pages/Login/index.jsx';
import Signup from './pages/Signup/index.jsx';
import Profile from './pages/Profile/index.jsx';
import BecomePartner from './pages/BecomePartner/index.jsx';
import Contact from './pages/Contact/index.jsx';
import Products from './pages/Products/index.jsx';

// components 
import Checkout from './components/Checkout/index.jsx';

function App() {
    useEffect(() => {
      AOS.init({
        duration: 1000, // duration of the animations in milliseconds
        once: true, // whether animation should happen only once - while scrolling down
      });
    });
  return (
    <>
      <Router>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/payment" element={<Checkout />} />
          <Route path="/become-partner" element={<BecomePartner />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
