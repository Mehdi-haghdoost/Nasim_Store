"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

const InvoicePage = () => {
    const params = useParams();
    const router = useRouter();
    const [orderData, setOrderData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const orderId = params.orderId;
        
        // گرفتن تاریخ سفارش از localStorage
        const orderHistory = JSON.parse(localStorage.getItem('order_history') || '[]');
        const foundOrder = orderHistory.find(order => order.orderNumber === orderId);
        
        if (foundOrder) {
            setOrderData(foundOrder);
        } else {
            // اگر سفارش پیدا نشد، به صفحه سفارشات برگرد
            setTimeout(() => {
                router.push('/p-user/orders');
            }, 2000);
        }
        setLoading(false);
    }, [params.orderId, router]);

    const printInvoice = () => {
        window.print();
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('fa-IR').format(price);
    };

    const calculateTax = (price) => {
        // محاسبه مالیات 9% (قابل تغییر)
        return Math.round(price * 0.09);
    };

    if (loading) {
        return (
            <div className="container-xl d-flex justify-content-center align-items-center" style={{ marginTop: "100px", minHeight: "400px" }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">در حال بارگذاری...</span>
                </div>
            </div>
        );
    }

    if (!orderData) {
        return (
            <div className="container-xl text-center" style={{ marginTop: "100px" }}>
                <div className="alert alert-warning">
                    <h4>سفارش یافت نشد!</h4>
                    <p>در حال انتقال به صفحه سفارشات...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container-xl" style={{ marginTop: "100px" }}>
            {/* هدر فاکتور */}
            <div className="row">
                <div className="col-3 text-center"></div>
                <div className="col-6 text-center">
                    <h3 className="font-weight-bold">صورتحساب فروش کالا و خدمات</h3>
                </div>
                <div className="col-3 text-right">
                    <p>شماره سفارش: {orderData.orderNumber}</p>
                    <p>تاریخ سفارش: {orderData.orderDate}</p>
                    {orderData.transactionCode && (
                        <p>کد پیگیری: {orderData.transactionCode}</p>
                    )}
                </div>
            </div>

            <div className="row">
                <table className="table">
                    {/* مشخصات فروشنده */}
                    <thead>
                        <tr>
                            <th className="text-center" colSpan="11">مشخصات فروشنده</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="11" className="text-right">
                                <div className="row">
                                    <div className="col-4">
                                        <p>نام شخص حقیقی / حقوقی: نسیم استور</p>
                                        <p>آدرس کامل: استان تهران، شهر تهران، میدان ونک، خیابان حقانی، طبقه سوم</p>
                                    </div>
                                    <div className="col-4">
                                        <p>شماره اقتصادی: ۱۲۳۴۵۶۷۸۹۰</p>
                                        <p>کد پستی: ۱۴۱۵۷۴۳۱۱۱</p>
                                    </div>
                                    <div className="col-4">
                                        <p>شماره ثبت / شناسه ملی: ۱۰۱۰۱۰۱۰۱۰</p>
                                        <p>تلفن / نمابر: ۰۲۱-۸۸۸۸۸۸۸۸</p>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>

                    {/* مشخصات خریدار */}
                    <thead>
                        <tr>
                            <th className="text-center" colSpan="11">مشخصات خریدار</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="11" className="text-right">
                                <div className="row">
                                    <div className="col-4">
                                        <p>نام شخص حقیقی / حقوقی: {orderData.customerInfo.firstName} {orderData.customerInfo.lastName}</p>
                                        <p>آدرس کامل: {orderData.customerInfo.province}, {orderData.customerInfo.city}, {orderData.customerInfo.street} {orderData.customerInfo.unit && `, واحد ${orderData.customerInfo.unit}`}</p>
                                    </div>
                                    <div className="col-4">
                                        <p>شماره اقتصادی: -</p>
                                        <p>کد پستی: {orderData.customerInfo.postalCode}</p>
                                    </div>
                                    <div className="col-4">
                                        <p>شماره ثبت / شناسه ملی: {orderData.customerInfo.nationalId || '-'}</p>
                                        <p>تلفن / نمابر: {orderData.customerInfo.phone}</p>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>

                    {/* مشخصات کالا */}
                    <thead>
                        <tr>
                            <th className="text-center" colSpan="11">مشخصات کالا یا خدمات مورد معامله</th>
                        </tr>
                    </thead>
                    <thead>
                        <tr className="text-center">
                            <th>ردیف</th>
                            <th>کد کالا</th>
                            <th>شرح کالا یا خدمات</th>
                            <th>تعداد / مقدار</th>
                            <th>واحد اندازه گیری</th>
                            <th>مبلغ واحد (ریال)</th>
                            <th>مبلغ کل (ریال)</th>
                            <th>مبلغ تخفیف (ریال)</th>
                            <th>مبلغ کل پس از تخفیف (ریال)</th>
                            <th>جمع مالیات و عوارض (ریال)</th>
                            <th>جمع مبلغ کل به علاوه مالیات و عوارض (ریال)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderData.items.map((item, index) => {
                            const totalPrice = item.price * item.quantity;
                            const discountAmount = item.discountAmount || 0;
                            const afterDiscount = totalPrice - discountAmount;
                            const tax = calculateTax(afterDiscount);
                            const finalAmount = afterDiscount + tax;

                            return (
                                <tr key={index} className="text-center">
                                    <td>{index + 1}</td>
                                    <td>{item.id || item._id}</td>
                                    <td>{item.name || item.title}</td>
                                    <td>{formatPrice(item.quantity)}</td>
                                    <td>عدد</td>
                                    <td>{formatPrice(item.price)}</td>
                                    <td>{formatPrice(totalPrice)}</td>
                                    <td>{formatPrice(discountAmount)}</td>
                                    <td>{formatPrice(afterDiscount)}</td>
                                    <td>{formatPrice(tax)}</td>
                                    <td>{formatPrice(finalAmount)}</td>
                                </tr>
                            );
                        })}

                        {/* ردیف جمع کل */}
                        <tr>
                            <th colSpan="5" className="text-right">جمع کل</th>
                            <th className="text-center">{formatPrice(orderData.pricing.totalPrice)}</th>
                            <th className="text-center">{formatPrice(orderData.pricing.totalPrice)}</th>
                            <th className="text-center">{formatPrice(orderData.pricing.totalDiscount + (orderData.pricing.discountCodeAmount || 0))}</th>
                            <th className="text-center">{formatPrice(orderData.pricing.finalPrice)}</th>
                            <th className="text-center">{formatPrice(calculateTax(orderData.pricing.finalPrice))}</th>
                            <th className="text-center">{formatPrice(orderData.pricing.finalPrice + calculateTax(orderData.pricing.finalPrice))}</th>
                        </tr>

                        {/* اطلاعات اضافی */}
                        <tr>
                            <th colSpan="5" className="text-right">
                                شرایط و نحوه فروش:
                                <span style={{ marginLeft: "4px", marginRight: "20px", display: "inline-block" }}>
                                    {orderData.paymentMethod === 'DirectBankPayment' ? '✓' : '☐'} نقدی
                                </span>
                                <span style={{ marginLeft: "20px", marginRight: "20px", display: "inline-block" }}>
                                    {orderData.paymentMethod !== 'DirectBankPayment' ? '✓' : '☐'} غیر نقدی
                                </span>
                            </th>
                            <th colSpan="6" className="text-right">
                                توضیحات: {orderData.customerInfo.orderNotes || 'ندارد'}
                            </th>
                        </tr>

                        {/* امضا */}
                        <tr style={{ padding: "60px 0" }}>
                            <td colSpan="5" className="text-right" style={{ height: "80px", verticalAlign: "bottom" }}>
                                مهر و امضا فروشنده
                            </td>
                            <td colSpan="6" className="text-right" style={{ height: "80px", verticalAlign: "bottom" }}>
                                مهر و امضا خریدار
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* دکمه‌های عملیات */}
            <div className="text-center mb-4">
                <button 
                    onClick={printInvoice}
                    className="btn btn-dark text-white me-3"
                    style={{ width: "100px" }}
                >
                    <i className="bi bi-printer me-2"></i>
                    پرینت
                </button>
                
                <button 
                    onClick={() => router.back()}
                    className="btn btn-outline-secondary"
                    style={{ width: "100px" }}
                >
                    <i className="bi bi-arrow-right me-2"></i>
                    بازگشت
                </button>
            </div>
        </div>
    );
};

export default InvoicePage;