"use client";

import React, { useState, useEffect } from 'react';
import styles from './table.module.css';
import Link from 'next/link';
import Pagination from '../../../modules/p-user/pagination/Pagination';

const Table = () => {
    const [orders, setOrders] = useState([]);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        
        // بارگذاری سفارشات از localStorage
        const loadOrders = () => {
            try {
                const orderHistory = localStorage.getItem('order_history');
                if (orderHistory) {
                    const parsedOrders = JSON.parse(orderHistory);
                    // مرتب‌سازی بر اساس تاریخ (جدیدترین اول)
                    const sortedOrders = parsedOrders.sort((a, b) => 
                        new Date(b.createdAt) - new Date(a.createdAt)
                    );
                    setOrders(sortedOrders);
                }
            } catch (error) {
                console.error('Error loading orders:', error);
            }
        };

        loadOrders();
    }, []);

    // تابع تعیین وضعیت سفارش
    const getOrderStatus = (order) => {
        if (order.status === 'completed') {
            return {
                text: 'سفارش در حال ارسال',
                className: 'success-label'
            };
        } else if (order.status === 'cancelled') {
            return {
                text: 'لغو شده',
                className: 'danger-label'
            };
        } else if (order.status === 'delivered') {
            return {
                text: 'تحویل شده',
                className: 'success-label'
            };
        } else {
            return {
                text: 'در انتظار بررسی',
                className: 'warning-label'
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

    if (!isMounted) {
        return null;
    }

    if (orders.length === 0) {
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
                        <th>شماره سفارش</th>
                        <th>تاریخ ثبت سفارش</th>
                        <th>مبلغ پرداختی</th>
                        <th>وضعیت سفارش</th>
                        <th>جزئیات</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {orders.map((order, index) => {
                        const status = getOrderStatus(order);
                        return (
                            <tr key={order.orderNumber || index}>
                                <td className='font-14'>{index + 1}</td>
                                <td className='font-14'>{order.orderNumber || 'نامشخص'}</td>
                                <td className='font-14'>{formatDate(order.createdAt)}</td>
                                <td className='font-14'>
                                    {order.pricing?.finalPrice?.toLocaleString() || '0'} تومان
                                </td>
                                <td className='font-14'>
                                    <span className={`${status.className} rounded-pill`}>
                                        {status.text}
                                    </span>
                                </td>
                                <td className='font-14'>
                                    <Link 
                                        href={`/p-user/order-detail/${order.orderNumber || index}`}
                                        className='btn btn-sm border-0 main-color-one-bg'
                                    >
                                        مشاهده
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