"use client"
import React, { useState, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/swiper-bundle.css'

import styles from './MainSlider.module.css'
import { Navigation, Autoplay, Pagination } from 'swiper/modules';

import ProductBox from './ProductBox';
import ProgressBar from './ProgressBar';
import ProductDetail from './ProductDetail';
import Link from 'next/link';

const leftSlides = [
    { id: 1, image: "/images/slide2-2.jpg", href: "/categories" },
    { id: 2, image: "/images/slide3-1.jpg", href: "/categories" },
    { id: 3, image: "/images/slide4.jpg", href: "/categories" },
]

const rightSlides = [
    { id: 1, image: "/images/product/watch1.jpg", href: "/product" },
    { id: 2, image: "/images/product/watch2.jpg", href: "/product" },
    { id: 3, image: "/images/product/watch3.jpg", href: "/product" },
    { id: 4, image: "/images/product/watch4.jpg", href: "/product" },

]

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
                            <div style={{ width: '100%' }} className={`${styles.slide_product_box}`}>
                                <Swiper

                                    loop={true}
                                    rewind={true}
                                    spaceBetween={30}
                                    modules={[Navigation, Autoplay]}
                                    autoplay={{ delay: 6000 }}
                                    onSlideChange={() => setActiveSlide(activeSlide + 1)}
                                    className={`${styles.mySwiper} home-slider`}>
                                    {rightSlides.map((slide) => (
                                        <SwiperSlide key={slide.id}>
                                            <ProductBox />
                                            <ProgressBar key={activeSlide} />
                                            <Link href={`${slide.href}/${slide.id}`} >
                                                <img
                                                    className={`img-fluid ${styles.slider_img}`}
                                                    src={slide.image}
                                                    alt={`Slide ${slide.id}`}
                                                />
                                            </Link>
                                            <ProductDetail />
                                        </SwiperSlide>
                                    ))}
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
                                            bulletClass: `swiper-pagination-bullet ${styles.customBullet}`,
                                            bulletActiveClass: `swiper-pagination-bullet-active ${styles.customBulletActive}`,
                                        }}
                                        modules={[Autoplay, Pagination, Navigation]}
                                        onAutoplayTimeLeft={onAutoplayTimeLeft}
                                        className="mySwiper"
                                    >
                                        {leftSlides.map((slide) => (
                                            <SwiperSlide key={slide.id}>
                                                <Link href={slide.href}>
                                                    <img className='img-fluid' loading="lazy" src={slide.image} alt={`Slide ${slide.id}`} />
                                                </Link>
                                            </SwiperSlide>
                                        ))}

                                        <div className={`${styles.autoplay_progress} d-none d-lg-block`} slot="container-end">
                                            <svg viewBox="0 0 48 48" ref={progressCircle}>
                                                <circle cx="24" cy="24" r="20"></circle>
                                            </svg>
                                            <span style={{ color: '#fff' }} ref={progressContent}></span>
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