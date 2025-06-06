"use client";
import React, { useEffect, useState } from 'react';
import styles from './CategorySort.module.css';
import { ImSortAmountDesc } from "react-icons/im";
import { useFilter } from '@/Redux/hooks/useFilter';
import { useDispatch } from 'react-redux';

const CategorySort = () => {
    const dispatch = useDispatch();
    const { sortOption, updateSortOption, applyFilters } = useFilter();
    const [isMobile, setIsMobile] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [isHydrated, setIsHydrated] = useState(false); // اضافه کردن isHydrated

    // تعریف گزینه‌های مرتب‌سازی با مقادیر آنها
    const sortOptions = [
        { id: 'span1', label: 'پیشفرض', value: 'default' },
        { id: 'span2', label: 'محبوب‌ترین', value: 'rating-desc' },
        { id: 'span3', label: 'پرفروش‌ترین', value: 'sales-desc' },
        { id: 'span4', label: 'جدیدترین', value: 'createdAt-desc' },
        { id: 'span5', label: 'ارزان‌ترین', value: 'price-asc' },
        { id: 'span6', label: 'گران‌ترین', value: 'price-desc' }
    ];

    // رفع hydration error
    useEffect(() => {
        setIsHydrated(true);
    }, []);

    // تشخیص سایز صفحه - رفع hydration error
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth <= 600);
        };

        // فقط در client-side اجرا شه
        if (typeof window !== 'undefined') {
            checkScreenSize();
            window.addEventListener('resize', checkScreenSize);
            return () => window.removeEventListener('resize', checkScreenSize);
        }
    }, []);

    // اعمال فیلتر اولیه در بارگذاری صفحه
    useEffect(() => {
        if (!sortOption) {
            updateSortOption('default');
        }
    }, [sortOption, updateSortOption]);

    // تغییر گزینه مرتب‌سازی
    const handleSortChange = (sortValue) => {
        updateSortOption(sortValue);
        applyFilters();
        if (isMobile) {
            setShowDropdown(false);
        }
    };

    // پیدا کردن label انتخاب شده
    const getSelectedLabel = () => {
        const selected = sortOptions.find(option => option.value === sortOption);
        return selected ? selected.label : 'پیشفرض';
    };

    // رندر Desktop Version
    const renderDesktop = () => (
        <div className="d-flex align-items-center flex-wrap">
            <div className='d-flex align-items-center mb-2 mb-md-0'>
                <ImSortAmountDesc />
                <span className={styles.storing}>مرتب سازی:</span>
            </div>
            <div className={`ms-0 ms-md-3 d-flex flex-wrap`}>
                <div className={`d-flex flex-wrap align-items-center ${styles.sort_options_container}`}>
                    {sortOptions.map((option, index) => (
                        <div key={option.id} className={`${styles.sort_option_wrapper} me-2 mb-2`}>
                            <input 
                                type="radio" 
                                name="spanColor" 
                                id={option.id} 
                                className={styles.radio}
                                checked={sortOption === option.value}
                                onChange={() => handleSortChange(option.value)}
                            />
                            <label 
                                htmlFor={option.id} 
                                className={`${styles.spanItem} ${styles.responsive_label}`}
                            >
                                {option.label}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    // رندر Mobile Version (Dropdown)
    const renderMobile = () => (
        <div className="d-flex align-items-center justify-content-between w-100 flex-wrap">
            <div className='d-flex align-items-center mb-2 mb-sm-0'>
                <ImSortAmountDesc />
                <span className={styles.storing}>مرتب سازی:</span>
            </div>
            <div className={`position-relative ${styles.dropdown_container}`}>
                <button
                    className={`btn btn-outline-secondary dropdown-toggle ${styles.mobile_dropdown_btn}`}
                    type="button"
                    onClick={() => setShowDropdown(!showDropdown)}
                >
                    {getSelectedLabel()}
                </button>
                {showDropdown && (
                    <>
                        {/* Backdrop */}
                        <div
                            className="position-fixed top-0 start-0 w-100 h-100"
                            style={{ zIndex: 999 }}
                            onClick={() => setShowDropdown(false)}
                        />
                        {/* Dropdown Menu */}
                        <div className={`dropdown-menu show ${styles.custom_dropdown_menu}`}>
                            {sortOptions.map((option) => (
                                <button
                                    key={option.id}
                                    className={`dropdown-item ${styles.custom_dropdown_item} ${sortOption === option.value ? styles.active_item : ''}`}
                                    type="button"
                                    onClick={() => handleSortChange(option.value)}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );

    return (
        <div className={`mb-3 ${styles.category_sort}`}>
            <div className="content-box">
                <div className="container-fluid">
                    {!isHydrated ? (
                        // Loading state تا hydration کامل شه
                        <div className="d-flex align-items-center">
                            <ImSortAmountDesc />
                            <span className={styles.storing}>مرتب سازی:</span>
                            <div className="ms-3">
                                <div className="spinner-border spinner-border-sm text-muted" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        isMobile ? renderMobile() : renderDesktop()
                    )}
                </div>
            </div>
        </div>
    );
};

export default CategorySort;