'use client';

import React, { useState, useCallback, useMemo, memo } from 'react';
import styles from './CartFactor.module.css';
import { useCart } from '@/Redux/hooks/useCart';
import { useAuth } from '@/Redux/hooks/useAuth';
import { toast } from 'react-toastify';

const CartFactor = memo(() => {
    const { 
        items, 
        totalPrice, 
        totalDiscount, 
        finalPrice, 
        clearCart, 
        loading
    } = useCart();
    
    const { isAuthenticated } = useAuth();
    const [isClearing, setIsClearing] = useState(false);
    
    // محاسبات memoized برای جلوگیری از re-render
    const cartCalculations = useMemo(() => {
        if (!items || items.length === 0) return null;
        
        const totalItems = items.reduce((total, item) => total + item.quantity, 0);
        const discountPercentage = totalPrice > 0 ? Math.round((totalDiscount / totalPrice) * 100) : 0;
        
        return {
            totalItems,
            discountPercentage,
            hasDiscount: totalDiscount > 0
        };
    }, [items, totalPrice, totalDiscount]);
    
    // اگر سبد خرید خالی باشد
    if (!cartCalculations) {
        return null;
    }
    
    // انتقال به صفحه پرداخت
    const handleCheckout = useCallback((e) => {
        e.preventDefault();
        
        if (!isAuthenticated) {
            toast.info('برای ادامه خرید لطفاً وارد حساب کاربری خود شوید');
            window.location.href = '/login-register';
            return;
        }
        
        // بررسی موجودی محصولات
        const outOfStockItems = items.filter(item => item.product.stock < item.quantity);
        if (outOfStockItems.length > 0) {
            toast.error('برخی محصولات موجودی کافی ندارند. لطفاً سبد خرید را بررسی کنید.');
            return;
        }
        
        // هدایت به صفحه پرداخت
        window.location.href = '/checkout';
    }, [isAuthenticated, items]);

    // پاک کردن سبد خرید
    const handleClearCart = useCallback(async (e) => {
        e.preventDefault();
        
        if (isClearing) return;
        
        // درخواست تأیید از کاربر
        if (!window.confirm('آیا مطمئن هستید که می‌خواهید سبد خرید را پاک کنید؟')) {
            return;
        }
        
        setIsClearing(true);
        try {
            await clearCart();
            toast.success('سبد خرید با موفقیت پاک شد');
        } catch (error) {
            console.error('خطا در پاک کردن سبد خرید:', error);
            toast.error('خطا در پاک کردن سبد خرید');
        } finally {
            setIsClearing(false);
        }
    }, [isClearing, clearCart]);

    // تابع کمکی برای نمایش نام محصول
    const getProductName = useCallback((product) => {
        if (product.title) return product.title;
        if (product.name) return product.name;
        return 'محصول';
    }, []);

    // محاسبه قیمت آیتم
    const getItemPrice = useCallback((item) => {
        return item.product.hasDiscount 
            ? item.product.discountedPrice * item.quantity 
            : item.product.price * item.quantity;
    }, []);

    return (
        <div className={`position-sticky top-0 ${styles.cart_canvas}`}>
            <div className={styles.item}>
                <div className={styles.factor}>
                    <div className={styles.title}>
                        <div className='d-flex align-items-center justify-content-between'>
                            <div className='d-flex align-items-center'>
                                <img src="/images/shopping-bag.png" alt="shopping-bag" className="img-fluid" />
                                <h6 className="font-16 mb-0">سفارش شما</h6>
                            </div>
                            <div className="badge bg-success rounded-pill">
                                {cartCalculations.totalItems} آیتم
                            </div>
                        </div>
                    </div>
                    
                    <div className='d-flex mb-3 align-items-center justify-content-between border-bottom pb-2'>
                        <p className="fw-bold mb-0">محصول</p>
                        <p className="fw-bold mb-0">قیمت کل</p>
                    </div>
                    
                    {/* نمایش اطلاعات هر محصول */}
                    <div className="max-height-300 overflow-auto">
                        {items.map(item => (
                            <div 
                                key={item._id}
                                className={`${styles.factor_item} p-2 rounded-3 shadow-sm bg-light d-flex align-items-center justify-content-between mb-2`}
                            >
                                <div className="flex-grow-1">
                                    <p className="mb-0 small">
                                        {(() => {
                                            const productName = getProductName(item.product);
                                            return productName.length > 25 
                                                ? `${productName.substring(0, 25)}...` 
                                                : productName;
                                        })()}
                                    </p>
                                    <div className="d-flex align-items-center gap-2 text-muted small">
                                        <span>تعداد: {item.quantity}</span>
                                        {item.color && <span>• {item.color}</span>}
                                        {item.size && <span>• {item.size}</span>}
                                    </div>
                                </div>
                                <div className="text-end">
                                    <p className="mb-0 small fw-bold">
                                        {getItemPrice(item).toLocaleString()}
                                    </p>
                                    {item.product.hasDiscount && (
                                        <small className="text-muted text-decoration-line-through">
                                            {(item.product.price * item.quantity).toLocaleString()}
                                        </small>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="border-top pt-3 mt-3">
                        {/* نمایش اطلاعات تخفیف */}
                        {cartCalculations.hasDiscount && (
                            <div className={`${styles.factor_item} p-2 rounded-3 shadow-sm bg-success bg-opacity-10 d-flex align-items-center justify-content-between mb-2`}>
                                <p className="mb-0 fw-bold text-success">
                                    <i className="bi bi-tag-fill me-1"></i>
                                    تخفیف ({cartCalculations.discountPercentage}%):
                                </p>
                                <p className="mb-0 text-success fw-bold">
                                    -{totalDiscount.toLocaleString()} تومان
                                </p>
                            </div>
                        )}
                        
                        {/* مجموع قیمت اولیه */}
                        {cartCalculations.hasDiscount && (
                            <div className="d-flex align-items-center justify-content-between mb-2">
                                <span className="text-muted">مجموع اولیه:</span>
                                <span className="text-muted">{totalPrice.toLocaleString()} تومان</span>
                            </div>
                        )}
                        
                        {/* نمایش جمع کل */}
                        <div className={`${styles.factor_item} p-3 rounded-3 shadow-sm bg-primary bg-opacity-10 d-flex align-items-center justify-content-between mt-2`}>
                            <p className="mb-0 fw-bold">جمع کل:</p>
                            <p className="mb-0 fw-bold fs-5">
                                {finalPrice.toLocaleString()} تومان
                            </p>
                        </div>
                    </div>
                    
                    {/* دکمه‌های تسویه حساب و پاک کردن سبد خرید */}
                    <div className='mt-4 d-flex flex-column align-items-center justify-content-center gap-2'>
                        <button 
                            onClick={handleCheckout}
                            disabled={loading || isClearing}
                            className='btn border-0 main-color-one-bg rounded-3 d-block w-100 py-2'
                        >
                            {/* <i className="bi bi-credit-card ms-2"></i> */}
                            {!isAuthenticated ? 'ورود و تسویه حساب' : 'تسویه حساب'}
                        </button>
                        
                        <button 
                            onClick={handleClearCart}
                            disabled={loading || isClearing}
                            className='btn border-0 btn-outline-danger rounded-3 d-block w-100 py-2'
                        >
                            {isClearing ? (
                                <>
                                    <div className="spinner-border spinner-border-sm me-2" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    در حال پاک کردن...
                                </>
                            ) : (
                                <>
                                    <i className="bi bi-trash ms-2"></i>
                                    پاک کردن سبد خرید
                                </>
                            )}
                        </button>
                        
                        {/* پیوند ادامه خرید */}
                        <a 
                            href="/categories" 
                            className="btn btn-link text-decoration-none small d-flex align-items-center"
                        >
                            <i className="bi bi-arrow-left ms-1"></i>
                            <span>ادامه خرید</span>
                        </a>
                    </div>

                    {/* اطلاعات اضافی */}
                    {!isAuthenticated && (
                        <div className="alert alert-info small mt-3 mb-0">
                            <i className="bi bi-info-circle me-1"></i>
                            برای ذخیره سبد خرید وارد حساب کاربری خود شوید
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
});

CartFactor.displayName = 'CartFactor';

export default CartFactor;