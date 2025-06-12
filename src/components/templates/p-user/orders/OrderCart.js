"use client";

import React from 'react';
import styles from './OrderCart.module.css';
import Link from 'next/link';
import { useOrder } from '@/Redux/hooks/useOrder';

function OrderCart({ order }) {
    const { getProductDetails } = useOrder();

    // تابع تعیین وضعیت سفارش
    const getOrderStatusDisplay = (status) => {
        switch (status) {
            case 'PENDING':
                return {
                    icon: 'bi bi-clock-fill',
                    text: 'در انتظار بررسی',
                    color: 'text-warning'
                };
            case 'SHIPPED':
                return {
                    icon: 'bi bi-truck',
                    text: 'ارسال شده',
                    color: 'text-info'
                };
            case 'DELIVERED':
                return {
                    icon: 'bi bi-check-circle-fill',
                    text: 'تحویل داده شده',
                    color: 'text-success'
                };
            case 'CANCELLED':
                return {
                    icon: 'bi bi-x-circle-fill',
                    text: 'لغو شده',
                    color: 'text-danger'
                };
            default:
                return {
                    icon: 'bi bi-bag-check-fill',
                    text: 'ثبت شده',
                    color: 'text-primary'
                };
        }
    };

    // تابع فرمت تاریخ
    const formatOrderDate = (dateString) => {
        try {
            // اگر orderDate از props ارسال شده (فرمت شده)
            if (order.orderDate && typeof order.orderDate === 'string' && !order.orderDate.includes('T')) {
                return order.orderDate;
            }
            
            // در غیر این صورت تاریخ raw را فرمت کن
            const date = new Date(dateString || order.createdAt);
            return date.toLocaleDateString('fa-IR', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
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

    // دریافت اطلاعات اولین محصول
    const getFirstProductInfo = () => {
        if (!order.items || order.items.length === 0) {
            return {
                title: 'محصول نامشخص',
                image: '/images/product/product-image1.jpg',
                _id: 'unknown'
            };
        }

        const firstItem = order.items[0];
        
        // اگر product populate شده باشه
        if (firstItem.product) {
            return {
                title: firstItem.product.title,
                image: firstItem.product.image || firstItem.image || '/images/product/product-image1.jpg',
                _id: firstItem.product._id,
                price: firstItem.product.price,
                discountedPrice: firstItem.product.discountedPrice,
                hasDiscount: firstItem.product.hasDiscount
            };
        }
        
        // fallback به item data
        return {
            title: firstItem.name,
            image: firstItem.image || '/images/product/product-image1.jpg',
            _id: firstItem._id || 'unknown',
            price: firstItem.price,
            discountedPrice: firstItem.price,
            hasDiscount: false
        };
    };

    // تابع نمایش محصولات اضافی
    const renderAdditionalProducts = () => {
        if (!order.items || order.items.length <= 1) return null;

        const additionalCount = order.items.length - 1;
        return (
            <div className={styles.order_item_product_list_item}>
                <div className="d-flex align-items-center justify-content-center bg-light rounded" 
                     style={{width: '70px', height: '70px', fontSize: '12px', border: '2px dashed #ccc'}}>
                    <span className="text-muted">+{additionalCount}</span>
                </div>
            </div>
        );
    };

    // محاسبه آمار سفارش
    const getOrderStats = () => {
        if (!order.items) return { itemCount: 0, totalQuantity: 0 };
        
        const totalQuantity = order.items.reduce((total, item) => total + item.quantity, 0);
        return {
            itemCount: order.items.length,
            totalQuantity
        };
    };

    const statusDisplay = getOrderStatusDisplay(order.status);
    const firstProduct = getFirstProductInfo();
    const orderStats = getOrderStats();

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
                        <i className="bi bi-calendar3 me-1"></i>
                        {formatOrderDate(order.createdAt)}
                    </li>
                    <li className="nav-item">
                        <span className="text-muted">شماره پیگیری: </span>
                        <strong>{order.trackingId}</strong>
                    </li>
                    <li className="nav-item">
                        <span className="text-muted">مبلغ: </span>
                        <strong className="text-success">{formatPrice(order.totalAmount)} تومان</strong>
                    </li>
                    <li className="nav-item">
                        <span className="text-muted">تعداد: </span>
                        <strong>{orderStats.totalQuantity} عدد</strong>
                        {orderStats.itemCount > 1 && (
                            <span className="text-muted"> ({orderStats.itemCount} محصول)</span>
                        )}
                    </li>
                </ul>
            </div>
            
            <div className={styles.order_item_product_list}>
                {/* نمایش اولین محصول */}
                <div className={styles.order_item_product_list_item}>
                    <img 
                        src={firstProduct.image} 
                        className='img-thumbnail' 
                        width="70" 
                        height="70" 
                        alt={firstProduct.title}
                        onError={(e) => {
                            e.target.src = "/images/product/product-image1.jpg";
                        }}
                        style={{ objectFit: 'cover' }}
                    />
                </div>
                
                {/* نمایش محصولات اضافی */}
                {renderAdditionalProducts()}
                
                <div>
                    <Link
                        className='font-14 text-decoration-none'
                        href={`/product/${firstProduct._id}`}
                        title={firstProduct.title}
                    >
                        <strong>
                            {firstProduct.title}
                        </strong>
                        {order.items && order.items.length > 1 && (
                            <span className="text-muted d-block small">
                                و {order.items.length - 1} محصول دیگر
                            </span>
                        )}
                    </Link>
                    
                    {/* نمایش قیمت محصول */}
                    {firstProduct.hasDiscount ? (
                        <div className="mt-1">
                            <span className="text-decoration-line-through text-muted small">
                                {formatPrice(firstProduct.price)} تومان
                            </span>
                            <br />
                            <span className="text-success small">
                                {formatPrice(firstProduct.discountedPrice)} تومان
                            </span>
                        </div>
                    ) : (
                        <div className="mt-1">
                            <span className="text-success small">
                                {formatPrice(firstProduct.price)} تومان
                            </span>
                        </div>
                    )}
                    
                    {/* اطلاعات اضافی */}
                    <div className="mt-1">
                        <small className="text-muted">
                            <i className="bi bi-person me-1"></i>
                            {order.recipient}
                        </small>
                        {order.phoneNumber && (
                            <small className="text-muted d-block">
                                <i className="bi bi-telephone me-1"></i>
                                {order.phoneNumber}
                            </small>
                        )}
                        {order.shippingCost > 0 && (
                            <small className="text-muted d-block">
                                <i className="bi bi-truck me-1"></i>
                                هزینه ارسال: {formatPrice(order.shippingCost)} تومان
                            </small>
                        )}
                    </div>
                </div>
            </div>
            
            <div className={styles.order_item_show}>
                <p>
                    <i className="bi bi-receipt me-1"></i>
                    <Link 
                        href={`/p-user/orders/${order._id}/invoice`}
                        className="text-decoration-none"
                    >
                        مشاهده فاکتور
                    </Link>
                </p>
                <p className="mt-2">
                    <i className="bi bi-eye me-1"></i>
                    <Link 
                        href={`/p-user/order-detail/${order._id}`}
                        className="text-decoration-none"
                    >
                        جزئیات سفارش
                    </Link>
                </p>
                
                {/* نمایش وضعیت تحویل */}
                {order.deliveryDate && (
                    <p className="mt-2">
                        <i className="bi bi-calendar-check me-1"></i>
                        <small className="text-muted">
                            تحویل: {formatOrderDate(order.deliveryDate)}
                        </small>
                    </p>
                )}
            </div>
        </div>
    );
}

export default OrderCart;