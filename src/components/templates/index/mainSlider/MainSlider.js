"use client"
import React, { useState, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


import styles from './MainSlider.module.css'
import { Navigation, Autoplay, Pagination } from 'swiper/modules';

import ProductBox from './ProductBox';
import ProgressBar from './ProgressBar';
import ProductDetail from './ProductDetail';

function MainSlider() {

    const [activeSlide, setActiveSlide] = useState(0)

    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.current.style.setProperty('--progress', 1 - progress);
        progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };

    return (
        <div className={`${styles.main_slider}`}>
            <div className='container-fluid'>
                <div className="row">
                    <div className="col-lg-3 order-lg-1 order-2">
                        <div className={`${styles.swiper_slide}`}>
                            <div className={`${styles.slide_product_box}`}>
                        <Swiper
                            loop={true}
                            rewind={true}
                            spaceBetween={30}                           
                            modules={[Navigation, Autoplay]}
                            autoplay={{ delay: 6000 }}
                            onSlideChange={() => setActiveSlide(activeSlide + 1)}
                            className={`${styles.mySwiper} home-slider`}>
                            <SwiperSlide>
                                <ProductBox />
                                <ProgressBar key={activeSlide} />
                                <img  className={`img-fluid ${styles.slider_img}`} src="/images/product/watch1.jpg" alt="slide1" />
                                <ProductDetail />
                            </SwiperSlide>

                            <SwiperSlide>
                                <ProductBox />
                                <ProgressBar key={activeSlide} />
                                <img  className={`img-fluid ${styles.slider_img}`} src="/images/product/watch2.jpg" alt="slide2" />
                                <ProductDetail />
                            </SwiperSlide>

                            <SwiperSlide>
                                <ProductBox />
                                <ProgressBar key={activeSlide} />
                                <img  className={`img-fluid ${styles.slider_img}`} src="/images/product/watch3.jpg" alt="slide3" />
                                <ProductDetail />
                            </SwiperSlide>

                            <SwiperSlide>
                                <ProductBox />
                                <ProgressBar key={activeSlide} />
                                <img  className={`img-fluid ${styles.slider_img}`} src="/images/product/watch4.jpg" alt="slide4" />
                                <ProductDetail />
                            </SwiperSlide>
                        </Swiper>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-9 order-lg-2 order-1">
                        <div className={`${styles.slider}`}>
                            <div className={`${styles.swiper}`}>
                                <div className={`${styles.swiper_wrapper}`}>
                                    <Swiper
                                        loop={true}
                                        rewind={true}
                                        spaceBetween={30}
                                        centeredSlides={true}
                                        autoplay={{
                                            delay: 3000,
                                            disableOnInteraction: false,
                                        }}
                                        pagination={{
                                            clickable: true,
                                        }}
                                        // navigation={true}
                                        modules={[Autoplay, Pagination, Navigation]}
                                        onAutoplayTimeLeft={onAutoplayTimeLeft}
                                        className="mySwiper"
                                    >
                                        <SwiperSlide>
                                            <img className='img-fluid' src="/images/slide2-2.jpg" alt="" />
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <img className='img-fluid' src="/images/slide3-1.jpg" alt="" />
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <img className='img-fluid' src="/images/slide4.jpg" alt="" />
                                        </SwiperSlide>
                                        <div className={`${styles.autoplay_progress}`} slot="container-end">
                                            <svg viewBox="0 0 48 48" ref={progressCircle}>
                                                <circle cx="24" cy="24" r="20"></circle>
                                            </svg>
                                            <span ref={progressContent}></span>
                                        </div>
                                    </Swiper>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainSlider