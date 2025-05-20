"use client";

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import styles from './AuthHeader.module.css';

function AuthHeader({ showBascket }) {
    const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

    return (
        <div className="col-lg-4 order-lg-3 d-lg-block d-none" style={{ minHeight: '50px' }}>
            <div className="d-flex align-items-center justify-content-end">
                {loading ? (
                    <span className="text-muted">در حال بارگذاری...</span>
                ) : isAuthenticated && user ? (
                    <div className={`btn-group rounded-pill shadow-sm ${styles.header_btn_group}`}>
                        <Link href="/p-user" className={`${styles.header_user_name} btn btn-white border-0 rounded-pill`}>
                            <i className="bi bi-person-circle font-20 text-muted ms-2"></i>
                            {user.username || 'کاربر'}
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
                    <Link href="/wishlist">
                        <i className="bi bi-bookmark-check font-20 text-muted"></i>
                    </Link>
                </div>
                <div
                    onClick={showBascket}
                    className={`${styles.header_cart} ms-1 shadow-sm rounded-pill`}
                >
                    <Link href="">
                        <i className="bi bi-shop font-20 text-muted me-1"></i>
                        <span className={`main-color-one-bg ${styles.header_counter} rounded-pill`}>
                            {user?.cart?.length || 0}
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default AuthHeader;