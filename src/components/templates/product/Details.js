// // C:\Users\LENOVO\Desktop\Nassim_Store\src\components\templates\product\Details.js

// 'use client';
// import React, { useEffect } from 'react';
// import styles from './details.module.css';
// import ProductDetail from './ProductDetail';
// import Gallery from '../product/product-images-slider/ImageSlider';
// import { useWishlist } from '@/Redux/hooks/useWishlist';
// import { toast } from 'react-toastify'; // Import toast for user feedback
// import { useRouter } from 'next/navigation'; // For navigation in Next.js 13/14 App Router

// function Details({ product }) {
//     const { 
//         addProductToWishlist, 
//         removeProductFromWishlist, 
//         checkProductInWishlist, 
//         isProductInWishlist, 
//         isLoadingForProduct 
//     } = useWishlist();

//     const router = useRouter(); // Initialize useRouter hook

//     useEffect(() => {
//         if (product?._id) {
//             checkProductInWishlist(product._id);
//         }
//     }, [product, checkProductInWishlist]);

//     const handleWishlistToggle = (e) => {
//         e.preventDefault();
//         if (!product?._id) return;

//         if (isProductInWishlist(product._id)) {
//             removeProductFromWishlist(product._id);
//         } else {
//             addProductToWishlist(product._id, product);
//         }
//     };

//     /**
//      * Handles sharing the product URL using the Web Share API or copying to clipboard.
//      */
//     const handleShareProduct = async () => {
//         if (!product?.title || !product?._id) {
//             toast.error('اطلاعات محصول برای اشتراک گذاری کامل نیست.');
//             return;
//         }

//         const productUrl = `${window.location.origin}/product/${product._id}`;

//         if (navigator.share) {
//             try {
//                 // Use Web Share API if available (for mobile devices)
//                 await navigator.share({
//                     title: product.title,
//                     text: `محصول ${product.title} را در نسیم استور مشاهده کنید:`,
//                     url: productUrl,
//                 });
//                 toast.success('محصول با موفقیت به اشتراک گذاشته شد.');
//             } catch (error) {
//                 // User cancelled or share failed
//                 if (error.name !== 'AbortError') {
//                     console.error('Error sharing product:', error);
//                     toast.error('خطا در اشتراک گذاری محصول.');
//                 }
//             }
//         } else {
//             // Fallback for browsers that don't support Web Share API (copy to clipboard)
//             try {
//                 await navigator.clipboard.writeText(productUrl);
//                 toast.success('لینک محصول کپی شد!');
//             } catch (err) {
//                 console.error('Failed to copy product URL:', err);
//                 toast.error('خطا در کپی کردن لینک محصول.');
//             }
//         }
//     };

//     /**
//      * Adds the current product to localStorage for comparison and navigates to the compare page.
//      */
//     const handleCompareProduct = () => {
//         if (!product?._id) {
//             toast.error('محصولی برای افزودن به مقایسه یافت نشد.');
//             return;
//         }

//         try {
//             const storedProducts = JSON.parse(localStorage.getItem('compareProducts') || '[]');
//             // Ensure no more than 3 products for comparison
//             if (storedProducts.length >= 3 && !storedProducts.some(p => p._id === product._id)) {
//                 toast.warn('حداکثر 3 محصول را می‌توان مقایسه کرد. ابتدا یک محصول را حذف کنید.');
//                 return;
//             }

//             // Check if product is already in compare list
//             const isAlreadyInCompare = storedProducts.some(p => p._id === product._id);
//             if (isAlreadyInCompare) {
//                 toast.info('این محصول از قبل در لیست مقایسه شما قرار دارد.');
//                 router.push('/compare'); // Navigate even if already exists, to show the list
//                 return;
//             }

