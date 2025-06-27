// C:\Users\LENOVO\Desktop\Nassim_Store\src\components\templates\index\newProduct\NewProduct.js

"use client";
import React from 'react'
import { useProduct } from '@/Redux/hooks/useProduct';
import Link from 'next/link';
import styles from './NewProduct.module.css'
import Card from './Card'

function NewProduct() {
    // دریافت محصولات از Redux
    const { products, productsLoading, productsError } = useProduct();

    // مرتب کردن محصولات بر اساس createdAt (جدیدترین اول)
    const newProducts = [...products]
        .filter(product => product.createdAt) // فقط محصولاتی که تاریخ ایجاد دارند
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // مرتب کردن نزولی
        .slice(0, 12); // 12 محصول جدید

    // کامپوننت Header مشترک
    const HeaderContent = () => (
       <div className="header-content mb-4 bg-white shadow-box rounded-3 p-3 d-flex align-items-center justify-content-between flex-wrap">
            <div className={`${styles.title} d-flex align-items-center`}>
                <div className="bg-danger rounded-2 p-2 me-3">
                    <i className="bi bi-fire text-white"></i>
                </div>
                <h5 className="font-16 ms-3">
                    <span className="main-color-one-color d-inline-block ms-1">محصولات جدید</span>
                </h5>
            </div>
            <div className="link">
                <Link href="/categories" className={`border-animate fromCenter pb-1 fw-bold ${styles.veiwAll}`}>
                    مشاهده همه
                    <i className="bi bi-chevron-double-left main-color-one-color"></i>
                </Link>
            </div>
        </div>
    );
        
    // نمایش loading state
    if (productsLoading) {
        return (
            <div className="products-row py-20">
                <div className="container-fluid">
                    <HeaderContent />
                    <div className="parent">
                        <div className="text-center p-5">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">بارگذاری...</span>
                            </div>
                            <p className="mt-3">در حال بارگذاری محصولات جدید...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // نمایش error state
    if (productsError) {
        return (
            <div className="products-row py-20">
                <div className="container-fluid">
                    <HeaderContent />
                    <div className="parent">
                        <div className="alert alert-warning text-center">
                            <i className="bi bi-exclamation-triangle-fill me-2"></i>
                            خطا در بارگذاری محصولات جدید.
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // اگر محصول جدیدی وجود نداشت
    if (newProducts.length === 0) {
        return (
            <div className="products-row py-20">
                <div className="container-fluid">
                    <HeaderContent />
                    <div className="parent">
                        <div className="text-center text-muted p-5">
                            <i className="bi bi-box me-2"></i>
                            محصول جدیدی موجود نیست.
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="products-row py-20">
            <div className="container-fluid">
                <HeaderContent />
                <div className="parent">
                    <div className="row g-3">
                        {newProducts.map((product, index) => (
                            <Card
                                key={product._id || index}
                                productData={product}
                                rank={index + 1}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewProduct;