import React from 'react'
import styles from './Box.module.css';
import Link from 'next/link';

const Box = () => {
    return (
        <div className="row g-3">
            <div className="col-md-3 col-md-6">
                <Link href={"/"}>
                    <div className={`${styles.panel_seller_item} d-flex align-items-center`}>
                        <div className={styles.panel_seller_icon}>
                            <i className="bi bi-bag-check"></i>
                        </div>
                        <div className={`d-flex flex-column ${styles.panel_seller_title}`}>
                            <h6 className="font-14">سفارشات تکمیل شده</h6>
                            <h5 className="title-font h3"></h5>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Box