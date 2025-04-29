"use client";
import React, { useEffect } from 'react';
import styles from './CategorySort.module.css';
import { ImSortAmountDesc } from "react-icons/im";
import { useFilter } from '@/Redux/hooks/useFilter';
import { useDispatch } from 'react-redux';

const CategorySort = () => {
    const dispatch = useDispatch();
    const { sortOption, updateSortOption, applyFilters } = useFilter();

    // تعریف گزینه‌های مرتب‌سازی با مقادیر آنها
    const sortOptions = [
        { id: 'span1', label: 'پیشفرض', value: 'default' },
        { id: 'span2', label: 'محبوب‌ترین', value: 'rating-desc' },
        { id: 'span3', label: 'پرفروش‌ترین', value: 'sales-desc' },
        { id: 'span4', label: 'جدیدترین', value: 'createdAt-desc' },
        { id: 'span5', label: 'ارزان‌ترین', value: 'price-asc' },
        { id: 'span6', label: 'گران‌ترین', value: 'price-desc' }
    ];

    // اعمال فیلتر اولیه در بارگذاری صفحه
    useEffect(() => {
        if (!sortOption) {
            // اگر هیچ گزینه‌ای انتخاب نشده باشد، پیش‌فرض را انتخاب کن
            updateSortOption('default');
        }
    }, [sortOption, updateSortOption]);

    // تغییر گزینه مرتب‌سازی
    const handleSortChange = (sortValue) => {
        updateSortOption(sortValue);
        applyFilters(); // اعمال فیلترها
    };

    return (
        <div className={`mb-3 ${styles.category_sort}`}>
            <div className="content-box">
                <div className="container-fluid">
                    <div className="d-flex align-items-center flex-wrap">
                        <div className='d-flex align-items-center'>
                            <ImSortAmountDesc />
                            <span className={styles.storing}>مرتب سازی:</span>
                        </div>
                        <div className={`me-0 mt-md-0 mt-3 d-flex`}>
                            <div className="d-flex flex-row align-items-center flex-grow-1 gap-1 me-5">
                                {sortOptions.map((option) => (
                                    <React.Fragment key={option.id}>
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
                                            className={styles.spanItem}
                                        >
                                            {option.label}
                                        </label>
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategorySort;