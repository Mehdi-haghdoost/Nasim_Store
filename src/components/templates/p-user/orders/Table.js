// "use client";

// import React, { useState, useEffect } from 'react';
// import styles from './table.module.css';
// import Link from 'next/link';
// import Pagination from '../../../modules/p-user/pagination/Pagination';

// const Table = () => {
//     const [orders, setOrders] = useState([]);
//     const [isMounted, setIsMounted] = useState(false);

//     useEffect(() => {
//         setIsMounted(true);
        
//         // بارگذاری سفارشات از localStorage
//         const loadOrders = () => {
//             try {
//                 const orderHistory = localStorage.getItem('order_history');
//                 if (orderHistory) {
//                     const parsedOrders = JSON.parse(orderHistory);
//                     // مرتب‌سازی بر اساس تاریخ (جدیدترین اول)
//                     const sortedOrders = parsedOrders.sort((a, b) => 
//                         new Date(b.createdAt) - new Date(a.createdAt)
//                     );
//                     setOrders(sortedOrders);
//                 }
//             } catch (error) {
//                 console.error('Error loading orders:', error);
//             }
//         };

//         loadOrders();
//     }, []);

//     // تابع تعیین وضعیت سفارش
//     const getOrderStatus = (order) => {
//         if (order.status === 'completed') {
//             return {
//                 text: 'سفارش در حال ارسال',
//                 className: 'success-label'
//             };
//         } else if (order.status === 'cancelled') {
//             return {
//                 text: 'لغو شده',
//                 className: 'danger-label'
//             };
//         } else if (order.status === 'delivered') {
//             return {
//                 text: 'تحویل شده',
//                 className: 'success-label'
//             };
//         } else {
//             return {
//                 text: 'در انتظار بررسی',
//                 className: 'warning-label'
//             };
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

//     if (!isMounted) {
//         return null;
//     }

//     if (orders.length === 0) {
//         return (
//             <div className="text-center py-5">
//                 <div className="alert alert-info">
//                     <h5>سفارشی یافت نشد</h5>
//                     <p>تاکنون هیچ سفارشی ثبت نکرده‌اید.</p>
//                     <Link href="/" className="btn btn-primary">
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
//                         <th>شماره سفارش</th>
//                         <th>تاریخ ثبت سفارش</th>
//                         <th>مبلغ پرداختی</th>
//                         <th>وضعیت سفارش</th>
//                         <th>جزئیات</th>
//                     </tr>
//                 </thead>
//                 <tbody className='text-center'>
//                     {orders.map((order, index) => {
//                         const status = getOrderStatus(order);
//                         return (
//                             <tr key={order.orderNumber || index}>
//                                 <td className='font-14'>{index + 1}</td>
//                                 <td className='font-14'>{order.orderNumber || 'نامشخص'}</td>
//                                 <td className='font-14'>{formatDate(order.createdAt)}</td>
//                                 <td className='font-14'>
//                                     {order.pricing?.finalPrice?.toLocaleString() || '0'} تومان
//                                 </td>
//                                 <td className='font-14'>
//                                     <span className={`${status.className} rounded-pill`}>
//                                         {status.text}
//                                     </span>
//                                 </td>
//                                 <td className='font-14'>
//                                     <Link 
//                                         href={`/p-user/order-detail/${order.orderNumber || index}`}
//                                         className='btn btn-sm border-0 main-color-one-bg'
//                                     >
//                                         مشاهده
//                                         <i className='bi bi-chevron-left text-white font-16'></i>
//                                     </Link>
//                                 </td>
//                             </tr>
//                         );
//                     })}
//                 </tbody>
//             </table>
//             <Pagination />
//         </div>
//     );
// };

// export default Table;

"use client";

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from './table.module.css';
import Link from 'next/link';
import Pagination from '../../../modules/p-user/pagination/Pagination';

