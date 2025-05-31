import React from 'react'
import Link from 'next/link'
import styles from './MiniCard.module.css'

function MiniCard({ productData }) {
    // اگر محصول وجود ندارد، چیزی نمایش نده
    if (!productData) {
        return null;
    }

    // قیمت نهایی
    const finalPrice = productData.discountedPrice || productData.price;
    
    // مسیر تصویر - فقط از سرور یا placeholder
    const imagePath = productData.image 
        ? `/images/product/${productData.image}` 
        : `https://via.placeholder.com/200x150/f0f0f0/666666?text=${encodeURIComponent(productData.title || 'محصول')}`;

    return (
        <div className={`${styles.miniCard}`}>
            <div className={`${styles.item}`}>
                <div className="row gy-2">
                    <div className="col-4">
                        <div className="image">
                            <Link href={`/product/${productData._id}`}>
                                <img 
                                    src={imagePath} 
                                    loading="lazy"
                                    alt={productData.title || 'محصول'} 
                                    className="img-fluid"
                                    onError={(e) => {
                                        e.target.src = `https://via.placeholder.com/200x150/f0f0f0/666666?text=${encodeURIComponent(productData.title || 'محصول')}`;
                                    }}
                                />
                            </Link>
                        </div>
                    </div>
                    <div className="col-8">
                        <div className={`${styles.title}`}>
                            <Link href={`/product/${productData._id}`} className="text-decoration-none">
                                <h6 className="font-14 text-overflow-2 text-dark">
                                    {productData.title || 'محصول'}
                                </h6>
                            </Link>
                            <p className="mb-0 text-muted font-12 mt-2 text-overflow-2">
                                {productData.originalName || productData.brand || 'برند نامشخص'}
                            </p>
                        </div>
                        <div className={`${styles.price} d-flex`}>
                            <p className="text-end new-price mb-2 price-off fw-bold">
                                <span className="main-color-one-color">
                                    {finalPrice?.toLocaleString() || '0'}
                                </span> 
                                <small className="font-11">تومان</small>
                            </p>
                            {productData.hasDiscount && productData.price && productData.discountedPrice && (
                                <p className={`text-end ${styles.old_price} price-discount`}>
                                    {productData.price.toLocaleString()} 
                                    <small className="font-11">تومان</small>
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MiniCard