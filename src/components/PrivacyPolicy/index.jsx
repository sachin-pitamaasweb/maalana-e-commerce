import React from 'react';
import './style.css';

const PrivacyPolicy = () => {
    return (
        <div className="privacy-container">
            <div className="content-wrapper">
                <h1 className="page-title" style={{ fontWeight: 'bold' }}>Privacy Policy</h1>
                <p className='page-paragraph'>At Maalana Foods Private Limited, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and protect the information you provide when using our e-commerce website.</p>

                <h2 className='page-subtitle'>1. Information We Collect</h2>
                <p className='page-paragraph'>We collect the following types of information when you use our website:</p>
                <ul>
                    <li><strong>Personal Information:</strong> This includes your name, email address, phone number, billing and shipping address, and payment information when you make a purchase.</li>
                    <li><strong>Non-Personal Information:</strong> We collect data related to your use of our website, such as browser type, IP address, and browsing behavior, to help improve our services.</li>
                </ul>

                <h2 className='page-subtitle'>2. How We Use Your Information</h2>
                <p className='page-paragraph'>We use the information we collect for the following purposes:</p>
                <ul className='page-ul'>
                    <li>To process and complete your orders, including delivery and payment.</li>
                    <li>To communicate with you regarding your orders, promotions, or other inquiries.</li>
                    <li>To improve our website functionality and enhance user experience.</li>
                    <li>To send marketing and promotional emails, if you have opted in to receive them.</li>
                    <li>To comply with legal obligations and protect the security of our website.</li>
                </ul>

                <h2 className='page-subtitle'>3. Cookies</h2>
                <p className='page-paragraph'>Our website uses cookies to enhance your browsing experience. Cookies are small data files stored on your device. These files help us remember your preferences and provide a personalized shopping experience.</p>
                <p className='page-paragraph'>You can choose to disable cookies through your browser settings; however, doing so may limit the functionality of our website.</p>

                <h2 className='page-subtitle'>4. Data Protection and Security</h2>
                <p className='page-paragraph'>We take appropriate measures to safeguard your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
                <ul>
                    <li>We use SSL encryption to secure your payment and personal information during transactions.</li>
                    <li>Only authorized personnel have access to personal information for processing orders and customer service.</li>
                </ul>

                <h2 className='page-subtitle'>5. Third-Party Services</h2>
                <p>We may share your information with trusted third-party service providers who assist us in operating our website, processing payments, and shipping products. These service providers are required to protect your information and use it only for the services they provide to us.</p>
                <p>We do not sell, trade, or rent your personal information to third parties for marketing purposes.</p>

                <h2 className='page-subtitle'>6. Your Rights</h2>
                <p className='page-paragraph'>You have the right to access, modify, or delete your personal information at any time. You may also withdraw consent to the use of your information for marketing purposes.</p>
                <p className='page-paragraph'>To exercise your rights, please contact us at [customer support email] or [phone number].</p>

                <h2 className='page-subtitle'>7. Children's Privacy</h2>
                <p className='page-paragraph'>Our website is not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that a child under 18 has provided us with personal information, we will take steps to delete such information.</p>

                <h2 className='page-subtitle'>8. Changes to This Privacy Policy</h2>
                <p className='page-paragraph'>We may update this Privacy Policy from time to time. Any changes will be posted on this page, and the revised policy will be effective immediately upon posting.</p>
                <p className='page-paragraph'>We encourage you to review this policy periodically to stay informed about how we protect your information.</p>

                <h2 className='page-subtitle'>9. Contact Us</h2>
                <p className='page-paragraph'>If you have any questions or concerns regarding this Privacy Policy, please contact us at [customer support email] or call us at [phone number].</p>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
