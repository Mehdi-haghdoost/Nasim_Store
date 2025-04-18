'use client';

import React, { useEffect, useState } from 'react';
import styles from './MultiSeller.module.css';
import { useCart } from '@/Redux/hooks/useCart';

function MultiSeller({ product, sellers }) {
    const { addToCart, loading, error } = useCart();

    // استفاده از state برای مدیریت هیدراسیون
    const [isClient, setIsClient] = useState(false);
    
    // انتخاب رنگ پیش‌فرض از محصول
    const [defaultColor, setDefaultColor] = useState(null);

    useEffect(() => {
        setIsClient(true);
        
        // پیدا کردن رنگ پیش‌فرض از محصول
        if (product && product.colors && product.colors.length > 0) {
            // ابتدا تلاش می‌کنیم اولین رنگ موجود را پیدا کنیم
            const firstAvailableColor = product.colors.find(color => color.available);
            if (firstAvailableColor) {
                setDefaultColor(firstAvailableColor.color);
            } else {
                // اگر هیچ رنگی موجود نبود، اولین رنگ را انتخاب می‌کنیم
                setDefaultColor(product.colors[0].color);
            }
        }
    }, [product]);

    const handleAddToCart = (e, seller) => {
        e.preventDefault();

        if (!product) {
            console.error('اطلاعات محصول در دسترس نیست');
            return;
        }

        // ایجاد یک کپی از محصول با ID منحصر به فرد برای هر فروشنده
        const productCopy = {
            ...product,
            _id: `${product._id}_${seller._id}`, // ID منحصر به فرد
            originalId: product._id, // نگهداری ID اصلی محصول
            title: `${product.title} (${seller.name})` // اضافه کردن نام فروشنده به عنوان محصول
        };

        // ایجاد آبجکت فروشنده برای ارسال به سبد خرید
        const sellerObject = {
            _id: seller._id,
            name: seller.name
        };

        console.log('Adding to cart from MultiSeller:', {
            productId: productCopy._id,
            color: defaultColor,
            seller: sellerObject
        });

        // استفاده از الگوی کامپوننت ProductDetail:
        // محصول، تعداد، رنگ، سایز، فروشنده
        addToCart(productCopy, 1, defaultColor, null, sellerObject);
    };

    // داده واقعی یا پیش‌فرض برای فروشندگان
    const sellersData = isClient && Array.isArray(sellers) && sellers.length > 0 ? sellers : [
        {
            _id: '1',
            name: 'نسیم استور',
            satisfaction: '89.6%',
            performance: 'عالی',
            performanceStatus: 'success',
            isSelected: true,
            shippingMethod: 'ارسالی نسیم استور',
            price: product?.price || 389500
        },
        {
            _id: '2',
            name: 'فروشگاه تکنو',
            satisfaction: '75.2%',
            performance: 'متوسط',
            performanceStatus: 'warning',
            isSelected: false,
            shippingMethod: 'ارسال فروشنده',
            price: (product?.price || 389500) * 1.05 // قیمت کمی بالاتر
        },
        {
            _id: '3',
            name: 'دیجی کالا',
            satisfaction: '62.8%',
            performance: 'ضعیف',
            performanceStatus: 'danger',
            isSelected: false,
            shippingMethod: 'ارسال سریع',
            price: (product?.price || 389500) * 0.95 // قیمت کمی پایین‌تر
        }
    ];

    return (
        <div className={styles.muuli_seller}>
            <div className='container-fluid'>
                <div className='content-box'>
                    <div className='container-fluid'>
                        <div className={styles.title_panel}>
                            <h6 className='font-16'>
                                سایر فروشندگان موجود
                            </h6>
                        </div>
                        <div className={`p-0 ${styles.responsive_table}`}>
                            <table className={`table ${styles.main_table} rounded-0`}>
                                <tbody className='text-center'>
                                    {sellersData.map((seller, index) => (
                                        <tr key={seller._id || index}>
                                            <td>
                                                <div className='d-flex align-items-start'>
                                                    <div>
                                                        <i className='bi bi-shop'></i>
                                                    </div>
                                                    <div className='text-end me-2'>
                                                        <h6 className='text-muted-2 font-14'> {seller.name}
                                                            {seller.performance === 'عالی' && (
                                                                <span className={`${styles.success_label} me-2 rounded-pill me-1`}>
                                                                    منتخب
                                                                </span>
                                                            )}
                                                            {seller.performance === 'ضعیف' && (
                                                                <span className={`${styles.danger_label} me-2 rounded-pill me-1`}>
                                                                    عملکرد ضعیف
                                                                </span>
                                                            )}
                                                            {seller.performance === 'متوسط' && (
                                                                <span className={`${styles.warning_label} me-2 rounded-pill me-1`}>
                                                                    عملکرد متوسط
                                                                </span>
                                                            )}
                                                        </h6>
                                                        <div className='d-flex align-items-center mt-2'>
                                                            <p className='font-12'>
                                                                <span className='text-success me-1 ps-1'>{seller.satisfaction || 'نامشخص'}</span>
                                                                <span className='text-muted'>رضایت از کالا</span>
                                                            </p>
                                                            <p className='pe-1 me-1 border-start font-12'>
                                                                <span className='text-muted'>عملکرد: </span>
                                                                <span className='text-success'>{seller.performance || 'نامشخص'}</span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                                                    className="bi bi-box-seam me-1" viewBox="0 0 16 16">
                                                    <path
                                                        d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2l-2.218-.887zm3.564 1.426L5.596 5 8 5.961 14.154 3.5l-2.404-.961zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z">
                                                    </path>
                                                </svg>
                                                <p className='d-inline me-2 mb-0 font-14'>{seller.shippingMethod || 'نامشخص'}</p>
                                            </td>
                                            <td>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                                                    className="bi bi-shield-check me-1" viewBox="0 0 16 16">
                                                    <path
                                                        d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z">
                                                    </path>
                                                    <path
                                                        d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z">
                                                    </path>
                                                </svg>
                                                <p className="d-inline font-14 me-2 mb-0">گارانتی اصالت و سلامت فیزیکی کالا</p>
                                            </td>
                                            <td>
                                                <p className='fw-bold text-muted-2 mb-0 d-inline font-16'>
                                                    {(seller.price || product?.price || 0).toLocaleString()}
                                                </p>
                                                <span className='text-muted font-12'>تومان</span>
                                            </td>
                                            <td className='font-14'>
                                                <button
                                                    onClick={(e) => handleAddToCart(e, seller)}
                                                    disabled={loading}
                                                    className='btn py-2 border-0 main-color-one-bg waves-effect waves-light'
                                                >
                                                    <i className='bi bi-basket text-white font-16 ms-1'></i>
                                                    {loading ? 'در حال افزودن...' : 'افزودن به سبد خرید'}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {error && (
                            <div className="alert alert-danger mt-3" role="alert">
                                {error}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MultiSeller;