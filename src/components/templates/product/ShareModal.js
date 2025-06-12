'use client';

import React from 'react';
import { toast } from 'react-toastify';

const ShareModal = ({ product, show, onClose }) => {
    // اگر modal نمایش داده نشود یا محصول وجود نداشته باشد
    if (!show || !product) {
        return null;
    }

    // کپی کردن لینک
    const handleCopyLink = async () => {
        try {
            const url = window.location.href;
            await navigator.clipboard.writeText(url);
            toast.success('لینک کپی شد');
            onClose();
        } catch (error) {
            console.error('Error copying link:', error);
            toast.error('خطا در کپی کردن لینک');
        }
    };

    // مدیریت کلیک روی backdrop برای بستن modal
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    // مدیریت کلید ESC برای بستن modal
    React.useEffect(() => {
        const handleEscKey = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (show) {
            document.addEventListener('keydown', handleEscKey);
            // جلوگیری از scroll کردن background
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscKey);
            document.body.style.overflow = 'unset';
        };
    }, [show, onClose]);

    // تولید لینک‌های اشتراک‌گذاری
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
    const productTitle = product.title || '';

    const shareLinks = {
        telegram: `https://telegram.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(productTitle)}`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent(productTitle + ' - ' + currentUrl)}`,
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(productTitle)}&url=${encodeURIComponent(currentUrl)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`
    };

    return (
        <div
            className="modal fade show d-block"
            tabIndex="-1"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            onClick={handleBackdropClick}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header d-flex align-items-center justify-content-between">
                        <h5 className="modal-title">اشتراک‌گذاری محصول</h5>
                        <button
                            type="button"
                            className="btn-close ms-0"
                            onClick={onClose}
                            aria-label="بستن"
                        ></button>
                    </div>

                    <div className="modal-body">
                        {/* اطلاعات محصول */}
                        <div className="d-flex align-items-center mb-4 p-3 bg-light rounded">
                            <img
                                src={`/images/product/${product.image}`}
                                alt={product.title}
                                className="rounded me-3"
                                style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                                onError={(e) => {
                                    e.target.src = '/images/product/product-placeholder.jpg';
                                }}
                            />
                            <div className="flex-grow-1">
                                <h6 className="mb-1 text-truncate" style={{ maxWidth: '250px' }}>
                                    {product.title}
                                </h6>
                                <p className="text-muted mb-0 small text-truncate" style={{ maxWidth: '250px' }}>
                                    {product.originalName}
                                </p>
                                {product.hasDiscount && (
                                    <div className="mt-1">
                                        <span className="badge text-success success-label rounded-pill px-3 py-1">
                                            {Math.round((1 - product.discountedPrice / product.price) * 100)}% تخفیف
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* گزینه‌های اشتراک‌گذاری */}
                        <div className="row g-3">
                            {/* کپی لینک */}
                            <div className="col-6">
                                <button
                                    className="btn btn-outline-info w-100 d-flex align-items-center justify-content-center"
                                    onClick={handleCopyLink}
                                >
                                    <i className="bi bi-clipboard ms-2"></i>
                                    کپی لینک
                                </button>
                            </div>

                            {/* تلگرام */}
                            <div className="col-6">
                                <button
                                    href={shareLinks.telegram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center text-decoration-none"
                                >
                                    <i className="bi bi-telegram ms-2"></i>
                                    تلگرام
                                </button>
                            </div>

                            {/* واتساپ */}
                            <div className="col-6">
                                <button
                                    href={shareLinks.whatsapp}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-outline-success w-100 d-flex align-items-center justify-content-center text-decoration-none"
                                >
                                    <i className="bi bi-whatsapp ms-2"></i>
                                    واتساپ
                                </button>
                            </div>

                            {/* توییتر */}
                            <div className="col-6">
                                <button
                                    href={shareLinks.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-outline-dark w-100 d-flex align-items-center justify-content-center text-decoration-none"
                                >
                                    <i className="bi bi-twitter ms-2"></i>
                                    توییتر
                                </button>
                            </div>

                            {/* لینکدین */}
                            <div className="col-12">
                                <button
                                    href={shareLinks.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn main-color-three-bg w-100 d-flex align-items-center justify-content-center text-decoration-none"
                                >
                                    <i className="bi bi-linkedin text-white ms-2"></i>
                                    لینکدین
                                </button>
                            </div>
                        </div>

                        {/* اطلاعات اضافی */}
                        <div className="mt-4 p-3 bg-light rounded">
                            <div className="row text-center">
                                <div className="col-4">
                                    <small className="text-muted d-block">قیمت</small>
                                    <strong className="text-primary">
                                        {(product.hasDiscount ? product.discountedPrice : product.price).toLocaleString('fa-IR')} تومان
                                    </strong>
                                </div>

                                {product.rating && (
                                    <div className="col-4">
                                        <small className="text-muted d-block">امتیاز</small>
                                        <strong>
                                            <i className="bi bi-star-fill text-warning ms-1"></i>
                                            {product.rating}
                                        </strong>
                                    </div>
                                )}

                                {product.stock && (
                                    <div className="col-4">
                                        <small className="text-muted d-block">موجودی</small>
                                        <strong className={product.stock > 0 ? 'text-success' : 'text-danger'}>
                                            {product.stock > 0 ? `${product.stock} عدد` : 'ناموجود'}
                                        </strong>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer justify-content-center">
                        <button
                            type="button"
                            className="btn main-color-three-bg"
                            onClick={onClose}
                        >
                            بستن
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShareModal;