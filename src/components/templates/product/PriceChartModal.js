'use client';

import React from 'react';

const PriceChartModal = ({ product, show, onClose }) => {
    // اگر modal نمایش داده نشود یا محصول وجود نداشته باشد
    if (!show || !product) {
        return null;
    }

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

    return (
        <div 
            className="modal fade show d-block" 
            tabIndex="-1" 
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            onClick={handleBackdropClick}
        >
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header d-flex align-items-center justify-content-between">
                        <h5 className="modal-title">نمودار تغییر قیمت</h5>
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
                            <div>
                                <h6 className="mb-1">{product.title}</h6>
                                <p className="text-muted mb-0 small">{product.originalName}</p>
                            </div>
                        </div>

                        {/* محتوای اصلی modal */}
                        <div className="text-center py-4">
                            <i className="bi bi-bar-chart text-primary" style={{ fontSize: '4rem' }}></i>
                            <h6 className="mt-3 mb-3">نمودار تغییر قیمت</h6>
                            <p className="text-muted mb-4">
                                نمودار تاریخچه قیمت برای این محصول در حال حاضر در دسترس نیست.
                            </p>
                            
                            {/* اطلاعات قیمت فعلی */}
                            <div className="alert alert-info">
                                <div className="row text-center">
                                    <div className="col-md-6">
                                        <strong className="d-block">قیمت فعلی:</strong>
                                        <span className="h5 text-primary">
                                            {(product.hasDiscount ? product.discountedPrice : product.price).toLocaleString('fa-IR')} تومان
                                        </span>
                                    </div>
                                    
                                    {product.hasDiscount && (
                                        <div className="col-md-6">
                                            <strong className="d-block">قیمت قبلی:</strong>
                                            <span className="text-decoration-line-through text-muted">
                                                {product.price.toLocaleString('fa-IR')} تومان
                                            </span>
                                            <div className="mt-2">
                                                <span className="badge text-success success-label rounded-pill px-3 py-1">
                                                    {Math.round((1 - product.discountedPrice / product.price) * 100)}% تخفیف
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* اطلاعات اضافی */}
                            <div className="row text-center mt-4">
                                {product.rating && (
                                    <div className="col-4">
                                        <div className="p-3 bg-light rounded">
                                            <i className="bi bi-star-fill text-warning"></i>
                                            <div className="mt-2">
                                                <strong>{product.rating}</strong>
                                                <small className="d-block text-muted">امتیاز</small>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                
                                {product.salesCount && (
                                    <div className="col-4">
                                        <div className="p-3 bg-light rounded">
                                            <i className="bi bi-cart-check text-success"></i>
                                            <div className="mt-2">
                                                <strong>{product.salesCount}</strong>
                                                <small className="d-block text-muted">فروش</small>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                
                                {product.customerSatisfaction && (
                                    <div className="col-4">
                                        <div className="p-3 bg-light rounded">
                                            <i className="bi bi-heart-fill text-danger"></i>
                                            <div className="mt-2">
                                                <strong>{product.customerSatisfaction}%</strong>
                                                <small className="d-block text-muted">رضایت</small>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* پیام اطلاع‌رسانی */}
                            <div className="alert alert-warning mt-4">
                                <i className="bi bi-info-circle me-2"></i>
                                <small>
                                    این قابلیت به زودی اضافه خواهد شد و می‌توانید روند تغییر قیمت محصولات را مشاهده کنید.
                                </small>
                            </div>
                        </div>
                    </div>
                    
                    <div className="modal-footer justify-content-center">
                        <button 
                            type="button" 
                            className="btn main-color-one-bg"
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

export default PriceChartModal;