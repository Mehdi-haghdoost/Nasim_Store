// C:\Users\LENOVO\Desktop\Nassim_Store\src\components\templates\p-user\order-detail\OrderDetail.js

"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useAuth } from '@/Redux/hooks/useAuth';
import { useOrder } from '@/Redux/hooks/useOrder';
import styles from './OrderDetail.module.css';
import ProductList from './ProductList';

function OrderDetail() {
    const params = useParams();
    const orderId = params.id;
    const { user } = useAuth();
    const { getOrderById, loading, error: orderError } = useOrder();
    
    const [orderData, setOrderData] = useState(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        if (user?._id && orderId) {
            loadOrderDetail();
        }
    }, [orderId, user]);

    const loadOrderDetail = async () => {
        try {
            console.log('🔍 بارگذاری جزئیات سفارش:', orderId);
            const order = await getOrderById(orderId);
            console.log('✅ سفارش دریافت شد:', order);
            setOrderData(order);
        } catch (error) {
            console.error('❌ خطا در بارگذاری سفارش:', error);
        }
    };

    // فرمت تاریخ شمسی
    const formatDate = (dateString) => {
        if (!dateString) return 'نامشخص';
        
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

    // وضعیت سفارش
    const getOrderStatusText = (status) => {
        switch (status) {
            case 'PENDING':
                return 'در انتظار پردازش';
            case 'PROCESSING':
                return 'در حال پردازش';
            case 'SHIPPED':
                return 'ارسال شده';
            case 'DELIVERED':
                return 'تحویل داده شده';
            case 'CANCELLED':
                return 'لغو شده';
            default:
                return 'در انتظار بررسی';
        }
    };

    // درصد پیشرفت
    const getProgressPercentage = (status) => {
        switch (status) {
            case 'DELIVERED':
                return 100;
            case 'SHIPPED':
                return 75;
            case 'PROCESSING':
                return 50;
            case 'CANCELLED':
                return 0;
            case 'PENDING':
            default:
                return 25;
        }
    };

    // روش پرداخت
    const getPaymentMethodText = (method) => {
        switch (method) {
            case 'DirectBankPayment':
                return 'پرداخت آنلاین';
            case 'CashOnDelivery':
                return 'پرداخت در محل';
            default:
                return 'پرداخت در محل';
        }
    };

    // تعیین نام روش ارسال
    const getShippingMethodName = (cost) => {
        if (!cost || cost === 0) return 'ارسال رایگان';
        if (cost <= 50000) return 'ارسال عادی';
        return 'ارسال سریع';
    };

    // تجزیه آدرس
    const parseAddress = (fullAddress) => {
        if (!fullAddress) return { province: '', city: '', street: '' };
        
        const parts = fullAddress.split(', ');
        return {
            province: parts[parts.length - 1] || '',
            city: parts[parts.length - 2] || '',
            street: parts.slice(0, -2).join(', ') || fullAddress
        };
    };

    // تجزیه نام کامل
    const parseName = (fullName) => {
        if (!fullName) return { firstName: '', lastName: '' };
        
        const parts = fullName.split(' ');
        return {
            firstName: parts[0] || '',
            lastName: parts.slice(1).join(' ') || ''
        };
    };

    // Loading state
    if (!isMounted || loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">در حال بارگذاری...</span>
                </div>
                <p className="mt-3 text-muted">در حال بارگذاری جزئیات سفارش...</p>
            </div>
        );
    }

    // Error state
    if (orderError) {
        return (
            <div className={styles.ui_boxs}>
                <div className={styles.ui_box}>
                    <div className={`${styles.ui_box_item} ${styles.ui_box_white}`}>
                        <div className="text-center py-5">
                            <div className="alert alert-danger">
                                <i className="bi bi-exclamation-triangle-fill fs-1 text-danger mb-3"></i>
                                <h5>خطا در بارگذاری</h5>
                                <p>{orderError}</p>
                                <button 
                                    className="btn btn-primary mt-3 ms-2"
                                    onClick={loadOrderDetail}
                                >
                                    <i className="bi bi-arrow-clockwise ms-2"></i>
                                    تلاش مجدد
                                </button>
                                <a href="/p-user/orders" className="btn btn-secondary mt-3">
                                    <i className="bi bi-arrow-right ms-2"></i>
                                    بازگشت به لیست سفارشات
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Order not found
    if (!orderData) {
        return (
            <div className={styles.ui_boxs}>
                <div className={styles.ui_box}>
                    <div className={`${styles.ui_box_item} ${styles.ui_box_white}`}>
                        <div className="text-center py-5">
                            <div className="alert alert-warning">
                                <i className="bi bi-exclamation-triangle-fill fs-1 text-warning mb-3"></i>
                                <h5>سفارش یافت نشد</h5>
                                <p>سفارش با شناسه <strong>{orderId}</strong> پیدا نشد.</p>
                                <p className="text-muted">
                                    لطفاً از طریق لیست سفارشات خود سفارش مورد نظر را انتخاب کنید.
                                </p>
                                <a href="/p-user/orders" className="btn btn-primary mt-3">
                                    <i className="bi bi-arrow-right ms-2"></i>
                                    بازگشت به لیست سفارشات
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // تجزیه اطلاعات
    const recipientName = parseName(orderData.recipient);
    const addressInfo = parseAddress(orderData.shippingAddress);

    return (
        <div className={styles.ui_boxs}>
            <div className={styles.ui_box}>
                <div className={`${styles.ui_box_item} ${styles.ui_box_white}`}>
                    {/* Header */}
                    <div className={styles.ui_box_item_title} style={{ padding: '15px' }}>
                        <div className="d-flex justify-content-between align-items-center">
                            <h4 className="fw-bold mb-0">
                                <i className="bi bi-receipt ms-2"></i>
                                جزئیات سفارش
                            </h4>
                            <div className="text-end">
                                <small className="text-muted">شناسه سفارش:</small>
                                <br />
                                <strong className="text-primary">{orderData.trackingId}</strong>
                            </div>
                        </div>
                    </div>

                    <div className={`p-0 ${styles.ui_box_item_desc}`}>
                        <div className={styles.orders}>
                            <div className={styles.order_item}>
                                
                                {/* اطلاعات اصلی سفارش */}
                                <div className={styles.order_item_detail}>
                                    <h6 className="fw-bold mb-3 text-secondary">
                                        <i className="bi bi-info-circle ms-2"></i>
                                        اطلاعات سفارش
                                    </h6>
                                    <ul className="nav">
                                        <li className="nav-item">
                                            <span className="text-muted">کد پیگیری سفارش:</span>
                                            <strong className="text-primary">{orderData.trackingId}</strong>
                                        </li>
                                        <li className="nav-item">
                                            <span className="text-muted">تاریخ ثبت سفارش:</span>
                                            <strong>{formatDate(orderData.orderDate || orderData.createdAt)}</strong>
                                        </li>
                                        <li className="nav-item">
                                            <span className="text-muted">وضعیت سفارش:</span>
                                            <strong className="text-success">{getOrderStatusText(orderData.status)}</strong>
                                        </li>
                                    </ul>
                                </div>

                                {/* اطلاعات تحویل گیرنده */}
                                <div className={styles.order_item_detail} style={{ paddingTop: "20px" }}>
                                    <h6 className="fw-bold mb-3 text-secondary">
                                        <i className="bi bi-person-check ms-2"></i>
                                        اطلاعات تحویل گیرنده
                                    </h6>
                                    <ul className="nav">
                                        <li className="nav-item">
                                            <span className="text-muted">تحویل گیرنده:</span>
                                            <strong>{orderData.recipient}</strong>
                                        </li>
                                        <li className="nav-item">
                                            <span className="text-muted">شماره موبایل:</span>
                                            <strong>{orderData.phoneNumber}</strong>
                                        </li>
                                        <li className="nav-item">
                                            <span className="text-muted">آدرس:</span>
                                            <strong>{orderData.shippingAddress}</strong>
                                        </li>
                                        {orderData.postalCode && (
                                            <li className="nav-item">
                                                <span className="text-muted">کد پستی:</span>
                                                <strong>{orderData.postalCode}</strong>
                                            </li>
                                        )}
                                    </ul>
                                </div>

                                {/* اطلاعات مالی */}
                                <div className={styles.order_item_detail} style={{ paddingTop: "20px" }}>
                                    <h6 className="fw-bold mb-3 text-secondary">
                                        <i className="bi bi-credit-card ms-2"></i>
                                        اطلاعات مالی
                                    </h6>
                                    <ul className="nav">
                                        <li className="nav-item">
                                            <span className="text-muted">مبلغ کل:</span>
                                            <strong className="text-success fs-5">
                                                {orderData.totalAmount?.toLocaleString()} تومان
                                            </strong>
                                        </li>
                                        <li className="nav-item">
                                            <span className="text-muted">روش پرداخت:</span>
                                            <strong>{getPaymentMethodText(orderData.paymentMethod)}</strong>
                                        </li>
                                        <li className="nav-item w-100"></li>
                                        {orderData.discountCoupon && (
                                            <li className="nav-item">
                                                <span className="text-muted">کد تخفیف:</span>
                                                <strong className="text-danger">
                                                    {orderData.discountCoupon.code} ({orderData.discountCoupon.discountPercentage}%)
                                                </strong>
                                            </li>
                                        )}
                                        <li className="nav-item">
                                            <span className="text-muted">هزینه ارسال:</span>
                                            <strong>
                                                {orderData.shippingCost?.toLocaleString() || '0'} تومان
                                            </strong>
                                        </li>
                                    </ul>
                                </div>

                                {/* اطلاعات ارسال */}
                                <div className={styles.order_item_detail} style={{ paddingTop: "20px" }}>
                                    <h6 className="fw-bold mb-3 text-secondary">
                                        <i className="bi bi-truck ms-2"></i>
                                        اطلاعات ارسال
                                    </h6>
                                    <ul className="nav">
                                        <li className="nav-item">
                                            <span className="text-muted">نوع ارسال:</span>
                                            <strong className='text-info'>
                                                {getShippingMethodName(orderData.shippingCost)}
                                            </strong>
                                        </li>
                                        {orderData.deliveryDate && (
                                            <li className="nav-item">
                                                <span className="text-muted">زمان تحویل:</span>
                                                <strong>{formatDate(orderData.deliveryDate)}</strong>
                                            </li>
                                        )}
                                        <li className="nav-item w-100"></li>
                                        <li className="nav-item">
                                            <span className="text-muted">تعداد مرسوله:</span>
                                            <strong>1 مرسوله</strong>
                                        </li>
                                        <li className="nav-item">
                                            <span className="text-muted">مبلغ مرسوله:</span>
                                            <strong>{orderData.totalAmount?.toLocaleString()} تومان</strong>
                                        </li>
                                    </ul>

                                    {/* نوار پیشرفت */}
                                    <div className={`py-3 ${styles.order_progress}`}>
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <h6 className="fw-bold mb-0 font-14">
                                                <i className="bi bi-check-circle ms-2 text-success"></i>
                                                {getOrderStatusText(orderData.status)}
                                            </h6>
                                            <small className="text-muted">
                                                {getProgressPercentage(orderData.status)}% تکمیل شده
                                            </small>
                                        </div>
                                        <div className='progress' style={{height: "12px", borderRadius: "6px"}}>
                                            <div 
                                                className={`${styles.progress_bar} progress-bar`}
                                                style={{width: `${getProgressPercentage(orderData.status)}%`}}
                                                role="progressbar"
                                            >
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* لیست محصولات */}
                                <div className={styles.order_item_detail} style={{ paddingTop: "20px" }}>
                                    <h6 className="fw-bold mb-3 text-secondary">
                                        <i className="bi bi-box-seam ms-2"></i>
                                        محصولات سفارش ({orderData.items?.length || 0} قلم)
                                    </h6>
                                    <div className={`${styles.product_list_row} ${styles.product_list_row_lg}`}>
                                        {orderData.items && orderData.items.length > 0 ? (
                                            orderData.items.map((item, index) => (
                                                <ProductList 
                                                    key={item._id || index}
                                                    item={item}
                                                    orderId={orderData.trackingId}
                                                />
                                            ))
                                        ) : (
                                            <div className="text-center py-4">
                                                <i className="bi bi-box text-muted fs-1"></i>
                                                <p className="text-muted mt-2">محصولی یافت نشد</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderDetail;