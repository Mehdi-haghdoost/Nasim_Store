"use client";

import React, { useState, useEffect } from 'react';
import styles from './LastOrders.module.css';
import OrderCart from './OrderCart';
import { useOrder } from '@/Redux/hooks/useOrder';

function LastOrders() {
    const { userOrders, loading, error, getProductDetails } = useOrder();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // آماده‌سازی آخرین 5 سفارش برای نمایش
    const getLastOrders = () => {
        if (!userOrders || userOrders.length === 0) return [];
        
        return userOrders
            .slice(0, 5) // فقط 5 سفارش آخر (چون userOrders از سرور مرتب شده میاد)
            .map(order => {
                // دریافت اطلاعات اولین محصول
                const firstItem = order.items?.[0];
                let productInfo = {
                    title: 'محصول نامشخص',
                    image: '/images/product/product-image1.jpg'
                };

                if (firstItem) {
                    if (firstItem.product) {
                        // اگر product populate شده باشه
                        productInfo = {
                            title: firstItem.product.title,
                            image: firstItem.product.image || firstItem.image || '/images/product/product-image1.jpg',
                            _id: firstItem.product._id,
                            price: firstItem.product.price,
                            discountedPrice: firstItem.product.discountedPrice,
                            hasDiscount: firstItem.product.hasDiscount
                        };
                    } else {
                        // fallback به item data
                        productInfo = {
                            title: firstItem.name,
                            image: firstItem.image || '/images/product/product-image1.jpg',
                            _id: firstItem._id,
                            price: firstItem.price,
                            discountedPrice: firstItem.price,
                            hasDiscount: false
                        };
                    }
                }

                // محاسبه آمار
                const itemCount = order.items?.reduce((total, item) => total + item.quantity, 0) || 0;

                return {
                    _id: order._id,
                    id: order._id,
                    orderNumber: order.trackingId,
                    trackingId: order.trackingId,
                    name: productInfo.title,
                    totalPrice: order.totalAmount,
                    totalAmount: order.totalAmount,
                    status: order.status,
                    createdAt: order.orderDate,
                    orderDate: new Date(order.orderDate).toLocaleDateString('fa-IR'),
                    items: order.items || [],
                    itemCount,
                    recipient: order.recipient,
                    phoneNumber: order.phoneNumber,
                    shippingAddress: order.shippingAddress,
                    
                    // اطلاعات اضافی
                    user: order.user,
                    postalCode: order.postalCode,
                    paymentMethod: order.paymentMethod,
                    shippingCost: order.shippingCost,
                    deliveryDate: order.deliveryDate,
                    discountCoupon: order.discountCoupon,

                    // برای سازگاری با OrderCart component
                    firstProduct: productInfo
                };
            });
    };

    if (!isMounted) {
        return null;
    }

    const lastOrders = getLastOrders();

    return (
        <div className={styles.ui_boxs}>
            <div className={styles.ui_box}>
                <div className={`${styles.ui_box_item} ${styles.ui_box_white}`}>
                    <div className={styles.ui_box_item_title} style={{ padding: "15px" }}>
                        <h4>
                            آخرین سفارش ها
                            {loading && (
                                <span className="spinner-border spinner-border-sm ms-2" role="status">
                                    <span className="visually-hidden">در حال بارگذاری...</span>
                                </span>
                            )}
                        </h4>
                    </div>
                    <div className={`${styles.ui_box_item_desc} p-0`}>
                        <div className={styles.orders}>
                            {loading ? (
                                <div className="text-center py-4">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">در حال بارگذاری...</span>
                                    </div>
                                    <p className="mt-2 text-muted">در حال بارگذاری سفارشات...</p>
                                </div>
                            ) : error ? (
                                <div className="text-center py-4">
                                    <div className="alert alert-danger">
                                        <i className="bi bi-exclamation-triangle me-2"></i>
                                        <strong>خطا در بارگذاری:</strong> {error}
                                        <br />
                                        <button 
                                            onClick={() => window.location.reload()} 
                                            className="btn btn-sm btn-outline-danger mt-2"
                                        >
                                            تلاش مجدد
                                        </button>
                                    </div>
                                </div>
                            ) : lastOrders.length > 0 ? (
                                lastOrders.map(order => (
                                    <OrderCart
                                        key={order._id}
                                        order={order}
                                    />
                                ))
                            ) : (
                                <div className="text-center py-4">
                                    <div className="alert alert-light">
                                        <i className="bi bi-bag-x text-muted fs-1"></i>
                                        <h6 className="mt-2 text-muted">سفارشی یافت نشد</h6>
                                        <p className="text-muted small">
                                            هنوز هیچ سفارشی ثبت نکرده‌اید
                                        </p>
                                        <a href="/" className="btn btn-primary btn-sm mt-2">
                                            <i className="bi bi-bag-plus me-2"></i>
                                            شروع خرید
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        {/* نمایش تعداد کل سفارشات */}
                        {!loading && !error && userOrders && userOrders.length > 5 && (
                            <div className="text-center py-2 border-top">
                                <small className="text-muted">
                                    <i className="bi bi-info-circle me-1"></i>
                                    {userOrders.length - 5} سفارش دیگر در لیست کامل سفارشات موجود است
                                </small>
                            </div>
                        )}
                        
                        {/* آمار سریع */}
                        {!loading && !error && userOrders && userOrders.length > 0 && (
                            <div className="row text-center py-2 border-top bg-light">
                                <div className="col-3">
                                    <small className="text-muted">
                                        <strong>{userOrders.length}</strong>
                                        <br />کل سفارشات
                                    </small>
                                </div>
                                <div className="col-3">
                                    <small className="text-muted">
                                        <strong>{userOrders.filter(o => o.status === 'PENDING').length}</strong>
                                        <br />در انتظار
                                    </small>
                                </div>
                                <div className="col-3">
                                    <small className="text-muted">
                                        <strong>{userOrders.filter(o => o.status === 'SHIPPED').length}</strong>
                                        <br />ارسال شده
                                    </small>
                                </div>
                                <div className="col-3">
                                    <small className="text-muted">
                                        <strong>{userOrders.filter(o => o.status === 'DELIVERED').length}</strong>
                                        <br />تحویل شده
                                    </small>
                                </div>
                            </div>
                        )}
                        
                        {/* نمایش آخرین بروزرسانی */}
                        {!loading && !error && lastOrders.length > 0 && (
                            <div className="text-center py-1">
                                <small className="text-muted">
                                    <i className="bi bi-clock me-1"></i>
                                    آخرین بروزرسانی: {new Date().toLocaleTimeString('fa-IR')}
                                </small>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LastOrders;