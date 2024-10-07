import React from 'react'
import styles from './Countdown.module.css'
import { useEffect, useState } from 'react';
function Countdown() {



    return (
        <>
            <div className={`${styles.timer}`} >
                <div className={`${styles.countdown}`} >
                    <div className={`${styles.countdown_container} seconds`}>
                        <span className={`${styles.countdown_value} seconds-bottom`}>0</span>
                        <span className={`${styles.countdown_heading} seconds-top`}>ثانیه</span>
                    </div>

                    <div className={`${styles.countdown_container} minutes`}>
                        <span className={`${styles.countdown_value} minutes-bottom`}>0</span>
                        <span className={`${styles.countdown_heading} minutes-top`}>دقیقه</span>
                    </div>

                    <div className={`${styles.countdown_container} hours`}>
                        <span className={`${styles.countdown_value} hours-bottom`}>0</span>
                        <span className={`${styles.countdown_heading} hours-top`}>ساعت</span>
                    </div>


                    <div className={`${styles.countdown_container} days`}>
                        <span className={`${styles.countdown_value} days-bottom`}>0</span>
                        <span className={`${styles.countdown_heading} days-top`}>روز</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Countdown