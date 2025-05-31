"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useProduct } from '@/Redux/hooks/useProduct';
import Link from 'next/link';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';

import styles from "./Amazing.module.css"
import AmazingCard from "./AmazingCard";
import MiniCard from "./MiniCard";

function Amazing() {
    // دریافت محصولات از Redux
    const { products, productsLoading, productsError } = useProduct();

    // فیلتر محصولات با تخفیف برای اسلایدر شگفت‌انگیز
    const amazingProducts = products.filter(product => 
        product.hasDiscount && product.discountedPrice && product.price
    );

    // محصولات اصلی برای اسلایدر (5 محصول اول)
    const mainAmazingProducts = amazingProducts.slice(0, 5);
    
    // محصولات کوچک برای سایدبار (4 محصول رندوم از کل محصولات)
    const getRandomProducts = (allProducts, count) => {
        const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };
    const miniAmazingProducts = getRandomProducts(products, 4);

    console.log("Amazing Products:", amazingProducts.length, "Main:", mainAmazingProducts.length, "Mini Random:", miniAmazingProducts.length);

    // نمایش loading state
    if (productsLoading) {
        return (
            <div className="amazing py-20">
                <div className="container-fluid">
                    <div className="header-content mb-4 bg-white shadow-box rounded-3 p-3 d-flex align-items-center justify-content-between flex-wrap">
                        <div className={`${styles.title} d-flex align-items-center`}>
                            <div className="bg-primary rounded-2 p-2 me-3">
                                <i className="bi bi-lightning-fill text-white"></i>
                            </div>
                            <h5 className="font-16 ms-3">اسلایدر
                                <span className="main-color-one-color d-inline-block ms-1">شگفت انگیز</span>
                            </h5>
                        </div>
                        <div className="link">
                            <Link href="/categories" className="border-animate fromCenter pb-1 fw-bold">
                                مشاهده همه
                                <i className="bi bi-chevron-double-left main-color-one-color"></i>
                            </Link>
                        </div>
                    </div>
                    <div className={`${styles.amazing_slider}`}>
                        <div className="row">
                            <div className="col-lg-8">
                                <div className={`${styles.amazing_parent} shadow-box text-center p-5`}>
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">بارگذاری...</span>
                                    </div>
                                    <p className="mt-3">در حال بارگذاری محصولات شگفت‌انگیز...</p>
                                </div>
                            </div>
                            <div className="col-lg-4 d-lg-block d-none">
                                <div className={`${styles.parent}`}>
                                    <div className={`${styles.wrapper} text-center p-3`}>
                                        <div className="spinner-border spinner-border-sm text-primary" role="status">
                                            <span className="visually-hidden">بارگذاری...</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // نمایش error state
    if (productsError) {
        console.error('خطا در دریافت محصولات شگفت‌انگیز:', productsError);
        return (
            <div className="amazing py-20">
                <div className="container-fluid">
                    <div className="header-content mb-4 bg-white shadow-box rounded-3 p-3 d-flex align-items-center justify-content-between flex-wrap">
                        <div className={`${styles.title} d-flex align-items-center`}>
                            <div className="bg-primary rounded-2 p-2 me-3">
                                <i className="bi bi-lightning-fill text-white"></i>
                            </div>
                            <h5 className="font-16 ms-3">اسلایدر
                                <span className="main-color-one-color d-inline-block ms-1">شگفت انگیز</span>
                            </h5>
                        </div>
                        <div className="link">
                            <Link href="/categories" className="border-animate fromCenter pb-1 fw-bold">
                                مشاهده همه
                                <i className="bi bi-chevron-double-left main-color-one-color"></i>
                            </Link>
                        </div>
                    </div>
                    <div className={`${styles.amazing_slider}`}>
                        <div className="row">
                            <div className="col-12">
                                <div className="alert alert-warning text-center">
                                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                    خطا در بارگذاری محصولات شگفت‌انگیز. لطفاً دوباره تلاش کنید.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // اگر محصول با تخفیف وجود نداشت
    if (amazingProducts.length === 0) {
        return (
            <div className="amazing py-20">
                <div className="container-fluid">
                    <div className="header-content mb-4 bg-white shadow-box rounded-3 p-3 d-flex align-items-center justify-content-between flex-wrap">
                        <div className={`${styles.title} d-flex align-items-center`}>
                            <div className="bg-primary rounded-2 p-2 me-3">
                                <i className="bi bi-lightning-fill text-white"></i>
                            </div>
                            <h5 className="font-16 ms-3">اسلایدر
                                <span className="main-color-one-color d-inline-block ms-1">شگفت انگیز</span>
                            </h5>
                        </div>
                        <div className="link">
                            <Link href="/categories" className="border-animate fromCenter pb-1 fw-bold">
                                مشاهده همه
                                <i className="bi bi-chevron-double-left main-color-one-color"></i>
                            </Link>
                        </div>
                    </div>
                    <div className={`${styles.amazing_slider}`}>
                        <div className="row">
                            <div className="col-12">
                                <div className="text-center text-muted p-5">
                                    <i className="bi bi-gift me-2"></i>
                                    هیچ محصول شگفت‌انگیزی در حال حاضر موجود نیست.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="amazing py-20">
            <div className="container-fluid">
                <div className="header-content mb-4 bg-white shadow-box rounded-3 p-3 d-flex align-items-center justify-content-between flex-wrap">
                    <div className={`${styles.title} d-flex align-items-center`}>
                        <div className="bg-primary rounded-2 p-2 me-3">
                            <i className="bi bi-lightning-fill text-white"></i>
                        </div>
                        <h5 className="font-16 ms-3">اسلایدر
                            <span className="main-color-one-color d-inline-block ms-1">شگفت انگیز</span>
                        </h5>
                    </div>
                    <div className="link">
                        <Link href="/categories" className="border-animate fromCenter pb-1 fw-bold">
                            مشاهده همه
                            <i className="bi bi-chevron-double-left main-color-one-color"></i>
                        </Link>
                    </div>
                </div>
                <div className={`${styles.amazing_slider}`}>
                    <div className="row">
                        <div className="col-lg-8">
                            <div className={`${styles.amazing_parent} shadow-box`}>
                                <div className={`swiper`}>
                                    <div className={`${styles.swiper_wrapper}`}>
                                        <Swiper
                                            loop={mainAmazingProducts.length > 1}
                                            rewind={true}
                                            spaceBetween={30}
                                            centeredSlides={true}
                                            autoplay={{
                                                delay: 4000,
                                                disableOnInteraction: false,
                                            }}
                                            modules={[Autoplay]}
                                            className="mySwiper">
                                            
                                            {mainAmazingProducts.length > 0 ? (
                                                mainAmazingProducts.map((product, index) => (
                                                    <SwiperSlide key={product._id || index}>
                                                        <AmazingCard productData={product} />
                                                    </SwiperSlide>
                                                ))
                                            ) : (
                                                // اگر محصول کافی نداشتیم، یک کارت خالی نمایش بده
                                                <SwiperSlide>
                                                    <div className="text-center p-5 text-muted">
                                                        <i className="bi bi-gift font-48"></i>
                                                        <p className="mt-3">محصول شگفت‌انگیزی موجود نیست</p>
                                                    </div>
                                                </SwiperSlide>
                                            )}
                                        </Swiper>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 d-lg-block d-none">
                            <div className={`${styles.parent}`}>
                                <div className={`${styles.wrapper}`}>
                                    <div>
                                        {miniAmazingProducts.map((product, index) => (
                                            <MiniCard key={product._id || index} productData={product} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Amazing