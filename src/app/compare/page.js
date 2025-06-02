"use client";

import React, { useEffect, useState } from 'react';
import styles from '@/styles/compare.module.css';
import BreadCroumb from '@/components/modules/breadCroumb/BreadCroumb';
import Footer from '@/components/modules/footer/Footer';
import Header from '@/components/modules/header/Header';
import Link from 'next/link';
import { toast } from 'react-toastify';

const ComparePage = () => {
    const [compareProducts, setCompareProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCompareProducts = () => {
            try {
                const stored = localStorage.getItem('compareProducts');
                if (stored) {
                    const products = JSON.parse(stored);
                    setCompareProducts(products);
                }
            } catch (error) {
                console.error('Error loading compare products:', error);
            } finally {
                setLoading(false);
            }
        };

        loadCompareProducts();
    }, []);

    // ترکیب features از دیتابیس و فیلدهای موجود
    const getAvailableFeatures = () => {
        const baseFeatures = [
            { key: 'برند', getValue: (product) => {
                if (product.brandIcon) {
                    return product.brandIcon.replace('.png', '').replace('-logo', '').replace('samsung', 'سامسونگ').replace('apple', 'اپل').replace('xiaomi', 'شیائومی');
                }
                return 'نامشخص';
            }},
            { key: 'مدل کامل', getValue: (product) => product.originalName || 'نامشخص' },
            { key: 'رضایت مشتری', getValue: (product) => product.customerSatisfaction ? `${product.customerSatisfaction}%` : 'نامشخص' },
            { key: 'تعداد فروش', getValue: (product) => product.salesCount ? `${product.salesCount} عدد` : '0 عدد' },
            { key: 'موجودی انبار', getValue: (product) => product.stock ? `${product.stock} عدد` : 'ناموجود' },
            { key: 'رنگ‌های موجود', getValue: (product) => {
                if (product.colors && product.colors.length > 0) {
                    return product.colors.map(c => c.color).join('، ');
                }
                return 'نامشخص';
            }},
            { key: 'فروشنده', getValue: (product) => {
                if (product.sellers && product.sellers.length > 0) {
                    return product.sellers[0].name;
                }
                return 'نامشخص';
            }},
            { key: 'دسته‌بندی', getValue: (product) => product.category?.name || 'نامشخص' }
        ];

        // اضافه کردن features از دیتابیس اگر موجود باشند
        const allFeatureKeys = new Set();
        compareProducts.forEach(product => {
            if (product.features && Array.isArray(product.features)) {
                product.features.forEach(feature => {
                    allFeatureKeys.add(feature.key);
                });
            }
        });

        // اضافه کردن features به لیست
        Array.from(allFeatureKeys).forEach(featureKey => {
            baseFeatures.push({
                key: featureKey,
                getValue: (product) => {
                    if (product.features && Array.isArray(product.features)) {
                        const feature = product.features.find(f => f.key === featureKey);
                        return feature ? feature.value : 'نامشخص';
                    }
                    return 'نامشخص';
                }
            });
        });

        return baseFeatures;
    };

    const handleRemoveProduct = (productId) => {
        try {
            const updatedProducts = compareProducts.filter(p => p._id !== productId);
            localStorage.setItem('compareProducts', JSON.stringify(updatedProducts));
            setCompareProducts(updatedProducts);
            toast.success('محصول از لیست مقایسه حذف شد');
        } catch (error) {
            console.error('Error removing product:', error);
            toast.error('خطا در حذف محصول');
        }
    };

    const handleClearAll = () => {
        try {
            localStorage.removeItem('compareProducts');
            setCompareProducts([]);
            toast.success('لیست مقایسه پاک شد');
        } catch (error) {
            console.error('Error clearing compare list:', error);
            toast.error('خطا در پاک کردن لیست');
        }
    };

    // تابع برای رندر کردن یک ستون خالی برای افزودن محصول
    const renderEmptySlot = () => (
        <th key="empty-slot">
            <div className={styles.compare_add}>
                <div className={styles.compare_add_product}>
                    <div className={styles.cap_icon}>
                        <i className="bi bi-box-arrow-down"></i>
                    </div>
                    <div className={styles.cap_title}>
                        <p className="text-muted">برای افزودن محصول کلیک کنید</p>
                    </div>
                    <div className={styles.cap_btn}>
                        <Link href="/categories" className="btn border-0 main-color-one-bg">
                            افزودن کالا به مقایسه
                        </Link>
                    </div>
                </div>
            </div>
        </th>
    );

    // تابع برای رندر کردن کارت محصول
    const renderProductCard = (product) => (
        <th key={product._id}>
            <div className={`${styles.product_box} ${styles.compare_product_box}`}>
                <div className={styles.product_timer}>
                    {product.hasDiscount && (
                        <div className={styles.timer_label}>
                            <span>تخفیف {Math.round((1 - product.discountedPrice / product.price) * 100)}%</span>
                        </div>
                    )}
                    <div className={styles.product_header_btn}>
                        <Link href="#" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="مقایسه">
                            <i className="bi bi-shuffle"></i>
                        </Link>
                        <Link href="#" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="علاقه‌مندی">
                            <i className="bi bi-heart"></i>
                        </Link>
                        <Link href={`/product/${product._id}`} data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="مشاهده">
                            <i className="bi bi-eye"></i>
                        </Link>
                    </div>
                </div>
                
                <Link href={`/product/${product._id}`}>
                    <div className={styles.product_image}>
                        <img 
                            src={`/images/product/${product.image}`} 
                            alt={product.title} 
                            className="img-fluid" 
                        />
                    </div>
                </Link>
                
                <div className={styles.product_title}>
                    <div className={styles.title}>
                        <p className="text-overflow-1">{product.title}</p>
                        <span className='text-muted text-overflow-1'>{product.originalName}</span>
                    </div>
                    <div className={styles.rating}>
                        <div className={styles.number}>
                            <span className='text-muted font-12'>({product.reviewCount || 0}+) {product.rating || 0}</span>
                        </div>
                        <div className={styles.icon}>
                            <i className="bi bi-star-fill"></i>
                        </div>
                    </div>
                </div>
                
                <div className={styles.price_section}>
                    <div className="d-flex align-items-center justify-content-center gap-2 mb-2">
                        <span className="h6 text-primary mb-0">
                            {(product.hasDiscount ? product.discountedPrice : product.price).toLocaleString('fa-IR')} تومان
                        </span>
                        {product.hasDiscount && (
                            <span className="text-decoration-line-through text-muted small">
                                {product.price.toLocaleString('fa-IR')} تومان
                            </span>
                        )}
                    </div>
                </div>
            </div>
            
            <div className={styles.compare_box}>
                <div className={styles.compare_delete}>
                    <button 
                        type='button'
                        onClick={() => handleRemoveProduct(product._id)}
                        className="btn btn-link p-0 text-danger"
                    >
                        <i className='bi bi-x-circle-fill'></i>
                    </button>
                </div>
            </div>
        </th>
    );

    if (loading) {
        return (
            <>
                <Header />
                <BreadCroumb />
                <div className="content">
                    <div className="container-fluid">
                        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">در حال بارگذاری...</span>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <BreadCroumb />
            <div className="content">
                <div className="container-fluid">
                    <div className="header-content mb-4 bg-white shadow-box rounded-3 p-3 d-flex align-items-center justify-content-between flex-wrap">
                        <div className={`d-flex align-items-center ${styles.title}`}>
                            <img src="/images/square.png" alt="square" className="img-fluid" />
                            <h5 className="font-16 me-3">
                                مقایسه
                                <span className='main-color-one-color d-inline-block me-1'>
                                    محصول
                                </span>
                            </h5>
                        </div>
                        {compareProducts.length > 0 && (
                            <div>
                                <button 
                                    onClick={handleClearAll}
                                    className="btn btn-outline-danger btn-sm main-color-one-bg border-0"
                                >
                                    <i className="bi bi-trash text-white ms-1"></i>
                                    پاک کردن همه
                                </button>
                            </div>
                        )}
                    </div>

                    {compareProducts.length === 0 ? (
                        // نمایش پیام خالی بودن لیست مقایسه
                        <div className="content-box">
                            <div className="container-fluid">
                                <div className="row justify-content-center">
                                    <div className="col-lg-6 text-center">
                                        <div className="empty-compare bg-white rounded-3 shadow-box p-5">
                                            <div className="empty-icon mb-4">
                                                <i className="bi bi-shuffle" style={{ fontSize: '4rem', color: '#ddd' }}></i>
                                            </div>
                                            <h4 className="mb-3">لیست مقایسه خالی است</h4>
                                            <p className="text-muted mb-4">
                                                شما هنوز محصولی به لیست مقایسه اضافه نکرده‌اید. 
                                                برای مقایسه محصولات، روی دکمه مقایسه در کارت محصولات کلیک کنید.
                                            </p>
                                            <Link href="/categories" className="btn main-color-one-bg border-0">
                                                <i className="bi bi-arrow-left text-white ms-2"></i>
                                                مشاهده محصولات
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        // نمایش جدول مقایسه
                        <div className="content-box">
                            <div className="container-fluid">
                                <div className={styles.compare}>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="table-responsive">
                                                <table className={`table table-bordered fixed ${styles.compare_table}`}>
                                                    <thead>
                                                        <tr>
                                                            {/* ستون خالی برای لیبل‌های مشخصات */}
                                                            <th style={{ width: '200px' }}></th>
                                                            
                                                            {/* نمایش محصولات موجود */}
                                                            {compareProducts.map(product => renderProductCard(product))}
                                                            
                                                            {/* نمایش ستون‌های خالی برای افزودن محصول */}
                                                            {Array.from({ length: 3 - compareProducts.length }, (_, index) => 
                                                                renderEmptySlot()
                                                            )}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {/* ردیف قیمت */}
                                                        <tr>
                                                            <td colSpan={4} className={styles.td_head}>
                                                                <i className="bi bi-chevron-double-left"></i>
                                                                <span>قیمت</span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className='text-end pe-5'>قیمت فروش</td>
                                                            {compareProducts.map(product => (
                                                                <td key={product._id} className='text-end pe-5'>
                                                                    <div className="d-flex flex-column align-items-end">
                                                                        <span className="text-primary fw-bold">
                                                                            {(product.hasDiscount ? product.discountedPrice : product.price).toLocaleString('fa-IR')} تومان
                                                                        </span>
                                                                        {product.hasDiscount && (
                                                                            <span className="text-decoration-line-through text-muted small">
                                                                                {product.price.toLocaleString('fa-IR')} تومان
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                </td>
                                                            ))}
                                                            {/* پر کردن ستون‌های خالی */}
                                                            {Array.from({ length: 3 - compareProducts.length }, (_, index) => (
                                                                <td key={`empty-price-${index}`} className='text-end pe-5'>-</td>
                                                            ))}
                                                        </tr>

                                                        {/* ردیف امتیاز */}
                                                        <tr>
                                                            <td className='text-end pe-5'>امتیاز کاربران</td>
                                                            {compareProducts.map(product => (
                                                                <td key={product._id} className='text-end pe-5'>
                                                                    <div className="d-flex align-items-center justify-content-end">
                                                                        <span className="me-1">{product.rating || 0}</span>
                                                                        <i className="bi bi-star-fill text-warning"></i>
                                                                        <span className="text-muted small ms-2">
                                                                            ({product.reviewCount || 0} نظر)
                                                                        </span>
                                                                    </div>
                                                                </td>
                                                            ))}
                                                            {Array.from({ length: 3 - compareProducts.length }, (_, index) => (
                                                                <td key={`empty-rating-${index}`} className='text-end pe-5'>-</td>
                                                            ))}
                                                        </tr>

                                                        {/* مشخصات کلی */}
                                                        <tr>
                                                            <td colSpan={4} className={styles.td_head}>
                                                                <i className="bi bi-chevron-double-left"></i>
                                                                <span>مشخصات کلی</span>
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td className='text-end pe-5'>مدل</td>
                                                            {compareProducts.map(product => (
                                                                <td key={product._id} className='text-end pe-5'>
                                                                    {product.originalName || 'نامشخص'}
                                                                </td>
                                                            ))}
                                                            {Array.from({ length: 3 - compareProducts.length }, (_, index) => (
                                                                <td key={`empty-model-${index}`} className='text-end pe-5'>-</td>
                                                            ))}
                                                        </tr>

                                                        <tr>
                                                            <td className='text-end pe-5'>رنگ‌های موجود</td>
                                                            {compareProducts.map(product => (
                                                                <td key={product._id} className='text-end pe-5'>
                                                                    {product.colors && product.colors.length > 0 
                                                                        ? product.colors.map(c => c.color).join('، ')
                                                                        : 'نامشخص'
                                                                    }
                                                                </td>
                                                            ))}
                                                            {Array.from({ length: 3 - compareProducts.length }, (_, index) => (
                                                                <td key={`empty-colors-${index}`} className='text-end pe-5'>-</td>
                                                            ))}
                                                        </tr>

                                                        {/* مشخصات فنی */}
                                                        {getAvailableFeatures().length > 0 && (
                                                            <>
                                                                <tr>
                                                                    <td colSpan={4} className={styles.td_head}>
                                                                        <i className="bi bi-chevron-double-left"></i>
                                                                        <span>مشخصات تفصیلی</span>
                                                                    </td>
                                                                </tr>
                                                                
                                                                {getAvailableFeatures().map(feature => (
                                                                    <tr key={feature.key}>
                                                                        <td className='text-end pe-5'>{feature.key}</td>
                                                                        {compareProducts.map(product => (
                                                                            <td key={product._id} className='text-end pe-5'>
                                                                                {feature.getValue(product)}
                                                                            </td>
                                                                        ))}
                                                                        {/* پر کردن ستون‌های خالی */}
                                                                        {Array.from({ length: 3 - compareProducts.length }, (_, index) => (
                                                                            <td key={`empty-${feature.key}-${index}`} className='text-end pe-5'>-</td>
                                                                        ))}
                                                                    </tr>
                                                                ))}
                                                            </>
                                                        )}

                                                        {/* ردیف عملیات */}
                                                        <tr>
                                                            <td colSpan={4} className={styles.td_head}>
                                                                <i className="bi bi-chevron-double-left"></i>
                                                                <span>عملیات</span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className='text-end pe-5'>خرید محصول</td>
                                                            {compareProducts.map(product => (
                                                                <td key={product._id} className='text-center'>
                                                                    <Link 
                                                                        href={`/product/${product._id}`}
                                                                        className="btn btn-sm main-color-one-bg border-0"
                                                                    >
                                                                        <i className="bi bi-cart text-white ms-1"></i>
                                                                        خرید
                                                                    </Link>
                                                                </td>
                                                            ))}
                                                            {Array.from({ length: 3 - compareProducts.length }, (_, index) => (
                                                                <td key={`empty-buy-${index}`} className='text-center'>-</td>
                                                            ))}
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ComparePage;