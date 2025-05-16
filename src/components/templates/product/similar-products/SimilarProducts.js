"use client";
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Import Swiper Navigation from modules - اضافه کردن ناوبری
import { Navigation, Pagination } from 'swiper/modules';

import styles from './SimilarProducts.module.css'
import Card from './Card'

function SimilarProducts({ products = [] }) {
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const images = [
    "/images/product/watch1.jpg",
    "/images/product/television1.jpg",
    "/images/product/product-image3.jpg",
    "/images/product/product-image2.jpg",
    "/images/product/product-image1.jpg",
    "/images/product/watch4.jpg",
    "/images/product/mobile.png",
  ];

  // تعریف داده‌های مختلف برای هر محصول
  const productVariants = [
    {
      _id: "product-1", // اضافه کردن _id واقعی برای هر محصول
      title: 'ساعت هوشمند شیائومی',
      originalName: 'Mibro Lite XPAW004 Smartwatch',
      price: 3175000,
      discountedPrice: 1900000,
      hasDiscount: true,
      discountPercentage: 40
    },
    {
      _id: "product-2",
      title: 'تلویزیون LED سامسونگ',
      originalName: 'Samsung 55" 4K UHD Smart TV',
      price: 28500000,
      discountedPrice: 25650000,
      hasDiscount: true,
      discountPercentage: 10
    },
    {
      _id: "product-3",
      title: 'هدفون بی‌سیم سونی',
      originalName: 'Sony WH-1000XM4 Wireless Headphones',
      price: 12500000,
      discountedPrice: 11250000,
      hasDiscount: true,
      discountPercentage: 10
    },
    {
      _id: "product-4",
      title: 'لپ‌تاپ گیمینگ ایسوس',
      originalName: 'ASUS ROG Strix G15 Gaming Laptop',
      price: 52000000,
      discountedPrice: 49400000,
      hasDiscount: true,
      discountPercentage: 5
    },
    {
      _id: "product-5",
      title: 'دوربین دیجیتال کانن',
      originalName: 'Canon EOS 90D DSLR Camera',
      price: 45000000,
      discountedPrice: 45000000,
      hasDiscount: false,
      discountPercentage: 0
    },
    {
      _id: "product-6",
      title: 'اسپیکر بلوتوثی JBL',
      originalName: 'JBL Charge 5 Portable Bluetooth Speaker',
      price: 7800000,
      discountedPrice: 6240000,
      hasDiscount: true,
      discountPercentage: 20
    },
    {
      _id: "product-7",
      title: 'گوشی موبایل سامسونگ',
      originalName: 'Samsung Galaxy S23 Ultra',
      price: 68000000,
      discountedPrice: 61200000,
      hasDiscount: true,
      discountPercentage: 10
    }
  ];

  // استفاده از محصولات واقعی پاس داده شده یا داده‌های مثال
  const displayProducts = products.length > 0 ? products : productVariants;

  return (
    <div className={`${styles.site_slider} py-20`}>
      <div className="container-fluid">
        <div
          className="header-content mb-4 bg-white shadow-box rounded-3 p-3 d-flex align-items-center justify-content-between flex-wrap">
          <div className={`${styles.title} d-flex align-items-center`}>
            <img src="/images/square.png" alt="" className="img-fluid" />
            <h5 className="font-16 ms-3"><span className="main-color-one-color d-inline-block ms-1">
              محصولات</span> مشابه</h5>
          </div>
          <div className="link">
            <a href="" className="border-animate fromCenter pb-1 fw-bold">
              مشاهده همه
              <i className="bi bi-chevron-double-left main-color-one-color"></i>
            </a>
          </div>
        </div>
      </div>

      <div className={`${styles.parent}`}>
        <div className="container-fluid">
          <div className={`swiper ${styles.product_slider_swiper}`}>
            <div className={`${styles.swiper_wrapper}`}>
              <Swiper
                slidesPerView={1}
                spaceBetween={4}
                navigation={{
                  nextEl: `.${styles.swiper_button_next}`,
                  prevEl: `.${styles.swiper_button_prev}`,
                }}
                modules={[Navigation, Pagination]}
                pagination={{ clickable: true }}
                breakpoints={{
                  576: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 40,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 50,
                  },
                  1200: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                  },
                  1400: {
                    slidesPerView: 5,
                    spaceBetween: 50,
                  },
                }}
                className="mySwiper"
              >
                {displayProducts.map((product, index) => (
                  <SwiperSlide key={product._id || index} className={`${styles.mySlide}`}>
                    <Card 
                      img={images[index % images.length]}
                      productData={product} 
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className={`${styles.swiper_button_next}`}></div>
            <div className={`${styles.swiper_button_prev}`}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SimilarProducts