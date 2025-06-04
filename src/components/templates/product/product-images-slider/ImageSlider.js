"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination"
import { FreeMode, Navigation, Thumbs, Pagination } from "swiper/modules";

import styles from '../ImageSlider.module.css'
import { useState } from "react";

const Gallery = ({ images = [] }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    
    // اگر تصاویر ارسال نشده، از تصاویر پیش‌فرض استفاده کن
    const displayImages = images.length > 0 ? images : ['/images/product/product-placeholder.jpg'];

    return (
        <section style={{ width: "100%" }}>
            <Swiper
                style={{
                    "--swiper-navigation-color": "#fff",
                    "--swiper-pagination-color": "#fff",
                }}
                spaceBetween={0}
                rewind={true}
                slidesPerView={1}
                breakpoints={{
                    1200: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                    },
                }}
                loop={displayImages.length > 1}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                }}
                thumbs={{ swiper: thumbsSwiper }}
                pagination={{
                    clickable: true,
                    bulletClass: `swiper-pagination-bullet ${styles.customBullet}`,
                    bulletActiveClass: `swiper-pagination-bullet-active ${styles.customBulletActive}`,
                }}
                modules={[FreeMode, Navigation, Thumbs, Pagination]}
                className="mySwiper2 gallery-slider"
            >
                {displayImages.map((img, index) => (
                    <SwiperSlide key={index} className={styles.swiper_slide}>
                        <div className={styles.swiper_zoom_container}>
                            <img 
                                alt={`تصویر محصول ${index + 1}`} 
                                className="img-fluid" 
                                src={img}
                                onError={(e) => {
                                    e.target.src = '/images/product/product-placeholder.jpg';
                                }}
                            />
                        </div>
                    </SwiperSlide>
                ))}
                {/* نمایش navigation فقط اگر بیش از یک تصویر داشته باشیم */}
                {displayImages.length > 1 && (
                    <>
                        <div className={`${styles.swiper_button_next} swiper-button-next`}></div>
                        <div className={`${styles.swiper_button_prev} swiper-button-prev`}></div>
                    </>
                )}
            </Swiper>

            {/* همیشه thumbnail swiper نمایش داده شود */}
            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="gallery-slider-2"
            >
                {displayImages.map((img, index) => (
                    <SwiperSlide key={index} className={styles.product_gallery_thumb}>
                        <img 
                            alt={`تصویر کوچک ${index + 1}`} 
                            className="img-fluid" 
                            src={img}
                            onError={(e) => {
                                e.target.src = '/images/product/product-placeholder.jpg';
                            }}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default Gallery;