//             const updatedProducts = [...storedProducts, {
//                 _id: product._id,
//                 title: product.title,
//                 image: product.image,
//                 price: product.price,
//                 discountedPrice: product.discountedPrice,
//                 hasDiscount: product.hasDiscount,
//                 originalName: product.originalName,
//                 reviewCount: product.reviewCount,
//                 rating: product.rating,
//                 brandIcon: product.brandIcon,
//                 colors: product.colors,
//                 sellers: product.sellers,
//                 category: product.category,
//                 features: product.features,
//             }];
//             localStorage.setItem('compareProducts', JSON.stringify(updatedProducts));
//             toast.success('محصول به لیست مقایسه اضافه شد!');
//             router.push('/compare'); // Navigate to compare page
//         } catch (error) {
//             console.error('Error adding product to compare:', error);
//             toast.error('خطا در افزودن محصول به لیست مقایسه.');
//         }
//     };

//     // No changes needed for handlePriceChart as it uses existing modal
//     // For the modal to function, ensure Bootstrap JS is initialized globally (e.g., in _app.js or a client-side layout component)

//     if (!product) {
//         return <div>در حال بارگذاری...</div>; // Consider a more robust loading state, e.g., the one from ProductPage
//     }

//     const isInWishlist = isProductInWishlist(product._id);
//     const isLoading = isLoadingForProduct(product._id);
    
//     // تهیه آرایه تصاویر از محصول (بدون تغییر)
//     const getProductImages = () => {
//         const images = [];
//         if (product.image) {
//             images.push(`/images/product/${product.image}`);
//         }
//         if (product.images && Array.isArray(product.images)) {
//             product.images.forEach(img => {
//                 const imagePath = `/images/product/${img}`;
//                 if (!images.includes(imagePath)) {
//                     images.push(imagePath);
//                 }
//             });
//         }
//         if (images.length === 0) {
//             images.push('/images/product/product-placeholder.jpg');
//         }
//         if (images.length === 1) {
//             const singleImage = images[0];
//             return [singleImage, singleImage, singleImage, singleImage];
//         }
//         return images;
//     };

//     const productImages = getProductImages();

//     return (
//         <div className="product-meta py-20">
//             <div className="container-fluid">
//                 <div className="content-box">
//                     <div className="container-fluid">
//                         <div className="row gy-3">
//                             <div className="col-lg-4">
//                                 <div className={styles.pro_gallery}>
//                                     <div className={styles.icon_product_box}>
//                                         {/* Share button */}
//                                         <div
//                                             className={styles.icon_product_box_item}
//                                             onClick={handleShareProduct} // Attach share function
//                                             style={{ cursor: 'pointer' }}
//                                             data-bs-toggle="tooltip" // Add tooltip for better UX
//                                             data-bs-placement="right"
//                                             title="اشتراک گذاری"
//                                         >
//                                             <i className="bi bi-share"></i>
//                                         </div>
                                        
//                                         {/* Wishlist button (no changes, already handled) */}
//                                         <div 
//                                             className={styles.icon_product_box_item} 
//                                             onClick={handleWishlistToggle}
//                                             style={{ cursor: 'pointer' }}
//                                             data-bs-toggle="tooltip" // Add tooltip for better UX
//                                             data-bs-placement="right"
//                                             title="افزودن به علاقه‌مندی" // Dynamic tooltip for wishlist
//                                         >
//                                             {isLoading ? (
//                                                 <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
//                                             ) : (
//                                                 <i className={`bi ${isInWishlist ? 'bi-heart-fill text-danger' : 'bi-heart'}`}></i>
//                                             )}
//                                         </div>

//                                         {/* Compare button */}
//                                         <div
//                                             className={styles.icon_product_box_item}
//                                             onClick={handleCompareProduct} // Attach compare function
//                                             style={{ cursor: 'pointer' }}
//                                             data-bs-toggle="tooltip" // Keep tooltip
//                                             data-bs-placement="right"
//                                             title="مقایسه محصول" // Use 'title' for Bootstrap tooltip
//                                         >
//                                             <i className="bi bi-arrow-left-right"></i>
//                                         </div>

