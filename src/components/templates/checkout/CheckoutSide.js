"use client";

import React, { useEffect, useState } from 'react';
import styles from './CheckoutSide.module.css';
import DayItem from '@/components/modules/checkout/DayItem';
import { showSwal } from '@/utils/helpers';
import getNext6DaysWithJalali from '@/utils/WeekDaysInPersian';
import { useCart } from '@/Redux/hooks/useCart';
import { useRouter } from 'next/navigation';

const CheckoutSide = ({ formData }) => {
    const router = useRouter();
    const { items, totalPrice, totalDiscount, finalPrice, loading } = useCart();
    
    // State برای hydration
    const [isMounted, setIsMounted] = useState(false);
    
    const [selectDay, setSelectDay] = useState(null);
    const [persianDays, setPersianDays] = useState(null);
    const [shippingMethod, setShippingMethod] = useState('Express');
    const [paymentMethod, setPaymentMethod] = useState('DirectBankPayment');
    const [shippingCost, setShippingCost] = useState(16000);
    const [appliedDiscount, setAppliedDiscount] = useState(null);

    // روش‌های ارسال
    const shippingMethods = {
        'Economy': { name: 'پست معمولی', cost: 8000 },
        'Express': { name: 'پست پیشتاز', cost: 16000 }
    };

    // مدیریت hydration
    useEffect(() => {
        setIsMounted(true);
        setPersianDays(getNext6DaysWithJalali);
        
        // تابع بررسی تخفیف
        const checkDiscount = () => {
            const savedDiscount = localStorage.getItem('applied_discount');
            if (savedDiscount) {
                try {
                    setAppliedDiscount(JSON.parse(savedDiscount));
                } catch (error) {
                    console.error('Error loading saved discount:', error);
                }
            } else {
                setAppliedDiscount(null);
            }
        };
        
        checkDiscount();
        
        // گوش دادن به تغییرات localStorage
        const handleStorageChange = (e) => {
            if (e.key === 'applied_discount') {
                checkDiscount();
            }
        };
        
        window.addEventListener('storage', handleStorageChange);
        
        // interval برای چک کردن تغییرات در همان tab (کاهش زمان به 500ms)
        const interval = setInterval(checkDiscount, 500);
        
        return () => {
            window.removeEventListener('storage', handleStorageChange);
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        if (isMounted) {
            setShippingCost(shippingMethods[shippingMethod].cost);
        }
    }, [shippingMethod, isMounted]);

    const handleClickDay = (day) => {
        setSelectDay(day);
    };

    const handleShippingMethodChange = (method) => {
        setShippingMethod(method);
    };

    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
    };

    // محاسبه قیمت نهایی با هزینه ارسال و تخفیف
    const discountAmount = appliedDiscount ? appliedDiscount.amount : 0;
    const finalPriceAfterDiscount = finalPrice - discountAmount;
    const finalPriceWithShipping = finalPriceAfterDiscount + shippingCost;

    const handlePayment = () => {
        // بررسی انتخاب روز تحویل
        if (!selectDay) {
            return showSwal("لطفا یک روز را برای تحویل مرسوله انتخاب کنید", "warning", "تلاش مجدد");
        }

        // بررسی تکمیل فرم
        if (!formData || !formData.firstName || !formData.lastName || !formData.phone) {
            return showSwal("لطفا ابتدا اطلاعات خود را تکمیل کنید", "warning", "تلاش مجدد");
        }

        // بررسی خالی نبودن سبد خرید
        if (!items || items.length === 0) {
            return showSwal("سبد خرید شما خالی است!", "warning", "بازگشت به فروشگاه");
        }

        // ذخیره اطلاعات کامل سفارش
        const orderDetails = {
            customerInfo: formData,
            items: items,
            deliveryDay: selectDay,
            shippingMethod: {
                type: shippingMethod,
                name: shippingMethods[shippingMethod].name,
                cost: shippingCost
            },
            paymentMethod: paymentMethod,
            appliedDiscount: appliedDiscount,
            pricing: {
                totalPrice: totalPrice,
                totalDiscount: totalDiscount,
                discountCodeAmount: discountAmount,
                shippingCost: shippingCost,
                finalPrice: finalPriceWithShipping
            },
            timestamp: Date.now()
        };

        try {
            localStorage.setItem('order_details', JSON.stringify(orderDetails));
            
            // هدایت به صفحه پرداخت
            if (paymentMethod === 'DirectBankPayment') {
                showSwal("به صفحه پرداخت منتقل می‌شوید", "success", "ادامه");
                setTimeout(() => {
                    router.push('/success-payment');
                }, 2000);
            } else {
                showSwal("سفارش شما با موفقیت ثبت شد", "success", "تایید");
                setTimeout(() => {
                    router.push('/success-payment');
                }, 2000);
            }
        } catch (error) {
            console.error('Error saving order details:', error);
            showSwal("خطا در ثبت سفارش", "error", "تلاش مجدد");
        }
    };

    // تابع کمکی برای نمایش نام محصول
    const getProductName = (product) => {
        if (product.title) return product.title;
        if (product.name) return product.name;
        return 'محصول';
    };

    // عدم نمایش تا mount شدن
    if (!isMounted) {
        return null;
    }

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{minHeight: '300px'}}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">در حال بارگذاری...</span>
                </div>
            </div>
        );
    }

    if (!items || items.length === 0) {
        return (
            <div className="alert alert-warning">
                <h6>سبد خرید خالی است</h6>
                <p>لطفا ابتدا محصولی به سبد خرید اضافه کنید.</p>
            </div>
        );
    }

    return (
        <div className={`position-sticky ${styles.checkout_side} top-0`}>
            {/* انتخاب زمان ارسال */}
            <div className={`${styles.cart_canvas} mb-4`}>
                <div className={styles.item}>
                    <div className={styles.factor}>
                        <div className={styles.title}>
                            <div className="d-flex align-items-start">
                                <i className="bi bi-calendar2-check-fill ms-2 main-color-one-color"></i>
                                <h6 className="font-16">زمان ارسال</h6>
                            </div>
                        </div>
                        <div className="row gy-3">
                            {persianDays?.map((day, index) => (
                                <DayItem 
                                    {...day}
                                    onClick={() => handleClickDay(day)}
                                    isActive={selectDay === day}
                                    key={index}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* انتخاب شیوه ارسال */}
            <div className={`${styles.cart_canvas} mb-4`}>
                <div className={styles.item}>
                    <div className={styles.factor}>
                        <div className={styles.title}>
                            <div className="d-flex align-items-start">
                                <i className="bi bi-rocket-fill ms-2 main-color-one-color"></i>
                                <h6 className="font-16">انتخاب شیوه ارسال</h6>
                            </div>
                        </div>
                        <div className="row gy-2">
                            <div className="col-12">
                                <div 
                                    className={`${styles.shipping_item} ${shippingMethod === "Economy" ? styles.active : ""}`}
                                    onClick={() => handleShippingMethodChange('Economy')}
                                >
                                    <img src="/images/post-logo.png" className='img-thumbnail' alt="logo" />
                                    <h6 className="font-14 mx-2">{shippingMethods.Economy.name}:</h6>
                                    <p className="mb-0 text-muted">{shippingMethods.Economy.cost.toLocaleString()} تومان</p>
                                </div>
                            </div>
                            <div className="col-12">
                                <div 
                                    className={`${styles.shipping_item} ${shippingMethod === "Express" ? styles.active : ""}`}
                                    onClick={() => handleShippingMethodChange('Express')}
                                >
                                    <img src="/images/post-logo.png" className='img-thumbnail' alt="logo" />
                                    <h6 className="font-14 mx-2">{shippingMethods.Express.name}:</h6>
                                    <p className="mb-0 text-muted">{shippingMethods.Express.cost.toLocaleString()} تومان</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* انتخاب شیوه پرداخت */}
            <div className={`${styles.cart_canvas} mb-4`}>
                <div className={styles.item}>
                    <div className={styles.factor}>
                        <div className={styles.title}>
                            <div className="d-flex align-items-start">
                                <i className="bi bi-credit-card-2-front-fill ms-2 main-color-one-color"></i>
                                <h6 className="font-16">انتخاب شیوه پرداخت</h6>
                            </div>
                        </div>
                        <div className="row gy-2">
                            <div className="col-12">
                                <div 
                                    className={`${styles.bank_item} ${paymentMethod === "DirectBankPayment" ? styles.active : ""}`}
                                    onClick={() => handlePaymentMethodChange('DirectBankPayment')}
                                >
                                    <i className="bi bi-credit-card-2-back main-color-one-color"></i>
                                    <h6 className="font-14 mx-2">انتقال مستقیم بانکی</h6>
                                </div>
                            </div>
                            <div className="col-12">
                                <div 
                                    className={`${styles.bank_item} ${paymentMethod === "CashOnDelivery" ? styles.active : ""}`}
                                    onClick={() => handlePaymentMethodChange('CashOnDelivery')}
                                >
                                    <i className="bi bi-house-fill main-color-one-color"></i>
                                    <h6 className="font-14 mx-2">پرداخت هنگام دریافت</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* خلاصه سفارش */}
            <div className={styles.cart_canvas}>
                <div className={styles.item}>
                    <div className={styles.factor}>
                        <div className={styles.title}>
                            <div className="d-flex align-items-start">
                                <img src="/images/shopping-bag.png" className='img-fluid' alt="shopping-bag" />
                                <h6 className="font-16">سفارش شما</h6>
                            </div>
                        </div>

                        <div className="d-flex mb-3 align-items-center justify-content-between">
                            <p className="fw-bold mb-0">محصول</p>
                            <p className="fw-bold mb-0">قیمت کل</p>
                        </div>

                        {/* نمایش محصولات */}
                        {items.map(item => (
                            <div 
                                key={item._id}
                                className={`${styles.factor_item} p-2 rounded-3 shadow-sm bg-light d-flex align-items-center justify-content-between mb-2`}
                            >
                                <p className="mb-0">
                                    {(() => {
                                        const productName = getProductName(item.product);
                                        return productName.length > 25 
                                            ? `${productName.substring(0, 25)}...` 
                                            : productName;
                                    })()}
                                    {item.quantity > 1 && ` (${item.quantity}x)`}
                                </p>
                                <p className="mb-0">
                                    {(item.product.hasDiscount 
                                        ? item.product.discountedPrice * item.quantity 
                                        : item.product.price * item.quantity
                                    ).toLocaleString()} تومان
                                </p>
                            </div>
                        ))}

                        {/* جمع کل محصولات */}
                        <div className={`${styles.factor_item} p-2 rounded-3 shadow-sm bg-light d-flex align-items-center justify-content-between mb-2`}>
                            <p className="mb-0 fw-bold">جمع محصولات:</p>
                            <p className="mb-0">{totalPrice.toLocaleString()} تومان</p>
                        </div>

                        {/* جمع کل تخفیفات (محصولات + کد تخفیف) */}
                        {(totalDiscount > 0 || appliedDiscount) && (
                            <div className={`${styles.factor_item} p-2 rounded-3 shadow-sm bg-light text-white d-flex align-items-center justify-content-between mb-2`}>
                                <p className="mb-0 fw-bold">
                                    جمع تخفیفات
                                    {appliedDiscount && ` (شامل ${appliedDiscount.percent}% کد تخفیف)`}:
                                </p>
                                <p className="mb-0 fw-bold">-{(totalDiscount + discountAmount).toLocaleString()} تومان</p>
                            </div>
                        )}

                        {/* هزینه ارسال */}
                        <div className={`${styles.factor_item} p-2 rounded-3 shadow-sm bg-light d-flex align-items-center justify-content-between mb-2`}>
                            <p className="mb-0 fw-bold">هزینه ارسال:</p>
                            <p className="mb-0">{shippingCost.toLocaleString()} تومان</p>
                        </div>

                        {/* جمع کل نهایی */}
                        <div className={`${styles.factor_item} p-2 rounded-3 shadow-sm bg-light text-white d-flex align-items-center justify-content-between mb-3`}>
                            <p className="mb-0 fw-bold">جمع کل نهایی:</p>
                            <p className="mb-0 fw-bold">{finalPriceWithShipping.toLocaleString()} تومان</p>
                        </div>

                        {/* دکمه پرداخت */}
                        <div className={`${styles.action} mt-3 d-flex align-items-center justify-content-center`}>
                            <button 
                                className='btn border-0 main-color-two-bg rounded-3 py-2 d-block w-100'
                                onClick={handlePayment}
                                disabled={loading}
                            >
                                {paymentMethod === 'DirectBankPayment' ? 'پرداخت آنلاین' : 'ثبت سفارش'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutSide;