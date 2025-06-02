"use client";

import React from 'react';
import styles from './OrderCart.module.css';
import Link from 'next/link';

function OrderCart({ order }) {
    // تابع تعیین وضعیت سفارش
    const getOrderStatusDisplay = (status) => {
        switch (status) {
            case 'completed':
                return {
                    icon: 'bi bi-bag-check-fill',
                    text: 'سفارش در حال ارسال',
                    color: 'text-success'
                };
            case 'delivered':
                return {
                    icon: 'bi bi-check-circle-fill',
                    text: 'تحویل شده',
                    color: 'text-success'
                };
            case 'cancelled':
                return {
                    icon: 'bi bi-x-circle-fill',
                    text: 'لغو شده',
                    color: 'text-danger'
                };
            case 'processing':
                return {
                    icon: 'bi bi-clock-fill',
                    text: 'در حال پردازش',
                    color: 'text-warning'
                };
            default:
                return {
                    icon: 'bi bi-bag-check-fill',
                    text: 'تایید شده',
                    color: 'text-primary'
                };
        }
    };

    // تابع فرمت تاریخ
    const formatOrderDate = (dateString) => {
        try {
            if (order.orderDate) {
                return order.orderDate;
            }
            const date = new Date(dateString);
            return date.toLocaleDateString('fa-IR');
        } catch (error) {
            return 'نامشخص';
        }
    };

    // تابع دریافت تصویر محصول - اصلاح شده
    const getProductImage = (product) => {
        // اول چک کن که product موجود باشه
        if (!product) {
            return "/images/product/product-image1.jpg";
        }

        // اگر image مستقیماً موجود باشه (مثل داده‌های شما)
        if (product.image) {
            return product.image;
        }

        // اگر images array موجود باشه
        if (product.images && Array.isArray(product.images) && product.images.length > 0) {
            return product.images[0];
        }

        // تصویر پیش‌فرض
        return "/images/product/product-image1.jpg";
    };

    // تابع نمایش محصولات اضافی
    const renderAdditionalProducts = () => {
        if (!order.items || order.items.length <= 1) return null;

        const additionalCount = order.items.length - 1;
        return (
            <div className={styles.order_item_product_list_item}>
                <div className="d-flex align-items-center justify-content-center bg-light rounded" 
                     style={{width: '70px', height: '70px', fontSize: '12px'}}>
                    +{additionalCount} محصول
                </div>
            </div>
        );
    };

    const statusDisplay = getOrderStatusDisplay(order.status);
    
    // بررسی وجود اولین محصول
    const firstProduct = order.items?.[0]?.product;

    return (
        <div className={styles.order_item}>
            <div className={styles.order_item_status}>
                <div className={styles.order_item_status_item}>
                    <p>
                        <i className={`${statusDisplay.icon} ${statusDisplay.color}`}></i>
                        <span>{statusDisplay.text}</span>
                    </p>
                </div>
                <div className={styles.order_item_status_item}>
                    <p>
                        <i className='bi bi-arrow-left pointer text-dark'></i>
                    </p>
                </div>
            </div>
            
            <div className={styles.order_item_detail}>
                <ul className="nav">
                    <li className="nav-item text-muted">
                        {formatOrderDate(order.createdAt)}
                    </li>
                    <li className="nav-item">
                        <span className="text-muted">کد سفارش: </span>
                        <strong>{order.orderNumber || order.id}</strong>
                    </li>
                    <li className="nav-item">
                        <span className="text-muted">مبلغ: </span>
                        <strong>{order.totalPrice?.toLocaleString()} تومان</strong>
                    </li>
                    {order.itemCount && (
                        <li className="nav-item">
                            <span className="text-muted">تعداد اقلام: </span>
                            <strong>{order.itemCount} عدد</strong>
                        </li>
                    )}
                </ul>
            </div>
            
            <div className={styles.order_item_product_list}>
                {/* نمایش اولین محصول */}
                {firstProduct && (
                    <div className={styles.order_item_product_list_item}>
                        <img 
                            src={getProductImage(firstProduct)} 
                            className='img-thumbnail' 
                            width="70" 
                            height="70" 
                            alt={firstProduct.title || firstProduct.name || 'محصول'}
                            onError={(e) => {
                                e.target.src = "/images/product/product-image1.jpg";
                            }}
                            style={{ objectFit: 'cover' }} // برای نمایش بهتر تصویر
                        />
                    </div>
                )}
                
                {/* نمایش محصولات اضافی */}
                {renderAdditionalProducts()}
                
                <div>
                    <Link
                        className='font-14'
                        href={`/product/${firstProduct?._id || order.id}`}
                    >
                        {order.name}
                        {order.items && order.items.length > 1 && (
                            <span className="text-muted"> و {order.items.length - 1} محصول دیگر</span>
                        )}
                    </Link>
                </div>
            </div>
            
            <div className={styles.order_item_show}>
                <p>
                    <i className="bi bi-card-list"></i>
                    <Link href={`/p-user/orders/${order.orderNumber || order.id}/invoice`}>
                        مشاهده فاکتور
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default OrderCart;