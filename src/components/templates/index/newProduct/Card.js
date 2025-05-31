import React from 'react'
import Link from 'next/link'
import styles from './Card.module.css'

function Card({ productData, rank }) {
    // اگر محصول وجود ندارد، هیچی نشان نده
    if (!productData) {
        return null;
    }

    // تنظیم مسیر تصویر - فقط از سرور یا placeholder
    const imagePath = productData.image 
        ? `/images/product/${productData.image}` 
        : `https://via.placeholder.com/150x100/f0f0f0/666666?text=${encodeURIComponent(productData.title || 'محصول')}`;

    return (
        <div className="col-lg-3 col-sm-6">
            <div className={`${styles.item} bg-white p-2 shadow-box rounded-3`}>
                <div className="row gy-2 align-items-center">
                    <div className="col-4">
                        <div className="image">
                            <Link href={`/product/${productData._id}`}>
                                <img 
                                    src={imagePath} 
                                    alt={productData.title || "محصول"} 
                                    className="img-fluid"
                                    onError={(e) => {
                                        e.target.src = `https://via.placeholder.com/150x100/f0f0f0/666666?text=${encodeURIComponent(productData.title || 'محصول')}`;
                                    }}
                                />
                            </Link>
                        </div>
                    </div>
                    <div className="col-8">
                        <div className="d-flex align-items-center">
                            <div className="number ms-2">
                                <h4 className="font-22 main-color-one-color">{rank || 1}</h4>
                            </div>
                            <Link href={`/product/${productData._id}`} className="text-decoration-none">
                                <div className={`${styles.title}`}>
                                    <h6 className="font-14 text-overflow-2 text-dark">
                                        {productData.title || 'لپ تاپ 14.2 اینچی اپل مدل 2021 MacBook MKGR3 M1 Pro'}
                                    </h6>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;