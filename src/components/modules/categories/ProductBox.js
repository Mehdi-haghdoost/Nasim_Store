"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './ProductBox.module.css';
import { useWishlist } from '@/Redux/hooks/useWishlist';

const ProductBox = ({ product }) => {
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const {
        addProductToWishlist,
        removeProductFromWishlist,
        checkProductInWishlist
    } = useWishlist();

    if (!product) return null;

    const { _id, image, title, originalName, price, discountedPrice, hasDiscount, rating } = product;
    const productUrl = `/product/${_id}`;

    useEffect(() => {
        const checkWishlistStatus = async () => {
            try {
                const result = await checkProductInWishlist(_id);
                setIsInWishlist(result);
            } catch (error) {
                console.error('Error checking wishlist status:', error);
            }
        };

        checkWishlistStatus();
    }, [_id, checkProductInWishlist]);

    const handleWishlistToggle = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (isLoading) return;

        setIsLoading(true);

        try {
            if (isInWishlist) {
                await removeProductFromWishlist(_id);
                setIsInWishlist(false);
            } else {
                await addProductToWishlist(_id, product);
                setIsInWishlist(true);
            }
        } catch (error) {
            console.error('Error toggling wishlist:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="col-lg-4">
            <div className={styles.product_box}>
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
                                <button
                                    onClick={handleWishlistToggle}
                                    disabled={isLoading}
                                    className={`btn btn-link p-0 ${isInWishlist ? 'text-danger' : 'text-muted'}`}
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    data-bs-title={isInWishlist ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
                                    style={{ border: 'none', background: 'none' }}
                                >
                                    {isLoading ? (
                                        <i className="bi bi-arrow-clockwise"></i>
                                    ) : isInWishlist ? (
                                        <i className="bi bi-heart-fill text-danger"></i>
                                    ) : (
                                        <i className="bi bi-heart"></i>
                                    )}
                                </button>
                                <span className={styles.tooltipText}>
                                    {isInWishlist ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
                                </span>
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
                </div>
            </div>
        </div>
    );
};

export default ProductBox;