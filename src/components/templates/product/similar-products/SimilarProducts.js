"use client";
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_PRODUCTS } from '@/graphql/entities/products/product.queries';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import styles from './SimilarProducts.module.css';
import Card from './Card';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

function SimilarProducts() {
  // دریافت محصولات از دیتابیس
  const { data, loading, error } = useQuery(GET_ALL_PRODUCTS);
  const products = data?.products || [];

  console.log("SimilarProducts - محصولات دریافتی:", products);

  // اگر در حال بارگذاری هستیم، نمایش لودینگ
  if (loading) {
    return (
      <div className="container py-3 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">بارگذاری...</span>
        </div>
        <p className="mt-3">در حال بارگذاری محصولات مشابه...</p>
      </div>
    );
  }

  // اگر خطایی رخ داده، نمایش پیام خطا
  if (error) {
    return (
      <div className="container py-3">
        <div className="alert alert-warning">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          مشکلی در بارگذاری محصولات مشابه رخ داده است.
        </div>
      </div>
    );
  }

  // اگر محصولات وجود ندارند، چیزی نمایش نده
  if (!products || products.length === 0) {
    return (
      <div className="container py-3">
        <div className="text-center text-muted">
          <i className="bi bi-box me-2"></i>
          محصول مشابهی یافت نشد.
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.site_slider} py-20`}>
      <div className="container-fluid">
        <div className="header-content mb-4 bg-white shadow-box rounded-3 p-3 d-flex align-items-center justify-content-between flex-wrap">
          <div className={`${styles.title} d-flex align-items-center`}>
            <img src="/images/square.png" alt="" className="img-fluid" />
            <h5 className="font-16 ms-3">
              <span className="main-color-one-color d-inline-block ms-1">محصولات</span> مشابه
            </h5>
          </div>
          <div className="link">
            <a href="/categories" className="border-animate fromCenter pb-1 fw-bold">
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
                spaceBetween={10}
                navigation={true}
                modules={[Navigation, Pagination]}
                pagination={{ clickable: true }}
                breakpoints={{
                  576: { slidesPerView: 2, spaceBetween: 20 },
                  768: { slidesPerView: 2, spaceBetween: 30 },
                  1024: { slidesPerView: 3, spaceBetween: 40 },
                  1200: { slidesPerView: 4, spaceBetween: 20 },
                  1400: { slidesPerView: 5, spaceBetween: 50 },
                }}
                className="mySwiper"
              >
                {products.map((product, index) => (
                  <SwiperSlide key={product._id || index} className={`${styles.mySlide}`}>
                    <Card productData={product} />
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className={`${styles.swiper_button_next}`}></div>
              <div className={`${styles.swiper_button_prev}`}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SimilarProducts;