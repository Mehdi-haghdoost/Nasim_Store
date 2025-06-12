"use client";

import React, { useState, useEffect } from 'react';
import styles from './table.module.css';
import Link from 'next/link';
import Pagination from '../../../modules/p-user/pagination/Pagination';
import { useOrder } from '@/Redux/hooks/useOrder';

const Table = () => {
    const { userOrders, loading, error } = useOrder();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // تابع تعیین وضعیت سفارش
    const getOrderStatus = (status) => {
        switch (status) {
            case 'PENDING':
                return {
                    text: 'در انتظار بررسی',
                    className: 'warning-label'
                };
            case 'SHIPPED':
                return {
                    text: 'ارسال شده',
                    className: 'info-label'
                };
            case 'DELIVERED':
                return {
                    text: 'تحویل داده شده',
                    className: 'success-label'
                };
            case 'CANCELLED':
                return {
                    text: 'لغو شده',
                    className: 'danger-label'
                };
            default:
                return {
                    text: 'نامشخص',
                    className: 'secondary-label'
                };
        }
    };

    // تابع تبدیل تاریخ
    const formatDate = (dateString) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('fa-IR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long'
            });
        } catch (error) {
            return 'نامشخص';
        }
    };

    // تابع فرمت قیمت
    const formatPrice = (price) => {
        if (!price || isNaN(price)) return '0';
        return Number(price).toLocaleString('fa-IR');
    };

    if (!isMounted) {
        return null;
    }

    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">در حال بارگذاری...</span>
                </div>
                <p className="mt-3 text-muted">در حال بارگذاری سفارشات...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-5">
                <div className="alert alert-danger">
                    <h5>خطا در بارگذاری سفارشات</h5>
                    <p>{error}</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="btn btn-outline-danger"
                    >
                        تلاش مجدد
                    </button>
                </div>
            </div>
        );
    }

    if (!userOrders || userOrders.length === 0) {
        return (
            <div className="text-center py-5">
                <div className="alert alert-info">
                    <h5>سفارشی یافت نشد</h5>
                    <p>تاکنون هیچ سفارشی ثبت نکرده‌اید.</p>
                    <Link href="/" className="btn btn-primary">
                        شروع خرید
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className={`p-0 ${styles.responsive_table}`}>
            <table className={`main-table rounded-0 ${styles.table}`}>
                <thead className='text-bg-dark bg-opacity-75 text-center'>
                    <tr>
                        <th>#</th>
                        <th>شماره پیگیری</th>
                        <th>تاریخ ثبت سفارش</th>
                        <th>مبلغ پرداختی</th>
                        <th>وضعیت سفارش</th>
                        <th>جزئیات</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {userOrders.map((order, index) => {
                        const status = getOrderStatus(order.status);
                        return (
                            <tr key={order._id}>
                                <td className='font-14'>{index + 1}</td>
                                <td className='font-14'>
                                    <strong>{order.trackingId}</strong>
                                </td>
                                <td className='font-14'>{formatDate(order.orderDate)}</td>
                                <td className='font-14'>
                                    <strong>{formatPrice(order.totalAmount)} تومان</strong>
                                </td>
                                <td className='font-14'>
                                    <span className={`${status.className} rounded-pill px-3 py-1`}>
                                        {status.text}
                                    </span>
                                </td>
                                <td className='font-14'>
                                    <Link 
                                        href={`/p-user/orders/${order._id}/invoice`}
                                        className='btn btn-sm border-0 main-color-one-bg text-white d-inline-flex justify-content-center-2'
                                    >
                                        <span className="ms-1 text-white">مشاهده</span>
                                        <i className='bi bi-chevron-left text-white font-16'></i>
                                    </Link>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <Pagination />
        </div>
    );
};

export default Table;