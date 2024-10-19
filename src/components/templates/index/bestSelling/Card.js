import React from 'react'
import styles from './Card.module.css'
function Card() {
    return (
        <div className={`${styles.swiper_slide}`}>
            <div className={`${styles.product_box}`}>
                <div className={`${styles.product_timer}`}>
                    <div className={`${styles.timer_label}`}>
                        <span>40% تخفیف</span>
                    </div>
                    <div className={`${styles.product_header_btn} d-flex`}>
                        <a href="" className="" data-bs-toggle="tooltip" data-bs-placement="top"
                            data-bs-title="مقایسه"><i className="bi bi-shuffle"></i></a>
                        <a href="" className="" data-bs-toggle="tooltip" data-bs-placement="top"
                            data-bs-title="افزودن به علاقه مندی ها"><i className="bi bi-heart"></i></a>
                        <a href="" className="" data-bs-toggle="tooltip" data-bs-placement="top"
                            data-bs-title="مشاهده سریع"><i className="bi bi-eye"></i></a>
                    </div>
                </div>
                <div className={`${styles.product_image}`}>
                    <img src="/images/product/watch1.jpg" loading="lazy" alt=""
                        className={`img-fluid ${styles.one_image}`} />
                    <img src="/images/product/watch2.jpg" loading="lazy" alt=""
                        className={`img-fluid ${styles.two_image}`} />
                </div>
                <div className={`${styles.product_title}`}>
                    <div className={`${styles.title}`}>
                        <p className="text-overflow-1">ساعت هوشمند شیائومی</p>
                        <span className="text-muted text-overflow-1">Mibro Lite XPAW004
                            Smartwatch</span>
                    </div>
                    <div className={`${styles.rating}`}>
                        <div className="number"><span className="text-muted font-12">(15+) 4.8</span></div>
                        <div className={`${styles.icon}`}><i className="bi bi-star-fill"></i></div>
                    </div>
                </div>
                <div className={`${styles.product_action}`}>
                    <div className={`${styles.price}`}>
                        <p className={`${styles.new_price}`}>3,175,000 تومان</p>
                        <p className={`${styles.old_price}`}>6,500,000 تومان</p>
                    </div>
                    <div className="link">
                        <a href="" className="btn border-0 rounded-3 main-color-one-bg">
                            <i className="bi bi-basket text-white"></i>
                            <span className="text-white">خرید محصول</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card