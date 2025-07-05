"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useOrder } from '@/Redux/hooks/useOrder';

const InvoicePage = () => {
    const params = useParams();
    const router = useRouter();
    const { getOrderById, currentOrder, loading, error } = useOrder();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        
        const orderId = params.orderId;
        if (orderId && orderId !== 'unknown') {
            getOrderById(orderId).catch(err => {
                console.error('خطا در دریافت سفارش:', err);
            });
        }
    }, [params.orderId, getOrderById]);

    const printInvoice = () => {
        window.print();
    };

    const formatPrice = (price) => {
        if (!price || isNaN(price)) return '0';
        return new Intl.NumberFormat('fa-IR').format(price);
    };

    const formatDate = (dateString) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('fa-IR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch (error) {
            return 'نامشخص';
        }
    };

    if (!isMounted) {
        return null;
    }

    if (loading) {
        return (
            <div className="container-xl d-flex justify-content-center align-items-center" style={{ marginTop: "100px", minHeight: "400px" }}>
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">در حال بارگذاری...</span>
                    </div>
                    <p className="mt-3">در حال بارگذاری فاکتور...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container-xl text-center px-3" style={{ marginTop: "100px" }}>
                <div className="alert alert-danger">
                    <h4 className="mb-3">خطا در بارگذاری فاکتور!</h4>
                    <p className="mb-3">{error}</p>
                    <div className="d-flex flex-column flex-sm-row gap-2 justify-content-center">
                        <button 
                            onClick={() => router.push('/p-user/orders')}
                            className="btn btn-primary"
                        >
                            بازگشت به سفارشات
                        </button>
                        <button 
                            onClick={() => window.location.reload()}
                            className="btn btn-outline-secondary"
                        >
                            تلاش مجدد
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!currentOrder) {
        return (
            <div className="container-xl text-center px-3" style={{ marginTop: "100px" }}>
                <div className="alert alert-warning">
                    <h4 className="mb-3">سفارش یافت نشد!</h4>
                    <p className="mb-3">در حال انتقال به صفحه سفارشات...</p>
                    <button 
                        onClick={() => router.push('/p-user/orders')}
                        className="btn btn-primary"
                    >
                        بازگشت به سفارشات
                    </button>
                </div>
            </div>
        );
    }

    const orderData = currentOrder;

    return (
        <div className="container-xl px-3 px-md-4" style={{ marginTop: "100px" }}>
            {/* هدر فاکتور */}
            <div className="row mb-4">
                <div className="col-12 text-center">
                    <h3 className="mb-4 fs-4 fs-md-3">فاکتور فروش</h3>
                    <div className="row g-3">
                        <div className="col-12 col-sm-6 col-md-4">
                            <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center">
                                <strong className="me-2 mb-1 mb-sm-0">شماره پیگیری:</strong>
                                <span className="text-break">{orderData.trackingId}</span>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-4">
                            <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center">
                                <strong className="me-2 mb-1 mb-sm-0">تاریخ سفارش:</strong>
                                <span>{formatDate(orderData.orderDate)}</span>
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center">
                                <strong className="me-2 mb-1 mb-sm-0">وضعیت:</strong>
                                <span className={`badge ${
                                    orderData.status === 'DELIVERED' ? 'bg-success' :
                                    orderData.status === 'SHIPPED' ? 'bg-info' :
                                    orderData.status === 'PENDING' ? 'bg-warning' :
                                    'bg-secondary'
                                }`}>
                                    {orderData.status === 'DELIVERED' ? 'تحویل شده' :
                                     orderData.status === 'SHIPPED' ? 'ارسال شده' :
                                     orderData.status === 'PENDING' ? 'در انتظار' : 'نامشخص'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* اطلاعات خریدار */}
            <div className="row mb-4 g-3">
                <div className="col-12 col-lg-6">
                    <div className="card h-100">
                        <div className="card-header">
                            <h5 className="mb-0 fs-6 fs-md-5">اطلاعات فروشنده</h5>
                        </div>
                        <div className="card-body">
                            <p className="mb-2"><strong>نام:</strong> نسیم استور</p>
                            <p className="mb-2"><strong>آدرس:</strong> تهران، میدان ونک</p>
                            <p className="mb-0"><strong>تلفن:</strong> ۰۲۱-۸۸۸۸۸۸۸۸</p>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-6">
                    <div className="card h-100">
                        <div className="card-header">
                            <h5 className="mb-0 fs-6 fs-md-5">اطلاعات خریدار</h5>
                        </div>
                        <div className="card-body">
                            <p className="mb-2"><strong>نام:</strong> <span className="text-break">{orderData.recipient}</span></p>
                            <p className="mb-2"><strong>تلفن:</strong> <span className="text-break">{orderData.phoneNumber}</span></p>
                            <p className="mb-2"><strong>آدرس:</strong> <span className="text-break">{orderData.shippingAddress}</span></p>
                            {orderData.postalCode && (
                                <p className="mb-0"><strong>کد پستی:</strong> {orderData.postalCode}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* جدول محصولات */}
            <div className="row mb-4">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="mb-0 fs-6 fs-md-5">جزئیات محصولات</h5>
                        </div>
                        <div className="card-body p-0">
                            <div className="table-responsive">
                                <table className="table table-bordered mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th className="text-center" style={{ minWidth: '50px' }}>ردیف</th>
                                            <th style={{ minWidth: '150px' }}>نام محصول</th>
                                            <th className="text-center" style={{ minWidth: '60px' }}>تعداد</th>
                                            <th className="text-center" style={{ minWidth: '100px' }}>قیمت واحد</th>
                                            <th className="text-center" style={{ minWidth: '100px' }}>قیمت کل</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orderData.items.map((item, index) => (
                                            <tr key={index}>
                                                <td className="text-center">{index + 1}</td>
                                                <td>
                                                    <div className="text-break">
                                                        {item.product?.title || item.name}
                                                    </div>
                                                </td>
                                                <td className="text-center">{item.quantity}</td>
                                                <td className="text-center text-nowrap">{formatPrice(item.price)} تومان</td>
                                                <td className="text-center text-nowrap">{formatPrice(item.price * item.quantity)} تومان</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* خلاصه فاکتور */}
            <div className="row mb-4">
                <div className="col-12 col-md-8 col-lg-6 ms-auto">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="mb-0 fs-6 fs-md-5">خلاصه فاکتور</h5>
                        </div>
                        <div className="card-body">
                            <div className="row mb-2">
                                <div className="col-6 col-sm-7">جمع کالاها:</div>
                                <div className="col-6 col-sm-5 text-end">
                                    <span className="text-nowrap">
                                        {formatPrice(orderData.totalAmount - (orderData.shippingCost || 0))} تومان
                                    </span>
                                </div>
                            </div>
                            
                            {orderData.shippingCost > 0 && (
                                <div className="row mb-2">
                                    <div className="col-6 col-sm-7">هزینه ارسال:</div>
                                    <div className="col-6 col-sm-5 text-end">
                                        <span className="text-nowrap">
                                            {formatPrice(orderData.shippingCost)} تومان
                                        </span>
                                    </div>
                                </div>
                            )}

                            {orderData.discountCoupon && (
                                <div className="row mb-2 text-success">
                                    <div className="col-6 col-sm-7">
                                        <span className="text-break">
                                            تخفیف ({orderData.discountCoupon.code}):
                                        </span>
                                    </div>
                                    <div className="col-6 col-sm-5 text-end">
                                        <span className="text-nowrap">
                                            -{formatPrice(Math.round(orderData.totalAmount * orderData.discountCoupon.discountPercentage / 100))} تومان
                                        </span>
                                    </div>
                                </div>
                            )}

                            <hr />
                            <div className="row mb-2">
                                <div className="col-6 col-sm-7"><strong>مجموع نهایی:</strong></div>
                                <div className="col-6 col-sm-5 text-end">
                                    <strong className="text-primary fs-6 fs-md-5 text-nowrap">
                                        {formatPrice(orderData.totalAmount)} تومان
                                    </strong>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12">
                                    <small className="text-muted text-break">
                                        روش پرداخت: {orderData.paymentMethod === 'DirectBankPayment' ? 'پرداخت آنلاین' : 'پرداخت در محل'}
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* دکمه‌های عملیات */}
            <div className="text-center mb-5 pb-5 no-print">
                <div className="d-flex flex-column flex-sm-row gap-2 justify-content-center">
                    <button 
                        onClick={printInvoice}
                        className="btn btn-dark"
                    >
                        <i className="bi bi-printer ms-2"></i>
                        پرینت فاکتور
                    </button>
                    
                    <button 
                        onClick={() => router.back()}
                        className="btn btn-outline-secondary"
                    >
                        <i className="bi bi-arrow-right ms-2"></i>
                        بازگشت
                    </button>

                    <button 
                        onClick={() => router.push('/p-user/orders')}
                        className="btn btn-outline-primary"
                    >
                        <i className="bi bi-list ms-2"></i>
                        لیست سفارشات
                    </button>
                </div>
            </div>

            {/* استایل برای پرینت */}
            <style jsx>{`
                @media print {
                    .no-print {
                        display: none !important;
                    }
                    
                    .container-xl {
                        max-width: 100% !important;
                        margin: 0 !important;
                        padding: 15px !important;
                    }
                    
                    .card {
                        border: 1px solid #ddd !important;
                        box-shadow: none !important;
                    }
                    
                    .table td, .table th {
                        font-size: 12px !important;
                        padding: 8px 4px !important;
                    }
                }
                
                @media (max-width: 576px) {
                    .table td, .table th {
                        font-size: 0.8rem;
                        padding: 0.5rem 0.25rem;
                    }
                    
                    .card-body {
                        padding: 0.75rem;
                    }
                    
                    .btn {
                        font-size: 0.9rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default InvoicePage;