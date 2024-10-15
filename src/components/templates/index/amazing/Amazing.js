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
import MiniCard from "./MiniCard";

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

                                            modules={[Autoplay]}
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

                                <div className={`${styles.wrapper}`}>
                                    <div>
                                        <MiniCard />
                                        <MiniCard />
                                        <MiniCard />
                                        <MiniCard />
                                        <MiniCard />

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