const Table = () => {
    const [orders, setOrders] = useState([]);
    const [isMounted, setIsMounted] = useState(false);
    const [showImport, setShowImport] = useState(false);
    
    const { user } = useSelector(state => state.auth);

    useEffect(() => {
        setIsMounted(true);
        loadOrders();
    }, []);

    const loadOrders = () => {
        try {
            // 1. اول از localStorage بخون
            const orderHistory = localStorage.getItem('order_history');
            
            if (orderHistory) {
                const parsedOrders = JSON.parse(orderHistory);
                const sortedOrders = parsedOrders.sort((a, b) => 
                    new Date(b.createdAt) - new Date(a.createdAt)
                );
                setOrders(sortedOrders);
                console.log('✅ Orders loaded from localStorage');
                return;
            }

            // 2. اگر localStorage خالی بود، از user profile بخون
            if (user?.orderHistory && user.orderHistory.length > 0) {
                const sortedOrders = [...user.orderHistory].sort((a, b) => 
                    new Date(b.createdAt) - new Date(a.createdAt)
                );
                setOrders(sortedOrders);
                
                // localStorage رو update کن
                localStorage.setItem('order_history', JSON.stringify(user.orderHistory));
                console.log('✅ Orders loaded from user profile');
                return;
            }

            // 3. اگر هیچکدام وجود نداشت، پیشنهاد import بده
            if (process.env.NODE_ENV === 'production') {
                setShowImport(true);
            }

        } catch (error) {
            console.error('Error loading orders:', error);
        }
    };

    const handleImportData = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        const data = JSON.parse(e.target.result);
                        if (data.order_history) {
                            localStorage.setItem('order_history', data.order_history);
                            setOrders(JSON.parse(data.order_history));
                            setShowImport(false);
                            console.log('✅ Data imported successfully!');
                        }
                    } catch (error) {
                        console.error('Error importing data:', error);
                        alert('خطا در وارد کردن اطلاعات!');
                    }
                };
                reader.readAsText(file);
            }
        };
        input.click();
    };

    const handlePasteData = () => {
        const jsonData = prompt('اطلاعات localStorage را paste کنید:');
        if (jsonData) {
            try {
                const data = JSON.parse(jsonData);
                if (data.order_history) {
                    localStorage.setItem('order_history', data.order_history);
                    setOrders(JSON.parse(data.order_history));
                    setShowImport(false);
                    console.log('✅ Data pasted successfully!');
                }
            } catch (error) {
                console.error('Error pasting data:', error);
                alert('فرمت اطلاعات نادرست است!');
            }
        }
    };

    // باقی توابع مثل قبل...
    const getOrderStatus = (order) => {
        if (order.status === 'completed') {
            return { text: 'سفارش در حال ارسال', className: 'success-label' };
        } else if (order.status === 'cancelled') {
            return { text: 'لغو شده', className: 'danger-label' };
        } else if (order.status === 'delivered') {
            return { text: 'تحویل شده', className: 'success-label' };
        } else {
            return { text: 'در انتظار بررسی', className: 'warning-label' };
        }
    };

    const formatDate = (dateString) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('fa-IR', {
                year: 'numeric', month: 'long', day: 'numeric', weekday: 'long'
            });
        } catch (error) {
            return 'نامشخص';
        }
    };

    if (!isMounted) return null;

    if (showImport) {
        return (
            <div className="text-center py-5">
                <div className="alert alert-warning">
                    <h5>انتقال اطلاعات</h5>
                    <p>در production، localStorage خالی است. اطلاعات خود را از development انتقال دهید:</p>
                    <div className="mt-3">
                        <button onClick={handleImportData} className="btn btn-primary me-2">
                            📁 وارد کردن فایل JSON
                        </button>
                        <button onClick={handlePasteData} className="btn btn-secondary">
                            📋 Paste کردن اطلاعات
                        </button>
                    </div>
                    <hr />
                    <small className="text-muted">
                        در development: در console تایپ کنید: 
                        <code>console.log(JSON.stringify({{order_history: localStorage.getItem('order_history')}})))</code>
                    </small>
                </div>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="text-center py-5">
                <div className="alert alert-info">
                    <h5>سفارشی یافت نشد</h5>
                    <p>تاکنون هیچ سفارشی ثبت نکرده‌اید.</p>
                    <Link href="/" className="btn btn-primary">شروع خرید</Link>
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
                        <th>شماره سفارش</th>
                        <th>تاریخ ثبت سفارش</th>
                        <th>مبلغ پرداختی</th>
                        <th>وضعیت سفارش</th>
                        <th>جزئیات</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {orders.map((order, index) => {
                        const status = getOrderStatus(order);
                        return (
                            <tr key={order.orderNumber || index}>
                                <td className='font-14'>{index + 1}</td>
                                <td className='font-14'>{order.orderNumber || 'نامشخص'}</td>
                                <td className='font-14'>{formatDate(order.createdAt)}</td>
                                <td className='font-14'>
                                    {order.pricing?.finalPrice?.toLocaleString() || '0'} تومان
                                </td>
                                <td className='font-14'>
                                    <span className={`${status.className} rounded-pill`}>
                                        {status.text}
                                    </span>
                                </td>
                                <td className='font-14'>
                                    <Link 
                                        href={`/p-user/order-detail/${order.orderNumber || index}`}
                                        className='btn btn-sm border-0 main-color-one-bg'
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