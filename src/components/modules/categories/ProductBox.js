"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './ProductBox.module.css';
import { useWishlist } from '@/Redux/hooks/useWishlist';
import { useCart } from '@/Redux/hooks/useCart';

const ProductBox = ({ product }) => {
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showQuickView, setShowQuickView] = useState(false);

    const {
        addProductToWishlist,
        removeProductFromWishlist,
        checkProductInWishlist
    } = useWishlist();

    const { addToCart, loading: cartLoading } = useCart();

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

    const handleQuickView = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setShowQuickView(true);
    };

    const closeQuickView = () => {
        setShowQuickView(false);
    };

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!product) {
            console.error('اطلاعات محصول در دسترس نیست');
            return;
        }

        // انتخاب اولین رنگ موجود
        let selectedColor = null;
        if (product && product.colors && product.colors.length > 0) {
            const firstAvailableColor = product.colors.find(color => color.available);
            if (firstAvailableColor) {
                selectedColor = firstAvailableColor.color;
            } else {
                selectedColor = product.colors[0].color;
            }
        }

        // انتخاب اولین فروشنده از محصول (از دیتابیس)
        let selectedSeller = null;
        if (product && product.sellers && product.sellers.length > 0) {
            // اگر فروشنده‌ها آبجکت کامل هستند
            if (typeof product.sellers[0] === 'object' && product.sellers[0]._id) {
                selectedSeller = {
                    _id: product.sellers[0]._id,
                    name: product.sellers[0].name
                };
            } else {
                // اگر فروشنده‌ها فقط ID هستند - از اولین ID استفاده کن
                selectedSeller = {
                    _id: product.sellers[0],
                    name: "فروشگاه نسیم" // fallback name
                };
            }
        } else {
            // fallback اگر فروشنده‌ای نداشت
            selectedSeller = {
                _id: '67d83f6408b0ebc1a29002a7',
                name: 'فروشگاه نسیم'
            };
        }

        console.log('Adding to cart from ProductBox:', {
            productId: product._id,
            color: selectedColor,
            seller: selectedSeller,
            productSellers: product.sellers
        });

        // فراخوانی addToCart با فروشنده واقعی محصول
        addToCart(product, 1, selectedColor, null, selectedSeller);
    };

    return (
        <>
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
                                    <button
                                        onClick={handleQuickView}
                                        className="btn btn-link p-0 text-muted me-2"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        data-bs-title="مشاهده سریع"
                                        style={{ border: 'none', background: 'none' }}
                                    >
                                        <i className="bi bi-eye"></i>
                                    </button>
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

            {/* Quick View Modal */}
            {showQuickView && (
                <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="p-4 d-flex align-items-center justify-content-between">
                                <h5 className="modal-title">مشاهده سریع محصول</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={closeQuickView}
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="text-center">
                                            <img
                                                src={`/images/product/${product.image}`}
                                                alt={title}
                                                className="img-fluid rounded"
                                                style={{ maxHeight: '300px', objectFit: 'cover' }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="product-info">
                                            <h4 className="mb-2">{title}</h4>
                                            <p className="text-muted mb-3">{originalName}</p>

                                            <div className="rating mb-3">
                                                <i className="bi bi-star-fill text-warning"></i>
                                                <span className="ms-2">{rating || 0} (0+ نظر)</span>
                                            </div>

                                            <div className="price-section mb-4">
                                                <div className="d-flex align-items-center gap-2">
                                                    <span className="h4 text-primary mb-0">
                                                        {(hasDiscount ? discountedPrice : price).toLocaleString('fa-IR')} تومان
                                                    </span>
                                                    {hasDiscount && (
                                                        <>
                                                            <span className="text-decoration-line-through text-muted">
                                                                {price.toLocaleString('fa-IR')} تومان
                                                            </span>
                                                            <div className={styles.timer_label}>
                                                                <span>40% تخفیف</span>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="action-buttons">
                                                <button 
                                                    onClick={handleAddToCart}
                                                    disabled={cartLoading}
                                                    className="btn py-2 my-2 border-0 main-color-one-bg waves-effect waves-light w-100"
                                                >
                                                    <i className="bi bi-basket text-white font-16 ms-1"></i>
                                                    {cartLoading ? 'در حال افزودن...' : 'افزودن به سبد خرید'}
                                                </button>
                                                <Link href={productUrl} className="btn border-0 main-color-three-bg waves-effect waves-light w-100">
                                                    مشاهده جزئیات کامل
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductBox;