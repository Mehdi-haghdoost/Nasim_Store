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
        if (!product?._id) return;
        removeProductFromWishlist(product._id);
    };

    const handleAddToCart = () => {
        if (!product?._id) return;
        
        // برای محافظت، یک نسخه تمیز از محصول با فیلدهای مورد نیاز برای سبد خرید ایجاد می‌کنیم
        const cartProduct = {
            _id: product._id,
            title: product.title || 'محصول بدون نام',
            originalName: product.originalName || '',
            price: product.price || 0,
            discountedPrice: product.discountedPrice || product.price || 0,
            hasDiscount: product.hasDiscount || false,
            image: product.image || '',
            stock: product.stock || 0
        };
        
        addToCart(cartProduct, 1, null, null)
            .unwrap()
            .then(() => {
                toast.success(`${product.title || 'محصول'} به سبد خرید اضافه شد`, {
                    position: "bottom-right",
                    autoClose: 3000
                });
            })
            .catch((error) => {
                console.error('Error adding to cart:', error);
                toast.error('خطا در افزودن به سبد خرید');
            });
    };

    // اگر محصولی وجود نداشت، نمایش پیام خالی بودن
    if (!product || !product._id) {
        return null;
    }

    // استفاده از مقادیر واقعی محصول با fallback برای داده‌های مفقود
    const productImage = product.image ? `/images/product/${product.image}` : '/images/product/product-image1.jpg';
    const productLink = `/product/${product._id}`;
    const productTitle = product.title || 'نام محصول موجود نیست';
    
    // نمایش قیمت با تخفیف اگر وجود داشته باشد
    const productPrice = product.hasDiscount && product.discountedPrice ? 
        `${product.discountedPrice.toLocaleString()} تومان` : 
        product.price ? 
        `${product.price.toLocaleString()} تومان` : 
        'قیمت موجود نیست';

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