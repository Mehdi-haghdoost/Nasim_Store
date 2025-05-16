'use client';

import React, { useEffect } from 'react';
import styles from './Card.module.css';
import { useCart } from '@/Redux/hooks/useCart';
import { useWishlist } from '@/Redux/hooks/useWishlist';
import { toast } from 'react-toastify';

function Card({ img, productData: propProductData }) {
    // استفاده از هوک useCart برای دسترسی به عملکردهای سبد خرید
    const { addToCart, loading, error } = useCart();
    // استفاده از هوک useWishlist برای دسترسی به عملکردهای لیست علاقه‌مندی‌ها
    const { 
        addProductToWishlist, 
        removeProductFromWishlist, 
        checkProductInWishlist,
        isProductInWishlist 
    } = useWishlist();

    // اطلاعات استاتیک محصول - استفاده از props اگر ارسال شده باشد
    const productData = propProductData ? {
        _id: propProductData._id || `product-${Math.floor(Math.random() * 10000)}`, // استفاده از ID واقعی اگر موجود باشد یا ساخت یک ID موقت
        ...propProductData,
        rating: propProductData.rating || 4.8,
        ratingCount: propProductData.ratingCount || 15,
        image: img, // تصویر اصلی
        images: [img, img], // آرایه تصاویر
        stock: propProductData.stock || 10
    } : {
        _id: `product-${Math.floor(Math.random() * 10000)}`,
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

    // بررسی وضعیت محصول در لیست علاقه‌مندی‌ها
    useEffect(() => {
        if (productData._id) {
            checkProductInWishlist(productData._id);
        }
    }, [productData._id, checkProductInWishlist]);

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

    // تغییر وضعیت علاقه‌مندی
    const handleWishlistToggle = (e) => {
        e.preventDefault();
        
        if (isProductInWishlist(productData._id)) {
            // حذف از لیست علاقه‌مندی‌ها
            removeProductFromWishlist(productData._id);
        } else {
            // افزودن به لیست علاقه‌مندی‌ها
            addProductToWishlist(productData._id, productData);
        }
    };

    // وضعیت علاقه‌مندی محصول
    const isInWishlist = isProductInWishlist(productData._id);

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
                        
                        {/* تغییر دکمه علاقه‌مندی‌ها */}
                        <a href="" 
                           onClick={handleWishlistToggle}
                           className="" 
                           data-bs-toggle="tooltip" 
                           data-bs-placement="top"
                           data-bs-title="افزودن به علاقه مندی ها">
                            <i className={`bi ${isInWishlist ? 'bi-heart-fill text-danger' : 'bi-heart'}`}></i>
                        </a>
                        
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