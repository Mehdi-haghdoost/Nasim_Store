"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './PaymentConfirmation.module.css'; // فرض کنم این فایل وجود داره

const PaymentConfirmation = () => {
    const [latestOrder, setLatestOrder] = useState(null);

    useEffect(() => {
        // گرفتن آخرین سفارش از localStorage
        const orderHistory = JSON.parse(localStorage.getItem('order_history') || '[]');
        if (orderHistory.length > 0) {
            // آخرین سفارش (جدیدترین) رو بگیر
            const latest = orderHistory[orderHistory.length - 1];
            setLatestOrder(latest);
        }
    }, []);

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow">
                        <div className="card-body text-center p-5">
                            {/* آیکون موفقیت */}
                            <div className="mb-4">
                                <i className="bi bi-check-circle-fill text-success" style={{fontSize: '4rem'}}></i>
                            </div>
                            
                            {/* پیام موفقیت */}
                            <h2 className="text-success mb-3">پرداخت موفقیت‌آمیز بود!</h2>
                            <p className="text-muted mb-4">
                                سفارش شما با موفقیت ثبت شد و در حال پردازش است.
                            </p>

                            {/* اطلاعات سفارش */}
                            {latestOrder && (
                                <div className="alert alert-info mb-4">
                                    <h6 className="mb-2">شماره سفارش: {latestOrder.orderNumber}</h6>
                                    <p className="mb-1">تاریخ سفارش: {latestOrder.orderDate}</p>
                                    {latestOrder.transactionCode && (
                                        <p className="mb-0">کد پیگیری: {latestOrder.transactionCode}</p>
                                    )}
                                </div>
                            )}

                            {/* دکمه‌های عملیات */}
                            <div className="d-flex flex-wrap justify-content-center gap-2">
                                <Link href={"/p-user/orders"}
                                 className='btn d-inline-block btn-outline-success mx-2 mb-2'>
                                    مشاهده سفارشات من
                                </Link>
                                
                                {latestOrder && (
                                    <Link 
                                        href={`/p-user/orders/${latestOrder.orderNumber}/invoice`} 
                                        className='btn d-inline-block btn-outline-success mx-2 mb-2'
                                    >
                                        <i className="bi bi-file-earmark-text me-2"></i>
                                        مشاهده فاکتور
                                    </Link>
                                )}
                                
                                <Link href={"/"}
                                 className='btn d-inline-block btn-outline-success mx-2 mb-2'>
                                    ادامه خرید
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentConfirmation;