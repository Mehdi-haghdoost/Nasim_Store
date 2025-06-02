'use client';

import React, { useEffect } from 'react';
import styles from './Card.module.css';
import { useCart } from '@/Redux/hooks/useCart';
import { useWishlist } from '@/Redux/hooks/useWishlist';
import { toast } from 'react-toastify';

function Card({ productData }) {
    // هوک‌ها برای سبد خرید و لیست علاقه‌مندی‌ها
    const { addToCart, loading } = useCart();
    const { 
        addProductToWishlist, 
        removeProductFromWishlist, 
        isProductInWishlist, 
        checkProductInWishlist 
    } = useWishlist();

    // بررسی وضعیت محصول در لیست علاقه‌مندی‌ها هنگام بارگذاری
    useEffect(() => {
        if (productData && productData._id) {
            checkProductInWishlist(productData._id);
        }
    }, [productData, checkProductInWishlist]);

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
                console.error('[BestSell Card] خطا در افزودن به سبد خرید:', error);
                toast.error('خطا در افزودن به سبد خرید');
            });
    };

    // مدیریت افزودن/حذف از علاقه‌مندی‌ها
    const handleWishlistToggle = (e) => {
        e.preventDefault();
        
        // بررسی اینکه آیا محصول آیدی معتبر دارد
        if (!productData || !productData._id) {
            toast.info('این محصول امکان افزودن به لیست علاقه‌مندی‌ها را ندارد', {
                position: "bottom-right",
                autoClose: 3000
            });
            return;
        }

        const isInWishlist = isProductInWishlist(productData._id);
        
        if (isInWishlist) {
            removeProductFromWishlist(productData._id)
                .then(() => {
                })
                .catch(err => {
                    console.error(`[BestSell Card] خطا در حذف از لیست علاقه‌مندی‌ها: ${err}`);
                });
        } else {
            addProductToWishlist(productData._id, productData)
                .then(() => {
                })
                .catch(err => {
                    console.error(`[BestSell Card] خطا در افزودن به لیست علاقه‌مندی‌ها: ${err}`);
                });
        }
    };

    // اگر محصول وجود ندارد، هیچی نشان نده
    if (!productData) {
        return null;
    }

    // محاسبه درصد تخفیف
    let discountPercentage = 0;
    if (productData.hasDiscount && productData.price && productData.discountedPrice) {
        discountPercentage = Math.round(((productData.price - productData.discountedPrice) / productData.price) * 100);
    }

    // تعیین وضعیت فعلی علاقه‌مندی
    const isInWishlist = productData._id ? isProductInWishlist(productData._id) : false;
    const heartIcon = isInWishlist ? "bi-heart-fill text-danger" : "bi-heart";

    // تنظیم مسیر تصویر - فقط از سرور یا placeholder
    const imagePath = productData.image 
        ? `/images/product/${productData.image}` 
        : `https://via.placeholder.com/300x200/f0f0f0/666666?text=${encodeURIComponent(productData.title || 'محصول')}`;

    return (
        <div className={`${styles.swiper_slide}`}>
            <div className={`${styles.product_box}`}>
                <div className={`${styles.product_timer}`}>
                    {productData.hasDiscount && (
                        <div className={`${styles.timer_label}`}>
                            <span>{discountPercentage || 10}% تخفیف</span>
                        </div>
                    )}
                    <div className={`${styles.product_header_btn} d-flex`}>
                        <a href="" className="" data-bs-toggle="tooltip" data-bs-placement="top"
                            data-bs-title="مقایسه"><i className="bi bi-shuffle"></i></a>
                        
                        {/* دکمه علاقه‌مندی با نمایش وضعیت بصری */}
                        <a href="" 
                            onClick={handleWishlistToggle}
                            className="" 
                            data-bs-toggle="tooltip" 
                            data-bs-placement="top"
                            data-bs-title={isInWishlist ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}>
                            <i className={`bi ${heartIcon}`}></i>
                        </a>
                        
                        <a href="" className="" data-bs-toggle="tooltip" data-bs-placement="top"
                            data-bs-title="مشاهده سریع"><i className="bi bi-eye"></i></a>
                    </div>
                </div>
                <div className={`${styles.product_image}`}>
                    <img 
                        src={imagePath} 
                        loading="lazy" 
                        alt={productData.title || "تصویر محصول"}
                        className={`img-fluid ${styles.one_image}`}
                        onError={(e) => {
                            e.target.src = `https://via.placeholder.com/300x200/f0f0f0/666666?text=${encodeURIComponent(productData.title || 'محصول')}`;
                        }}
                    />
                    <img 
                        src={imagePath} 
                        loading="lazy" 
                        alt={productData.title || "تصویر محصول"}
                        className={`img-fluid ${styles.two_image}`}
                        onError={(e) => {
                            e.target.src = `https://via.placeholder.com/300x200/f0f0f0/666666?text=${encodeURIComponent(productData.title || 'محصول')}`;
                        }}
                    />
                </div>
                <div className={`${styles.product_title}`}>
                    <div className={`${styles.title}`}>
                        <p className="text-overflow-1">{productData.title || 'ساعت هوشمند شیائومی'}</p>
                        <span className="text-muted text-overflow-1">
                            {productData.originalName || 'Mibro Lite XPAW004 Smartwatch'}
                        </span>
                    </div>
                    <div className={`${styles.rating}`}>
                        <div className="number">
                            <span className="text-muted font-12">
                                ({productData.ratingCount || 15}+) {productData.rating || 4.8}
                            </span>
                        </div>
                        <div className={`${styles.icon}`}><i className="bi bi-star-fill"></i></div>
                    </div>
                </div>
                <div className={`${styles.product_action}`}>
                    <div className={`${styles.price}`}>
                        <p className={`${styles.new_price}`}>
                            {productData.discountedPrice?.toLocaleString() || productData.price?.toLocaleString() || '3,175,000'} 
                        </p>
                        {productData.hasDiscount && (
                            <p className={`${styles.old_price}`}>
                                {productData.price?.toLocaleString() || '6,500,000'} 
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
                                {loading ? 'در حال افزودن...' : 'مشاهده محصول'}
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;