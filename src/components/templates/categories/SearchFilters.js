'use client'
import React, { useState, useEffect } from 'react'
import styles from './SearchFilters.module.css';
import PriceRangeSlider from './PriceRangeSlider';
import { useCategory } from '../../../Redux/hooks/useCategory';
import { useSelector, useDispatch } from 'react-redux';
import { filterProducts } from '../../../Redux/actions/filterThunks';
import { setCategories, setSelectedColor, setPriceRange, setSearchTerm } from '../../../Redux/slices/filterSlice';

const SearchFilters = () => {
    const { categories, loading: categoriesLoading } = useCategory();
    const dispatch = useDispatch();

    // دریافت فیلترهای فعلی از Redux
    const { categories: selectedCategoryIds, priceRange, selectedColor, searchTerm } = useSelector(state => state.filter);

    // state‌های محلی برای فیلترها
    const [localCategories, setLocalCategories] = useState(selectedCategoryIds || []);
    const [localColor, setLocalColor] = useState(selectedColor || '');
    const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm || '');
    const [localPriceRange, setLocalPriceRange] = useState(priceRange || { min: 0, max: 50000000 });

    // به‌روزرسانی state‌های محلی وقتی فیلترهای Redux تغییر می‌کنند
    useEffect(() => {
        setLocalCategories(selectedCategoryIds || []);
        setLocalColor(selectedColor || '');
        setLocalSearchTerm(searchTerm || '');
        setLocalPriceRange(priceRange || { min: 0, max: 50000000 });
    }, [selectedCategoryIds, selectedColor, searchTerm, priceRange]);

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
            'default': 'bi-tag'
        };

        return iconMap[iconName] || iconMap.default;
    };

    // مدیریت تغییر در دسته‌بندی‌های انتخاب شده
    const handleCategoryChange = (categoryId) => {
        // تبدیل به رشته برای اطمینان از سازگاری
        const categoryIdStr = categoryId.toString();

        const updatedCategories = localCategories.includes(categoryIdStr)
            ? localCategories.filter(id => id !== categoryIdStr)
            : [...localCategories, categoryIdStr];

        setLocalCategories(updatedCategories);

        // اعمال فوری تغییر دسته‌بندی
        dispatch(setCategories(updatedCategories));
        dispatch(filterProducts());
    };

    // مدیریت تغییر در رنگ انتخاب شده
    const handleColorChange = (color) => {
        const newColor = localColor === color ? '' : color;
        setLocalColor(newColor);
    };

    // مدیریت تغییر در عبارت جستجو
    const handleSearchChange = (e) => {
        setLocalSearchTerm(e.target.value);
    };

    // مدیریت تغییر در بازه قیمت
    const handlePriceRangeChange = (newRange) => {
        setLocalPriceRange(newRange);
    };

    // جستجوی فوری
    const handleSearchNow = () => {
        dispatch(setSearchTerm(localSearchTerm));
        dispatch(filterProducts());
    };

    // اعمال همه فیلترها
    const handleApplyFilters = (e) => {
        e.preventDefault();

        dispatch(setPriceRange(localPriceRange));
        dispatch(setSelectedColor(localColor));
        dispatch(setSearchTerm(localSearchTerm));
        dispatch(filterProducts());
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
                                    <input
                                        type="text"
                                        placeholder='جستجوی محصولات ...'
                                        className={`form-control ${styles.search_input}`}
                                        value={localSearchTerm}
                                        onChange={handleSearchChange}
                                    />
                                    <button
                                        className={`btn main-color-one-bg rounded-pill ${styles.search_btn}`}
                                        type='button'
                                        onClick={handleSearchNow}
                                    >
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
                            {categoriesLoading ? (
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
                                                checked={localCategories.includes(category._id.toString())}
                                                onChange={() => handleCategoryChange(category._id)}
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
                    <PriceRangeSlider onRangeChange={handlePriceRangeChange} initialRange={localPriceRange} />
                </div>
                <div className={styles.filter_item}>
                    <h5 className={styles.filter_item_title}>رنگ محصول</h5>
                    <div className={styles.filter_item_content}>
                        <div className='product-meta-color-items'>
                            <input
                                type="radio"
                                className='btn-check'
                                name='options'
                                id='option11'
                                autoComplete='off'
                                checked={localColor === 'red'}
                                onChange={() => handleColorChange('red')}
                            />
                            <label htmlFor="option11" className='btn'>
                                <span style={{ backgroundColor: "#c00" }}></span>
                                قرمز
                            </label>

                            <input
                                type="radio"
                                className='btn-check'
                                name='options'
                                id='option22'
                                autoComplete='off'
                                checked={localColor === 'black'}
                                onChange={() => handleColorChange('black')}
                            />
                            <label htmlFor="option22" className='btn'>
                                <span style={{ backgroundColor: "#111" }}></span>
                                مشکی
                            </label>

                            <input
                                type="radio"
                                className='btn-check'
                                name='options'
                                id='option33'
                                autoComplete='off'
                                checked={localColor === 'green'}
                                onChange={() => handleColorChange('green')}
                            />
                            <label htmlFor="option33" className='btn'>
                                <span style={{ backgroundColor: "#00cc5f" }}></span>
                                سبز
                            </label>

                            <input
                                type="radio"
                                className='btn-check'
                                name='options'
                                id='option44'
                                autoComplete='off'
                                checked={localColor === 'blue'}
                                onChange={() => handleColorChange('blue')}
                            />
                            <label htmlFor="option44" className='btn'>
                                <span style={{ backgroundColor: "#1b69f0" }}></span>
                                آبی
                            </label>

                            <input
                                type="radio"
                                className='btn-check'
                                name='options'
                                id='option55'
                                autoComplete='off'
                                checked={localColor === 'purple'}
                                onChange={() => handleColorChange('purple')}
                            />
                            <label htmlFor="option55" className='btn'>
                                <span style={{ backgroundColor: "#891bf0" }}></span>
                                بنفش
                            </label>

                            <input
                                type="radio"
                                className='btn-check'
                                name='options'
                                id='option66'
                                autoComplete='off'
                                checked={localColor === 'orange'}
                                onChange={() => handleColorChange('orange')}
                            />
                            <label htmlFor="option66" className='btn'>
                                <span style={{ backgroundColor: "#f0501b" }}></span>
                                نارنجی
                            </label>
                        </div>
                    </div>
                </div>
                <div className={`${styles.filter_item} text-center`}>
                    <a href="#" onClick={handleApplyFilters} className={styles.btn_outline_site}>
                        اعمال فیلتر
                    </a>
                </div>
            </div>
        </div>
    )
}

export default SearchFilters;