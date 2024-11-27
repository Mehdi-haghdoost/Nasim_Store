import React from 'react'
import styles from './Pagination.module.css';

const Pagination = () => {
    return (
        <div className={`mt-5 ${styles.my_paginate}`}>
            <nav>
                <ul className='pagination flex-wrap justify-content-center'>
                    <li className={`${styles.page_item} ${styles.disabled}`}>
                        <a href="" className={`rounded-3 ${styles.page_link}`}>قبلی</a>
                    </li>

                    <li className={styles.page_item}>
                        <a href="" className={`rounded-3 ${styles.page_link}`}>1</a>
                    </li>

                    <li className={styles.page_item}>
                        <a href="" className={`rounded-3 ${styles.page_link}`}>2</a>
                    </li>

                    <li className={`${styles.page_item} ${styles.active}`}>
                        <a href="" className={`rounded-3 ${styles.page_link}`}>3</a>
                    </li>

                    <li className={styles.page_item}>
                        <a href="" className={`rounded-3 ${styles.page_link}`}>...</a>
                    </li>
                    <li className={styles.page_item}>
                        <a href="" className={`rounded-3 ${styles.page_link}`}>14</a>
                    </li>
                    <li className={styles.page_item}>
                        <a href="" className={`rounded-3 ${styles.page_link}`}>15</a>
                    </li>
                    <li className={styles.page_item}>
                        <a href="" className={`rounded-3 ${styles.page_link}`}>16</a>
                    </li>
                    <li className={styles.page_item}>
                        <a href="" className={`rounded-3 ${styles.page_link}`}>بعدی</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Pagination