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
            <div className="container-xl text-center" style={{ marginTop: "100px" }}>
                <div className="alert alert-danger">
                    <h4>خطا در بارگذاری فاکتور!</h4>
                    <p>{error}</p>
                    <button 
                        onClick={() => router.push('/p-user/orders')}
                        className="btn btn-primary ms-2"
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
        );
    }

    if (!currentOrder) {
        return (
            <div className="container-xl text-center" style={{ marginTop: "100px" }}>
                <div className="alert alert-warning">
                    <h4>سفارش یافت نشد!</h4>
                    <p>در حال انتقال به صفحه سفارشات...</p>
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
        <div className="container-xl" style={{ marginTop: "100px" }}>
            {/* هدر فاکتور */}
            <div className="row mb-4">
                <div className="col-12 text-center">
                    <h3 className="mb-4">فاکتور فروش</h3>
                    <div className="row">
                        <div className="col-md-4">
                            <p><strong>شماره پیگیری:</strong> {orderData.trackingId}</p>
                        </div>
                        <div className="col-md-4">
                            <p><strong>تاریخ سفارش:</strong> {formatDate(orderData.orderDate)}</p>
                        </div>
                        <div className="col-md-4">
                            <p><strong>وضعیت:</strong> 
                                <span className={`badge ms-2 ${
                                    orderData.status === 'DELIVERED' ? 'bg-success' :
                                    orderData.status === 'SHIPPED' ? 'bg-info' :
                                    orderData.status === 'PENDING' ? 'bg-warning' :
                                    'bg-secondary'
                                }`}>
                                    {orderData.status === 'DELIVERED' ? 'تحویل شده' :
                                     orderData.status === 'SHIPPED' ? 'ارسال شده' :
                                     orderData.status === 'PENDING' ? 'در انتظار' : 'نامشخص'}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* اطلاعات خریدار */}
            <div className="row mb-4">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h5>اطلاعات فروشنده</h5>
                        </div>
                        <div className="card-body">
                            <p><strong>نام:</strong> نسیم استور</p>
                            <p><strong>آدرس:</strong> تهران، میدان ونک</p>
                            <p><strong>تلفن:</strong> ۰۲۱-۸۸۸۸۸۸۸۸</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h5>اطلاعات خریدار</h5>
                        </div>
                        <div className="card-body">
                            <p><strong>نام:</strong> {orderData.recipient}</p>
                            <p><strong>تلفن:</strong> {orderData.phoneNumber}</p>
                            <p><strong>آدرس:</strong> {orderData.shippingAddress}</p>
                            {orderData.postalCode && (
                                <p><strong>کد پستی:</strong> {orderData.postalCode}</p>
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
                            <h5>جزئیات محصولات</h5>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-bordered">
                                    <thead className="table-light">
                                        <tr>
                                            <th>ردیف</th>
                                            <th>نام محصول</th>
                                            <th>تعداد</th>
                                            <th>قیمت واحد</th>
                                            <th>قیمت کل</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orderData.items.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>
                                                    {item.product?.title || item.name}
                                                </td>
                                                <td>{item.quantity}</td>
                                                <td>{formatPrice(item.price)} تومان</td>
                                                <td>{formatPrice(item.price * item.quantity)} تومان</td>
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
                <div className="col-md-6 ms-auto">
                    <div className="card">
                        <div className="card-header">
                            <h5>خلاصه فاکتور</h5>
                        </div>
                        <div className="card-body">
                            <div className="row mb-2">
                                <div className="col-6">جمع کالاها:</div>
                                <div className="col-6 text-end">
                                    {formatPrice(orderData.totalAmount - (orderData.shippingCost || 0))} تومان
                                </div>
                            </div>
                            
                            {orderData.shippingCost > 0 && (
                                <div className="row mb-2">
                                    <div className="col-6">هزینه ارسال:</div>
                                    <div className="col-6 text-end">
                                        {formatPrice(orderData.shippingCost)} تومان
                                    </div>
                                </div>
                            )}

                            {orderData.discountCoupon && (
                                <div className="row mb-2 text-success">
                                    <div className="col-6">
                                        تخفیف ({orderData.discountCoupon.code}):
                                    </div>
                                    <div className="col-6 text-end">
                                        -{formatPrice(Math.round(orderData.totalAmount * orderData.discountCoupon.discountPercentage / 100))} تومان
                                    </div>
                                </div>
                            )}

                            <hr />
                            <div className="row mb-2">
                                <div className="col-6"><strong>مجموع نهایی:</strong></div>
                                <div className="col-6 text-end">
                                    <strong className="text-primary fs-5">
                                        {formatPrice(orderData.totalAmount)} تومان
                                    </strong>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12">
                                    <small className="text-muted">
                                        روش پرداخت: {orderData.paymentMethod === 'DirectBankPayment' ? 'پرداخت آنلاین' : 'پرداخت در محل'}
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* دکمه‌های عملیات */}
            <div className="text-center mb-4 no-print">
                <button 
                    onClick={printInvoice}
                    className="btn btn-dark ms-3"
                >
                    <i className="bi bi-printer ms-2"></i>
                    پرینت فاکتور
                </button>
                
                <button 
                    onClick={() => router.back()}
                    className="btn btn-outline-secondary ms-3"
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
                }
            `}</style>
        </div>
    );
};

export default InvoicePage;