'use client';
import React, { useEffect } from 'react';
import styles from './details.module.css';
import ProductDetail from './ProductDetail';
import Gallery from '../product/product-images-slider/ImageSlider';
import { useWishlist } from '@/Redux/hooks/useWishlist';

function Details({ product }) {
    const { 
        addProductToWishlist, 
        removeProductFromWishlist, 
        checkProductInWishlist, 
        isProductInWishlist, 
        isLoadingForProduct 
    } = useWishlist();

    useEffect(() => {
        if (product?._id) {
            checkProductInWishlist(product._id);
        }
    }, [product, checkProductInWishlist]);

    const handleWishlistToggle = (e) => {
        e.preventDefault();
        if (!product?._id) return;

        if (isProductInWishlist(product._id)) {
            removeProductFromWishlist(product._id);
        } else {
            addProductToWishlist(product._id, product);
        }
    };

    if (!product) {
        return <div>در حال بارگذاری...</div>;
    }

    const isInWishlist = isProductInWishlist(product._id);
    const isLoading = isLoadingForProduct(product._id);
    
    // تهیه آرایه تصاویر از محصول
    const getProductImages = () => {
        const images = [];
        
        // اگر محصول تصویر اصلی دارد
        if (product.image) {
            images.push(`/images/product/${product.image}`);
        }
        
        // اگر محصول آرایه تصاویر دارد
        if (product.images && Array.isArray(product.images)) {
            product.images.forEach(img => {
                const imagePath = `/images/product/${img}`;
                // جلوگیری از تکرار تصویر
                if (!images.includes(imagePath)) {
                    images.push(imagePath);
                }
            });
        }
        
        // اگر هیچ تصویری نبود، تصویر پیش‌فرض
        if (images.length === 0) {
            images.push('/images/product/product-placeholder.jpg');
        }
        
        // اگر فقط یک عکس داریم، آن را 4 بار تکرار کن برای thumbnail
        if (images.length === 1) {
            const singleImage = images[0];
            return [singleImage, singleImage, singleImage, singleImage];
        }
        
        return images;
    };

    const productImages = getProductImages();

    return (
        <div className="product-meta py-20">
            <div className="container-fluid">
                <div className="content-box">
                    <div className="container-fluid">
                        <div className="row gy-3">
                            <div className="col-lg-4">
                                <div className={styles.pro_gallery}>
                                    <div className={styles.icon_product_box}>
                                        <div className={styles.icon_product_box_item} data-bs-toggle="modal" data-bs-target="#shareModal" data-bs-placement="right" aria-label="اشتراک گذاری" data-bs-original-title="اشتراک گذاری">
                                            <i className="bi bi-share"></i>
                                        </div>
                                        <div 
                                            className={styles.icon_product_box_item} 
                                            onClick={handleWishlistToggle}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {isLoading ? (
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            ) : (
                                                <i className={`bi ${isInWishlist ? 'bi-heart-fill text-danger' : 'bi-heart'}`}></i>
                                            )}
                                        </div>
                                        <div className={styles.icon_product_box_item} data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="مقایسه محصول">
                                            <i className="bi bi-arrow-left-right"></i>
                                        </div>
                                        <div className={styles.icon_product_box_item} data-bs-toggle="modal" data-bs-target="#chartModal" data-toggle="tooltip" data-bs-placement="right" aria-label="نمودار تغییر قیمت" data-bs-original-title="نمودار تغییر قیمت">
                                            <i className="bi bi-bar-chart"></i>
                                        </div>
                                    </div>
                                    <Gallery images={productImages} />
                                </div>
                            </div>
                            <div className="col-lg-8">
                                <ProductDetail product={product} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Details;