import React from 'react'
import styles from './ProductBox.module.css'
import Countdown from './Countdown'
function ProductBox() {
    return (
        <div className={`${styles.product_box}`} >
            <div className={`${styles.product_timer}`} >
                <div className={`${styles.timer_label}`} >
                    <span>40% تخفیف</span>
                </div>
                <Countdown />
            </div>
            <div className={`${styles.swiper_progress_bar}`}>
                <span className={`${styles.slide_progress_bar}`}></span>
            </div>
        </div>
    )
}

export default ProductBox