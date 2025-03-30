"use client";
import React from 'react'
import Card from './Card';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import styles from './TopViewedPosts.module.css';
import Link from 'next/link';

const TopViewedPosts = ({ posts = [] }) => {
    return (
        <div className={`${styles.blog_slider} py-20`}>
            <div className="container-fluid">
                <div className="header-content mb-4 bg-white shadow-box rounded-3 p-3 d-flex align-items-center justify-content-between flex-wrap">
                    <div className={`${styles.title} d-flex align-items-center`}>
                        <img src="/images/square.png" alt="" className="img-fluid" />
                        <h5 className="font-16 ms-3">
                            پر بازدید ترین مطالب
                            <span className="main-color-one-color d-inline-block ms-1">
                            وبلاگ
                            </span>
                            </h5>
                    </div>
                    <div className="link">
                        <Link href={'/CategoryBlogs'} className="border-animate fromCenter pb-1 fw-bold">
                            مشاهده همه
                            <i className="bi bi-chevron-double-left main-color-one-color"></i>
                        </Link>
                    </div>
                </div>
            </div>

            <div className={`${styles.parent}`}>
                <div className="container-fluid">
                    <div className={`swiper ${styles.product_slider_swiper}`}
                    >
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
                                 {posts.length > 0 ? (
                                    posts.map((post) => (
                                        <SwiperSlide key={post.id} className={`${styles.mySlide}`}>
                                            <Card post={post} />
                                        </SwiperSlide>
                                    ))
                                ) : (
                                    // نمایش کارت‌های خالی اگر پستی وجود نداشته باشد
                                    Array(8).fill().map((_, index) => (
                                        <SwiperSlide key={index} className={`${styles.mySlide}`}>
                                            <Card />
                                        </SwiperSlide>
                                    ))
                                )}
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

export default TopViewedPosts