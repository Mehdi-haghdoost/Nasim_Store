"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import styles from './OrderDetail.module.css';
import ProductList from './ProductList';

function OrderDetail() {
    const params = useParams();
    const orderId = params.id;
    
    const [orderData, setOrderData] = useState(null);
    const [isMounted, setIsMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsMounted(true);
        
        const loadOrderDetail = () => {
            try {
                const orderHistory = localStorage.getItem('order_history');
                if (orderHistory) {
                    const parsedOrders = JSON.parse(orderHistory);
                    // پیدا کردن سفارش بر اساس orderNumber
                    const foundOrder = parsedOrders.find(order => 
                        order.orderNumber === orderId
                    );
                    
                    if (foundOrder) {
                        setOrderData(foundOrder);
                    }
                }
                setIsLoading(false);
            } catch (error) {
                console.error('Error loading order detail:', error);
                setIsLoading(false);
            }
        };

        loadOrderDetail();
    }, [orderId]);

    // تابع فرمت کردن تاریخ
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

    // تابع تعیین وضعیت سفارش
    const getOrderStatusText = (status) => {
        switch (status) {
            case 'completed':
                return 'تحویل به مشتری';
            case 'processing':
                return 'در حال پردازش';
            case 'shipped':
                return 'ارسال شده';
            case 'delivered':
                return 'تحویل داده شده';
            case 'cancelled':
                return 'لغو شده';
            default:
                return 'در انتظار بررسی';
        }
    };

    // تابع محاسبه درصد پیشرفت
    const getProgressPercentage = (status) => {
        switch (status) {
            case 'completed':
            case 'delivered':
                return 100;
            case 'shipped':
                return 75;
            case 'processing':
                return 50;
            case 'cancelled':
                return 0;
            default:
                return 25;
        }
    };

    // تابع تعیین نحوه پرداخت
    const getPaymentMethodText = (method) => {
        return method === 'DirectBankPayment' ? 'پرداخت اینترنتی' : 'پرداخت در محل';
    };

    if (!isMounted || isLoading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">در حال بارگذاری...</span>
                </div>
            </div>
        );
    }

    if (!orderData) {
        return (
            <div className={styles.ui_boxs}>
                <div className={styles.ui_box}>
                    <div className={`${styles.ui_box_item} ${styles.ui_box_white}`}>
                        <div className="text-center py-5">
                            <div className="alert alert-warning">
                                <h5>سفارش یافت نشد</h5>
                                <p>سفارش مورد نظر شما پیدا نشد.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.ui_boxs}>
            <div className={styles.ui_box}>
                <div className={`${styles.ui_box_item} ${styles.ui_box_white}`}>
                    <div className={styles.ui_box_item_title} style={{ padding: '15px' }}>
                        <h4 className="fw-bold">
                            جزئیات سفارش
                        </h4>
                    </div>
                    <div className={`p-0 ${styles.ui_box_item_desc}`}>
                        <div className={styles.orders}>
                            <div className={styles.order_item}>
                                
                                {/* اطلاعات اصلی سفارش */}
                                <div className={styles.order_item_detail}>
                                    <ul className="nav">
                                        <li className="nav-item">
                                            <span className="text-mute">کد پیگیری سفارش :</span>
                                            <strong>{orderData.orderNumber || 'نامشخص'}</strong>
                                        </li>
                                        <li className="nav-item">
                                            <span className="text-mute">تاریخ ثبت سفارش :</span>
                                            <strong>{formatDate(orderData.createdAt)}</strong>
                                        </li>
                                    </ul>
                                </div>

                                {/* اطلاعات تحویل گیرنده */}
                                <div className={styles.order_item_detail} style={{ paddingTop: "20px" }}>
                                    <ul className="nav">
                                        <li className="nav-item">
                                            <span className="text-mute">تحویل گیرنده :</span>
                                            <strong>
                                                {orderData.customerInfo?.firstName} {orderData.customerInfo?.lastName}
                                            </strong>
                                        </li>
                                        <li className="nav-item">
                                            <span className="text-mute">شماره موبایل :</span>
                                            <strong>{orderData.customerInfo?.phone || 'نامشخص'}</strong>
                                        </li>
                                        <li className="nav-item">
                                            <span className="text-mute">آدرس :</span>
                                            <strong>
                                                {orderData.customerInfo?.province}, {orderData.customerInfo?.city}, {orderData.customerInfo?.street}
                                            </strong>
                                        </li>
                                    </ul>
                                </div>

                                {/* اطلاعات مالی */}
                                <div className={styles.order_item_detail} style={{ paddingTop: "20px" }}>
                                    <ul className="nav">
                                        <li className="nav-item">
                                            <span className="text-mute">مبلغ :</span>
                                            <strong>{orderData.pricing?.finalPrice?.toLocaleString() || '0'} تومان</strong>
                                        </li>
                                        <li className="nav-item">
                                            <strong>{getPaymentMethodText(orderData.paymentMethod)}</strong>
                                        </li>
                                        <li className="nav-item w-100"></li>
                                        <li className="nav-item">
                                            <span className="text-mute">کد تخفیف :</span>
                                            <strong>
                                                {((orderData.pricing?.totalDiscount || 0) + (orderData.pricing?.discountCodeAmount || 0)).toLocaleString()} تومان
                                            </strong>
                                        </li>
                                        <li className="nav-item">
                                            <span className="text-mute">هزینه ارسال :</span>
                                            <strong>{orderData.shippingMethod?.cost?.toLocaleString() || '0'} تومان</strong>
                                        </li>
                                    </ul>
                                </div>

                                {/* اطلاعات ارسال */}
                                <div className={styles.order_item_detail} style={{ paddingTop: "20px" }}>
                                    <ul className="nav">
                                        <li className="nav-item">
                                            <strong>مرسوله 1 از 1</strong>
                                        </li>
                                        <li className="nav-item">
                                            <strong className='text-danger'>
                                                {orderData.shippingMethod?.name || 'ارسال عادی'}
                                            </strong>
                                        </li>
                                        <li className="nav-item w-100"></li>
                                        <li className="nav-item">
                                            <span className="text-mute">زمان تحویل :</span>
                                            <strong>
                                                {orderData.deliveryDay?.persianDate || 
                                                 orderData.deliveryDay?.date || 
                                                 'انتخاب نشده'}
                                            </strong>
                                        </li>
                                        <li className="nav-item">
                                            <span className="text-mute">هزینه ارسال :</span>
                                            <strong>{orderData.shippingMethod?.cost?.toLocaleString() || '0'} تومان</strong>
                                        </li>
                                        <li className="nav-item">
                                            <span className="text-mute">مبلغ مرسوله :</span>
                                            <strong>{orderData.pricing?.finalPrice?.toLocaleString() || '0'} تومان</strong>
                                        </li>
                                    </ul>

                                    {/* نوار پیشرفت */}
                                    <div className={`py-3 ${styles.order_progress}`}>
                                        <h6 className="fw-bold mb-2 font-14">
                                            {getOrderStatusText(orderData.status)}
                                            <i className="bi bi-check"></i>
                                        </h6>
                                        <div className='progress' style={{height : "10px"}}>
                                            <div 
                                                className={styles.progress_bar} 
                                                style={{width : `${getProgressPercentage(orderData.status)}%`}}
                                            >
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* لیست محصولات */}
                                <div className={`${styles.product_list_row} ${styles.product_list_row_lg}`}>
                                    {orderData.items && orderData.items.length > 0 ? (
                                        orderData.items.map((item, index) => (
                                            <ProductList 
                                                key={item.product?.id || index}
                                                item={item}
                                            />
                                        ))
                                    ) : (
                                        <div className="text-center py-3">
                                            <p className="text-muted">محصولی یافت نشد</p>
                                        </div>
                                    )}
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