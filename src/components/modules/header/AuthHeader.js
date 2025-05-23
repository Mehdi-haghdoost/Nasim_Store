"use client";

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import styles from './AuthHeader.module.css';

function AuthHeader({ showBascket }) {
    const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
    const { totalQuantity: reduxTotalQuantity } = useSelector((state) => state.cart);
    
    const [cartCount, setCartCount] = useState(0);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        
        const updateCartCount = () => {
            try {
                // اول از Redux بخون
                if (reduxTotalQuantity && reduxTotalQuantity > 0) {
                    setCartCount(reduxTotalQuantity);
                    return;
                }

                // اگه Redux خالی بود، از localStorage بخون
                const cartData = localStorage.getItem('nassim_store_cart');
                if (cartData) {
                    const cart = JSON.parse(cartData);
                    if (cart && cart.items && Array.isArray(cart.items)) {
                        const total = cart.items.reduce((sum, item) => {
                            return sum + (item.quantity || 0);
                        }, 0);
                        setCartCount(total);
                    }
                } else {
                    setCartCount(0);
                }
            } catch (error) {
                console.error('Error reading cart:', error);
                setCartCount(0);
            }
        };

        updateCartCount();

        // Listen for localStorage changes (بین تب‌ها)
        const handleStorageChange = (e) => {
            if (e.key === 'nassim_store_cart') {
                updateCartCount();
            }
        };

        const handleCartUpdate = () => {
            setTimeout(updateCartCount, 100); 
        };


        const handleReduxChange = () => {
            updateCartCount();
        };

        // Event listeners
        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('cartUpdated', handleCartUpdate);
        window.addEventListener('cartChanged', handleCartUpdate);
        window.addEventListener('cartItemAdded', handleCartUpdate);
        window.addEventListener('cartItemRemoved', handleCartUpdate);
        window.addEventListener('cartItemUpdated', handleCartUpdate);
        
        // Periodic check (fallback)
        const interval = setInterval(updateCartCount, 2000);
        
        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('cartUpdated', handleCartUpdate);
            window.removeEventListener('cartChanged', handleCartUpdate);
            window.removeEventListener('cartItemAdded', handleCartUpdate);
            window.removeEventListener('cartItemRemoved', handleCartUpdate);
            window.removeEventListener('cartItemUpdated', handleCartUpdate);
            clearInterval(interval);
        };
    }, [reduxTotalQuantity]);

    // Use Redux value if available, otherwise use localStorage value
    const displayCount = reduxTotalQuantity > 0 ? reduxTotalQuantity : cartCount;

    if (!isMounted) {
        // در حالت SSR badge رو نشون نده
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
                        {displayCount > 0 && (
                            <span 
                                className={`main-color-one-bg me-1 ${styles.header_counter} rounded-pill`}
                            >
                                {displayCount}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthHeader;