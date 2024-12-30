import React from 'react'
import styles from './ProductBox.module.css';

const ProductBox = () => {
    return (
        <div className='col-lg-4'>
            <div className={styles.product_box}>
                <div className={styles.product_timer}>
                    <div className={styles.timer_label}>
                        <span>40% تخفیف</span>
                    </div>
                    <div className={styles.product_header_btn}>
                        <div className={styles.tooltip}>
                            <a href="#" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="ویرایش آدرس">
                                <i class="bi bi-shuffle"></i>
                            </a>
                            <span className={styles.tooltipText}>مقایسه</span>
                        </div>
                        <div className={styles.tooltip}>
                            <a href="#" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="ویرایش آدرس">
                                <i class="bi bi-heart"></i>
                            </a>
                            <span className={styles.tooltipText}>افزودن به علاقه مندی ها</span>
                        </div>
                        <div className={styles.tooltip}>
                            <a href="#" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="ویرایش آدرس">
                                <i class="bi bi-eye"></i>
                            </a>
                            <span className={styles.tooltipText}>مشاهده سریع</span>
                        </div>
                    </div>
                </div>
                <div className={styles.product_image}>
                    <img src="/images/product/watch1.jpg" loading='lazy' alt="" className={`img-fluid ${styles.one_image}`} />
                    {/* <img src="/images/product/watch2.jpg" loading='lazy' alt="" className={`img-fluid ${styles.two_image}`} /> */}
                </div>
                <div className={styles.product_title}>
                    <div className={styles.title}>
                        <p className="text-overflow-1">ساعت هوشمند شیائومی</p>
                        <span className="text-muted text-overflow-1">
                            Mibro Lite XPAW004 Smartwatch
                        </span>
                    </div>
                    <div className={styles.rating}>
                        <div className={styles.number}>
                            <span className="text-muted font-12">
                                (15+) 4.8
                            </span>
                        </div>
                        <div className={styles.icon}>
                            <i className="bi bi-star-fill"></i>
                        </div>
                    </div>
                </div>
                <div className={styles.product_action}>
                    <div className={styles.price}>
                        <p className={styles.new_price}>3,175,000 تومان</p>
                        <p className={styles.old_price}>6,500,000 تومان</p>
                    </div>
                    <div className={styles.link}>
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

export default ProductBox