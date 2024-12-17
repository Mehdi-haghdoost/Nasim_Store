import React from 'react'
import styles from './LineStep.module.css';
import Link from 'next/link';


const LineStep = () => {
    return (
        <div className='container-fluid'>
            <div className={`d-sm-block d-none ${styles.line_step_container}`}>
                <div className={styles.line_step}>
                    <div className={styles.line_step_boxs}>
                        <div className={`${styles.line_step_box} ${styles.complete}`}>
                            <Link href={'/cart'}>
                                <p>سبد خرید</p>
                                <div className={styles.icon}>
                                    1
                                </div>
                            </Link>
                        </div>
                        <div className={`${styles.line_step_box} ${styles.complete}`}>
                            <Link href={'/checkout'}>
                                <p>جزئیات پرداخت</p>
                                <div className={styles.icon}>
                                    2
                                </div>
                            </Link>
                        </div>
                        <div className={`${styles.line_step_box} ${styles.disabled}`}>
                            <Link href={'/cart'}>
                                <p>تکمیل سفارش</p>
                                <div className={styles.icon}>
                                    3
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LineStep