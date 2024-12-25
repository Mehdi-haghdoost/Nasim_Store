"use client";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import styles from './CategoryBrand.module.css';


const CategoryBrand = () => {
  return (
    <div className={styles.category_brand}>
      <div className="container-fluid">
        <div className="content-box">
          <div className="container-fluid">
            <Swiper
              watchSlidesProgress={true}
              slidesPerView={8}
              className="mySwiper">
              <SwiperSlide>
                <div className={`${styles.item} text-center`}>
                  <a href="">
                    <img src="/images/brand1-1.png" alt="xiaomi" className="img-fluid" />
                  </a>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className={`${styles.item} text-center`}>
                  <a href="">
                    <img src="/images/brand1-2.png" alt="xiaomi" className="img-fluid" />
                  </a>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className={`${styles.item} text-center`}>
                  <a href="">
                    <img src="/images/brand1-3.png" alt="xiaomi" className="img-fluid" />
                  </a>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className={`${styles.item} text-center`}>
                  <a href="">
                    <img src="/images/brand1-4.png" alt="xiaomi" className="img-fluid" />
                  </a>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className={`${styles.item} text-center`}>
                  <a href="">
                    <img src="/images/brand1-5.png" alt="xiaomi" className="img-fluid" />
                  </a>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className={`${styles.item} text-center`}>
                  <a href="">
                    <img src="/images/brand1-6.png" alt="xiaomi" className="img-fluid" />
                  </a>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className={`${styles.item} text-center`}>
                  <a href="">
                    <img src="/images/brand1.png" alt="xiaomi" className="img-fluid" />
                  </a>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className={`${styles.item} text-center`}>
                  <a href="">
                    <img src="/images/brand2.png" alt="xiaomi" className="img-fluid" />
                  </a>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className={`${styles.item} text-center`}>
                  <a href="">
                    <img src="/images/brand3.png" alt="xiaomi" className="img-fluid" />
                  </a>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className={`${styles.item} text-center`}>
                  <a href="">
                    <img src="/images/brand4.png" alt="xiaomi" className="img-fluid" />
                  </a>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className={`${styles.item} text-center`}>
                  <a href="">
                    <img src="/images/brand5.png" alt="xiaomi" className="img-fluid" />
                  </a>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className={`${styles.item} text-center`}>
                  <a href="">
                    <img src="/images/brand6.png" alt="xiaomi" className="img-fluid" />
                  </a>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryBrand