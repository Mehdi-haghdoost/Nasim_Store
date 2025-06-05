"use client";

import React from 'react'
import styles from './PhoneBanner.module.css'

function PhoneBanner() {
  const handleBannerClick = (e) => {
    e.preventDefault();
  };

  return (
    <div className={`${styles.banner} py-20`}>
      <div className="container-fluid">
        <div className="row g-3">
          <div className="col-sm-4">
            <a 
              href="#"
              onClick={handleBannerClick}
              style={{ cursor: 'pointer' }}
            >
              <img 
                src="/images/banner-11.jpg" 
                className="img-fluid rounded-3 shadow-box" 
                alt="بنر تبلیغاتی" 
              />
            </a>
          </div>
          <div className="col-sm-4">
            <a 
              href="#"
              onClick={handleBannerClick}
              style={{ cursor: 'pointer' }}
            >
              <img 
                src="/images/banner-12.jpg" 
                className="img-fluid rounded-3 shadow-box" 
                alt="بنر تبلیغاتی" 
              />
            </a>
          </div>
          <div className="col-sm-4">
            <a 
              href="#"
              onClick={handleBannerClick}
              style={{ cursor: 'pointer' }}
            >
              <img 
                src="/images/banner-13.jpg" 
                className="img-fluid rounded-3 shadow-box" 
                alt="بنر تبلیغاتی" 
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PhoneBanner