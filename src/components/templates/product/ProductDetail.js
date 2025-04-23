'use client';

import React, { useState, useEffect } from 'react';
import styles from './productDetail.module.css';
import { useCart } from '@/Redux/hooks/useCart';
import { toast } from 'react-toastify'; // اضافه کردن toast

function ProductDetail({ product }) {

    // استفاده از هوک useCart برای دسترسی به عملکردهای سبد خرید
    const { addToCart, loading, error } = useCart();

    // تعیین تعداد محصول
    const [quantity, setQuantity] = useState(1);

    // اطلاعات فروشنده انتخاب شده
    const [selectedSeller, setSelectedSeller] = useState(null);

    // تعیین رنگ انتخاب شده
    const [selectedColor, setSelectedColor] = useState(() => {
        // پیدا کردن اولین رنگ موجود
        if (product.colors && product.colors.length > 0) {
            // جستجو برای اولین رنگ موجود
            const firstAvailableColor = product.colors.find(color => color.available);
            if (firstAvailableColor) {
                return firstAvailableColor.color;
            }
        }
        return null;
    });

    // دریافت اطلاعات فروشنده هنگام لود کامپوننت
    useEffect(() => {
        // اگر محصول و فروشندگان آن موجود باشند
        if (product && product.sellers && product.sellers.length > 0) {
            // دریافت اطلاعات اولین فروشنده (می‌توانید این منطق را تغییر دهید)
            fetchSellerInfo(product.sellers[0]);
        }
    }, [product]);

    // تابع دریافت اطلاعات فروشنده
    const fetchSellerInfo = async (sellerId) => {
        try {
            setSelectedSeller({
                _id: sellerId,
                name: "فروشگاه نسیم",
            });


        } catch (error) {
            console.error('خطا در دریافت اطلاعات فروشنده:', error);
        }
    };

    // افزایش تعداد محصول
    const increaseQuantity = () => {
        // بررسی موجودی محصول
        if (product && product.stock > quantity) {
            setQuantity(quantity + 1);
        }
    };

    // کاهش تعداد محصول
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    // افزودن به سبد خرید
    const handleAddToCart = (e) => {
        e.preventDefault();

        if (!product) {
            console.error('اطلاعات محصول در دسترس نیست');
            return;
        }

        if (!selectedSeller) {
            console.error('فروشنده‌ای انتخاب نشده است');
            return;
        }

        // تنها نام رنگ را ارسال کنید، نه کل شیء رنگ
        const colorValue = selectedColor;

        // آماده‌سازی داده‌های محصول برای انتقال به سبد خرید
        const productData = {
            ...product,
            // اطمینان از وجود image به صورت مسیر کامل
            image: product.image ? 
                (product.image.startsWith('/') ? product.image : `/images/product/${product.image}`) : 
                '/images/product/product-placeholder.jpg',
        };

        console.log('Adding product to cart with these data:', {
            product: productData,
            quantity,
            color: colorValue,
            seller: selectedSeller._id
        });

        // افزودن به سبد خرید با استفاده از addToCart
        addToCart(productData, quantity, colorValue, null, selectedSeller._id)
            .unwrap()
            .then(() => {
                // نمایش پیام موفقیت
                toast.success(`${product.title} به سبد خرید اضافه شد`, {
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

    // اگر اطلاعات محصول هنوز لود نشده‌اند
    if (!product) {
        return <div>در حال بارگذاری...</div>;
    }

    return (
        <>
            <div className={styles.product_meta_title}>
                <div className="row align-items-baseline gy-3">
                    <div className="col-lg-8">
                        <h5 className="font-16">
                            {product.title}
                        </h5>
                        <p className="mb-0 mt-2 text-muted">
                            {product.originalName}
                        </p>
                    </div>
                    <div className="col-lg-4">
                        <a href="" className="text-lg-start d-block">
                            <img src={`/images/${product.brandIcon}`} alt="" className="img-fluid" />
                        </a>
                    </div>
                </div>
            </div>
            <div className={styles.product_meta_feature}>
                <div className="row gy-3">
                    <div className="col-lg-8">
                        <div className={styles.product_meta_feature_items}>
                            <h5 className="title font-16 mb-2">ویژگی های کالا</h5>
                            <ul className="navbar-nav">
                                {product.features && product.features.length > 0 ? (
                                    product.features.slice(0, 4).map((feature, index) => (
                                        <li key={index} className="nav item">
                                            <span>{feature.key}:</span><strong>{feature.value}</strong>
                                        </li>
                                    ))
                                ) : (
                                    <li className="nav item"><span>اطلاعات محصول موجود نیست</span></li>
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className={styles.product_meta_rating}>
                            <div className="d-flex align-items-center justify-content-lg-end">
                                <div className={`${styles.count_comment} text-muted`}>
                                    {product.comments ? product.comments.length : '0'} دیدگاه
                                </div>
                                <div className={styles.count_rating}>
                                    <span>({product.rating || '0'}) {product.rating || '0'}</span>
                                    <i className="bi bi-star-fill"></i>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles.product_meta_garanty} justify-content-lg-end justify-content-start`}>
                            <i className="bi bi-shield-fill-check"></i>
                            <span className="text-muted"> گارانتی اصالت و سلامت فیزیکی کالا</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="product-meta-color">
                <h5 className="font-16">
                    انتخاب رنگ کالا
                </h5>
                <div className="product-meta-color-items">
                    {product.colors && product.colors.length > 0 ? (
                        product.colors.map((colorItem, index) => (
                            <React.Fragment key={index}>
                                <input
                                    type="radio"
                                    className="btn-check"
                                    name="colorOptions"
                                    id={`colorOption${index}`}
                                    autoComplete="off"
                                    checked={selectedColor === colorItem.color}
                                    onChange={() => setSelectedColor(colorItem.color)}
                                    disabled={!colorItem.available}
                                />
                                <label className="btn" htmlFor={`colorOption${index}`}>
                                    <span style={{ backgroundColor: getColorCode(colorItem.color) }}></span>
                                    {colorItem.color}
                                </label>
                            </React.Fragment>
                        ))
                    ) : (
                        <p>رنگ‌های محصول موجود نیست</p>
                    )}
                </div>
            </div>
            {selectedSeller && (
                <div className="product-meta-seller mt-3">
                    <h5 className="font-16">فروشنده</h5>
                    <div className="d-flex align-items-center mt-2">
                        <i className="bi bi-shop ms-2"></i>
                        <span>{selectedSeller.name}</span>
                    </div>
                </div>
            )}
            <div className={`${styles.productmeta_count} text-muted`}>
                <span>{product.stock || '0'} عدد در انبار</span>
            </div>
            <div className={styles.product_meta_action}>
                <div className="row align-items-center gy-3">
                    {product.hasDiscount && (
                        <div className="col-lg-3 col-6 w-100-in-400">
                            <p className={`mb-0 ${styles.old_price} font-16 text-lg-start text-center`}>
                                {product.price ? product.price.toLocaleString() : '0'} تومان
                            </p>
                        </div>
                    )}
                    <div className="col-lg-3 col-6 w-100-in-400">
                        <h6 className={`font-16 ${styles.new_price} main-color-one-color`}>
                            {product.hasDiscount
                                ? (product.discountedPrice ? product.discountedPrice.toLocaleString() : '0')
                                : (product.price ? product.price.toLocaleString() : '0')
                            } تومان
                        </h6>
                    </div>
                    <div className="col-lg-3 col-6 w-100-in-400">
                        <div className="d-flex justify-content-center">
                            <button
                                onClick={handleAddToCart}
                                disabled={loading || product.stock <= 0}
                                className="btn w-100 border-0 main-color-three-bg"
                            >
                                <i className="bi bi-basket text-white font-20 ms-1"></i>
                                {loading ? 'در حال افزودن...' : (product.stock <= 0 ? 'ناموجود' : 'خرید کالا')}
                            </button>
                        </div>
                        {error && <div className="text-danger mt-2 text-center">{error}</div>}
                    </div>
                    <div className="col-lg-3 col-6 w-100-in-400">
                        <div className="counter">
                            <div className="input-group bootstrap-touchspin bootstrap-touchspin-injected">
                                <span className="input-group-btn input-group-prepend">
                                    <button
                                        className="btn-counter waves-effect waves-light bootstrap-touchspin-down"
                                        type="button"
                                        onClick={decreaseQuantity}
                                        disabled={quantity <= 1 || loading}
                                    >-</button>
                                </span>
                                <input
                                    type="text"
                                    name="count"
                                    className="counter form-counter"
                                    value={quantity}
                                    readOnly
                                />
                                <span className="input-group-btn input-group-append">
                                    <button
                                        className="btn-counter waves-effect waves-light bootstrap-touchspin-up"
                                        type="button"
                                        onClick={increaseQuantity}
                                        disabled={product.stock <= quantity || loading}
                                    >+</button>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

// تابع کمکی برای تبدیل نام رنگ به کد رنگ
function getColorCode(colorName) {
    const colorMap = {
        'قرمز': '#c00',
        'مشکی': '#111',
        'سبز': '#00cc5f',
        'آبی': '#1b69f0',
        'نارنجی': '#ff6600',
        'بنفش': '#6a0dad'
    };

    return colorMap[colorName] || '#ccc';
}

export default ProductDetail;