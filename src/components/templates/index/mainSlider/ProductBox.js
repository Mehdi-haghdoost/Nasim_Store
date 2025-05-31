import React from 'react'
import styles from './ProductBox.module.css'
import Countdown from '../../../modules/countDownTimer/Countdown'

function ProductBox({ productData }) {
    // اگر محصول وجود ندارد، اطلاعات پیش‌فرض نمایش بده
    if (!productData) {
        return (
            <div className={`${styles.product_box}`}>
                <div className={`${styles.product_timer}`}>
                    <div className={`${styles.timer_label}`}>
                        <span>بارگذاری...</span>
                    </div>
                    <Countdown />
                </div>
            </div>
        );
    }

    // محاسبه درصد تخفیف
    let discountPercentage = 0;
    if (productData.hasDiscount && productData.price && productData.discountedPrice) {
        discountPercentage = Math.round(((productData.price - productData.discountedPrice) / productData.price) * 100);
    } else if (productData.discountPercentage) {
        discountPercentage = productData.discountPercentage;
    }

    return (
        <div className={`${styles.product_box}`}>
            <div className={`${styles.product_timer}`}>
                <div className={`${styles.timer_label}`}>
                    <span>
                        {productData.hasDiscount && discountPercentage > 0 
                            ? `${discountPercentage}% تخفیف`
                            : 'محصول ویژه'
                        }
                    </span>
                </div>
                <Countdown />
            </div>
        </div>
    )
}

export default ProductBox