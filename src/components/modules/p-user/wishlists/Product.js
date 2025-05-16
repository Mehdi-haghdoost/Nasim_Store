// import React from 'react'
// import styles from './Product.module.css';
// import Link from 'next/link';

// const Card = () => {
//     return (
//         <div className='product-list-row'>
//             <div className={styles.product_row}>
//                 <div className={styles.product_row_desc}>
//                     <Link href={"/product/1"}>
//                         <div className={styles.product_row_desc_item}>
//                             <div className={styles.product_row_img}>
//                                 <img src="/images/product/product-image1.jpg" alt="product" width="100" />
//                             </div>
//                             <div className={styles.product_row_title}>
//                                 <h6>
//                                     گوشی موبایل سامسونگ مدل Galaxy A50 SM-A505F/DS دو سیم کارت ظرفیت 128گیگابایت
//                                 </h6>
//                                 <div className={styles.product_price}>
//                                     <p>
//                                         7,500,000 تومان
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>
//                     </Link>
//                     <div className={styles.product_row_icon}>
//                         <div className={styles.tooltip}>
//                             <a className="btn btn-danger btn-sm ms-2" >
//                                 <i className="bi bi-trash text-white"></i>
//                             </a>
//                             <span className={styles.tooltipText}>حذف محصول</span>
//                         </div>
//                         <div className={styles.tooltip}>
//                             <a href="" className="btn main-color-one-bg btn-sm">
//                                 <i className="bi bi-cart-plus text-white"></i>
//                             </a>
//                             <span className={styles.tooltipText}>افزودن به سبد خرید</span>
//                         </div>

//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Card;
'use client';
import React from 'react';
import styles from './Product.module.css';
import Link from 'next/link';
import { useWishlist } from '@/Redux/hooks/useWishlist';
import { useCart } from '@/Redux/hooks/useCart';
import { toast } from 'react-toastify';

const Card = ({ product }) => {
    const { removeProductFromWishlist } = useWishlist();
    const { addToCart } = useCart();

    const handleRemoveFromWishlist = () => {
        removeProductFromWishlist(product._id);
    };

    const handleAddToCart = () => {
        addToCart(product, 1, null, null)
            .unwrap()
            .then(() => {
                toast.success(`${product.title} به سبد خرید اضافه شد`, {
                    position: "bottom-right",
                    autoClose: 3000
                });
            })
            .catch((error) => {
                console.error('Error adding to cart:', error);
                toast.error('خطا در افزودن به سبد خرید: ' + (error.message || 'خطای ناشناخته'));
            });
    };

    // اگر محصولی وجود نداشت، نمایش پیام خالی بودن
    if (!product) {
        return null;
    }

    // استفاده از مقادیر واقعی محصول
    const productImage = product.image ? `/images/product/${product.image}` : '/images/product/product-image1.jpg';
    const productLink = `/product/${product._id}`;
    const productTitle = product.title || 'نام محصول موجود نیست';
    const productPrice = product.price ? `${product.price.toLocaleString()} تومان` : 'قیمت موجود نیست';

    return (
        <div className='product-list-row'>
            <div className={styles.product_row}>
                <div className={styles.product_row_desc}>
                    <Link href={productLink}>
                        <div className={styles.product_row_desc_item}>
                            <div className={styles.product_row_img}>
                                <img src={productImage} alt={productTitle} width="100" />
                            </div>
                            <div className={styles.product_row_title}>
                                <h6>{productTitle}</h6>
                                <div className={styles.product_price}>
                                    <p>{productPrice}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <div className={styles.product_row_icon}>
                        <div className={styles.tooltip}>
                            <button onClick={handleRemoveFromWishlist} className="btn btn-danger btn-sm ms-2">
                                <i className="bi bi-trash text-white"></i>
                            </button>
                            <span className={styles.tooltipText}>حذف محصول</span>
                        </div>
                        <div className={styles.tooltip}>
                            <button onClick={handleAddToCart} className="btn main-color-one-bg btn-sm">
                                <i className="bi bi-cart-plus text-white"></i>
                            </button>
                            <span className={styles.tooltipText}>افزودن به سبد خرید</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;