//                                         {/* Price chart button */}
//                                         <div
//                                             className={styles.icon_product_box_item}
//                                             data-bs-toggle="modal"
//                                             data-bs-target="#chartModal" // Existing modal trigger
//                                             style={{ cursor: 'pointer' }} // Add cursor pointer for better UX
//                                             data-bs-toggle="tooltip" // Keep tooltip
//                                             data-bs-placement="right"
//                                             title="نمودار تغییر قیمت" // Use 'title' for Bootstrap tooltip
//                                         >
//                                             <i className="bi bi-bar-chart"></i>
//                                         </div>
//                                     </div>
//                                     <Gallery images={productImages} />
//                                 </div>
//                             </div>
//                             <div className="col-lg-8">
//                                 <ProductDetail product={product} />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Details;

'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import styles from './details.module.css';
import ProductDetail from './ProductDetail';
import Gallery from '../product/product-images-slider/ImageSlider';
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

    // کپی کردن لینک
    const handleCopyLink = async () => {
        try {
            const url = window.location.href;
            await navigator.clipboard.writeText(url);
            toast.success('لینک کپی شد');
            setShowShareModal(false);
        } catch (error) {
            console.error('Error copying link:', error);
            toast.error('خطا در کپی کردن لینک');
        }
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
            {showShareModal && (
                <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">اشتراک‌گذاری محصول</h5>
                                <button 
                                    type="button" 
                                    className="btn-close" 
                                    onClick={() => setShowShareModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="d-flex align-items-center mb-3">
                                    <img 
                                        src={`/images/product/${product.image}`} 
                                        alt={product.title}
                                        className="rounded me-3"
                                        style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                                    />
                                    <div>
                                        <h6 className="mb-1">{product.title}</h6>
                                        <p className="text-muted mb-0 small">{product.originalName}</p>
                                    </div>
                                </div>
                                
                                <div className="row g-2">
                                    <div className="col-6">
                                        <button 
                                            className="btn btn-outline-primary w-100"
                                            onClick={handleCopyLink}
                                        >
                                            <i className="bi bi-clipboard me-2"></i>
                                            کپی لینک
                                        </button>
                                    </div>
                                    <div className="col-6">
                                        <a 
                                            href={`https://telegram.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(product.title)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-outline-info w-100"
                                        >
                                            <i className="bi bi-telegram me-2"></i>
                                            تلگرام
                                        </a>
                                    </div>
                                    <div className="col-6">
                                        <a 
                                            href={`https://wa.me/?text=${encodeURIComponent(product.title + ' - ' + window.location.href)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-outline-success w-100"
                                        >
                                            <i className="bi bi-whatsapp me-2"></i>
                                            واتساپ
                                        </a>
                                    </div>
                                    <div className="col-6">
                                        <a 
                                            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(product.title)}&url=${encodeURIComponent(window.location.href)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-outline-dark w-100"
                                        >
                                            <i className="bi bi-twitter ms-2"></i>
                                            توییتر
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal نمودار قیمت */}
            {showChartModal && (
                <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header d-flex align-items-center  justify-content-between ">
                                <h5 className="modal-title">نمودار تغییر قیمت</h5>
                                <button 
                                    type="button" 
                                    className="btn-close ms-0" 
                                    onClick={() => setShowChartModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="text-center py-5">
                                    <i className="bi bi-bar-chart text-muted" style={{ fontSize: '3rem' }}></i>
                                    <h6 className="mt-3">نمودار قیمت</h6>
                                    <p className="text-muted">
                                        نمودار تغییر قیمت برای محصول "{product.title}" در حال حاضر در دسترس نیست.
                                    </p>
                                    <div className="alert alert-info">
                                        <strong>قیمت فعلی:</strong> {(product.hasDiscount ? product.discountedPrice : product.price).toLocaleString('fa-IR')} تومان
                                        {product.hasDiscount && (
                                            <div className="mt-2">
                                                <span className="text-decoration-line-through text-muted">
                                                    قیمت قبلی: {product.price.toLocaleString('fa-IR')} تومان
                                                </span>
                                                <span className="badge main-color-two-color me-2">
                                                    {Math.round((1 - product.discountedPrice / product.price) * 100)}% تخفیف
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Details;