"use client"
import React, { useState, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { useQuery } from '@apollo/client';
import { GET_ALL_PRODUCTS } from '@/graphql/entities/products/product.queries';
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

function MainSlider() {
    const [activeSlide, setActiveSlide] = useState(0)
    
    // دریافت محصولات از GraphQL
    const { data, loading, error } = useQuery(GET_ALL_PRODUCTS);
    const products = data?.products || [];

    // فیلتر محصولاتی که تخفیف دارند برای نمایش در اسلایدر
    const featuredProducts = products.filter(product => product.hasDiscount).slice(0, 4);

    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.current.style.setProperty('--progress', 1 - progress);
        progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };

    // اگر در حال بارگذاری هستیم
    if (loading) {
        return (
            <div className={`${styles.main_slider}`}>
                <div className='container-fluid'>
                    <div className="row">
                        <div className="col-lg-3 order-lg-1 order-2">
                            <div className={`${styles.swiper_slide}`}>
                                <div className="text-center p-4">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">بارگذاری...</span>
                                    </div>
                                    <p className="mt-3">در حال بارگذاری محصولات...</p>
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
        );
    }

    // اگر خطایی رخ داده
    if (error) {
        console.error('خطا در دریافت محصولات:', error);
    }

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
                                    onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
                                    className={`${styles.mySwiper} home-slider`}>
                                    
                                    {featuredProducts.length > 0 ? (
                                        featuredProducts.map((product, index) => (
                                            <SwiperSlide key={product._id || index}>
                                                <ProductBox productData={product} />
                                                <ProgressBar key={activeSlide} />
                                                <Link href={`/product/${product._id}`}>
                                                    <img
                                                        className={`img-fluid ${styles.slider_img}`}
                                                        src={product.image ? `/images/product/${product.image}` : '/images/product/product-image1.jpg'}
                                                        alt={product.title || `محصول ${index + 1}`}
                                                    />
                                                </Link>
                                                <ProductDetail productData={product} />
                                            </SwiperSlide>
                                        ))
                                    ) : (
                                        // اگر محصولی با تخفیف نداشتیم، محصولات عادی نشان بده
                                        products.slice(0, 4).map((product, index) => (
                                            <SwiperSlide key={product._id || index}>
                                                <ProductBox productData={product} />
                                                <ProgressBar key={activeSlide} />
                                                <Link href={`/product/${product._id}`}>
                                                    <img
                                                        className={`img-fluid ${styles.slider_img}`}
                                                        src={product.image ? `/images/product/${product.image}` : '/images/product/product-image1.jpg'}
                                                        alt={product.title || `محصول ${index + 1}`}
                                                    />
                                                </Link>
                                                <ProductDetail productData={product} />
                                            </SwiperSlide>
                                        ))
                                    )}
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