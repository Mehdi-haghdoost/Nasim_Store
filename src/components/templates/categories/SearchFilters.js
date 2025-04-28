'use client'
import React from 'react'
import styles from './SearchFilters.module.css';
import PriceRangeSlider from './PriceRangeSlider';
import { useCategory } from '../../../Redux/hooks/useCategory';

const SearchFilters = () => {
    const { categories, loading } = useCategory();

    // تابع کمکی برای دریافت آیکون متناسب با نام آیکون
    const getIconClass = (iconName) => {
        const iconMap = {
            'phone': 'bi-phone',
            'earbuds': 'bi-earbuds',
            'tablet': 'bi-tablet',
            'headset': 'bi-headset',
            'controller': 'bi-controller',
            'laptop': 'bi-laptop',
            'headphones': 'bi-headphones',
            'smartwatch': 'bi-smartwatch',
            'cpu': 'bi-cpu',
            // می‌توانید آیکون‌های بیشتری اضافه کنید
            'default': 'bi-tag' // آیکون پیش‌فرض
        };

        return iconMap[iconName] || iconMap.default;
    };

    return (
        <div className={`${styles.filter_items} position-sticky top-0`}>
            <div className="container-fluid">
                {/* ... بقیه کد بدون تغییر ... */}
                <div className={styles.filter_item}>
                    <h5 className={styles.filter_item_title}>دسته بندی ها</h5>
                    <div className={styles.filter_item_content}>
                        <form action="">
                            {loading ? (
                                <div className="text-center">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">در حال بارگذاری...</span>
                                    </div>
                                </div>
                            ) : (
                                categories.map((category) => (
                                    <div key={category._id} className='d-flex align-items-center justify-content-between flex-wrap mb-3'>
                                        <div className='form-check d-flex'>
                                            <input
                                                type="checkbox"
                                                id={`category-${category._id}`}
                                                className='form-check-input ms-2'
                                            />
                                            <label htmlFor={`category-${category._id}`} className='form-check-label'>
                                                {category.name}
                                                <i className={`bi ${getIconClass(category.icon)} ms-1`}></i>
                                            </label>
                                        </div>
                                        <div>
                                            <span className="fw-bold font-14">
                                                {category.products?.length ? `(${category.products.length})` : '(0)'}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </form>
                    </div>
                </div>
                {/* ... بقیه کد بدون تغییر ... */}
            </div>
        </div>
    )
}

export default SearchFilters;