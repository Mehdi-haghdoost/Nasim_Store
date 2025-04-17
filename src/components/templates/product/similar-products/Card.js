'use client';

import React from 'react';
import styles from './Card.module.css';
import { useCart } from '@/Redux/hooks/useCart';

function Card({ img, product }) {
    // استفاده از هوک useCart برای دسترسی به عملکردهای سبد خرید
    const { addToCart, loading, error } = useCart();

    // استفاده از داده‌های واقعی یا ساخت داده‌های پیش‌فرض
    const productData = product || {
        _id: Math.random().toString(),
        name: 'ساعت هوشمند شیائومی',
        englishName: 'Mibro Lite XPAW004 Smartwatch',
        price: 3175000,
        originalPrice: 6500000,
        hasDiscount: true,
        discountPercentage: 40,
        rating: 4.8,
        ratingCount: 15,
        images: [img || '/images/product/watch1.jpg', '/images/product/watch2.jpg'],
        stock: 10
    };

    // افزودن به سبد خرید
    const handleAddToCart = (e) => {
        e.preventDefault();
        console.log('Adding from Card:', {
            productId: productData._id,
            color: null,
            size: null,
            sellerId: null
        });
        addToCart(productData, 1, null, null);
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
                    <img src={productData.images[0]} loading="lazy" alt=""
                        className={`img-fluid ${styles.one_image}`} />
                    <img src={productData.images[1] || "/images/product/watch2.jpg"} loading="lazy" alt=""
                        className={`img-fluid ${styles.two_image}`} />
                </div>
                <div className={`${styles.product_title}`}>
                    <div className={`${styles.title}`}>
                        <p className="text-overflow-1">{productData.name}</p>
                        <span className="text-muted text-overflow-1">{productData.englishName}</span>
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
                        <p className={`${styles.new_price}`}>{productData.price.toLocaleString()} تومان</p>
                        {productData.hasDiscount && (
                            <p className={`${styles.old_price}`}>{productData.originalPrice.toLocaleString()} تومان</p>
                        )}
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