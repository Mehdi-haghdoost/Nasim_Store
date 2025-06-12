'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import styles from './details.module.css';
import ProductDetail from './ProductDetail';
import Gallery from '../product/product-images-slider/ImageSlider';
import PriceChartModal from './PriceChartModal';
import ShareModal from './ShareModal';
import { useWishlist } from '@/Redux/hooks/useWishlist';

function Details({ product }) {
    const router = useRouter();
    const { 
        addProductToWishlist, 
        removeProductFromWishlist, 
        checkProductInWishlist, 
        isProductInWishlist, 
        isLoadingForProduct 
    } = useWishlist();

    const [showShareModal, setShowShareModal] = useState(false);
    const [showChartModal, setShowChartModal] = useState(false);

    useEffect(() => {
        if (product?._id) {
            checkProductInWishlist(product._id);
        }
    }, [product, checkProductInWishlist]);

    // مدیریت wishlist
    const handleWishlistToggle = (e) => {
        e.preventDefault();
        if (!product?._id) return;

        if (isProductInWishlist(product._id)) {
            removeProductFromWishlist(product._id);
        } else {
            addProductToWishlist(product._id, product);
        }
    };

    // اضافه کردن به مقایسه
    const handleCompareToggle = (e) => {
        e.preventDefault();
        if (!product?._id) return;

        try {
            // دریافت لیست مقایسه از localStorage
            const existingCompare = localStorage.getItem('compareProducts');
            let compareProducts = existingCompare ? JSON.parse(existingCompare) : [];

            // بررسی اینکه محصول قبلاً اضافه شده یا نه
            const isAlreadyInCompare = compareProducts.some(p => p._id === product._id);
            
            if (isAlreadyInCompare) {
                toast.info('این محصول قبلاً به لیست مقایسه اضافه شده است');
                router.push('/compare');
                return;
            }

            // حداکثر 3 محصول قابل مقایسه
            if (compareProducts.length >= 3) {
                toast.warning('حداکثر 3 محصول قابل مقایسه است');
                router.push('/compare');
                return;
            }

            // اضافه کردن محصول جدید
            compareProducts.push(product);
            localStorage.setItem('compareProducts', JSON.stringify(compareProducts));
            
            toast.success('محصول به لیست مقایسه اضافه شد');
            router.push('/compare');
            
        } catch (error) {
            console.error('Error adding to compare:', error);
            toast.error('خطا در اضافه کردن به لیست مقایسه');
        }
    };

    // اشتراک‌گذاری
    const handleShare = (e) => {
        e.preventDefault();
        setShowShareModal(true);
    };

    // نمودار قیمت
    const handleShowChart = (e) => {
        e.preventDefault();
        setShowChartModal(true);
    };

    if (!product) {
        return <div>در حال بارگذاری...</div>;
    }

    const isInWishlist = isProductInWishlist(product._id);
    const isLoading = isLoadingForProduct(product._id);
    
    // تهیه آرایه تصاویر از محصول
    const getProductImages = () => {
        const images = [];
        
        if (product.image) {
            images.push(`/images/product/${product.image}`);
        }
        
        if (product.images && Array.isArray(product.images)) {
            product.images.forEach(img => {
                const imagePath = `/images/product/${img}`;
                if (!images.includes(imagePath)) {
                    images.push(imagePath);
                }
            });
        }
        
        if (images.length === 0) {
            images.push('/images/product/product-placeholder.jpg');
        }
        
        if (images.length === 1) {
            const singleImage = images[0];
            return [singleImage, singleImage, singleImage, singleImage];
        }
        
        return images;
    };

    const productImages = getProductImages();

    return (
        <>
            <div className="product-meta py-20">
                <div className="container-fluid">
                    <div className="content-box">
                        <div className="container-fluid">
                            <div className="row gy-3">
                                <div className="col-lg-4">
                                    <div className={styles.pro_gallery}>
                                        <div className={styles.icon_product_box}>
                                            {/* اشتراک‌گذاری */}
                                            <div 
                                                className={styles.icon_product_box_item} 
                                                onClick={handleShare}
                                                style={{ cursor: 'pointer' }}
                                                data-bs-toggle="tooltip" 
                                                data-bs-placement="right" 
                                                title="اشتراک گذاری"
                                            >
                                                <i className="bi bi-share"></i>
                                            </div>

                                            {/* علاقه‌مندی */}
                                            <div 
                                                className={styles.icon_product_box_item} 
                                                onClick={handleWishlistToggle}
                                                style={{ cursor: 'pointer' }}
                                                data-bs-toggle="tooltip" 
                                                data-bs-placement="right" 
                                                title={isInWishlist ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'}
                                            >
                                                {isLoading ? (
                                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                ) : (
                                                    <i className={`bi ${isInWishlist ? 'bi-heart-fill text-danger' : 'bi-heart'}`}></i>
                                                )}
                                            </div>

                                            {/* مقایسه محصول */}
                                            <div 
                                                className={styles.icon_product_box_item} 
                                                onClick={handleCompareToggle}
                                                style={{ cursor: 'pointer' }}
                                                data-bs-toggle="tooltip" 
                                                data-bs-placement="right" 
                                                title="مقایسه محصول"
                                            >
                                                <i className="bi bi-arrow-left-right"></i>
                                            </div>

                                            {/* نمودار تغییر قیمت */}
                                            <div 
                                                className={styles.icon_product_box_item} 
                                                onClick={handleShowChart}
                                                style={{ cursor: 'pointer' }}
                                                data-bs-toggle="tooltip" 
                                                data-bs-placement="right" 
                                                title="نمودار تغییر قیمت"
                                            >
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

            {/* Modal اشتراک‌گذاری */}
            <ShareModal 
                product={product}
                show={showShareModal}
                onClose={() => setShowShareModal(false)}
            />

            {/* Modal نمودار قیمت */}
            <PriceChartModal 
                product={product}
                show={showChartModal}
                onClose={() => setShowChartModal(false)}
            />
        </>
    );
}

export default Details;