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
                            <a href="#"  data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="ویرایش آدرس">
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
            </div>
        </div>
    )
}

export default ProductBox