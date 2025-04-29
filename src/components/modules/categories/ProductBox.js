"use client";

import React from 'react';
import Link from 'next/link';
import styles from './ProductBox.module.css';

const ProductBox = ({ product }) => {
    // اگر محصول وجود نداشت چیزی نمایش نده
    if (!product) return null;

    const { _id, image, title, originalName, price, discountedPrice, hasDiscount, rating } = product;
    
    // ساخت آدرس URL محصول
    const productUrl = `/product/${_id}`;

    return (
        <div className="col-lg-4">
            <div className={styles.product_box}>
                {/* نمایش برچسب تخفیف اگر محصول تخفیف داشته باشد */}
                {hasDiscount && (
                    <div className={styles.product_timer}>
                        <div className={styles.timer_label}>
                            <span>40% تخفیف</span>
                        </div>
                        <div className={styles.product_header_btn}>
                            <div className={styles.tooltip}>
                                <a href="#" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="مقایسه">
                                    <i className="bi bi-shuffle"></i>
                                </a>
                                <span className={styles.tooltipText}>مقایسه</span>
                            </div>
                            <div className={styles.tooltip}>
                                <a href="#" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="افزودن به علاقه‌مندی‌ها">
                                    <i className="bi bi-heart"></i>
                                </a>
                                <span className={styles.tooltipText}>افزودن به علاقه‌مندی‌ها</span>
                            </div>
                            <div className={styles.tooltip}>
                                <a href="#" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="مشاهده سریع">
                                    <i className="bi bi-eye"></i>
                                </a>
                                <span className={styles.tooltipText}>مشاهده سریع</span>
                            </div>
                        </div>
                    </div>
                )}
                {/* تصویر محصول - با لینک به صفحه محصول */}
                <Link href={productUrl}>
                    <div className={styles.product_image}>
                        <img
                            src={`/images/product/${product.image}`}
                            loading="lazy"
                            alt={title}
                            className={`img-fluid ${styles.one_image}`}
                        />
                    </div>
                </Link>
                {/* عنوان و مشخصات محصول - با لینک به صفحه محصول */}
                <Link href={productUrl} className="text-decoration-none text-dark">
                    <div className={styles.product_title}>
                        <div className={styles.title}>
                            <p className="text-overflow-1">{title}</p>
                            <span className="text-muted text-overflow-1">{originalName}</span>
                        </div>
                        <div className={styles.rating}>
                            <div className={styles.number}>
                                <span className="text-muted font-12">
                                    (0+) {rating || 0}
                                </span>
                            </div>
                            <div className={styles.icon}>
                                <i className="bi bi-star-fill"></i>
                            </div>
                        </div>
                    </div>
                </Link>
                {/* قیمت و دکمه خرید */}
                <div className={styles.product_action}>
                    <div className={styles.price}>
                        <p className={styles.new_price}>
                            {(hasDiscount ? discountedPrice : price).toLocaleString('fa-IR')} تومان
                        </p>
                        {hasDiscount && (
                            <p className={styles.old_price}>
                                {price.toLocaleString('fa-IR')} تومان
                            </p>
                        )}
                    </div>
                    <div className={styles.link}>
                        <Link href={productUrl} className="btn border-0 rounded-3 main-color-one-bg">
                            <i className="bi bi-basket text-white"></i>
                            <span className="text-white">خرید محصول</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductBox;