"use client";
import React, { useState, useEffect } from 'react'
import styles from './ProductDesc.module.css'
import Descriptions from './Descriptions';
import Specifications from './Specifications';
import Informations from './Informations';
import Comments from './Comments';
import { GoStarFill } from "react-icons/go";
import { useCart } from '@/Redux/hooks/useCart';

function ProductDesc({ product }) {
    const [tab, setTab] = useState('descriptions');
    const [productCount, setProductCount] = useState(1);
    // اضافه کردن state برای مدیریت رنگ انتخاب شده
    const [selectedColor, setSelectedColor] = useState(null);

    // استفاده از هوک useCart برای دسترسی به عملکردهای سبد خرید
    const { addToCart, loading, error } = useCart();

    // تنظیم رنگ پیش‌فرض هنگام لود کامپوننت
    useEffect(() => {
        if (product?.colors && product.colors.length > 0) {
            // انتخاب اولین رنگ موجود
            const firstAvailableColor = product.colors.find(color => color.available);
            if (firstAvailableColor) {
                setSelectedColor(firstAvailableColor.color);
            }
        }
    }, [product]);

    // افزایش تعداد محصول با بررسی موجودی
    const increaseQuantity = () => {
        if (product && product.stock > productCount) {
            setProductCount(productCount + 1);
        }
    };

    // کاهش تعداد محصول
    const decreaseQuantity = () => {
        if (productCount > 1) {
            setProductCount(productCount - 1);
        }
    };

    // افزودن به سبد خرید
    // const handleAddToCart = (e) => {
    //     e.preventDefault();

    //     if (!product) {
    //         console.error('اطلاعات محصول در دسترس نیست');
    //         return;
    //     }

    //     // احتمال دارد سلر‌آیدی نیاز باشد
    //     const sellerId = product?.sellers && product.sellers.length > 0 ? product.sellers[0]._id : null;

    //     addToCart(product, productCount, selectedColor, null, sellerId);
    // };

    const handleAddToCart = (e) => {
        e.preventDefault();

        if (!product) {
            console.error('اطلاعات محصول در دسترس نیست');
            return;
        }

        const sellerId = product?.sellers && product.sellers.length > 0 ? product.sellers[0]._id : null;
        addToCart(product, productCount, selectedColor, null, sellerId);
    };

    // تابع کمکی برای تبدیل نام رنگ به کد رنگ
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

    // استفاده از داده‌های واقعی یا پیش‌فرض
    const productData = product || {
        _id: '1',
        title: 'ساعت هوشمند سامسونگ مدل Galaxy Watch3 SM-R840 45mm بند چرمی',
        originalName: 'Samsung Galaxy Watch3 SM-R840 45mm',
        price: 1200000,
        discountedPrice: 1000000,
        hasDiscount: true,
        image: '/images/product/laptop-1.jpg',
        brandIcon: '/images/brand1-1.png',
        comments: [],
        rating: 4.5,
        stock: 14
    };
    return (
        <div className={`${styles.product_desc} py-20`}>
            <div className='container-fluid'>
                <div className='row gy-3'>
                    <div className='col-lg-9'>
                        <div className='content-box'>
                            <div className='container-fluid'>
                                <div className={styles.product_desc}>
                                    <div className={styles.product_desc_tab}>
                                        <ul className={`${styles.product_desc_list} nav`}>
                                            <li className='nav-item'>
                                                <button
                                                    className={tab === "descriptions" ? styles.active_tab : ""}
                                                    onClick={() => setTab("descriptions")}
                                                >
                                                    توضیحات کالا
                                                </button>
                                            </li>
                                            <li className='nav-item'>
                                                <button
                                                    className={tab === "specifications" ? styles.active_tab : ""}
                                                    onClick={() => setTab("specifications")}
                                                >
                                                    مشخصات کالا
                                                </button>
                                            </li>
                                            <li className='nav-item'>
                                                <button
                                                    className={tab === "additional_informations" ? styles.active_tab : ""}
                                                    onClick={() => setTab("additional_informations")}
                                                >
                                                    توضیحات تکمیلی
                                                </button>
                                            </li>
                                            <li className='nav-item'>
                                                <button
                                                    className={tab === "comments" ? styles.active_tab : ""}
                                                    onClick={() => setTab("comments")}
                                                >
                                                    نظرات
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className={styles.product_desc_tab_content}>
                                        <section>
                                            {tab === "descriptions" && <Descriptions product={productData} />}
                                            {tab === "specifications" && <Specifications product={productData} />}
                                            {tab === "additional_informations" && <Informations product={productData} />}
                                            {tab === "comments" && <Comments product={product} />}
                                        </section>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-3 d-lg-block d-none position-relative'>
                        <div className={`top-0 position-sticky ${styles.content_box}`}>
                            <div className="container-fluid">
                                <div className={styles.product_float_header}>
                                    <div className="row align-items-center gy-2">
                                        <div className="col-4">
                                            <div className={styles.product_float_image}>
                                                <img src={`/images/product/${productData.image}`} className='img-fluid' alt="" />
                                            </div>
                                        </div>
                                        <div className="col-8">
                                            <div className={styles.product_float_title}>
                                                <h6 className='font-16 text-truncate' style={{ maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                    {productData.title || productData.originalName}
                                                </h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* رنگ‌های محصول */}
                                {productData.colors && productData.colors.length > 0 && (
                                    <div className="product-meta-color mt-3">
                                        <h6 className="font-14 mb-2">انتخاب رنگ کالا</h6>
                                        <div className="product-meta-color-items">
                                            {productData.colors.map((colorItem, index) => (
                                                <React.Fragment key={index}>
                                                    <input
                                                        type="radio"
                                                        className="btn-check"
                                                        name="colorFloatOptions"
                                                        id={`colorFloatOption${index}`}
                                                        autoComplete="off"
                                                        checked={selectedColor === colorItem.color}
                                                        onChange={() => setSelectedColor(colorItem.color)}
                                                        disabled={!colorItem.available}
                                                    />
                                                    <label className="btn" htmlFor={`colorFloatOption${index}`}>
                                                        <span style={{ backgroundColor: getColorCode(colorItem.color) }}></span>
                                                        {colorItem.color}
                                                    </label>
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* برند محصول */}
                                <div className={`${styles.product_float_brand} my-3`}>
                                    {productData.brandIcon && (
                                        <div className="d-inline">
                                            <img src={productData.brandIcon.startsWith('/') ? productData.brandIcon : `/images/${productData.brandIcon}`}
                                                className='img-fluid' alt="برند محصول" />
                                        </div>
                                    )}
                                </div>

                                {/* امتیاز و نظرات */}
                                <div className={styles.product_meta_rating}>
                                    <div className='d-flex align-items-center'>
                                        <div className={`text-muted ${styles.count_comment}`}>
                                            {productData.comments ? productData.comments.length : '0'} دیدگاه
                                        </div>
                                        <div className={styles.count_rating}>
                                            <span>({productData.rating || '0'}) {productData.rating || '0'}</span>
                                            <GoStarFill />
                                        </div>
                                    </div>
                                </div>

                                {/* گارانتی */}
                                <div className={`${styles.product_meta_garanty} justify-content-start`}>
                                    <i className='bi bi-shield-fill-check'></i>
                                    <span className='text-muted'>گارانتی اصالت و سلامت فیزیکی کالا</span>
                                </div>

                                {/* موجودی */}
                                <div className={`${styles.productmeta_count} text-muted mt-2`}>
                                    <span>{productData.stock || '0'} عدد در انبار</span>
                                </div>

                                {/* قیمت */}
                                <div className={`${styles.product_meta_price} p-0 bg-transparent shadow-none mt-3`} >
                                    <div className='row gy-3'>
                                        {productData.hasDiscount && (
                                            <div className="col-6 w-100-in-400">
                                                <p className={`mb-0 ${styles.old_price} font-16 text-lg-start text-center text-decoration-line-through`}>
                                                    {productData.price ? `${productData.price.toLocaleString()} تومان` : '1,500,000 تومان'}
                                                </p>
                                            </div>
                                        )}
                                        <div className="col-6 w-100-in-400">
                                            <h6 className={`font-16 ${styles.new_price} main-color-one-color`}>
                                                {productData.hasDiscount
                                                    ? (productData.discountedPrice ? `${productData.discountedPrice.toLocaleString()} تومان` : '1,200,000 تومان')
                                                    : (productData.price ? `${productData.price.toLocaleString()} تومان` : '1,200,000 تومان')
                                                }
                                            </h6>
                                        </div>
                                    </div>
                                </div>

                                {/* کنترل تعداد و دکمه خرید */}
                                <div className={`${styles.product_meta_action} p-0 bg-transparent shadow-none mt-3`}>
                                    <div className="row gy-3">
                                        <div className="col-12 w-100-in-400">
                                            <div className={styles.counter}>
                                                <div className="input-group">
                                                    <span className="input-group-btn input-group-prepend">
                                                        <button
                                                            className="btn-counter waves-effect waves-light bootstrap-touchspin-down"
                                                            type="button"
                                                            onClick={decreaseQuantity}
                                                            disabled={productCount <= 1 || loading}
                                                        >
                                                            -
                                                        </button>
                                                    </span>
                                                    <input
                                                        type="number"
                                                        name="count"
                                                        className="counter form-counter"
                                                        value={productCount}
                                                        readOnly
                                                    />
                                                    <span className="input-group-btn input-group-append">
                                                        <button
                                                            className="btn-counter waves-effect waves-light bootstrap-touchspin-up"
                                                            type="button"
                                                            onClick={increaseQuantity}
                                                            disabled={(productData.stock && productData.stock <= productCount) || loading}
                                                        >
                                                            +
                                                        </button>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-12 w-100-in-400'>
                                            <div className='d-flex justify-content-center'>
                                                <button
                                                    onClick={handleAddToCart}
                                                    disabled={loading || (product && product.stock <= 0)}
                                                    className='btn border-0 main-color-three-bg w-100'
                                                >
                                                    <i className='bi bi-basket text-white font-20 ms-1'></i>
                                                    {loading ? 'در حال افزودن...' : (productData.stock <= 0 ? 'ناموجود' : 'خرید کالا')}
                                                </button>
                                            </div>
                                            {error && <div className="text-danger mt-2 text-center">{error}</div>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDesc