"use client";

import React, { useState } from 'react'
import styles from './CategorySort.module.css';
import { ImSortAmountDesc } from "react-icons/im";

const CategorySort = () => {
    const [clicked, setClicked] = useState(false);
    const handleClick = () => {
        setClicked(true);
    }
    return (
        <div className={`mb-3 ${styles.category_sort}`}>
            <div className="content-box">
                <div className="container-fluid">
                    <div className="d-flex align-items-center flex-wrap">
                        <div className='d-flex align-items-center'>
                            <ImSortAmountDesc />
                            <span className={styles.storing}>مرتب سازی:</span>
                        </div>
                        <div className={`${styles.form_checks} me-0 mt-md-0 mt-3 d-flex`}>
                            <div className="d-flex flex-row align-items-center flex-grow-1 gap-1 me-5">
                                <input type="radio" name="spanColor" id="span1" className={styles.radio} />
                                <label htmlFor="span1" className={styles.spanItem}> پیشفرض</label>

                                <input type="radio" name="spanColor" id="span2" className={styles.radio} />
                                <label htmlFor="span2" className={styles.spanItem}> محبوب‌ترین</label>

                                <input type="radio" name="spanColor" id="span3" className={styles.radio} />
                                <label htmlFor="span3" className={styles.spanItem}> پرفروش‌ترین‌</label>

                                <input type="radio" name="spanColor" id="span4" className={styles.radio} />
                                <label htmlFor="span4" className={styles.spanItem}> جدیدترین</label>

                                <input type="radio" name="spanColor" id="span5" className={styles.radio} />
                                <label htmlFor="span5" className={styles.spanItem}> ارزان‌ترین</label>

                                <input type="radio" name="spanColor" id="span6" className={styles.radio} />
                                <label htmlFor="span6" className={styles.spanItem}> گران‌ترین</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategorySort