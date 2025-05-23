"use client";

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './MobileFooter.module.css';
import Link from 'next/link';
import ShoppingCart from '@/components/modules/CartOffcanvas/ShoppingCart';

const MobileFooter = () => {
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const [isShowBascket, setIsShowBascket] = useState(false);

    const showBascket = () => {
        setIsShowBascket(prev => !prev);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            <div className={`d-flex d-lg-none ${styles.mobile_footer}`}>
                <div className={styles.parent}>
                    <div className={styles.item} onClick={scrollToTop} style={{ cursor: 'pointer' }}>
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
                            <i className="bi bi-bag font-20"></i>
                        </a>
                    </div>
                    <div className={styles.item}>
                        <Link href="/categories">
                            <i className="bi bi-grid-3x3-gap"></i>
                        </Link>
                    </div>
                    <div className={styles.item}>
                        {isAuthenticated && user ? (
                            <Link href="/p-user" title="پنل کاربری">
                                <i className="bi bi-person font-20"></i>
                            </Link>
                        ) : (
                            <Link href="/login-register" title="ورود / ثبت‌نام">
                                <i className="bi bi-person font-20"></i>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
            {isShowBascket && (
                <ShoppingCart isShowBascket={isShowBascket} showBascket={showBascket} />
            )}
        </>
    );
};

export default MobileFooter;