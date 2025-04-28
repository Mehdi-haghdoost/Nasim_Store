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
                <div className={styles.filter_item}>
                    <h5 className={styles.filter_item_title}>جستجو</h5>
                    <div className={styles.filter_item_content}>
                        <div className={styles.search_form}>
                            <form action="">
                                <div className={styles.search_field}>
                                    <input type="text" placeholder='جستجوی محصولات ...' className={`form-control ${styles.search_input}`} />
                                    <button className={`btn main-color-one-bg rounded-pill ${styles.search_btn}`} type='submit'>
                                        <i className="bi bi-search"></i>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
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
                <div className={styles.filter_item}>
                    <PriceRangeSlider />
                </div>
                <div className={styles.filter_item}>
                    <h5 className={styles.filter_item_title}>رنگ محصول</h5>
                    <div className={styles.filter_item_content}>
                        <div className='product-meta-color-items'>
                            <input type="radio" className='btn-check' name='options' id='option11'
                                autoComplete='off'
                            />
                            <label htmlFor="option11" className='btn'>
                                <span style={{ backgroundColor: "#c00" }}></span>
                                قرمز
                            </label>

                            <input type="radio" className='btn-check' name='options' id='option22'
                                autoComplete='off' defaultChecked
                            />
                            <label htmlFor="option22" className='btn'>
                                <span style={{ backgroundColor: "#111" }}></span>
                                مشکی
                            </label>

                            <input type="radio" className='btn-check' name='options' id='option33'
                                autoComplete='off'
                            />
                            <label htmlFor="option33" className='btn'>
                                <span style={{ backgroundColor: "#00cc5f" }}></span>
                                سبز
                            </label>

                            <input type="radio" className='btn-check' name='options' id='option44'
                                autoComplete='off'
                            />
                            <label htmlFor="option44" className='btn'>
                                <span style={{ backgroundColor: "#1b69f0" }}></span>
                                آبی
                            </label>

                            <input type="radio" className='btn-check' name='options' id='option55'
                                autoComplete='off'
                            />
                            <label htmlFor="option55" className='btn'>
                                <span style={{ backgroundColor: "#891bf0" }}></span>
                                بنفش
                            </label>

                            <input type="radio" className='btn-check' name='options' id='option66'
                                autoComplete='off'
                            />
                            <label htmlFor="option66" className='btn'>
                                <span style={{ backgroundColor: "#f0501b" }}></span>
                                نارنجی
                            </label>
                        </div>
                    </div>
                </div>
                <div className={`${styles.filter_item} text-center`}>
                    <a href="" className={styles.btn_outline_site}>
                        اعمال فیلتر
                    </a>
                </div>
            </div>
        </div>
    )
}

export default SearchFilters