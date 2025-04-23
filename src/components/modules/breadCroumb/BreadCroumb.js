'use client';

import React, { useEffect } from 'react';
import styles from './BreadCroumb.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useProduct } from '../../../Redux/hooks/useProduct';

// نگاشت مسیرهای انگلیسی به فارسی
const pathDictionary = {
    '': 'خانه',
    'about-us': 'درباره ما',
    'blog': 'بلاگ',
    'blog-detail': 'جزئیات بلاگ',
    'cart': 'سبد خرید',
    'categories': 'دسته‌بندی‌ها',
    'Category-blogs': 'بلاگ‌های دسته‌بندی',
    'checkout': 'پرداخت',
    'compare': 'مقایسه',
    'contact-us': 'تماس با ما',
    'fail-payment': 'پرداخت ناموفق',
    'faq': 'سوالات متداول',
    'login-register': 'ورود/ثبت‌نام',
    'p-seller': 'پنل فروشنده',
    'p-user': 'پنل کاربری',
    'product': 'محصول',
    'success-payment': 'پرداخت موفق',
    // زیر صفحات پنل کاربری
    'address': 'آدرس‌ها',
    'comments': 'نظرات',
    'discountcodes': 'کدهای تخفیف',
    'notifications': 'اعلان‌ها',
    'order-detail': 'جزئیات سفارش',
    'orders': 'سفارش‌ها',
    'profile': 'پروفایل',
    'tickets': 'تیکت‌ها',
    'wishlists': 'علاقه‌مندی‌ها',
    'add-new': 'افزودن جدید',
    'sendTicket': 'ارسال تیکت',
    'ticket-message': 'پیام تیکت',
    'invoice': 'فاکتور',
    // دسته‌بندی‌های محصولات
    'mobile': 'موبایل',
    'laptop': 'لپ تاپ',
    'smartwatch': 'ساعت هوشمند',
    'tablet': 'تبلت',
    'accessory': 'لوازم جانبی',
};

function BreadCroumb() {
    const pathname = usePathname();
    const { product, loading, getProduct } = useProduct();

    // بررسی اگر مسیر مربوط به صفحه محصول است
    useEffect(() => {
        const pathSegments = pathname.split('/').filter(segment => segment);

        // اگر مسیر شامل 'product' باشد و یک ID بعد از آن وجود داشته باشد
        if (pathSegments.length >= 2 && pathSegments[0] === 'product') {
            const productId = pathSegments[1];

            // فقط در صورتی درخواست می‌زنیم که قبلاً همان محصول را دریافت نکرده باشیم
            if (!product || product._id !== productId) {
                getProduct(productId);
            }
        }
    }, [pathname, getProduct, product]);

    // اگر مسیر خالی باشد (صفحه اصلی)، فقط خانه را نمایش می‌دهیم
    if (!pathname || pathname === '/') {
        return (
            <div className="bread-crumb pt-3">
                <div className="container-fluid">
                    <div className="content-box">
                        <div className="container-fluid">
                            <nav aria-label="breadcrumb" className="my-lg-0 my-2">
                                <ol className="breadcrumb mb-0">
                                    <li className={`${styles.breadcrumb_item} active main-color-one-color font-14`} aria-current="page">خانه</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // مسیر را به قطعه‌ها تقسیم می‌کنیم
    // مثلا '/p-user/orders/123' به ['p-user', 'orders', '123'] تبدیل می‌شود
    const pathSegments = pathname.split('/').filter(segment => segment);

    // ساخت آرایه‌ای از قطعه‌های مسیر برای نمایش
    const breadcrumbItems = [
        { label: 'خانه', path: '/', isLast: pathSegments.length === 0 }
    ];

    // اضافه کردن هر قطعه به آرایه breadcrumbItems
    let currentPath = '';
    pathSegments.forEach((segment, index) => {
        currentPath += `/${segment}`;

        // بررسی اگر بخشی از مسیر یک شناسه دینامیک است
        let label = pathDictionary[segment] || segment;

        // اگر در صفحه محصول هستیم و این بخش، ID محصول است
        if (pathSegments[0] === 'product' && index === 1) {
            if (product && !loading) {
                // نمایش دسته‌بندی محصول به جای ID
                let categoryName = 'جزئیات محصول';

                // بررسی اگر category یک آبجکت است (با name, _id و غیره)
                if (product.category && typeof product.category === 'object' && product.category.name) {
                    categoryName = pathDictionary[product.category.name] || product.category.name;
                }
                // اگر category یک رشته است
                else if (product.category && typeof product.category === 'string') {
                    categoryName = pathDictionary[product.category] || product.category;
                }
                // اگر هیچ دسته‌بندی موجود نیست، از نام محصول استفاده می‌کنیم
                else if (product.name) {
                    categoryName = product.name;
                }

                label = categoryName;
            } else {
                // اگر اطلاعات محصول هنوز در حال بارگذاری است یا موجود نیست
                label = 'جزئیات محصول';
            }
        }
        // سایر موارد برای شناسه‌های دینامیک
        else if (/^[0-9a-fA-F]{24}$/.test(segment) || /^\d+$/.test(segment)) {
            // اگر بخش قبلی 'orders' بود، این یک شناسه سفارش است
            if (index > 0 && pathSegments[index - 1] === 'orders') {
                label = `سفارش ${segment}`;
            }
            // دیگر شناسه‌های دینامیک را می‌توانید اینجا اضافه کنید
        }

        breadcrumbItems.push({
            label,
            path: currentPath,
            isLast: index === pathSegments.length - 1
        });
    });

    return (
        <div className="bread-crumb pt-3">
            <div className="container-fluid">
                <div className="content-box">
                    <div className="container-fluid">
                        <nav aria-label="breadcrumb" className="my-lg-0 my-2">
                            <ol className="breadcrumb mb-0">
                                {breadcrumbItems.map((item, index) => (
                                    <li key={index} className={`${styles.breadcrumb_item} ${item.isLast ? 'active main-color-one-color' : ''} font-14`}>
                                        {item.isLast ? (
                                            item.label
                                        ) : (
                                            <>
                                                <Link href={item.path} className="text-muted">
                                                    {item.label}
                                                </Link>
                                                {index < breadcrumbItems.length - 1 && ' / '}
                                            </>
                                        )}
                                    </li>
                                ))}
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BreadCroumb;