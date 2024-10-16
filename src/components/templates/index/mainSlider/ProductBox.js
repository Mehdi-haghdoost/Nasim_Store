import React from 'react'
import styles from './ProductBox.module.css'
import Countdown from '../../../modules/countDownTimer/Countdown'


function ProductBox() {
    return (
        <div className={`${styles.product_box}`} >
            <div className={`${styles.product_timer}`} >
                <div className={`${styles.timer_label}`} >
                    <span>40% تخفیف</span>
                </div>
                <Countdown />
            </div>
        </div>
    )
}

export default ProductBox