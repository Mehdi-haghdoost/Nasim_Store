"use client"
import React from 'react'
import styles from './MainSlider.module.css'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';

import ProductBox from './ProductBox';

function MainSlider() {
    return (
        <div className={`${styles.main_slider}`}>
            <div className='container-fluid'>
                <div className="row">
                    <div className="col-lg-3 order-lg-1 order-2">
                        <Swiper
                            loop={true}
                            rewind={true}
                            navigation={true}
                            modules={[Navigation, Autoplay]}
                            autoplay={{ delay: 1500 }}
                            className="mySwiper home-slider">
                            <SwiperSlide>
                              <ProductBox />
                                <img className='img-fluid' src="/images/product/watch1.jpg" alt="slide1" />
                            </SwiperSlide>

                            <SwiperSlide>
                              <ProductBox />

                                <img className='img-fluid' src="/images/product/watch2.jpg" alt="slide2" />
                            </SwiperSlide>

                            <SwiperSlide>
                              <ProductBox />

                                <img className='img-fluid' src="/images/product/watch3.jpg" alt="slide3" />
                            </SwiperSlide>

                            <SwiperSlide>
                              <ProductBox />

                                <img className='img-fluid' src="/images/product/watch4.jpg" alt="slide4" />
                            </SwiperSlide>
                        </Swiper>
                    </div>
                    <div className="col-lg-9 order-lg-2 order-1"></div>
                </div>
            </div>
        </div>
    )
}

export default MainSlider