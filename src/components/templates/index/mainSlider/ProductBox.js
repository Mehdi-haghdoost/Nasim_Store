import React from 'react'
import styles from './ProductBox.module.css'
import Countdown from './Countdown'
import { useState, useEffect } from 'react';

function ProductBox() {

    const [filledProgress, setFilledProgress] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setFilledProgress(prev =>
                (prev < 100 ? prev + 1 : 0)
            )
        }, 60);

        return () => clearInterval(interval)
    }, [])

    return (
        <div className={`${styles.product_box}`} >
            <div className={`${styles.product_timer}`} >
                <div className={`${styles.timer_label}`} >
                    <span>40% تخفیف</span>
                </div>
                <Countdown />
            </div>
            <div className={`${styles.progress}`}>
                <div className={`${styles.swiper_progress_bar}`}>
                    <div style={{
                        height: '100%',
                        textAlign: 'left',
                        width: `${filledProgress}%`,
                        backgroundColor: "#ef394e",
                        transition: "width 0.5s",

                    }} >
                        <span className={`${styles.progress_bar_percent}`}></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductBox