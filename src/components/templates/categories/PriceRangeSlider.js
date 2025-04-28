"use client";

import React, { useState, useEffect } from 'react';
import { FiRefreshCw } from 'react-icons/fi';
import styles from './PriceRangeSlider.module.css';
import { useProduct } from '../../../Redux/hooks/useProduct';

const PriceRangeSlider = () => {
    const { products, productsLoading } = useProduct();
    const [priceRange, setPriceRange] = useState({ min: 0, max: 50000000 });
    const [priceStats, setPriceStats] = useState({ min: 0, max: 50000000 });

    // محاسبه کمترین و بیشترین قیمت محصولات
    useEffect(() => {
        if (products && products.length > 0) {
            let minPrice = Number.MAX_SAFE_INTEGER;
            let maxPrice = 0;

            products.forEach(product => {
                // استفاده از قیمت تخفیف خورده اگر موجود باشد
                const price = product.hasDiscount ? product.discountedPrice : product.price;

                if (price < minPrice) minPrice = price;
                if (price > maxPrice) maxPrice = price;
            });

            // گرد کردن قیمت‌ها برای راحتی کاربر
            minPrice = Math.floor(minPrice / 1000000) * 1000000;
            maxPrice = Math.ceil(maxPrice / 1000000) * 1000000;

            setPriceStats({ min: minPrice, max: maxPrice });
            setPriceRange({ min: minPrice, max: maxPrice });
        }
    }, [products]);

    const handlePriceChange = (e) => {
        const { name, value } = e.target;
        setPriceRange({ ...priceRange, [name]: Number(value) });
    };

    const resetSlider = () => {
        setPriceRange({ min: priceStats.min, max: priceStats.max });
    };

    // تبدیل اعداد به فرمت پول ایران
    const formatPrice = (price) => {
        return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
    };

    return (
        <div>
            <h5 className={styles.filter_item_title}>قیمت</h5>
            <div className={styles.filter_item_content}>
                {productsLoading ? (
                    <div className="text-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">در حال بارگذاری...</span>
                        </div>
                    </div>
                ) : (
                    <div className='p-3 mx-auto bg-white rounded d-flex flex-column align-items-center mb-3 w-100'>
                        <div className='d-flex justify-content-between w-100'>
                            <input
                                type='range'
                                name='min'
                                min={priceStats.min}
                                max={priceStats.max}
                                value={priceRange.min}
                                onChange={handlePriceChange}
                                className='form-range d-none d-sm-block d-md-block d-lg-block d-xl-block d-xxl-block'
                            />
                            <input
                                type='range'
                                name='max'
                                min={priceStats.min}
                                max={priceStats.max}
                                value={priceRange.max}
                                onChange={handlePriceChange}
                                className='form-range d-none d-sm-block d-md-block d-lg-block d-xl-block d-xxl-block'
                            />
                        </div>
                        <div className='fs-6 fw-medium'>
                            {formatPrice(priceRange.min)} - {formatPrice(priceRange.max)}
                        </div>
                        <button
                            onClick={resetSlider}
                            className={`btn px-4 py-2 bg-primary text-white rounded d-flex align-items-center ${styles.reset_price} mt-2 border-0`}
                            style={{ backgroundColor: "#007bff", borderRadius: "0.25rem" }}
                        >
                            <FiRefreshCw className='ms-2' />
                            بازنشانی
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PriceRangeSlider;