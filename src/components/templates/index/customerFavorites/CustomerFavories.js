"use client";
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useProduct } from '@/Redux/hooks/useProduct';
import Link from 'next/link';
import Card from './Card';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import styles from './CustomerFavories.module.css'

function CustomerFavories() {
    // دریافت محصولات از Redux
    const { products, productsLoading, productsError } = useProduct();

    // مرتب کردن محصولات بر اساس rating (بالاترین امتیاز اول)
    const topRatedProducts = [...products]
        .filter(product => product.rating && product.rating > 0) // فقط محصولاتی که امتیاز دارند
        .sort((a, b) => (b.rating || 0) - (a.rating || 0)) // مرتب کردن نزولی
        .slice(0, 10); // 10 محصول برتر

    console.log("Top Rated Products:", topRatedProducts.map(p => ({
        title: p.title,
        rating: p.rating
    })));

    // نمایش loading state
    if (productsLoading) {
        return (
            <div className={`${styles.site_slider} py-20`}>
                <div className="container-fluid">
                    <div className="header-content mb-4 bg-white shadow-box rounded-3 p-3 d-flex align-items-center justify-content-between flex-wrap">
                        <div className={`${styles.title} d-flex align-items-center`}>
                            <div className=" rounded-2 p-2 me-3" style={{ background: 'var(--main-color-two)' }}>
                                <i className="bi bi-eye-fill text-white"></i>
                            </div>
                            <h5 className="font-16 ms-3">
                                <span className="main-color-one-color d-inline-block ms-1">پربازدیدترین محصولات</span> فروشگاه
                            </h5>
                        </div>
                        <div className="link">
                            <Link href="/categories" className="border-animate fromCenter pb-1 fw-bold">
                                مشاهده همه
                                <i className="bi bi-chevron-double-left main-color-one-color"></i>
                            </Link>
                        </div>
                    </div>
                    <div className={`${styles.parent}`}>
                        <div className="container-fluid">
                            <div className="text-center p-5">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">بارگذاری...</span>
                                </div>
                                <p className="mt-3">در حال بارگذاری پربازدیدترین محصولات...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // نمایش error state
    if (productsError) {
        return (
            <div className={`${styles.site_slider} py-20`}>
                <div className="container-fluid">
                    <div className="header-content mb-4 bg-white shadow-box rounded-3 p-3 d-flex align-items-center justify-content-between flex-wrap">
                        <div className={`${styles.title} d-flex align-items-center`}>
                             <div className=" rounded-2 p-2 me-3" style={{ background: 'var(--main-color-two)' }}>
                                <i className="bi bi-eye-fill text-white"></i>
                            </div>
                            <h5 className="font-16 ms-3">
                                <span className="main-color-one-color d-inline-block ms-1">پربازدیدترین محصولات</span> فروشگاه
                            </h5>
                        </div>
                        <div className="link">
                            <Link href="/categories" className="border-animate fromCenter pb-1 fw-bold">
                                مشاهده همه
                                <i className="bi bi-chevron-double-left main-color-one-color"></i>
                            </Link>
                        </div>
                    </div>
                    <div className={`${styles.parent}`}>
                        <div className="container-fluid">
                            <div className="alert alert-warning text-center">
                                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                خطا در بارگذاری پربازدیدترین محصولات.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // اگر محصول با امتیاز وجود نداشت
    if (topRatedProducts.length === 0) {
        return (
            <div className={`${styles.site_slider} py-20`}>
                <div className="container-fluid">
                    <div className="header-content mb-4 bg-white shadow-box rounded-3 p-3 d-flex align-items-center justify-content-between flex-wrap">
                        <div className={`${styles.title} d-flex align-items-center`}>
                             <div className=" rounded-2 p-2 me-3" style={{ background: 'var(--main-color-two)' }}>
                                <i className="bi bi-eye-fill text-white"></i>
                            </div>
                            <h5 className="font-16 ms-3">
                                <span className="main-color-one-color d-inline-block ms-1">پربازدیدترین محصولات</span> فروشگاه
                            </h5>
                        </div>
                        <div className="link">
                            <Link href="/categories" className="border-animate fromCenter pb-1 fw-bold">
                                مشاهده همه
                                <i className="bi bi-chevron-double-left main-color-one-color"></i>
                            </Link>
                        </div>
                    </div>
                    <div className={`${styles.parent}`}>
                        <div className="container-fluid">
                            <div className="text-center text-muted p-5">
                                <i className="bi bi-star me-2"></i>
                                هنوز محصولی امتیاز دریافت نکرده است.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`${styles.site_slider} py-20`}>
            <div className="container-fluid">
                <div className="header-content mb-4 bg-white shadow-box rounded-3 p-3 d-flex align-items-center justify-content-between flex-wrap">
                    <div className={`${styles.title} d-flex align-items-center`}>
                         <div className=" rounded-2 p-2 me-3" style={{ background: 'var(--main-color-two)' }}>
                                <i className="bi bi-eye-fill text-white"></i>
                            </div>
                        <h5 className="font-16 ms-3">
                            <span className="main-color-one-color d-inline-block ms-1">پربازدیدترین محصولات</span> فروشگاه
                        </h5>
                    </div>
                    <div className="link">
                        <Link href="/categories" className="border-animate fromCenter pb-1 fw-bold">
                            مشاهده همه
                            <i className="bi bi-chevron-double-left main-color-one-color"></i>
                        </Link>
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
                                navigation={{
                                    nextEl: `.${styles.swiper_button_next}`,
                                    prevEl: `.${styles.swiper_button_prev}`,
                                }}
                                modules={[Navigation]}
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
                                {topRatedProducts.map((product, index) => (
                                    <SwiperSlide key={product._id || index} className={`${styles.mySlide}`}>
                                        <Card productData={product} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                        <div className={`swiper-button-next ${styles.swiper_button_next}`}></div>
                        <div className={`swiper-button-prev ${styles.swiper_button_prev}`}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerFavories;