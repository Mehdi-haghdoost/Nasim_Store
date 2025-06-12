// "use client";

// import React, { useState, useEffect } from 'react';
// import styles from './table.module.css';
// import Link from 'next/link';
// import Pagination from '../../../modules/p-user/pagination/Pagination';
// import { useOrder } from '@/Redux/hooks/useOrder';

// const Table = () => {
//     const { userOrders, loading, error, getOrderStatusText, getPaymentMethodText, getOrderSummary } = useOrder();
//     const [isMounted, setIsMounted] = useState(false);

//     useEffect(() => {
//         setIsMounted(true);
//     }, []);

//     // تابع تعیین وضعیت سفارش
//     const getOrderStatus = (status) => {
//         switch (status) {
//             case 'PENDING':
//                 return {
//                     text: 'در انتظار بررسی',
//                     className: 'warning-label'
//                 };
//             case 'SHIPPED':
//                 return {
//                     text: 'ارسال شده',
//                     className: 'info-label'
//                 };
//             case 'DELIVERED':
//                 return {
//                     text: 'تحویل داده شده',
//                     className: 'success-label'
//                 };
//             case 'CANCELLED':
//                 return {
//                     text: 'لغو شده',
//                     className: 'danger-label'
//                 };
//             default:
//                 return {
//                     text: 'نامشخص',
//                     className: 'secondary-label'
//                 };
//         }
//     };

//     // تابع تبدیل تاریخ
//     const formatDate = (dateString) => {
//         try {
//             const date = new Date(dateString);
//             return date.toLocaleDateString('fa-IR', {
//                 year: 'numeric',
//                 month: 'long',
//                 day: 'numeric',
//                 weekday: 'long'
//             });
//         } catch (error) {
//             return 'نامشخص';
//         }
//     };

//     // تابع فرمت قیمت
//     const formatPrice = (price) => {
//         if (!price || isNaN(price)) return '0';
//         return Number(price).toLocaleString('fa-IR');
//     };

//     // تابع دریافت اولین محصول
//     const getFirstProductInfo = (order) => {
//         if (!order.items || order.items.length === 0) {
//             return {
//                 title: 'محصول نامشخص',
//                 image: '/images/product/product-image1.jpg'
//             };
//         }

//         const firstItem = order.items[0];
        
//         // اگر product populate شده باشه
//         if (firstItem.product) {
//             return {
//                 title: firstItem.product.title,
//                 image: firstItem.product.image || firstItem.image || '/images/product/product-image1.jpg',
//                 _id: firstItem.product._id
//             };
//         }
        
//         // fallback به item data
//         return {
//             title: firstItem.name,
//             image: firstItem.image || '/images/product/product-image1.jpg',
//             _id: firstItem._id
//         };
//     };

//     if (!isMounted) {
//         return null;
//     }

//     if (loading) {
//         return (
//             <div className="text-center py-5">
//                 <div className="spinner-border text-primary" role="status">
//                     <span className="visually-hidden">در حال بارگذاری...</span>
//                 </div>
//                 <p className="mt-3 text-muted">در حال بارگذاری سفارشات...</p>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="text-center py-5">
//                 <div className="alert alert-danger">
//                     <h5>خطا در بارگذاری سفارشات</h5>
//                     <p>{error}</p>
//                     <button 
//                         onClick={() => window.location.reload()} 
//                         className="btn btn-outline-danger"
//                     >
//                         تلاش مجدد
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     if (!userOrders || userOrders.length === 0) {
//         return (
//             <div className="text-center py-5">
//                 <div className="alert alert-info">
//                     <i className="bi bi-bag-x text-muted fs-1"></i>
//                     <h5 className="mt-3">سفارشی یافت نشد</h5>
//                     <p>تاکنون هیچ سفارشی ثبت نکرده‌اید.</p>
//                     <Link href="/" className="btn btn-primary">
//                         <i className="bi bi-bag-plus me-2"></i>
//                         شروع خرید
//                     </Link>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className={`p-0 ${styles.responsive_table}`}>
//             <table className={`main-table rounded-0 ${styles.table}`}>
//                 <thead className='text-bg-dark bg-opacity-75 text-center'>
//                     <tr>
//                         <th>#</th>
//                         <th>شماره پیگیری</th>
//                         <th>محصولات</th>
//                         <th>تاریخ ثبت سفارش</th>
//                         <th>مبلغ پرداختی</th>
//                         <th>وضعیت سفارش</th>
//                         <th>جزئیات</th>
//                     </tr>
//                 </thead>
//                 <tbody className='text-center'>
//                     {userOrders.map((order, index) => {
//                         const status = getOrderStatus(order.status);
//                         const firstProduct = getFirstProductInfo(order);
//                         const itemCount = order.items?.reduce((total, item) => total + item.quantity, 0) || 0;
                        
//                         return (
//                             <tr key={order._id}>
//                                 <td className='font-14'>{index + 1}</td>
//                                 <td className='font-14'>
//                                     <strong className="text-primary">{order.trackingId}</strong>
//                                 </td>
//                                 <td className='font-14'>
//                                     <div className="d-flex align-items-center justify-content-center">
//                                         <img 
//                                             src={firstProduct.image} 
//                                             alt={firstProduct.title}
//                                             width="40" 
//                                             height="40" 
//                                             className="rounded me-2"
//                                             style={{ objectFit: 'cover' }}
//                                             onError={(e) => {
//                                                 e.target.src = "/images/product/product-image1.jpg";
//                                             }}
//                                         />
//                                         <div className="text-start">
//                                             <div className="text-truncate" style={{ maxWidth: '150px' }}>
//                                                 <strong>{firstProduct.title}</strong>
//                                             </div>
//                                             <small className="text-muted">
//                                                 {itemCount} عدد
//                                                 {order.items && order.items.length > 1 && 
//                                                     ` و ${order.items.length - 1} محصول دیگر`
//                                                 }
//                                             </small>
//                                         </div>
//                                     </div>
//                                 </td>
//                                 <td className='font-14'>{formatDate(order.orderDate)}</td>
//                                 <td className='font-14'>
//                                     <strong className="text-success">{formatPrice(order.totalAmount)} تومان</strong>
//                                     {order.shippingCost > 0 && (
//                                         <div>
//                                             <small className="text-muted">
//                                                 + {formatPrice(order.shippingCost)} ارسال
//                                             </small>
//                                         </div>
//                                     )}
//                                 </td>
//                                 <td className='font-14'>
//                                     <span className={`${status.className} rounded-pill px-3 py-1`}>
//                                         {status.text}
//                                     </span>
//                                 </td>
//                                 <td className='font-14'>
//                                     <div className="d-flex gap-1 justify-content-center">
//                                         <Link 
//                                             href={`/p-user/orders/${order._id}/invoice`}
//                                             className='btn btn-sm border-0 main-color-one-bg text-white'
//                                             title="مشاهده فاکتور"
//                                         >
//                                             <i className='bi bi-receipt'></i>
//                                             فاکتور
//                                         </Link>
//                                         <Link 
//                                             href={`/p-user/order-detail/${order._id}`}
//                                             className='btn btn-sm border-0 btn-outline-primary'
//                                             title="جزئیات سفارش"
//                                         >
//                                             <i className='bi bi-eye'></i>
//                                             جزئیات
//                                         </Link>
//                                     </div>
//                                 </td>
//                             </tr>
//                         );
//                     })}
//                 </tbody>
//             </table>
            
//             {/* آمار کلی */}
//             <div className="row mt-3">
//                 <div className="col-12">
//                     <div className="alert alert-light">
//                         <div className="row text-center">
//                             <div className="col-md-3">
//                                 <strong>کل سفارشات:</strong> {userOrders.length}
//                             </div>
//                             <div className="col-md-3">
//                                 <strong>در انتظار:</strong> {userOrders.filter(o => o.status === 'PENDING').length}
//                             </div>
//                             <div className="col-md-3">
//                                 <strong>ارسال شده:</strong> {userOrders.filter(o => o.status === 'SHIPPED').length}
//                             </div>
//                             <div className="col-md-3">
//                                 <strong>تحویل شده:</strong> {userOrders.filter(o => o.status === 'DELIVERED').length}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
            
//             <Pagination />
//         </div>
//     );
// };

// export default Table;

"use client";

import React, { useState, useEffect } from 'react';
import styles from './table.module.css';
import Link from 'next/link';
import Pagination from '../../../modules/p-user/pagination/Pagination';
import { useOrder } from '@/Redux/hooks/useOrder';

const Table = () => {
    const { userOrders, loading, error } = useOrder();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // تابع تعیین وضعیت سفارش
    const getOrderStatus = (status) => {
        switch (status) {
            case 'PENDING':
                return {
                    text: 'در انتظار بررسی',
                    className: 'warning-label'
                };
            case 'SHIPPED':
                return {
                    text: 'ارسال شده',
                    className: 'info-label'
                };
            case 'DELIVERED':
                return {
                    text: 'تحویل داده شده',
                    className: 'success-label'
                };
            case 'CANCELLED':
                return {
                    text: 'لغو شده',
                    className: 'danger-label'
                };
            default:
                return {
                    text: 'نامشخص',
                    className: 'secondary-label'
                };
        }
    };

    // تابع تبدیل تاریخ
    const formatDate = (dateString) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('fa-IR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long'
            });
        } catch (error) {
            return 'نامشخص';
        }
    };

    // تابع فرمت قیمت
    const formatPrice = (price) => {
        if (!price || isNaN(price)) return '0';
        return Number(price).toLocaleString('fa-IR');
    };

    if (!isMounted) {
        return null;
    }

    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">در حال بارگذاری...</span>
                </div>
                <p className="mt-3 text-muted">در حال بارگذاری سفارشات...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-5">
                <div className="alert alert-danger">
                    <h5>خطا در بارگذاری سفارشات</h5>
                    <p>{error}</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="btn btn-outline-danger"
                    >
                        تلاش مجدد
                    </button>
                </div>
            </div>
        );
    }

    if (!userOrders || userOrders.length === 0) {
        return (
            <div className="text-center py-5">
                <div className="alert alert-info">
                    <h5>سفارشی یافت نشد</h5>
                    <p>تاکنون هیچ سفارشی ثبت نکرده‌اید.</p>
                    <Link href="/" className="btn btn-primary">
                        شروع خرید
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className={`p-0 ${styles.responsive_table}`}>
            <table className={`main-table rounded-0 ${styles.table}`}>
                <thead className='text-bg-dark bg-opacity-75 text-center'>
                    <tr>
                        <th>#</th>
                        <th>شماره پیگیری</th>
                        <th>تاریخ ثبت سفارش</th>
                        <th>مبلغ پرداختی</th>
                        <th>وضعیت سفارش</th>
                        <th>جزئیات</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {userOrders.map((order, index) => {
                        const status = getOrderStatus(order.status);
                        return (
                            <tr key={order._id}>
                                <td className='font-14'>{index + 1}</td>
                                <td className='font-14'>
                                    <strong>{order.trackingId}</strong>
                                </td>
                                <td className='font-14'>{formatDate(order.orderDate)}</td>
                                <td className='font-14'>
                                    <strong>{formatPrice(order.totalAmount)} تومان</strong>
                                </td>
                                <td className='font-14'>
                                    <span className={`${status.className} rounded-pill px-3 py-1`}>
                                        {status.text}
                                    </span>
                                </td>
                                <td className='font-14'>
                                    <Link 
                                        href={`/p-user/orders/${order._id}/invoice`}
                                        className='btn btn-sm border-0 main-color-one-bg text-white me-2'
                                    >
                                        مشاهده
                                        <i className='bi bi-chevron-left text-white font-16'></i>
                                    </Link>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <Pagination />
        </div>
    );
};

export default Table;