// C:\Users\LENOVO\Desktop\Nassim_Store\src\components\templates\p-user\order-detail\ProductList.js

import React from 'react';
import styles from './ProductList.module.css';
import Link from 'next/link';

function ProductList({ item, orderId }) {
    // اگر item وجود نداشت
    if (!item) {
        return null;
    }

    // دریافت اطلاعات محصول از item
    const product = item.product || {};
    const quantity = item.quantity || 1;
    const itemName = item.name || product.title || 'محصول نامشخص';
    const itemPrice = item.price || product.price || 0;
    const itemImage = item.image || product.image || 'product-image1.jpg';

    // محاسبه قیمت نهایی با احتساب تخفیف
    const getFinalPrice = () => {
        // اگر محصول تخفیف دارد
        if (product.hasDiscount && product.discountedPrice) {
            return product.discountedPrice;
        }
        // در غیر این صورت از قیمت item استفاده کن
        return itemPrice;
    };

    // فرمت قیمت با در نظر گیری تعداد
    const formatPrice = (price) => {
        return (price * quantity).toLocaleString();
    };

    // محاسبه درصد تخفیف
    const getDiscountPercentage = () => {
        if (product.hasDiscount && product.price && product.discountedPrice) {
            return Math.round(((product.price - product.discountedPrice) / product.price) * 100);
        }
        return 0;
    };

    // دریافت تصویر محصول
    const getProductImage = () => {
        const imageName = itemImage;
        
        // اگر تصویر شامل مسیر کامل نباشد، مسیر را اضافه کن
        if (imageName.startsWith('/images/')) {
            return imageName;
        }
        return `/images/product/${imageName}`;
    };

    // دریافت لینک محصول
    const getProductLink = () => {
        const productId = product._id;
        if (productId) {
            return `/product/${productId}`;
        }
        return '#';
    };

    // دریافت لینک فاکتور
    const getInvoiceLink = () => {
        if (orderId && orderId !== '#') {
            return `/p-user/orders/${orderId}/invoice`;
        }
        return '/p-user/orders';
    };

    const finalPrice = getFinalPrice();
    const discountPercentage = getDiscountPercentage();

    return (
        <div className={styles.product_row}>
            <div className={styles.product_row_desc}>
                <div className={styles.product_row_desc_item}>
                    {/* تصویر محصول */}
                    <div className={styles.product_row_img}>
                        <Link href={getProductLink()}>
                            <img 
                                src={getProductImage()}
                                alt={itemName}
                                width="100" 
                                height="100"
                                style={{ objectFit: 'cover', borderRadius: '8px' }}
                                onError={(e) => {
                                    e.target.src = "/images/product/product-image1.jpg";
                                }}
                            />
                        </Link>
                    </div>

                    {/* اطلاعات محصول */}
                    <div className={styles.product_row_title}>
                        <Link href={getProductLink()}>
                            <h6 className="mb-2 fw-bold">
                                {itemName}
                            </h6>
                        </Link>
                        
                        {/* تعداد محصول */}
                        <div className="mb-3">
                            <div className="row g-2">
                                <div className="col-auto">
                                    <span className="badge bg-primary">
                                        <i className="bi bi-box ms-1"></i>
                                        {quantity} عدد
                                    </span>
                                </div>
                                {product.originalName && (
                                    <div className="col-auto">
                                        <span className="badge bg-light text-dark border">
                                            <i className="bi bi-translate ms-1"></i>
                                            {product.originalName}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* قیمت محصول */}
                        <div className={styles.product_price}>
                            {discountPercentage > 0 ? (
                                <div>
                                    <div className="d-flex align-items-center mb-2">
                                        <span className="text-decoration-line-through text-muted ms-3 font-14">
                                            {formatPrice(product.price)} تومان
                                        </span>
                                        <span className="badge bg-danger">
                                            {discountPercentage}% تخفیف
                                        </span>
                                    </div>
                                    <div className="fw-bold text-success fs-6">
                                        {formatPrice(finalPrice)} تومان
                                    </div>
                                </div>
                            ) : (
                                <div className="fw-bold fs-6">
                                    {formatPrice(finalPrice)} تومان
                                </div>
                            )}
                            
                            {/* قیمت واحد در صورت وجود چند تعداد */}
                            {quantity > 1 && (
                                <small className="text-muted d-block mt-1">
                                    قیمت واحد: {finalPrice.toLocaleString()} تومان
                                </small>
                            )}
                        </div>

                        {/* اطلاعات اضافی محصول */}
                        <div className="mt-3">
                            <div className="row g-2">
                                {product.brandIcon && (
                                    <div className="col-auto">
                                        <small className="text-muted">
                                            <i className="bi bi-award ms-1"></i>
                                            برند معتبر
                                        </small>
                                    </div>
                                )}
                                {product.rating && (
                                    <div className="col-auto">
                                        <small className="text-muted">
                                            <i className="bi bi-star-fill text-warning ms-1"></i>
                                            امتیاز: <strong>{product.rating}</strong>
                                        </small>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* دکمه‌های عملیات */}
            <div className={styles.order_item_comment}>
                <div className="d-flex gap-2 flex-wrap">
                    <Link 
                        href={getInvoiceLink()}
                        className="btn btn-outline-primary btn-sm"
                    >
                        <i className='bi bi-receipt ms-2'></i>
                        مشاهده فاکتور
                    </Link>
                    
                    <Link 
                        href={getProductLink()}
                        className="btn btn-outline-secondary btn-sm"
                    >
                        <i className='bi bi-eye ms-2'></i>
                        مشاهده محصول
                    </Link>
                    
                    {/* دکمه نظر دادن */}
                    <button 
                        className="btn btn-outline-success btn-sm" 
                        title="ثبت نظر"
                        onClick={() => {
                            // می‌توانید اینجا modal نظرات را باز کنید
                            console.log('ثبت نظر برای محصول:', product._id);
                        }}
                    >
                        <i className='bi bi-chat-dots ms-2'></i>
                        ثبت نظر
                    </button>
                </div>
                
                {/* اطلاعات اضافی */}
                <div className="mt-2">
                    <small className="text-muted">
                        <i className="bi bi-info-circle ms-1"></i>
                        شناسه محصول: {product._id || 'نامشخص'}
                    </small>
                </div>
            </div>
        </div>
    );
}

export default ProductList;