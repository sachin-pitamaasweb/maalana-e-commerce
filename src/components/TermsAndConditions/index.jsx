import React from 'react';
import '../PrivacyPolicy/style.css';

const TermsAndConditions = () => {
  return (
    <div className="terms-container">
      <div className="content-wrapper">
        <h1 className="page-title">Terms and Conditions</h1>

        <p className="page-paragraph">
          Welcome to Maalana Foods Private Limited! These Terms and Conditions
          ("Terms") govern your use of our e-commerce website and the purchase
          of our confectionery products, including but not limited to candies,
          lollipops, and Imli candy. By accessing or using our website, you
          agree to comply with and be bound by these Terms.
        </p>

        <h2 className='page-subtitle'>1. General Information</h2>
        <p>
          Maalana Foods Private Limited specializes in the sale of high-quality
          confectionery products. All products listed on this website are
          available for purchase, subject to these Terms and Conditions.
        </p>

        <h2 className='page-subtitle'>2. Eligibility</h2>
        <p className='page-paragraph'>
          To place an order on our website, you must be at least 18 years old.
          By making a purchase, you confirm that you meet this eligibility
          requirement. If you are under 18, parental or guardian consent is
          required to use this website and make purchases.
        </p>

        <h2 className='page-subtitle'>3. Product Information</h2>
        <p className='page-paragraph'>
          We strive to provide accurate descriptions of our products, including
          ingredients, nutritional facts, and other product details. However, we
          do not warrant that product descriptions or any other content on the
          website are accurate, complete, or error-free. All products are
          subject to availability.
        </p>

        <h2 className='page-subtitle'>4. Pricing and Payment</h2>
        <ul className='page-ul'>
          <li>All prices listed on the website are in INR (Indian Rupees) and are inclusive of applicable taxes.</li>
          <li>We reserve the right to change prices at any time without prior notice.</li>
          <li>Payments can be made through the available payment gateways on our website. We accept various payment methods, including credit/debit cards, net banking, UPI, and wallet payments.</li>
          <li>All orders must be paid for in full before the product is shipped.</li>
        </ul>

        <h2 className='page-subtitle'>5. Shipping and Delivery</h2>
        <ul className='page-ul'>
          <li>We aim to ship orders within 1-3 business days from the date of order placement.</li>
          <li>Delivery times may vary depending on your location and external factors such as courier delays.</li>
          <li>Shipping charges will be displayed at checkout based on your delivery location.</li>
          <li>We are not responsible for any delays in delivery caused by third-party courier services.</li>
        </ul>

        <h2 className='page-subtitle'>6. Order Cancellation and Modifications</h2>
        <ul className='page-ul'>
          <li>Orders can be canceled within 24 hours of placing the order, provided the product has not yet been shipped.</li>
          <li>Once an order has been processed and shipped, no modifications or cancellations are permitted.</li>
          <li>Refunds for canceled orders will be processed within 7 business days.</li>
        </ul>

        <h2 className='page-subtitle'>7. Returns and Refunds</h2>
        <ul className='page-ul'>
          <li>We accept returns only for damaged or defective products. Please notify us within 48 hours of receiving the product if it arrives damaged.</li>
          <li>To request a return, contact us at [customer support email] with your order details and a clear description of the issue.</li>
          <li>Refunds will be issued within 7 business days after receiving the returned product.</li>
          <li>Products must be returned in their original, unopened packaging for a refund to be processed.</li>
        </ul>

        <h2 className='page-subtitle'>8. User Conduct</h2>
        <p>By using our website, you agree not to:</p>
        <ul className='page-ul'>
          <li>Use the website for any unlawful purposes.</li>
          <li>Violate any applicable laws and regulations.</li>
          <li>Interfere with or disrupt the website's security or functionality.</li>
          <li>Engage in any fraudulent activities, including making unauthorized purchases.</li>
        </ul>

        <h2 className='page-subtitle'>9. Intellectual Property</h2>
        <p className='page-paragraph'>
          All content on the Maalana Foods Private Limited website, including
          text, images, logos, and product designs, is the property of Maalana
          Foods Private Limited and is protected by copyright and trademark
          laws. Unauthorized use of this content is strictly prohibited.
        </p>

        <h2 className='page-subtitle'>10. Limitation of Liability</h2>
        <p className='page-paragraph'>
          Maalana Foods Private Limited shall not be held liable for any direct,
          indirect, incidental, or consequential damages arising from:
        </p>
        <ul className='page-ul'>
          <li>The use or inability to use the website.</li>
          <li>The purchase or consumption of any of our products.</li>
          <li>Any errors or inaccuracies on the website.</li>
        </ul>

        <h2 className='page-subtitle'>11. Privacy Policy</h2>
        <p className='page-paragraph'>
          By using our website, you agree to our Privacy Policy, which governs
          the collection, storage, and use of your personal information. For
          more details, please review our Privacy Policy <a href='https://maalana-e-commerce.vercel.app/privacy-policy'>here</a>.
        </p>

        <h2 className='page-subtitle'>12. Governing Law</h2>
        <p className='page-paragraph'>
          These Terms and Conditions shall be governed by and construed in
          accordance with the laws of India. Any disputes arising from or
          related to the use of our website or products will be subject to the
          exclusive jurisdiction of the courts of [city, state].
        </p>

        <h2 className='page-subtitle'>13. Amendments</h2>
        <p className='page-paragraph'>
          Maalana Foods Private Limited reserves the right to modify these Terms
          and Conditions at any time. Any changes will be effective immediately
          upon posting on the website. It is your responsibility to review these
          Terms periodically.
        </p>

        <h2 className='page-subtitle'>14. Contact Information</h2>
        <p className='page-paragraph'>
          If you have any questions regarding these Terms and Conditions, feel
          free to contact us at [customer support email] or call us at [phone number].
        </p>

        <p className='page-paragraph'>
          By using our website and placing an order, you acknowledge that you
          have read, understood, and agree to these Terms and Conditions.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
