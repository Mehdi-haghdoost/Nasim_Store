"use client";

import React from 'react'
import styles from './Countdown.module.css'
import { useEffect, useState, useRef } from 'react';

function Countdown({ endDate = 'Oct 30, 2025 00:00:00' }) {
    const [timerDays, setTimerDays] = useState('00')
    const [timerHours, setTimerHours] = useState('00')
    const [timerMinutes, setTimerMinutes] = useState('00')
    const [timerSeconds, setTimerSeconds] = useState('00');

    let interval = useRef();

    const startTimer = () => {
        const countdownDate = new Date(endDate).getTime();
        
        interval.current = setInterval(() => {
            const now = new Date().getTime()
            const distance = countdownDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24))
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
            const seconds = Math.floor((distance % (1000 * 60)) / 1000)

            if (distance < 0) {
                // stop our timer
                clearInterval(interval.current)
                setTimerDays('00')
                setTimerHours('00')
                setTimerMinutes('00')
                setTimerSeconds('00')
            } else {
                // update timer
                setTimerDays(days.toString().padStart(2, '0'))
                setTimerHours(hours.toString().padStart(2, '0'))
                setTimerMinutes(minutes.toString().padStart(2, '0'))
                setTimerSeconds(seconds.toString().padStart(2, '0'))
            }

        }, 1000);
    }

    // componentDidMount
    useEffect(() => {
        startTimer();
        
        // cleanup function
        return () => {
            if (interval.current) {
                clearInterval(interval.current)
            }
        }
    }, [endDate]); // dependency array اضافه شد

    return (
        <>
            <div className={`${styles.timer}`}>
                <div className={`${styles.countdown}`}>
                    <div className={`${styles.countdown_container} seconds`}>
                        <span className={`${styles.countdown_value} seconds-bottom`}>{timerSeconds}</span>
                        <span className={`${styles.countdown_heading} seconds-top`}>ثانیه</span>
                    </div>

                    <div className={`${styles.countdown_container} minutes`}>
                        <span className={`${styles.countdown_value} minutes-bottom`}>{timerMinutes}</span>
                        <span className={`${styles.countdown_heading} minutes-top`}>دقیقه</span>
                    </div>

                    <div className={`${styles.countdown_container} hours`}>
                        <span className={`${styles.countdown_value} hours-bottom`}>{timerHours}</span>
                        <span className={`${styles.countdown_heading} hours-top`}>ساعت</span>
                    </div>

                    <div className={`${styles.countdown_container} days`}>
                        <span className={`${styles.countdown_value} days-bottom`}>{timerDays}</span>
                        <span className={`${styles.countdown_heading} days-top`}>روز</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Countdown;