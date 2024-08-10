import React from 'react';
import './style.scss';

const Timeline = () => {
  return (
    <ul className="timeline">
      {/* Location */}
      <li>
        <div className="direction-r">
          <div className="flag-wrapper">
            <span className="flag">Location</span>
            <span className="time-wrapper"><span className="time">City, Country</span></span>
          </div>
          <div className="desc">1234 Main St, Anytown, AN 12345</div>
        </div>
      </li>

      {/* Phone */}
      <li>
        <div className="direction-l">
          <div className="flag-wrapper">
            <span className="flag">Phone</span>
            <span className="time-wrapper"><span className="time">+1 234 567 890</span></span>
          </div>
          <div className="desc">Available 9am - 5pm, Mon - Fri</div>
        </div>
      </li>

      {/* Email */}
      <li>
        <div className="direction-r">
          <div className="flag-wrapper">
            <span className="flag">Email</span>
            <span className="time-wrapper"><span className="time">email@example.com</span></span>
          </div>
          <div className="desc">Feel free to reach out anytime!</div>
        </div>
      </li>
    </ul>
  );
};

export default Timeline;
