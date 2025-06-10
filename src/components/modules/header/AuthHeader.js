"use client";

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import styles from './AuthHeader.module.css';
import { useCart } from '@/Redux/hooks/useCart';

function AuthHeader({ showBascket }) {
    const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
    
    // استفاده از useCart hook برای دریافت تعداد محصولات
    const { totalQuantity, isReady, isHydrated } = useCart();
    
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Debug log برای AuthHeader
    useEffect(() => {
        if (isMounted) {
            console.log('🏠 AuthHeader Debug:', {
                isAuthenticated,
                cartItems: totalQuantity,
                totalQuantity: totalQuantity,
                cartReady: isReady,
                isHydrated: isHydrated,
                user: user?.username || 'No user'
            });
        }
    }, [isMounted, isAuthenticated, totalQuantity, isReady, isHydrated, user?.username]);

    // اگر هنوز mount نشده، نمایش ساده بدون badge
    if (!isMounted || !isHydrated) {
        return (
            <div className="col-lg-4 order-lg-3 d-lg-block d-none" style={{ minHeight: '50px' }}>
                <div className="d-flex align-items-center justify-content-end">
                    {loading ? (
                        <span className="text-muted">در حال بارگذاری...</span>
                    ) : isAuthenticated && user ? (
                        <div className={`btn-group rounded-pill shadow-sm ${styles.header_btn_group}`}>
                            <Link href="/p-user" className={`${styles.header_user_name} btn btn-white border-0 rounded-pill`}>
                                <i className="bi bi-person-circle font-20 text-muted ms-2"></i>
                                {user.username || user.firstName || 'کاربر'}
                            </Link>
                        </div>
                    ) : (
                        <div className={`btn-group rounded-pill shadow-sm ${styles.header_btn_group}`}>
                            <Link href="/login-register" className={`${styles.header_register} btn btn-white border-0 rounded-pill`}>
                                <i className="bi bi-person-circle font-20 text-muted ms-2"></i>
                                <span>ثبت‌نام / ورود</span>
                            </Link>
                        </div>
                    )}
                    
                    <div className={`${styles.header_whishlist} shadow-sm`}>
                        <Link href="/p-user/wishlists" title="محصولات مورد علاقه">
                            <i className="bi bi-bookmark-check font-20 text-muted"></i>
                        </Link>
                    </div>
                    
                    <div
                        onClick={showBascket}
                        className={`${styles.header_cart} ms-1 shadow-sm rounded-pill`}
                        style={{ cursor: 'pointer', position: 'relative' }}
                    >
                        <div className="d-flex align-items-center p-2">
                            <i className="bi bi-shop font-20 text-muted me-1"></i>
                            {/* نمایش spinner کوچک در حالت loading */}
                            <div className="spinner-border spinner-border-sm text-muted ms-1" role="status" style={{ width: '12px', height: '12px' }}>
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="col-lg-4 order-lg-3 d-lg-block d-none" style={{ minHeight: '50px' }}>
            <div className="d-flex align-items-center justify-content-end">
                {loading ? (
                    <span className="text-muted">در حال بارگذاری...</span>
                ) : isAuthenticated && user ? (
                    <div className={`btn-group rounded-pill shadow-sm ${styles.header_btn_group}`}>
                        <Link href="/p-user" className={`${styles.header_user_name} btn btn-white border-0 rounded-pill`}>
                            <i className="bi bi-person-circle font-20 text-muted ms-2"></i>
                            {user.username || user.firstName || 'کاربر'}
                        </Link>
                    </div>
                ) : (
                    <div className={`btn-group rounded-pill shadow-sm ${styles.header_btn_group}`}>
                        <Link href="/login-register" className={`${styles.header_register} btn btn-white border-0 rounded-pill`}>
                            <i className="bi bi-person-circle font-20 text-muted ms-2"></i>
                            <span>ثبت‌نام / ورود</span>
                        </Link>
                    </div>
                )}
                
                {/* لینک علاقه‌مندی‌ها */}
                <div className={`${styles.header_whishlist} shadow-sm`}>
                    <Link href="/p-user/wishlists" title="محصولات مورد علاقه">
                        <i className="bi bi-bookmark-check font-20 text-muted"></i>
                    </Link>
                </div>
                
                {/* سبد خرید */}
                <div
                    onClick={showBascket}
                    className={`${styles.header_cart} ms-1 shadow-sm rounded-pill`}
                    style={{ cursor: 'pointer', position: 'relative' }}
                >
                    <div className="d-flex align-items-center p-2">
                        <i className="bi bi-shop font-20 text-muted me-1"></i>
                        {/* نمایش badge تنها زمانی که محصول در سبد باشد */}
                        {totalQuantity > 0 && (
                            <span 
                                className={`main-color-one-bg me-1 ${styles.header_counter} rounded-pill`}
                                style={{
                                    minWidth: '20px',
                                    height: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '12px',
                                    fontWeight: 'bold',
                                    color: 'white',
                                    padding: '2px 6px'
                                }}
                            >
                                {totalQuantity}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthHeader;