'use client';

import React from 'react';
import styles from './CartFactor.module.css';
import { useCart } from '@/Redux/hooks/useCart';

const CartFactor = () => {
    // استفاده از هوک useCart برای دریافت اطلاعات سبد خرید
    const { items, totalPrice, totalDiscount, finalPrice, clearCart, loading } = useCart();
    
    // اگر سبد خرید خالی باشد
    if (!items || items.length === 0) {
        return null;
    }
    
    // تعداد کل آیتم‌های سبد خرید
    const totalItems = items.reduce((total, item) => total + item.quantity, 0);
    
    // انتقال به صفحه پرداخت
    const handleCheckout = (e) => {
        e.preventDefault();
        // در اینجا می‌توانید کاربر را به صفحه پرداخت هدایت کنید
        window.location.href = '/checkout';
    };

    // تابع کمکی برای نمایش نام محصول با اولویت title و سپس name
    const getProductName = (product) => {
        if (product.title) return product.title;
        if (product.name) return product.name;
        return 'محصول';
    };

    return (
        <div className={`position-sticky top-0 ${styles.cart_canvas}`}>
            <div className={styles.item}>
                <div className={styles.factor}>
                    <div className={styles.title}>
                        <div className='d-flex align-items-center'>
                            <img src="/images/shopping-bag.png" alt="shopping-bag" className="img-fluid" />
                            <h6 className="font-16">سفارش شما</h6>
                        </div>
                    </div>
                    <div className='d-flex mb-3 align-items-center justify-content-between'>
                        <p className="fw-bold mb-0">محصول</p>
                        <p className="fw-bold mb-0">قیمت کل</p>
                    </div>
                    
                    {/* نمایش اطلاعات هر محصول */}
                    {items.map(item => (
                        <div 
                            key={item._id}
                            className={`${styles.factor_item} p-2 rounded-3 shadow-sm bg-light d-flex align-items-center justify-content-between mb-2`}
                        >
                            <p className="mb-0">
                                {(() => {
                                    const productName = getProductName(item.product);
                                    return productName.length > 20 
                                        ? `${productName.substring(0, 20)}...` 
                                        : productName;
                                })()}
                                {item.quantity > 1 && ` (${item.quantity}x)`}
                            </p>
                            <p className="mb-0">
                                {(item.product.hasDiscount 
                                    ? item.product.discountedPrice * item.quantity 
                                    : item.product.price * item.quantity
                                ).toLocaleString()} تومان
                            </p>
                        </div>
                    ))}
                    
                    {/* نمایش اطلاعات تخفیف */}
                    {totalDiscount > 0 && (
                        <div className={`${styles.factor_item} p-2 rounded-3 shadow-sm bg-light d-flex align-items-center justify-content-between`}>
                            <p className="mb-0 fw-bold">تخفیف :</p>
                            <p className="mb-0 text-success">{totalDiscount.toLocaleString()} تومان</p>
                        </div>
                    )}
                    
                    {/* نمایش جمع کل */}
                    <div className={`${styles.factor_item} p-2 rounded-3 shadow-sm bg-light d-flex align-items-center justify-content-between mt-2`}>
                        <p className="mb-0 fw-bold">جمع کل :</p>
                        <p className="mb-0">{finalPrice.toLocaleString()} تومان</p>
                    </div>
                    
                    {/* دکمه‌های تسویه حساب و پاک کردن سبد خرید */}
                    <div className='mt-3 d-flex flex-column align-items-center justify-content-center'>
                        <button 
                            onClick={handleCheckout}
                            disabled={loading}
                            className='btn border-0 main-color-one-bg rounded-3 d-block w-100 mb-2'
                        >
                            تسویه حساب
                        </button>
                        
                        <button 
                            onClick={clearCart}
                            disabled={loading}
                            className='btn border-0 btn-outline-danger rounded-3 d-block w-100'
                        >
                            پاک کردن سبد خرید
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartFactor;