'use client';

import React from 'react'
import Link from 'next/link'
import styles from './AmazingCard.module.css'
import Countdown from '@/components/modules/countDownTimer/Countdown'

function AmazingCard({ productData }) {

    // اگر محصول وجود ندارد، کارت خالی نمایش بده
    if (!productData) {
        return (
            <div className={`swiper_slide`}>
                <div className={`${styles.slider_item} rounded-3 shadow-box bg-white`}>
                    <div className="text-center p-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">بارگذاری...</span>
                        </div>
                        <p className="mt-3 text-muted">در حال بارگذاری محصول...</p>
                    </div>
                </div>
            </div>
        );
    }

    // محاسبه درصد تخفیف
    let discountPercentage = 0;
    if (productData.hasDiscount && productData.price && productData.discountedPrice) {
        discountPercentage = Math.round(((productData.price - productData.discountedPrice) / productData.price) * 100);
    } else if (productData.discountPercentage) {
        discountPercentage = productData.discountPercentage;
    }

    // قیمت نهایی
    const finalPrice = productData.discountedPrice || productData.price;
    
    // مسیر تصویر
    const imagePath = productData.image 
        ? `/images/product/${productData.image}` 
        : `https://via.placeholder.com/400x300/f0f0f0/666666?text=${encodeURIComponent(productData.title || 'محصول')}`;

    // تاریخ پایان تخفیف (اگر موجود نبود، یک تاریخ پیش‌فرض)
    const endDate = productData.discountEndDate || 'Dec 31, 2025 23:59:59';

    // توضیحات کوتاه (اگر موجود نبود، متن پیش‌فرض)
    const description = productData.description || productData.shortDescription || 
        'این محصول با کیفیت بالا و قیمت مناسب یکی از بهترین گزینه‌های موجود در بازار محسوب می‌شود و دارای ویژگی‌های منحصر به فردی است.';

    // ویژگی‌های محصول (از دیتابیس features که شامل key و value است)
    const productFeatures = productData.features && Array.isArray(productData.features) && productData.features.length > 0
        ? productData.features
        : null;

    // لاگ برای دیباگ
    console.log('AmazingCard productData.features:', productData.features);
    console.log('AmazingCard productFeatures:', productFeatures);

    return (
        <div className={`swiper_slide`}>
            <div className={`${styles.slider_item} rounded-3 shadow-box bg-white`}>
                <div className="row">
                    <div className="col-lg-4">
                        <div className={`${styles.image}`}>
                            <Link href={`/product/${productData._id}`}>
                                <img 
                                    src={imagePath} 
                                    loading="lazy"
                                    className="img-fluid" 
                                    alt={productData.title || 'محصول'}
                                    onError={(e) => {
                                        e.target.src = `https://via.placeholder.com/400x300/f0f0f0/666666?text=${encodeURIComponent(productData.title || 'محصول')}`;
                                    }}
                                />
                            </Link>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className={`${styles.timer}`}>
                            <Countdown endDate={endDate} />
                        </div>
                        <div className="desc mt-3">
                            <div className={`${styles.title}`}>
                                <div className="d-flex align-items-center flex-wrap">
                                    <Link href={`/product/${productData._id}`} className="text-decoration-none">
                                        <h3 className="text-overflow-1 font-18 ms-2 text-dark">
                                            {productData.title || 'محصول'}
                                        </h3>
                                    </Link>
                                    {discountPercentage > 0 && (
                                        <span className={`discount ${styles.danger_label} mt-sm-0 mt-3`}>
                                            {discountPercentage}% تخفیف
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className={`${styles.short_desc} mt-3`}>
                                <p className="mb-2 text-overflow-3 text-muted">
                                    {description.substring(0, 300)}
                                    {description.length > 300 ? '...' : ''}
                                </p>
                            </div>
                        </div>
                        <div className={`${styles.meta}`}>
                            <ul className="navbar-nav flex-lg-row justify-content-between px-2 py-0">
                                {productFeatures ? (
                                    productFeatures.slice(0, 4).map((feature, index) => (
                                        <li className="nav-item" key={index}>
                                            <span className="nav-link text-overflow-1 font-14 fw-bold">
                                                {feature.key}: {feature.value}
                                            </span>
                                        </li>
                                    ))
                                ) : (
                                    <>
                                        <li className="nav-item">
                                            <span className="nav-link text-overflow-1 font-14 fw-bold">
                                                برند: {productData.brand || 'نامشخص'}
                                            </span>
                                        </li>
                                        <li className="nav-item">
                                            <span className="nav-link text-overflow-1 font-14 fw-bold">
                                                دسته‌بندی: {productData.category?.name || 'عمومی'}
                                            </span>
                                        </li>
                                        <li className="nav-item">
                                            <span className="nav-link text-overflow-1 font-14 fw-bold">
                                                موجودی: {productData.stock > 0 ? 'موجود' : 'ناموجود'}
                                            </span>
                                        </li>
                                        <li className="nav-item">
                                            <span className="nav-link text-overflow-1 font-14 fw-bold">
                                                امتیاز: {productData.rating || 0}/5
                                            </span>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                        <div className="foot mt-3 d-flex justify-content-between align-items-center flex-wrap p-3">
                            <div className="price d-flex align-items-center">
                                <h6 className="font-25 main-color-one-color">
                                    {finalPrice?.toLocaleString() || '0'}
                                </h6>
                                <h6 className="font-12 ms-1">تومان</h6>
                                {productData.hasDiscount && productData.price && (
                                    <h6 className={`font-13 ${styles.old_price} me-2`}>
                                        {productData.price.toLocaleString()}
                                    </h6>
                                )}
                            </div>
                            <div className="link">
                                <Link 
                                    href={`/product/${productData._id}`}
                                    className="btn border-0 rounded-3 main-color-one-bg text-decoration-none"
                                >
                                    <i className="bi bi-eye text-white"></i>
                                    <span className="text-white">مشاهده محصول</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AmazingCard