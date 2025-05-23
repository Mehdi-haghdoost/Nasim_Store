import React from 'react';
import styles from './ProductList.module.css';
import Link from 'next/link';

function ProductList({ item }) {
 
    if (!item || !item.product) {
        return null;
    }

    const product = item.product;
    const quantity = item.quantity || 1;
    const selectedColor = item.selectedColor;
    const selectedSize = item.selectedSize;

    // تابع محاسبه قیمت نهایی
    const getFinalPrice = () => {
        const basePrice = product.price || 0;
        const discount = product.discount || 0;
        return basePrice - (basePrice * discount / 100);
    };

    // تابع فرمت قیمت
    const formatPrice = (price) => {
        return (price * quantity).toLocaleString();
    };

    // تابع تعیین تصویر محصول
    const getProductImage = () => {
        if (product.images && product.images.length > 0) {
            return product.images[0];
        }
        if (product.image) {
            return product.image;
        }
        return "/images/product/product-image1.jpg"; // تصویر پیش‌فرض
    };

    return (
        <div className={styles.product_row}>
            <Link href={`/product/${product.id || product._id || '#'}`}>
                <div className={styles.product_row_desc}>
                    <div className={styles.product_row_desc_item}>
                        <div className={styles.product_row_img}>
                            <img 
                                src={getProductImage()} 
                                alt={product.title || product.name || "محصول"} 
                                width="100" 
                                onError={(e) => {
                                    e.target.src = "/images/product/product-image1.jpg";
                                }}
                            />
                        </div>
                        <div className={styles.product_row_title}>
                            <h6>
                                {product.title || product.name || 'نام محصول نامشخص'}
                            </h6>
                            
                            {/* اطلاعات اضافی محصول */}
                            <div className="mb-2">
                                {selectedColor && (
                                    <small className="text-muted me-3">
                                        رنگ: <span className="fw-bold">{selectedColor}</span>
                                    </small>
                                )}
                                {selectedSize && (
                                    <small className="text-muted me-3">
                                        سایز: <span className="fw-bold">{selectedSize}</span>
                                    </small>
                                )}
                                <small className="text-muted">
                                    تعداد: <span className="fw-bold">{quantity}</span>
                                </small>
                            </div>

                            <div className={styles.product_price}>
                                {product.discount && product.discount > 0 ? (
                                    <>
                                        <p className="mb-1">
                                            <span className="text-decoration-line-through text-muted me-2">
                                                {formatPrice(product.price)} تومان
                                            </span>
                                            <span className="badge bg-danger me-2">
                                                {product.discount}% تخفیف
                                            </span>
                                        </p>
                                        <p className="fw-bold text-success">
                                            {formatPrice(getFinalPrice())} تومان
                                        </p>
                                    </>
                                ) : (
                                    <p className="fw-bold">
                                        {formatPrice(product.price || 0)} تومان
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
            
            <div className={styles.order_item_comment}>
                <Link href={`/product/${product.id || product._id || '#'}#comments`}>
                    <i className='bi bi-chat-dots ms-2'></i>
                    ثبت دیدگاه
                </Link>
            </div>
        </div>
    );
}

export default ProductList;