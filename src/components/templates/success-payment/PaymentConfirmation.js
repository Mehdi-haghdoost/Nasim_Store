"use client";

import React, { useState, useEffect } from 'react';
import styles from './PaymentConfirmation.module.css';
import Link from 'next/link';
import { useCart } from '@/Redux/hooks/useCart';
import { useRouter } from 'next/navigation';
import { showSwal } from '@/utils/helpers';

const PaymentConfirmation = () => {
    const router = useRouter();
    const { clearCart } = useCart();
    
    // State برای هیدریشن
    const [isMounted, setIsMounted] = useState(false);
    const [orderData, setOrderData] = useState(null);
    const [orderNumber, setOrderNumber] = useState('');
    const [transactionCode, setTransactionCode] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [hasValidOrder, setHasValidOrder] = useState(false); // اضافه شده

    useEffect(() => {
        setIsMounted(true);
        
        // تابع بررسی و بارگذاری داده‌ها
        const loadOrderData = () => {
            // اول سعی کن order_details رو پیدا کنی (سفارش جدید)
            const savedOrderData = localStorage.getItem('order_details');
            
            if (savedOrderData) {
                try {
                    const parsedData = JSON.parse(savedOrderData);
                    setOrderData(parsedData);
                    setHasValidOrder(true);
                    
                    // تولید شماره سفارش و کد تراکنش منحصر به فرد
                    const orderNum = `NS${Date.now().toString().slice(-8)}`;
                    const transactionNum = `TR${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
                    
                    setOrderNumber(orderNum);
                    setTransactionCode(transactionNum);
                    
                    // ذخیره در تاریخچه سفارشات
                    const orderHistory = JSON.parse(localStorage.getItem('order_history') || '[]');
                    const finalOrder = {
                        ...parsedData,
                        orderNumber: orderNum,
                        transactionCode: transactionNum,
                        status: 'completed',
                        paymentStatus: 'paid',
                        createdAt: new Date().toISOString(),
                        orderDate: new Date().toLocaleDateString('fa-IR')
                    };
                    
                    orderHistory.push(finalOrder);
                    localStorage.setItem('order_history', JSON.stringify(orderHistory));
                    
                    // پاک کردن سبد خرید و اطلاعات موقت
                    clearCart();
                    localStorage.removeItem('order_details');
                    localStorage.removeItem('checkout_data');
                    localStorage.removeItem('applied_discount');
                    
                    setIsLoading(false);
                    return true;
                } catch (error) {
                    console.error('Error parsing order data:', error);
                }
            }
            
            // اگر order_details نبود، آخرین سفارش رو از order_history بخون
            try {
                const orderHistory = JSON.parse(localStorage.getItem('order_history') || '[]');
                
                if (orderHistory.length > 0) {
                    // آخرین سفارش رو بگیر
                    const lastOrder = orderHistory[orderHistory.length - 1];
                    setOrderData(lastOrder);
                    setHasValidOrder(true);
                    
                    // اطلاعات موجود رو استفاده کن
                    setOrderNumber(lastOrder.orderNumber || 'N/A');
                    setTransactionCode(lastOrder.transactionCode || 'N/A');
                    
                    setIsLoading(false);
                    return true;
                }
            } catch (error) {
                console.error('Error parsing order history:', error);
            }
            
            // اگر هیچ سفارشی نبود
            setHasValidOrder(false);
            setIsLoading(false);
            return false;
        };

        // اول سعی کن داده‌ها رو بارگذاری کنی
        const dataLoaded = loadOrderData();
        
        if (!dataLoaded) {
            // اگر داده‌ها نبود، 1 ثانیه صبر کن و دوباره تلاش کن
            const retryTimeout = setTimeout(() => {
                const retryLoaded = loadOrderData();
                
                if (!retryLoaded) {
                    // اگر بعد از 1 ثانیه هم داده‌ها نبود، سفارش معتبری نداریم
                    setHasValidOrder(false);
                    setIsLoading(false);
                    console.log("No valid order found");
                }
            }, 1000);

            return () => clearTimeout(retryTimeout);
        }
    }, [clearCart, router]);

    // تابع محاسبه مجموع تخفیفات
    const getTotalDiscount = () => {
        if (!orderData) return 0;
        
        const productDiscount = orderData.pricing?.totalDiscount || 0;
        const codeDiscount = orderData.pricing?.discountCodeAmount || 0;
        return productDiscount + codeDiscount;
    };

    // تابع نمایش تاریخ
    const getCurrentDate = () => {
        return new Date().toLocaleDateString('fa-IR');
    };

    // تابع تعیین درگاه پرداخت
    const getPaymentGateway = () => {
        if (!orderData) return 'نامشخص';
        
        return orderData.paymentMethod === 'DirectBankPayment' 
            ? 'بانک ملت (درگاه آنلاین)' 
            : 'پرداخت در محل';
    };

    // Loading state
    if (!isMounted || isLoading) {
        return (
            <div className="container-fluid py-5 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">در حال بارگذاری...</span>
                </div>
                <p className="mt-3">در حال پردازش اطلاعات سفارش...</p>
            </div>
        );
    }

    // اگر سفارش معتبری نداریم
    if (!hasValidOrder) {
        return (
            <>
                <div className={styles.payment_status}>
                    <div className={styles.icon}>
                        <i className="bi bi-exclamation-triangle-fill text-warning"></i>
                    </div>
                    <div className={styles.title}>
                        <h3>هیچ سفارشی یافت نشد</h3>
                        <p>اطلاعات سفارش شما موجود نیست</p>
                    </div>

                    <div className={styles.pay_table}>
                        <div className={styles.pay_table_title}>
                            <h5 className="font-18">وضعیت</h5>
                        </div>
                        <div className={styles.pay_table_item}>
                            <h6 className="font-16">وضعیت سفارش</h6>
                            <p className="mb-0 text-warning">سفارشی ثبت نشده است</p>
                        </div>
                        <div className={styles.pay_table_item}>
                            <h6 className="font-16">علت</h6>
                            <p className="mb-0">ممکن است پروسه خرید کامل نشده باشد یا اطلاعات سفارش پاک شده باشد</p>
                        </div>
                    </div>
                </div>

                {/* دکمه‌های عملیات برای حالت خطا */}
                <div className="text-center my-4">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <Link href={"/cart"} className='btn d-inline-block main-color-three-bg mx-2 mb-2'>
                                بازگشت به سبد خرید
                            </Link>
                            <Link href={"/"} className='btn d-inline-block btn-outline-primary mx-2 mb-2'>
                                بازگشت به صفحه اصلی
                            </Link>
                        </div>
                    </div>
                </div>

                {/* راهنمایی برای کاربر */}
                <div className="container-fluid">
                    <div className="alert alert-warning">
                        <h6>
                            <i className="bi bi-info-circle me-2"></i>
                            چه کاری می‌توانید انجام دهید:
                        </h6>
                        <ul className="mb-0">
                            <li>به سبد خرید بازگردید و مجدداً فرآیند خرید را تکمیل کنید</li>
                            <li>اگر سفارش شما ثبت شده، در بخش "سفارشات من" قابل مشاهده است</li>
                            <li>در صورت بروز مشکل با پشتیبانی تماس بگیرید</li>
                        </ul>
                    </div>
                </div>
            </>
        );
    }

    // اگر سفارش معتبر داریم ولی orderData خالیه (احتمال کم)
    if (!orderData) {
        return (
            <>
                <div className={styles.payment_status}>
                    <div className={styles.icon}>
                        <i className="bi bi-check-circle-fill"></i>
                    </div>
                    <div className={styles.title}>
                        <h3>پرداخت شما با موفقیت انجام شد</h3>
                        <p>از خرید شما متشکریم :)</p>
                    </div>

                    <div className={styles.pay_table}>
                        <div className={styles.pay_table_title}>
                            <h5 className="font-18">وضعیت سفارش</h5>
                        </div>
                        <div className={styles.pay_table_item}>
                            <h6 className="font-16">وضعیت پرداخت</h6>
                            <p className="mb-0 text-success">پرداخت شده</p>
                        </div>
                        <div className={styles.pay_table_item}>
                            <h6 className="font-16 main-color-three-color">وضعیت سفارش</h6>
                            <p className="mb-0 main-color-three-color">تایید شده</p>
                        </div>
                    </div>
                </div>

                <div className="text-center my-4">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <Link href={"/p-user/orders"} className='btn d-inline-block main-color-three-bg mx-2 mb-2'>
                                مشاهده سفارشات من
                            </Link>
                            <Link href={"/"} className='btn d-inline-block btn-outline-primary mx-2 mb-2'>
                                ادامه خرید
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="container-fluid">
                    <div className="alert alert-info">
                        <h6>
                            <i className="bi bi-info-circle me-2"></i>
                            نکات مهم:
                        </h6>
                        <ul className="mb-0">
                            <li>سفارش شما با موفقیت ثبت شد</li>
                            <li>پیامک تایید سفارش برای شما ارسال خواهد شد</li>
                            <li>سفارش شما ظرف 24 تا 48 ساعت آماده ارسال می‌شود</li>
                            <li>برای مشاهده جزئیات سفارش به بخش "سفارشات من" مراجعه کنید</li>
                        </ul>
                    </div>
                </div>
            </>
        );
    }

    // حالت عادی - سفارش معتبر با اطلاعات کامل
    return (
        <>
            <div className={styles.payment_status}>
                <div className={styles.icon}>
                    <i className="bi bi-check-circle-fill"></i>
                </div>
                <div className={styles.title}>
                    <h3>پرداخت شما با موفقیت انجام شد</h3>
                    <p>از خرید شما متشکریم :)</p>
                </div>

                {/* مشخصات پرداختی */}
                <div className={styles.pay_table}>
                    <div className={styles.pay_table_title}>
                        <h5 className="font-18">مشخصات پرداختی</h5>
                    </div>
                    <div className={styles.pay_table_item}>
                        <h6 className="font-16">درگاه پرداختی</h6>
                        <p className="mb-0">{getPaymentGateway()}</p>
                    </div>
                    <div className={styles.pay_table_item}>
                        <h6 className="font-16">تاریخ</h6>
                        <p className="mb-0">{getCurrentDate()}</p>
                    </div>
                    <div className={styles.pay_table_item}>
                        <h6 className="font-16">کد تراکنش</h6>
                        <p className="mb-0">{transactionCode}</p>
                    </div>
                    <div className={styles.pay_table_item}>
                        <h6 className="font-16 text-danger">مقدار تخفیف</h6>
                        <p className="mb-0 text-danger">
                            {getTotalDiscount().toLocaleString()} تومان
                        </p>
                    </div>
                    <div className={styles.pay_table_item}>
                        <h6 className="font-16 main-color-three-color">مقدار پرداختی</h6>
                        <p className="mb-0 main-color-three-color">
                            {orderData.pricing?.finalPrice?.toLocaleString()} تومان
                        </p>
                    </div>
                </div>

                {/* وضعیت سفارش */}
                <div className={styles.pay_table}>
                    <div className={styles.pay_table_title}>
                        <h5 className="font-18">وضعیت سفارش</h5>
                    </div>
                    <div className={styles.pay_table_item}>
                        <h6 className="font-16">شماره سفارش</h6>
                        <p className="mb-0">{orderNumber}</p>
                    </div>
                    <div className={styles.pay_table_item}>
                        <h6 className="font-16">قیمت کل</h6>
                        <p className="mb-0">
                            {orderData.pricing?.totalPrice?.toLocaleString()} تومان
                        </p>
                    </div>
                    <div className={styles.pay_table_item}>
                        <h6 className="font-16">وضعیت پرداخت</h6>
                        <p className="mb-0 text-success">پرداخت شده</p>
                    </div>
                    <div className={styles.pay_table_item}>
                        <h6 className="font-16 main-color-three-color">وضعیت سفارش</h6>
                        <p className="mb-0 main-color-three-color">تایید شده</p>
                    </div>
                </div>

                {/* اطلاعات اضافی سفارش */}
                <div className={styles.pay_table}>
                    <div className={styles.pay_table_title}>
                        <h5 className="font-18">جزئیات ارسال</h5>
                    </div>
                    <div className={styles.pay_table_item}>
                        <h6 className="font-16">نحوه ارسال</h6>
                        <p className="mb-0">
                            {orderData.shippingMethod?.name} 
                            ({orderData.shippingMethod?.cost?.toLocaleString()} تومان)
                        </p>
                    </div>
                    <div className={styles.pay_table_item}>
                        <h6 className="font-16">زمان تحویل</h6>
                        <p className="mb-0">
                            {orderData.deliveryDay?.persianDate || 
                             orderData.deliveryDay?.date ||
                             (orderData.deliveryDay ? 'روز انتخاب شده' : 'انتخاب نشده')}
                        </p>
                    </div>
                    <div className={styles.pay_table_item}>
                        <h6 className="font-16">آدرس تحویل</h6>
                        <p className="mb-0">
                            {orderData.customerInfo?.province}, {orderData.customerInfo?.city}, {orderData.customerInfo?.street}
                        </p>
                    </div>
                    <div className={styles.pay_table_item}>
                        <h6 className="font-16">تعداد اقلام</h6>
                        <p className="mb-0">
                            {orderData.items?.reduce((total, item) => total + item.quantity, 0)} عدد
                        </p>
                    </div>
                </div>
            </div>

            {/* دکمه‌های عملیات */}
            <div className="text-center my-4">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <Link href={"/p-user/orders"} className='btn d-inline-block main-color-three-bg mx-2 mb-2'>
                            مشاهده سفارشات من
                        </Link>
                        <Link href={"/"} className='btn d-inline-block btn-outline-primary mx-2 mb-2'>
                            ادامه خرید
                        </Link>
                    </div>
                </div>
            </div>

            {/* اطلاعات تماس */}
            <div className="container-fluid">
                <div className="alert alert-info">
                    <h6>
                        <i className="bi bi-info-circle me-2"></i>
                        نکات مهم:
                    </h6>
                    <ul className="mb-0">
                        <li>شماره پیگیری سفارش شما: <strong>{orderNumber}</strong></li>
                        <li>پیامک تایید سفارش برای شما ارسال خواهد شد</li>
                        <li>سفارش شما ظرف 24 تا 48 ساعت آماده ارسال می‌شود</li>
                        <li>برای پیگیری سفارش می‌توانید به بخش "سفارشات من" مراجعه کنید</li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default PaymentConfirmation;