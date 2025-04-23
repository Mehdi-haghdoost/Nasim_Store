'use client';

import React from 'react';
import styles from './Card.module.css';
import { useCart } from '@/Redux/hooks/useCart';
import { toast } from 'react-toastify'; // اضافه کردن toast اگر از آن استفاده نمی‌شود

function Card({ img, productData: propProductData }) {
    // استفاده از هوک useCart برای دسترسی به عملکردهای سبد خرید
    const { addToCart, loading, error } = useCart();

    // اطلاعات استاتیک محصول - استفاده از props اگر ارسال شده باشد
    const productData = propProductData ? {
        _id: Math.random().toString(), // یک آیدی تصادفی
        ...propProductData,
        rating: propProductData.rating || 4.8,
        ratingCount: propProductData.ratingCount || 15,
        image: img, // تصویر اصلی
        images: [img, img], // آرایه تصاویر
        stock: propProductData.stock || 10
    } : {
        _id: Math.random().toString(), // یک آیدی تصادفی
        title: 'ساعت هوشمند شیائومی',
        originalName: 'Mibro Lite XPAW004 Smartwatch',
        price: 3175000,
        discountedPrice: 1900000,
        hasDiscount: true,
        discountPercentage: 40,
        rating: 4.8,
        ratingCount: 15,
        image: img, // تصویر اصلی
        images: [img, img], // آرایه تصاویر
        stock: 10
    };

    // افزودن به سبد خرید
    const handleAddToCart = (e) => {
        e.preventDefault();
        console.log('Adding product to cart:', productData);
        
        // اضافه کردن به سبد خرید
        addToCart(productData, 1, null, null)
            .unwrap()
            .then(() => {
                // نمایش پیام موفقیت
                toast.success(`${productData.title} به سبد خرید اضافه شد`, {
                    position: "bottom-right",
                    autoClose: 3000
                });
            })
            .catch((error) => {
                console.error('Error adding to cart:', error);
                // نمایش پیام خطا
                toast.error('خطا در افزودن به سبد خرید: ' + (error.message || 'خطای ناشناخته'));
            });
    };

    return (
        <div className={`${styles.swiper_slide}`}>
            <div className={`${styles.product_box}`}>
                <div className={`${styles.product_timer}`}>
                    {productData.hasDiscount && (
                        <div className={`${styles.timer_label}`}>
                            <span>{productData.discountPercentage || 40}% تخفیف</span>
                        </div>
                    )}
                    <div className={`${styles.product_header_btn} d-flex`}>
                        <a href="" className="" data-bs-toggle="tooltip" data-bs-placement="top"
                            data-bs-title="مقایسه"><i className="bi bi-shuffle"></i></a>
                        <a href="" className="" data-bs-toggle="tooltip" data-bs-placement="top"
                            data-bs-title="افزودن به علاقه مندی ها"><i className="bi bi-heart"></i></a>
                        <a href="" className="" data-bs-toggle="tooltip" data-bs-placement="top"
                            data-bs-title="مشاهده سریع"><i className="bi bi-eye"></i></a>
                    </div>
                </div>
                <div className={`${styles.product_image}`}>
                    <img src={productData.image} loading="lazy" alt=""
                        className={`img-fluid ${styles.one_image}`} />
                    <img src={productData.images[1] || productData.image} loading="lazy" alt=""
                        className={`img-fluid ${styles.two_image}`} />
                </div>
                <div className={`${styles.product_title}`}>
                    <div className={`${styles.title}`}>
                        <p className="text-overflow-1">{productData.title}</p>
                        <span className="text-muted text-overflow-1">{productData.originalName}</span>
                    </div>
                    <div className={`${styles.rating}`}>
                        <div className="number">
                            <span className="text-muted font-12">({productData.ratingCount}+) {productData.rating}</span>
                        </div>
                        <div className={`${styles.icon}`}><i className="bi bi-star-fill"></i></div>
                    </div>
                </div>
                <div className={`${styles.product_action}`}>
                    <div className={`${styles.price}`}>
                        <p className={`${styles.new_price}`}>{productData.discountedPrice.toLocaleString()} تومان</p>
                        <p className={`${styles.old_price}`}>{productData.price.toLocaleString()} تومان</p>
                    </div>
                    <div className={styles.link}>
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
            </div>
        </div>
    );
}

export default Card;