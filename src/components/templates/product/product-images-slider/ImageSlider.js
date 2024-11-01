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

const Gallery = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const images = [
        "/images/product/laptop-1.jpg",
        "/images/product/laptop-2.jpg",
        "/images/product/laptop-3.jpg",
        "/images/product/laptop-4.jpg",
        "/images/product/laptop-5.jpg",
        "/images/product/laptop2.jpg",

    ];

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
                loop={true}
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
                {images.map((img, index) => (
                    <SwiperSlide key={index} className={styles.swiper_slide}>
                        <div className={styles.swiper_zoom_container}>
                            <img alt="" className="img-fluid" src={img} />
                        </div>
                    </SwiperSlide>
                ))}
                <div className={`${styles.swiper_button_next} swiper-button-next`}></div>
                <div className={`${styles.swiper_button_prev} swiper-button-prev`}></div>
            </Swiper>

            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="gallery-slider-2"
            >
                {images.map((img, index) => (
                    <SwiperSlide key={index} className={styles.product_gallery_thumb}>
                        <img alt="" className="img-fluid" src={img} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default Gallery;
