"use client";

import React from 'react'
import styles from './Category.module.css'
import Link from 'next/link'
import CategoryItem from './CategoryItem'
import { useCategory } from '@/Redux/hooks/useCategory'

function Category() {
    // دریافت دسته‌بندی‌ها از Redux
    const { categories, loading, error } = useCategory();

    // نمایش loading state
    if (loading) {
        return (
            <div className="category py-20">
                <div className="container-fluid">
                    <div className="header-content mb-4 bg-white shadow-box rounded-3 p-3 d-flex align-items-center justify-content-between flex-wrap">
                        <div className={`${styles.title} d-flex align-items-center`}>
                            <img src="/images/square.png" alt="" className="img-fluid" />
                            <h5 className="font-16">دسته بندی
                                <span className="main-color-one-color d-inline-block"> محصولات</span>
                            </h5>
                        </div>
                        <div className="link">
                            <Link href={"categories"} className="border-animate fromCenter pb-1 fw-bold d-flex align-items-center">
                                مشاهده همه
                                <i className="bi bi-chevron-double-left main-color-one-color"></i>
                            </Link>
                        </div>
                    </div>
                    <div className={`${styles.category_items}`}>
                        <div className="row gy-3 justify-content-center">
                            <div className="col-12 text-center">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">بارگذاری...</span>
                                </div>
                                <p className="mt-3">در حال بارگذاری دسته‌بندی‌ها...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // نمایش error state
    if (error) {
        return (
            <div className="category py-20">
                <div className="container-fluid">
                    <div className="header-content mb-4 bg-white shadow-box rounded-3 p-3 d-flex align-items-center justify-content-between flex-wrap">
                        <div className={`${styles.title} d-flex align-items-center`}>
                            <img src="/images/square.png" alt="" className="img-fluid" />
                            <h5 className="font-16">دسته بندی
                                <span className="main-color-one-color d-inline-block"> محصولات</span>
                            </h5>
                        </div>
                        <div className="link">
                            <Link href={"categories"} className="border-animate fromCenter pb-1 fw-bold d-flex align-items-center">
                                مشاهده همه
                                <i className="bi bi-chevron-double-left main-color-one-color"></i>
                            </Link>
                        </div>
                    </div>
                    <div className={`${styles.category_items}`}>
                        <div className="row gy-3 justify-content-center">
                            <div className="col-12">
                                <div className="alert alert-warning text-center">
                                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                    خطا در بارگذاری دسته‌بندی‌ها. لطفاً دوباره تلاش کنید.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // اگر دسته‌بندی وجود نداشت
    if (!categories || categories.length === 0) {
        return (
            <div className="category py-20">
                <div className="container-fluid">
                    <div className="header-content mb-4 bg-white shadow-box rounded-3 p-3 d-flex align-items-center justify-content-between flex-wrap">
                        <div className={`${styles.title} d-flex align-items-center`}>
                            <img src="/images/square.png" alt="" className="img-fluid" />
                            <h5 className="font-16">دسته بندی
                                <span className="main-color-one-color d-inline-block"> محصولات</span>
                            </h5>
                        </div>
                        <div className="link">
                            <Link href={"categories"} className="border-animate fromCenter pb-1 fw-bold d-flex align-items-center">
                                مشاهده همه
                                <i className="bi bi-chevron-double-left main-color-one-color"></i>
                            </Link>
                        </div>
                    </div>
                    <div className={`${styles.category_items}`}>
                        <div className="row gy-3 justify-content-center">
                            <div className="col-12 text-center text-muted">
                                <i className="bi bi-folder-x me-2"></i>
                                هیچ دسته‌بندی‌ای یافت نشد.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // تعریف mapping برای تصاویر دسته‌بندی‌ها
    const getCategoryImage = (categoryName, categoryIcon) => {
        const imageMap = {
            'تلفن همراه': '/images/mobile.png',
            'کالای دیجیتال': '/images/digital-product.png',
            'گجت های گیمینگ': '/images/speaker-gaming.png',
            'کنسول بازی': '/images/console.png',
            'آنتی ویروس': '/images/antivirus.png',
            'لپتاپ': '/images/laptop.png',
            'لوازم جانبی': '/images/janebi.png',
            'ساعت های هوشمند': '/images/smartWatch.jpg',
        };

        // اگر تصویر خاص برای این دسته‌بندی وجود داشت، از آن استفاده کن
        if (imageMap[categoryName]) {
            return imageMap[categoryName];
        }

        // در غیر این صورت، تصویر پیش‌فرض بر اساس آیکون
        return '/images/default-category.png';
    };

    return (
        <div className="category py-20">
            <div className="container-fluid">
                <div className="header-content mb-4 bg-white shadow-box rounded-3 p-3 d-flex align-items-center justify-content-between flex-wrap">
                    <div className={`${styles.title} d-flex align-items-center`}>
                        <img src="/images/square.png" alt="" className="img-fluid" />
                        <h5 className="font-16">دسته بندی
                            <span className="main-color-one-color d-inline-block"> محصولات</span>
                        </h5>
                    </div>
                    <div className="link">
                        <Link href={"categories"} className="border-animate fromCenter pb-1 fw-bold d-flex align-items-center">
                            مشاهده همه
                            <i className="bi bi-chevron-double-left main-color-one-color"></i>
                        </Link>
                    </div>
                </div>
                <div className={`${styles.category_items}`}>
                    <div className="row gy-3 justify-content-center">
                        {categories.map((category) => (
                            <CategoryItem
                                key={category._id}
                                categoryId={category._id}
                                title={category.name}
                                icon={category.icon}
                                src={getCategoryImage(category.name, category.icon)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Category