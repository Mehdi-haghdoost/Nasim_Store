'use client';

import React from 'react';
import styles from './ProductDetail.module.css';
import { useCart } from '@/Redux/hooks/useCart';
import { useWishlist } from '@/Redux/hooks/useWishlist';
import { toast } from 'react-toastify';

function ProductDetail({ productData }) {
    // هوک‌ها برای سبد خرید و لیست علاقه‌مندی‌ها
    const { addToCart, loading } = useCart();
    
    // مدیریت کلیک بر روی دکمه افزودن به سبد خرید
    const handleAddToCart = (e) => {
        e.preventDefault();
        
        if (!productData || !productData._id) {
            toast.warning('اطلاعات محصول ناقص است');
            return;
        }
        
        addToCart(productData, 1, null, null)
            .unwrap()
            .then(() => {
                toast.success(`${productData.title} به سبد خرید اضافه شد`, {
                    position: "bottom-right",
                    autoClose: 3000
                });
            })
            .catch((error) => {
                console.error('[ProductDetail] خطا در افزودن به سبد خرید:', error);
                toast.error('خطا در افزودن به سبد خرید');
            });
    };

    // اگر محصول وجود ندارد، اطلاعات پیش‌فرض نمایش بده
    if (!productData) {
        return (
            <>
                <div className={`${styles.product_title}`}>
                    <div className={`${styles.title}`}>
                        <p className="text-overflow-1">در حال بارگذاری...</p>
                        <span className="text-muted text-overflow-1">لطفاً صبر کنید</span>
                    </div>
                    <div className={`${styles.rating}`}>
                        <div className={`${styles.number}`}>
                            <span className="text-muted font-12">(0) 0</span>
                        </div>
                        <div className={`${styles.icon}`}>
                            <i className="bi bi-star"></i>
                        </div>
                    </div>
                </div>
                <div className={`${styles.product_action}`}>
                    <div className={`${styles.price}`}>
                        <p className={`${styles.new_price}`}>--- تومان</p>
                    </div>
                    <div className="link">
                        <button 
                            disabled
                            className="btn border-0 rounded-3 main-color-one-bg opacity-50"
                        >
                            <i className="bi bi-basket text-white"></i>
                            <span className="text-white">در حال بارگذاری...</span>
                        </button>
                    </div>
                </div>
            </>
        );
    }

    // محاسبه قیمت نهایی
    const finalPrice = productData.hasDiscount && productData.discountedPrice 
        ? productData.discountedPrice 
        : productData.price;

    return (
        <>
            <div className={`${styles.product_title}`}>
                <div className={`${styles.title}`}>
                    <p className="text-overflow-1">{productData.title || 'محصول'}</p>
                    <span className="text-muted text-overflow-1">
                        {productData.originalName || productData.brand || ''}
                    </span>
                </div>
                <div className={`${styles.rating}`}>
                    <div className={`${styles.number}`}>
                        <span className="text-muted font-12">
                            ({productData.ratingCount || 0}+) {productData.rating || 0}
                        </span>
                    </div>
                    <div className={`${styles.icon}`}>
                        <i className="bi bi-star-fill"></i>
                    </div>
                </div>
            </div>
            <div className={`${styles.product_action}`}>
                <div className={`${styles.price}`}>
                    <p className={`${styles.new_price}`}>
                        {finalPrice?.toLocaleString() || '0'} تومان
                    </p>
                    {productData.hasDiscount && productData.price && productData.discountedPrice && (
                        <p className={`${styles.old_price}`}>
                            {productData.price.toLocaleString()} تومان
                        </p>
                    )}
                </div>
                <div className="link">
                    <button 
                        onClick={handleAddToCart}
                        disabled={loading}
                        className="btn border-0 rounded-3 main-color-one-bg"
                    >
                        <i className="bi bi-basket text-white"></i>
                        <span className="text-white">
                            {loading ? 'در حال افزودن...' : 'خرید محصول'}
                        </span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default ProductDetail;