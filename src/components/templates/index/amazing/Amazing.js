"use client";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';

// import "./styles.css";

import styles from "./Amazing.module.css"
import AmazingCard from "./AmazingCard";

function Amazing() {
    return (
        <div className="amazing py-20">
            <div className="container-fluid">
                <div className="header-content mb-4 bg-white shadow-box rounded-3 p-3 d-flex align-items-center justify-content-between flex-wrap">
                    <div className={`${styles.title} d-flex align-items-center`}>
                        <img src="/images/square.png" alt="" className="img-fluid" />
                        <h5 className="font-16 ms-3">اسلایدر
                            <span className="main-color-one-color d-inline-block ms-1">شگفت
                                انگیز
                            </span>
                        </h5>
                    </div>
                    <div className="link">
                        <a href="" className="border-animate fromCenter pb-1 fw-bold">
                            مشاهده همه
                            <i className="bi bi-chevron-double-left main-color-one-color"></i>
                        </a>
                    </div>
                </div>
                <div className={`${styles.amazing_slider}`}>
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="amazing-pro-parent">
                                <div className="swiper amazing-slider-slider">
                                    <div className="swiper-wrapper">
                                        <Swiper
                                            loop={true}
                                            rewind={true}
                                            spaceBetween={30}
                                            centeredSlides={true}
                                            autoplay={{
                                                delay: 4000,
                                                disableOnInteraction: false,
                                            }}
                                           
                                            modules={[ Autoplay]}
                                            className="mySwiper">
                                            <SwiperSlide>
                                                <AmazingCard />
                                            </SwiperSlide>

                                            <SwiperSlide>
                                                <AmazingCard />
                                            </SwiperSlide>

                                            <SwiperSlide>
                                                <AmazingCard />
                                            </SwiperSlide>

                                            <SwiperSlide>
                                                <AmazingCard />
                                            </SwiperSlide>

                                            <SwiperSlide>
                                                <AmazingCard />
                                            </SwiperSlide>
                                        </Swiper>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 d-lg-block d-none">
                            <div className={`${styles.parent}`}>

                                <div className="swiper amazing-slider-link">
                                    <div className="swiper-wrapper">
                                        <div className="swiper-slide">
                                            <div className={`${styles.item}`} >
                                                <div className="row gy-2">
                                                    <div className="col-4">
                                                        <div className="image">
                                                            <img src="/images/product/laptop-1.jpg" loading="lazy"
                                                                alt="" className="img-fluid" />
                                                        </div>
                                                    </div>
                                                    <div className="col-8">
                                                        <div className={`${styles.title}`} >
                                                            <h6 className="font-14 text-overflow-2">لپ تاپ 14.2 اینچی اپل مدل
                                                                2021 MacBook MKGR3 M1 Pro</h6>
                                                            <p className="mb-0 text-muted font-12 mt-2 text-overflow-2">Apple
                                                                MacBook MKGR3 M1 Pro 2021 14.2 inch laptop</p>
                                                        </div>
                                                        <div className={`${styles.price}`} >
                                                            <p className="text-end new-price mb-2 price-off fw-bold"><span
                                                                className="main-color-one-color">1,750,000</span> <small
                                                                    className="font-11">تومان</small></p>
                                                            <p className="text-end old-price price-discount">2,750,000 <small
                                                                className="font-11">تومان</small></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="swiper-slide">
                                            <div className={`${styles.item}`} >
                                                <div className="row gy-2">
                                                    <div className="col-4">
                                                        <div className="image">
                                                            <img src="/images/product/laptop-2.jpg" loading="lazy"
                                                                alt="" className="img-fluid" />
                                                        </div>
                                                    </div>
                                                    <div className="col-8">
                                                        <div className={`${styles.title}`} >
                                                            <h6 className="font-14 text-overflow-2">لپ تاپ 14.2 اینچی اپل مدل
                                                                2021 MacBook MKGR3 M1 Pro</h6>
                                                            <p className="mb-0 text-muted font-12 mt-2 text-overflow-2">Apple
                                                                MacBook MKGR3 M1 Pro 2021 14.2 inch laptop</p>
                                                        </div>
                                                        <div className={`${styles.price}`} >
                                                            <p className="text-end new-price mb-2 price-off fw-bold"><span
                                                                className="main-color-one-color">1,750,000</span> <small
                                                                    className="font-11">تومان</small></p>
                                                            <p className="text-end old-price price-discount">2,750,000 <small
                                                                className="font-11">تومان</small></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="swiper-slide">
                                            <div className={`${styles.item}`}>
                                                <div className="row gy-2">
                                                    <div className="col-4">
                                                        <div className="image">
                                                            <img src="/images/product/laptop-3.jpg" loading="lazy"
                                                                alt="" className="img-fluid" />
                                                        </div>
                                                    </div>
                                                    <div className="col-8">
                                                        <div className={`${styles.title}`} >
                                                            <h6 className="font-14 text-overflow-2">لپ تاپ 14.2 اینچی اپل مدل
                                                                2021 MacBook MKGR3 M1 Pro</h6>
                                                            <p className="mb-0 text-muted font-12 mt-2 text-overflow-2">Apple
                                                                MacBook MKGR3 M1 Pro 2021 14.2 inch laptop</p>
                                                        </div>
                                                        <div className={`${styles.price}`} >
                                                            <p className="text-end new-price mb-2 price-off fw-bold"><span
                                                                className="main-color-one-color">1,750,000</span> <small
                                                                    className="font-11">تومان</small></p>
                                                            <p className="text-end old-price price-discount">2,750,000 <small
                                                                className="font-11">تومان</small></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="swiper-slide">
                                            <div className={`${styles.item}`} >
                                                <div className="row gy-2">
                                                    <div className="col-4">
                                                        <div className="image">
                                                            <img src="/images/product/laptop-4.jpg" loading="lazy"
                                                                alt="" className="img-fluid" />
                                                        </div>
                                                    </div>
                                                    <div className="col-8">
                                                        <div className={`${styles.title}`} >
                                                            <h6 className="font-14 text-overflow-2">لپ تاپ 14.2 اینچی اپل مدل
                                                                2021 MacBook MKGR3 M1 Pro</h6>
                                                            <p className="mb-0 text-muted font-12 mt-2 text-overflow-2">Apple
                                                                MacBook MKGR3 M1 Pro 2021 14.2 inch laptop</p>
                                                        </div>
                                                        <div className={`${styles.price}`} >
                                                            <p className="text-end new-price mb-2 price-off fw-bold"><span
                                                                className="main-color-one-color">1,750,000</span> <small
                                                                    className="font-11">تومان</small></p>
                                                            <p className="text-end old-price price-discount">2,750,000 <small
                                                                className="font-11">تومان</small></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="swiper-slide">
                                            <div className={`${styles.item}`} >
                                                <div className="row gy-2">
                                                    <div className="col-4">
                                                        <div className="image">
                                                            <img src="/images/product/laptop-5.jpg" loading="lazy" alt="" className="img-fluid" />
                                                        </div>
                                                    </div>
                                                    <div className="col-8">
                                                        <div className={`${styles.title}`} >
                                                            <h6 className="font-14 text-overflow-2">لپ تاپ 14.2 اینچی اپل مدل
                                                                2021 MacBook MKGR3 M1 Pro</h6>
                                                            <p className="mb-0 text-muted font-12 mt-2 text-overflow-2">Apple
                                                                MacBook MKGR3 M1 Pro 2021 14.2 inch laptop</p>
                                                        </div>
                                                        <div className={`${styles.price}`} >
                                                            <p className="text-end new-price mb-2 price-off fw-bold"><span
                                                                className="main-color-one-color">1,750,000</span> <small
                                                                    className="font-11">تومان</small></p>
                                                            <p className="text-end old-price price-discount">2,750,000 <small
                                                                className="font-11">تومان</small></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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