"use client";
import React from 'react'
import styles from './Banner.module.css'

function Banner() {

    const handleBannerClick = (e) => {
        e.preventDefault();
    };

    return (
        <div className={`${styles.banner} py-20`}>
            <div className="container-fluid">
                <div className="row g-3">
                    <div className="col-lg-3 col-6">
                        <a
                            href="#"
                            onClick={handleBannerClick}
                            style={{ cursor: 'pointer' }}
                        >
                            <img src="/images/banner-1.webp" className="img-fluid rounded-3 shadow-box" alt="" />
                        </a>
                    </div>
                    <div className="col-lg-3 col-6">
                        <a
                            href="#"
                            onClick={handleBannerClick}
                            style={{ cursor: 'pointer' }}
                        >
                            <img src="/images/banner-2.webp" className="img-fluid rounded-3 shadow-box" alt="" />
                        </a>
                    </div>
                    <div className="col-lg-3 col-6">
                        <a
                            href="#"
                            onClick={handleBannerClick}
                            style={{ cursor: 'pointer' }}
                        >
                            <img src="/images/banner-3.webp" className="img-fluid rounded-3 shadow-box" alt="" />
                        </a>
                    </div>
                    <div className="col-lg-3 col-6">
                        <a
                            href="#"
                            onClick={handleBannerClick}
                            style={{ cursor: 'pointer' }}
                        >
                            <img src="/images/banner-4.webp" className="img-fluid rounded-3 shadow-box" alt="" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner