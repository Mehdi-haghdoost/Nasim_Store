// "use client";

// import React from 'react'
// import styles from './Countdown.module.css'
// import { useEffect, useState, useRef } from 'react';
// function Countdown() {

//     const [timerDays, setTimerDays] = useState('00')
//     const [timerHours, setTimerHours] = useState('00')
//     const [timerMinutes, setTimerMinutes] = useState('00')
//     const [timerSeconds, setTimerSeconds] = useState('00');

//     let interval = useRef();

//     const startTimer = () => {
//         const now = new Date().getTime()
//         const countdownDate = new Date('oct 15, 2024, 00:00:00').getTime();

//         interval = setInterval(() => {
//             const distance = countdownDate - now;

//             const days = Math.floor(distance / (1000 * 60 * 60 * 24))
//             const hours = Math.floor((distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)))
//             const minutes = Math.floor((distance % (1000 * 60 * 60) / (1000 * 60)))
//             const seconds = Math.floor((distance % (1000 * 60)) / 1000)

//             if (distance < 0) {
//                 // stop our timer
//                 clearInterval(interval.current)
//             } else {
//                 // update timer
//                 setTimerDays(days)
//                 setTimerHours(hours)
//                 setTimerMinutes(minutes)
//                 setTimerSeconds(seconds)
//             }

//         }, 1000);
//     }


//     // componentDidMount
//     useEffect(() => {
//         startTimer();
//         return () => {
//             clearInterval(interval.current)
//         }
//     })

//     return (
//         <>
//             <div className={`${styles.timer}`} >
//                 <div className={`${styles.countdown}`} >
//                     <div className={`${styles.countdown_container} seconds`}>
//                         <span className={`${styles.countdown_value} seconds-bottom`}>{timerSeconds}</span>
//                         <span className={`${styles.countdown_heading} seconds-top`}>ثانیه</span>
//                     </div>

//                     <div className={`${styles.countdown_container} minutes`}>
//                         <span className={`${styles.countdown_value} minutes-bottom`}>{timerMinutes}</span>
//                         <span className={`${styles.countdown_heading} minutes-top`}>دقیقه</span>
//                     </div>

//                     <div className={`${styles.countdown_container} hours`}>
//                         <span className={`${styles.countdown_value} hours-bottom`}>{timerHours}</span>
//                         <span className={`${styles.countdown_heading} hours-top`}>ساعت</span>
//                     </div>


//                     <div className={`${styles.countdown_container} days`}>
//                         <span className={`${styles.countdown_value} days-bottom`}>{timerDays}</span>
//                         <span className={`${styles.countdown_heading} days-top`}>روز</span>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Countdown
import React, { useEffect, useState, useRef } from 'react';
import styles from './Countdown.module.css';

function Countdown() {
  const [timerDays, setTimerDays] = useState('00');
  const [timerHours, setTimerHours] = useState('00');
  const [timerMinutes, setTimerMinutes] = useState('00');
  const [timerSeconds, setTimerSeconds] = useState('00');

  const intervalRef = useRef(null);

  const startTimer = () => {
    const now = new Date().getTime();
    const countdownDate = new Date('October 15, 2024, 00:00:00').getTime();

    intervalRef.current = setInterval(() => {
      const distance = countdownDate - now;

      if (distance < 0) {
        clearInterval(intervalRef.current);
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimerDays(days.toString().padStart(2, '0'));
        setTimerHours(hours.toString().padStart(2, '0'));
        setTimerMinutes(minutes.toString().padStart(2, '0'));
        setTimerSeconds(seconds.toString().padStart(2, '0'));
      }
    }, 1000);
  };

  useEffect(() => {
    startTimer();

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className={styles.timer}>
      <div className={styles.countdown}>
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
  );
}

export default Countdown;