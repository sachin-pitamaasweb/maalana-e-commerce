import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import VegetarianIcon from './VegetarianIcon';
import "./style.css";

const ProductDetails = () => {
  const location = useLocation();
  const { state } = location;
  const product = state?.product || {}; // Fallback to empty object if product data is missing
  
  const [mainImage, setMainImage] = useState(product.images?.mainImage || "https://via.placeholder.com/500x500");
  const [activeTab, setActiveTab] = useState("details");
  const [zoomPosition, setZoomPosition] = useState({ x: "50%", y: "50%" });

  const changeImage = (src) => setMainImage(src);

  const openTab = (tab) => setActiveTab(tab);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x: `${x}%`, y: `${y}%` });
  };

  const handleBackButton = () => window.history.back();

  // Filter images based on a valid source condition and handle missing images gracefully
  const images = product.images
    ? Object.values(product.images).filter((src) => src && src.startsWith("http://res.cloudinary.com"))
    : [];

  // Slider settings for react-slick
  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="product-details-container">
      <header className="product-details-header">
        <button className="product-details-back-button" onClick={handleBackButton}>←</button>
        <h1 className="product-details-product-title">Product Details</h1>
      </header>
      <div className="product-details-grid">
        <div>
          <div className="product-details-image" onMouseMove={handleMouseMove}>
            <img
              src={mainImage}
              alt={product.title || "Product Image"}
              id="main-image"
              style={{ transformOrigin: `${zoomPosition.x} ${zoomPosition.y}` }}
            />
          </div>
          {images.length > 0 && (
            images.length > 4 ? (
              <Slider {...sliderSettings} className="product-details-thumbnails-slider">
                {images.map((src, index) => (
                  <div key={index}>
                    <img
                      src={src}
                      alt={`Thumbnail ${index + 1}`}
                      onClick={() => changeImage(src)}
                      style={{ cursor: "pointer", padding: "5px" }}
                    />
                  </div>
                ))}
              </Slider>
            ) : (
              <div className="product-details-thumbnails">
                {images.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`Thumbnail ${index + 1}`}
                    onClick={() => changeImage(src)}
                    style={{ cursor: "pointer", padding: "5px" }}
                  />
                ))}
              </div>
            )
          )}
        </div>

        <div className="product-details-info">
          <h1 className="product-details-product-name">{product.name || "Product Name"}</h1>
          {product.isVegetarian !== undefined && (
            <div className="product-details-vegetarian">
              <VegetarianIcon width={46} height={46} />
              <span>{product.isVegetarian ? "This is a Vegetarian product" : "Non-Vegetarian product"}</span>
            </div>
          )}
          <p className="product-details-price">₹{product.price ?? "0.00"}</p>
          <p className="product-details-per-weight">₹{product.pricePerWeight ?? "0.00"} per 100g (Inclusive of all taxes)</p>
          {product.coupon && <button className="product-details-coupon">{product.coupon}</button>}
          {product.flavors?.length > 0 && (
            <div className="product-details-flavor-select">
              <h3 className="product-details-flavor-label">Flavour Name:</h3>
              {product.flavors.map((flavor, index) => (
                <label key={index} className="product-details-flavor-option">
                  <input type="radio" name="flavor" value={flavor} defaultChecked={index === 0} /> {flavor}
                </label>
              ))}
            </div>
          )}
          <button className="product-details-add-to-cart">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {/* SVG paths */}
            </svg>
            Add to Cart
          </button>
          <div className="product-details-tabs">
            <div className="product-details-tab-list">
              <button className={`product-details-tab ${activeTab === "details" ? "active" : ""}`} onClick={() => openTab("details")}>
                Product Details
              </button>
              <button className={`product-details-tab ${activeTab === "specifications" ? "active" : ""}`} onClick={() => openTab("specifications")}>
                Specifications
              </button>
            </div>
            <div id="details" className={`product-details-tab-content ${activeTab === "details" ? "active" : ""}`}>
              <p>{product.details || "Detailed information about the product goes here."}</p>
            </div>
            <div id="specifications" className={`product-details-tab-content ${activeTab === "specifications" ? "active" : ""}`}>
              <p>{product.specifications || "Specifications information goes here."}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
