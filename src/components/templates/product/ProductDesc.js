"use client";
import React, { useState } from 'react'
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

    // استفاده از هوک useCart برای دسترسی به عملکردهای سبد خرید
    const { addToCart, loading, error } = useCart();

    // افزودن به سبد خرید
    const handleAddToCart = (e) => {
        e.preventDefault();

        if (!product) {
            console.error('اطلاعات محصول در دسترس نیست');
            return;
        }

        // افزودن محصول به سبد خرید
        console.log('Adding from ProductDesc:', {
            productId: product._id,
            color: null,
            size: null,
            sellerId: null
        });
        
        addToCart(product, productCount, null, null);
    };

    // داده پیش‌فرض محصول برای استفاده در صورتی که prop product موجود نباشد
    const defaultProduct = {
        _id: '1',
        name: 'ساعت هوشمند سامسونگ مدل Galaxy Watch3 SM-R840 45mm بند چرمی',
        price: 1200000,
        originalPrice: 1500000,
        images: ['/images/product/laptop-1.jpg'],
        brand: 'شیائومی',
        brandImage: '/images/brand1-1.png',
        commentCount: 16,
        ratingCount: 17,
        rating: 4.5,
        stock: 14
    };

    // استفاده از داده‌های واقعی یا پیش‌فرض
    const productData = product || defaultProduct;

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
                                            {tab === "comments" && <Comments product={productData} />}
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
                                                <img src={productData.image || "/images/product/laptop-1.jpg"} className='img-fluid' alt="" />
                                            </div>
                                        </div>
                                        <div className="col-8">
                                            <a href="">
                                                <div className={styles.product_float_title}>
                                                    <h6 className='font-16'>
                                                        {productData.name}
                                                    </h6>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="product-meta-color-items mt-3">
                                    {productData.colors ? (
                                        productData.colors.map((color, index) => (
                                            <React.Fragment key={index}>
                                                <input
                                                    type="radio"
                                                    className="btn-check"
                                                    name="colorOptions"
                                                    id={`colorFloatOption${index}`}
                                                    autoComplete="off"
                                                    defaultChecked={index === 0}
                                                    disabled={!color.available}
                                                />
                                                <label className="btn" htmlFor={`colorFloatOption${index}`}>
                                                    <span style={{ backgroundColor: color.code }}></span>
                                                    {color.name}
                                                </label>
                                            </React.Fragment>
                                        ))
                                    ) : (
                                        <>
                                            <input
                                                type="radio"
                                                className="btn-check"
                                                name="options"
                                                id="option11"
                                                autoComplete="off"
                                            />
                                            <label className="btn" htmlFor="option11">
                                                <span style={{ backgroundColor: '#c00' }}></span>
                                                قرمز
                                            </label>

                                            <input
                                                type="radio"
                                                className="btn-check"
                                                name="options"
                                                id="option21"
                                                autoComplete="off"
                                            />
                                            <label className="btn" htmlFor="option21">
                                                <span style={{ backgroundColor: '#111' }}></span>
                                                مشکی
                                            </label>

                                            <input
                                                type="radio"
                                                className="btn-check"
                                                name="options"
                                                id="option31"
                                                autoComplete="off"
                                                disabled
                                            />
                                            <label className="btn" htmlFor="option31">
                                                <span style={{ backgroundColor: '#00cc5f' }}></span>
                                                سبز
                                            </label>

                                            <input
                                                type="radio"
                                                className="btn-check"
                                                name="options"
                                                id="option41"
                                                autoComplete="off"
                                            />
                                            <label className="btn" htmlFor="option41">
                                                <span style={{ backgroundColor: '#1b69f0' }}></span>
                                                آبی
                                            </label>
                                        </>
                                    )}
                                </div>
                                <div className={`${styles.product_float_brand} my-3`}>
                                    <a href="" className='d-inline'>
                                        <img src={productData.brandImage || "/images/brand1-1.png"} className='img-fluid' alt="" />
                                        <p className='mb-0 mr-2 d-inline'>{productData.brand || 'شیائومی'}</p>
                                    </a>
                                </div>
                                <div className={styles.product_meta_rating}>
                                    <div className='d-flex align-items-center'>
                                        <div className={`text-muted ${styles.count_comment}`}>
                                            {productData.commentCount || '16'} دیدگاه
                                        </div>
                                        <div className={styles.count_rating}>
                                            <span>({productData.ratingCount || '17'}) {productData.rating || '4.5'}</span>
                                            <GoStarFill />
                                        </div>
                                    </div>
                                </div>
                                <div className={`${styles.product_meta_garanty} justify-content-start`}>
                                    <i className='bi bi-shield-fill-check'></i>
                                    <span className='text-muted'>گارانتی اصالت و سلامت فیزیکی کالا</span>
                                </div>
                                <div className={`${styles.product_meta_price} p-0 bg-transparent shadow-none`} >
                                    <div className='row gy-3'>
                                        <div className="col-6 w-100-in-400">
                                            <p className={`mb-0 ${styles.old_price} font-16 text-lg-start text-center`}>
                                                {productData.originalPrice ? `${productData.originalPrice.toLocaleString()} تومان` : '1,500,000 تومان'}
                                            </p>
                                        </div>
                                        <div className="col-6 w-100-in-400">
                                            <h6 className={`font-16 ${styles.new_price} main-color-one-color`}>
                                                {productData.price ? `${productData.price.toLocaleString()} تومان` : '1,200,000 تومان'}
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                                <div className={`${styles.product_meta_action} p-0 bg-transparent shadow-none`}>
                                    <div className="row gy-3">
                                        <div className="col-12 w-100-in-400">
                                            <div className={styles.counter}>
                                                <div className="input-group">
                                                    <span className="input-group-btn input-group-prepend">
                                                        <button
                                                            className="btn-counter waves-effect waves-light bootstrap-touchspin-down"
                                                            type="button"
                                                            onClick={() => setProductCount(productCount > 1 ? productCount - 1 : 1)}
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
                                                            onClick={() => setProductCount(productCount + 1)}
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
                                                    disabled={loading}
                                                    className='btn border-0 main-color-three-bg w-100'
                                                >
                                                    <i className='bi bi-basket text-white font-20 ms-1'></i>
                                                    {loading ? 'در حال افزودن...' : 'خرید کالا'}
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