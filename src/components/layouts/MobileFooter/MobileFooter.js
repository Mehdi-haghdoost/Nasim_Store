"use client";

import React, { useState } from 'react'
import styles from './MobileFooter.module.css';
import Link from 'next/link';
import ShoppingCart from '@/components/modules/CartOffcanvas/ShoppingCart';

const MobileFooter = () => {
    const [isShowBascket, setIsShowBascket] = useState(false)


    const showBascket = () => {
        setIsShowBascket(prev => !prev)
    }
    return (
        <>
            <div className={`d-flex d-lg-none ${styles.mobile_footer}`}>
                <div className={styles.parent}>
                    <div className={styles.item}>
                        <i className="bi bi-chevron-up font-20"></i>
                    </div>
                    <div className={styles.item}>
                        <Link href={'/'}>
                            <i className="bi bi-house font-20"></i>
                        </Link>
                    </div>
                    <div
                        onClick={showBascket}
                        className={`item ${styles.item_float}`}>
                        <a role="button">
                            <i className="bi bi-bag gont-20"></i>
                        </a>
                    </div>
                    <div className={styles.item}>
                        <Link href={'/'}>
                            <i className="bi bi-archive"></i>
                        </Link>
                    </div>
                    <div className={styles.item}>
                        <Link href={'/login-register'}>
                            <i className="bi bi-person"></i>
                        </Link>
                    </div>
                </div>
            </div>
            {isShowBascket && (
                <ShoppingCart isShowBascket={isShowBascket} showBascket={showBascket} />
            )}
        </>
    )
}

export default MobileFooter