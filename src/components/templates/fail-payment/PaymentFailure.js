"use client";

import React, { useState, useEffect } from 'react';
import styles from './PaymentFailure.module.css';
import Link from 'next/link';

const PaymentFailure = () => {
    const [failureData, setFailureData] = useState(null);
    const [orderData, setOrderData] = useState(null);

    useEffect(() => {
        // دریافت اطلاعات fail payment از localStorage
        try {
            const failureInfo = localStorage.getItem('payment_failure');
            const lastOrder = localStorage.getItem('last_order_attempt');
            
            if (failureInfo) {
                setFailureData(JSON.parse(failureInfo));
            }
            
            if (lastOrder) {
                setOrderData(JSON.parse(lastOrder));
            }
        } catch (error) {
            console.error('Error reading failure data:', error);
        }
    }, []);

    // تابع فرمت تاریخ
    const formatDate = (dateString) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('fa-IR');
        } catch {
            return new Date().toLocaleDateString('fa-IR');
        }
    };

    // تابع فرمت قیمت
    const formatPrice = (price) => {
        return price ? price.toLocaleString() : '0';
    };

    // تابع دریافت پیام خطا
    const getErrorMessage = (reason) => {
        const errorMessages = {
            'insufficient_funds': 'موجودی کافی نیست',
            'card_declined': 'کارت بانکی رد شده است',
            'network_error': 'خطا در ارتباط با بانک',
            'user_cancelled': 'پرداخت توسط کاربر لغو شد',
            'timeout': 'زمان پرداخت به پایان رسید',
            'system_error': 'خطای سیستم بانکی'
        };
        return errorMessages[reason] || 'خطای نامشخص در پرداخت';
    };

    // تابع تلاش مجدد پرداخت
    const handleRetryPayment = () => {
        // پاک کردن اطلاعات خطا
        localStorage.removeItem('payment_failure');
        
        // اگر orderData موجود باشه، دوباره checkout رو شروع کن
        if (orderData) {
            // بازگرداندن سبد خرید
            localStorage.setItem('cart', JSON.stringify(orderData.items || []));
        }
    };

    return (
        <div className='container-fluid'>
            <div className={`${styles.payment_status} ${styles.fail_pay}`}>
                <div className={styles.icon}>
                    <i className="bi bi-emoji-frown-fill"></i>
                </div>
                <div className={styles.title}>
                    <h3>پرداخت شما ناموفق بود</h3>
                    <p>
                        {failureData?.message || getErrorMessage(failureData?.reason) || 'دوباره تلاش کنید'}
                    </p>
                </div>
                
                <div className={styles.pay_table}>
                    <div className={styles.pay_table_title}>
                        <h5 className="font-18">مشخصات پرداختی</h5>
                    </div>
                    <div className={styles.pay_table_item}>
                        <h6 className="font-16">درگاه پرداختی</h6>
                        <p className="mb-0">
                            {orderData?.paymentMethod === 'DirectBankPayment' ? 'انتقال مستقیم بانکی' : 'بانک ملت'}
                        </p>
                    </div>
                    <div className={styles.pay_table_item}>
                        <h6 className="font-16">تاریخ</h6>
                        <p>{formatDate(failureData?.timestamp)}</p>
                    </div>
                    <div className={styles.pay_table_item}>
                        <h6 className="font-16">کد تراکنش</h6>
                        <p>{failureData?.transactionCode || 'ناموفق'}</p>
                    </div>
                    {orderData?.appliedDiscount && (
                        <div className={styles.pay_table_item}>
                            <h6 className="font-16 text-success">مقدار تخفیف</h6>
                            <p>{formatPrice(orderData.appliedDiscount.amount)} تومان</p>
                        </div>
                    )}
                    <div className={styles.pay_table_item}>
                        <h6 className="font-16">مقدار پرداختی</h6>
                        <p>{formatPrice(failureData?.amount || orderData?.pricing?.finalPrice)} تومان</p>
                    </div>
                </div>

                <div className={styles.pay_table}>
                    <div className={styles.pay_table_title}>
                        <h5 className="font-18">وضعیت سفارش</h5>
                    </div>
                    <div className={styles.pay_table_item}>
                        <h6 className="font-16">شماره سفارش</h6>
                        <p className="mb-0">{failureData?.orderNumber || orderData?.orderNumber || 'نامشخص'}</p>
                    </div>
                    <div className={styles.pay_table_item}>
                        <h6 className="font-16">قیمت کل</h6>
                        <p className="mb-0">{formatPrice(orderData?.pricing?.totalPrice)} تومان</p>
                    </div>
                    <div className={styles.pay_table_item}>
                        <h6 className="font-16">وضعیت پرداخت</h6>
                        <p className="mb-0 text-danger">پرداخت نشده</p>
                    </div>
                    <div className={styles.pay_table_item}>
                        <h6 className="font-16 text-danger">وضعیت سفارش</h6>
                        <p className="mb-0 text-danger">ناموفق</p>
                    </div>
                    {failureData?.reason && (
                        <div className={styles.pay_table_item}>
                            <h6 className="font-16">علت خطا</h6>
                            <p className="mb-0 text-warning">{getErrorMessage(failureData.reason)}</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="text-center my-4">
                <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center align-items-center">
                    <Link 
                        href={'/checkout'}
                        className='btn d-inline-block main-color-three-bg'
                        onClick={handleRetryPayment}
                    >
                        <i className="bi bi-arrow-clockwise me-2"></i>
                        پرداخت مجدد
                    </Link>
                    
                    <Link 
                        href={'/cart'}
                        className='btn btn-outline-secondary d-inline-block'
                    >
                        <i className="bi bi-cart me-2"></i>
                        بازگشت به سبد خرید
                    </Link>
                    
                    <Link 
                        href={'/'}
                        className='btn btn-outline-primary d-inline-block'
                    >
                        <i className="bi bi-house me-2"></i>
                        صفحه اصلی
                    </Link>
                </div>
                
                {/* اطلاعات تماس پشتیبانی */}
                <div className="mt-4 p-3 bg-light rounded">
                    <p className="mb-2">
                        <i className="bi bi-telephone me-2"></i>
                        در صورت تکرار مشکل با پشتیبانی تماس بگیرید: 
                        <strong className="me-2">021-12345678</strong>
                    </p>
                    <small className="text-muted">
                        کد رهگیری: {failureData?.orderNumber || 'نامشخص'}
                    </small>
                </div>
            </div>
        </div>
    );
};

export default PaymentFailure;