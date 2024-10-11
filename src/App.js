import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AOS from 'aos';
import 'aos/dist/aos.css';

import Header from './MobilesViews/Header/index.jsx';
import Footer from './MobilesViews/Footer/index.jsx';

//pages
import Home from './pages/Home/index.jsx';
import About from './pages/About/index.jsx';
import Login from './pages/Login/index.jsx';
import Signup from './pages/Signup/index.jsx';
import Profile from './pages/Profile/index.jsx';
import BecomePartner from './pages/BecomePartner/index.jsx';
import Contact from './pages/Contact/index.jsx';
import Products from './pages/Products/index.jsx';
import Cart from './pages/Cart/index.jsx'
import ProductDetails from './components/ProductDetails/index.jsx';
import OrderDetails from './components/OrderDetails/index.jsx';

// components 
import Checkout from './components/Checkout/index.jsx';
import OrderPlaceSuccess from './components/OrderPlaceSuccess/index.jsx';

// Auth and Protected Route
import { AuthProvider } from './context/AuthContext.js';
import ProtectedRoute from './ProtectedRoute/index.jsx';
import PrivacyPolicy from './components/PrivacyPolicy/index.jsx';
import ShippingProcess from './components/ShippingProcess/index.jsx';
import TermsAndConditions from './components/TermsAndConditions/index.jsx';

function App() {

  const [products, setProducts] = useState([]);
  useEffect(() => {
    AOS.init({
      duration: 1000, // duration of the animations in milliseconds
      once: true, // whether animation should happen only once - while scrolling down
    });
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://maalana.ritaz.in/api/admin/get-all-products');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array ensures this runs only once

  return (
    <>
      <AuthProvider>
        <Router>
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <Home />
              }
            />
            <Route
              path="/about"
              element={
                <About />
              } />
            <Route
              path="/login"
              element={
                <Login />

              } />
            <Route
              path="/signup"
              element={
                <Signup />
              }
            />
            <Route
              path="/profile/:userId"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
            <Route
              path="/payment"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              } />
            <Route
              path="/become-partner"
              element={
                <BecomePartner />
              }
            />
            <Route
              path="/contact"
              element={
                <Contact />
              }
            />
            <Route
              path="/products"
              element={
                <Products products={products} />
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/products-details/:productId"
              element={
                <ProtectedRoute>
                  <ProductDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order-details/:orderNumber"
              element={
                <ProtectedRoute>
                  <OrderDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order-success"
              element={
                <ProtectedRoute>
                  <OrderPlaceSuccess />
                </ProtectedRoute>
              }
            />
            <Route
              path="/privacy-policy"
              element={
                <PrivacyPolicy />
              }
            />
              <Route
              path="/shipping-process"
              element={
                <ShippingProcess />
              }
            />
            <Route
              path="/terms-and-conditions"
              element={
               <TermsAndConditions />
              }
            />
          </Routes>
         
          <Footer />
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
