'use client';

import React from 'react';
import styles from './CartProductItem.module.css';
import { useCart } from '@/Redux/hooks/useCart';

const CartProductItem = ({ item }) => {
    // استفاده از هوک useCart برای مدیریت سبد خرید
    const { updateCartItem, removeFromCart, loading } = useCart();

    // اگر آیتم وجود نداشته باشد
    if (!item || !item.product) {
       
        return null;
    }
    
    // افزایش تعداد محصول
    const increaseQuantity = () => {
        if (item.product.stock > item.quantity) {
            updateCartItem(item._id, item.quantity + 1);
        }
    };

    // کاهش تعداد محصول
    const decreaseQuantity = () => {
        if (item.quantity > 1) {
            updateCartItem(item._id, item.quantity - 1);
        } else {
            // اگر تعداد 1 بود و کاربر بر روی - کلیک کرد، محصول را حذف کن
            removeFromCart(item._id);
        }
    };

    // حذف محصول از سبد خرید
    const handleRemoveItem = (e) => {
        e.preventDefault();
        removeFromCart(item._id);
    };

    // محاسبه قیمت نهایی محصول
    const finalPrice = item.product.hasDiscount
        ? item.product.discountedPrice * item.quantity
        : item.product.price * item.quantity;

    // محاسبه قیمت اصلی محصول (بدون تخفیف)
    const originalPrice = item.product.price * item.quantity;

    // محاسبه درصد تخفیف
    const discountPercentage = item.product.hasDiscount
        ? Math.round(((item.product.price - item.product.discountedPrice) / item.product.price) * 100)
        : 0;

    // تعیین تصویر محصول
    const getProductImage = () => {
        // بررسی تمام حالت‌های ممکن برای تصویر محصول
        if (item.product.image) {
            // اگر مسیر شامل "/images/product/" باشد
            if (item.product.image.includes('/images/product/')) {
                return item.product.image;
            }
            // اگر فقط نام فایل باشد و نه مسیر کامل
            return `/images/product/${item.product.image}`;
        }
        
        // اگر آرایه تصاویر وجود داشته باشد
        if (item.product.images && item.product.images.length > 0) {
            // اگر مسیر تصویر اول شامل "/images/product/" باشد
            if (item.product.images[0].includes('/images/product/')) {
                return item.product.images[0];
            }
            // اگر فقط نام فایل باشد و نه مسیر کامل
            return `/images/product/${item.product.images[0]}`;
        }
        
        // اگر هیچ تصویری یافت نشد
        return "/images/product/product-placeholder.jpg";
    };

    // دریافت کد رنگ بر اساس نام رنگ
    const getColorCode = (colorName) => {
        const colorMap = {
            'قرمز': '#c00',
            'مشکی': '#111',
            'سبز': '#00cc5f',
            'آبی': '#1b69f0',
            'نارنجی': '#ff6600',
            'بنفش': '#6a0dad'
        };

        return colorMap[colorName] || '#ccc';
    };

    return (
        <div className={styles.cart_product_item}>
            <div className="content-box">
                <div className="container-fluid">
                    <div className={styles.cart_items}>
                        <div className={styles.item}>
                            <div className="row gy-2">
                                <div className="col-2 w-100-in-400">
                                <div className={styles.image}>
                                        <img
                                            src={getProductImage()}
                                            alt={item.product.title || "محصول"}
                                            className='img-fluid'
                                            onError={(e) => {
                                
                                                e.target.onerror = null;
                                                e.target.src = "/images/product/product-placeholder.jpg";
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="col-10 w-100-in-400">
                                    <div className="d-flex justify-content-between align-items-start">
                                        <div className='d-flex align-items-start flex-column ms-2'>
                                            <div className={`d-flex align-items-center flex-wrap ${styles.title}`}>
                                                <h6 className='font-16'>
                                                    {item.product.title}
                                                    {item.product.hasDiscount && (
                                                        <span className='badge me-2 danger-label rounded-pill'>
                                                            {discountPercentage}%
                                                        </span>
                                                    )}
                                                </h6>
                                            </div>
                                            <div className={`d-flex align-items-center flex-wrap mt-3 ${styles.cart_item_feature}`}>
                                                {item.selectedSeller && (
                                                    <div className={`d-flex align-items-center ${styles.item}`}>
                                                        <div className="icon">
                                                            <i className="bi bi-shop"></i>
                                                        </div>
                                                        <div className="saller-name mx-2">فروشنده:</div>
                                                        <div className="saller-name text-muted">{item.selectedSeller.name}</div>
                                                    </div>
                                                )}

                                                {item.color && (
                                                    <div className={`d-flex align-items-center ${styles.item}`}>
                                                        <div className="icon">
                                                            <i className="bi bi-palette2"></i>
                                                        </div>
                                                        <div className="saller-name mx-2">رنگ:</div>
                                                        <div className="saller-name text-muted">
                                                            <div className={`mt-0 ${styles.product_meta_color_items}`}>
                                                                <label className='btn-light mb-0 px-2 py-1'>
                                                                    <span style={{ backgroundColor: getColorCode(item.color) }}></span>
                                                                    {item.color}
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className={`${styles.remove} danger-label`}>
                                            <a href="#" onClick={handleRemoveItem}>
                                                <i className="bi bi-trash-fill font-25"></i>
                                            </a>
                                        </div>
                                    </div>
                                    <div className={`${styles.action} d-flex flex-wrap justify-content-sm-end justify-content-center align-items-center mt-3`}>
                                        <div className={`d-flex align-items-center flex-wrap ${styles.cart_item_feature}`}>
                                            {item.product.hasDiscount && (
                                                <div className={`d-flex align-items-center ${styles.item} ms-2`}>
                                                    <p className={`mb-0 ${styles.old_price} font-16`}>
                                                        {originalPrice.toLocaleString()}
                                                    </p>
                                                </div>
                                            )}
                                            <div className={`d-flex align-items-center ${styles.item}`}>
                                                <p className={`${styles.new_price} mb-0 font-16`}>
                                                    {finalPrice.toLocaleString()} تومان
                                                </p>
                                            </div>
                                        </div>
                                        <div className={styles.counter}>
                                            <div className="input-group">
                                                <span className="input-group-btn input-group-prepend">
                                                    <button
                                                        className="btn-counter waves-effect waves-light bootstrap-touchspin-down"
                                                        type="button"
                                                        onClick={decreaseQuantity}
                                                        disabled={loading}
                                                    >
                                                        -
                                                    </button>
                                                </span>
                                                <input
                                                    name="count"
                                                    className="counter form-counter"
                                                    value={item.quantity}
                                                    readOnly
                                                />
                                                <span className="input-group-btn input-group-append">
                                                    <button
                                                        className="btn-counter waves-effect waves-light bootstrap-touchspin-up"
                                                        type="button"
                                                        onClick={increaseQuantity}
                                                        disabled={loading || item.product.stock <= item.quantity}
                                                    >
                                                        +
                                                    </button>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartProductItem;