"use client";

import React, { useState } from 'react';
import styles from './DiscountModal.module.css';
import { showSwal } from '@/utils/helpers';
import { useCart } from '@/Redux/hooks/useCart';

const DiscountModal = () => {
    const { finalPrice } = useCart();
    const [discountCode, setDiscountCode] = useState('');
    const [appliedDiscount, setAppliedDiscount] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // کدهای تخفیف پیش‌فرض (در پروژه واقعی از API دریافت می‌شود)
    const discountCodes = {
        'EYD1402': { percent: 10, description: '10% تخفیف عید' },
        'SALE2024': { percent: 15, description: '15% تخفیف فروش ویژه' },
        'WELCOME': { percent: 5, description: '5% تخفیف خوش آمدگویی' },
        'NEWUSER': { percent: 20, description: '20% تخفیف کاربر جدید' }
    };

    const handleDiscountSubmit = async (e) => {
        e.preventDefault();
        
        if (!discountCode.trim()) {
            showSwal("لطفا کد تخفیف را وارد کنید", "warning", "باشه");
            return;
        }

        setIsLoading(true);

        try {
            // شبیه‌سازی درخواست API
            await new Promise(resolve => setTimeout(resolve, 1000));

            const upperCode = discountCode.toUpperCase();
            const discount = discountCodes[upperCode];

            if (discount) {
                const discountAmount = Math.round((finalPrice * discount.percent) / 100);
                
                const newDiscount = {
                    code: upperCode,
                    percent: discount.percent,
                    amount: discountAmount,
                    description: discount.description
                };
                
                setAppliedDiscount(newDiscount);

                // ذخیره در localStorage برای استفاده در CheckoutSide
                localStorage.setItem('applied_discount', JSON.stringify(newDiscount));

                // ایجاد event برای اطلاع رسانی به CheckoutSide
                window.dispatchEvent(new StorageEvent('storage', {
                    key: 'applied_discount',
                    newValue: JSON.stringify(newDiscount)
                }));

                showSwal(`تخفیف ${discount.percent}% اعمال شد!`, "success", "عالی");
                
                // بستن مودال
                const modal = document.getElementById('discountModal');
                if (modal) {
                    const bootstrapModal = window.bootstrap?.Modal?.getInstance(modal);
                    if (bootstrapModal) {
                        bootstrapModal.hide();
                    }
                }
            } else {
                showSwal("کد تخفیف معتبر نیست", "error", "باشه");
            }
        } catch (error) {
            console.error('Error applying discount:', error);
            showSwal("خطا در اعمال تخفیف", "error", "تلاش مجدد");
        } finally {
            setIsLoading(false);
        }
    };

    const removeDiscount = () => {
        setAppliedDiscount(null);
        setDiscountCode('');
        localStorage.removeItem('applied_discount');
        
        // ایجاد event برای اطلاع رسانی به CheckoutSide
        window.dispatchEvent(new StorageEvent('storage', {
            key: 'applied_discount',
            newValue: null
        }));
        
        showSwal("تخفیف حذف شد", "info", "باشه");
    };

    // بررسی وجود تخفیف ذخیره شده
    React.useEffect(() => {
        const savedDiscount = localStorage.getItem('applied_discount');
        if (savedDiscount) {
            try {
                setAppliedDiscount(JSON.parse(savedDiscount));
            } catch (error) {
                console.error('Error loading saved discount:', error);
            }
        }
    }, []);

    return (
        <>
            {/* نمایش وضعیت تخفیف */}
            <div className='show-discount-modal py-3 mb-3' role='button' data-bs-toggle="modal" data-bs-target="#discountModal">
                <i className="bi bi-patch-exclamation main-color-one-color ms-3" style={{ fontSize: "40px" }}></i>
                {appliedDiscount ? (
                    <span className="text-success">
                        کد تخفیف "{appliedDiscount.code}" اعمال شد - {appliedDiscount.percent}% تخفیف
                        <button 
                            className="btn btn-sm btn-outline-danger ms-2"
                            onClick={(e) => {
                                e.stopPropagation();
                                removeDiscount();
                            }}
                        >
                            حذف
                        </button>
                    </span>
                ) : (
                    'کوپن تخفیف دارید؟ برای نوشتن کد اینجا کلیک کنید'
                )}
            </div>

            {/* مودال */}
            <div className={styles.discount_modal}>
                <div className="modal fade" id='discountModal' tabIndex="-1" aria-labelledby="discountModalLabel" aria-hidden="true">
                    <div className='modal-dialog modal-md modal-dialog-centered'>
                        <div className="modal-content">
                            <div className="modal-header justify-content-between">
                                <h6 className="modal-title" id='discountModalLabel'>کد تخفیف</h6>
                                <button 
                                    type='button' 
                                    className='btn-close' 
                                    style={{ marginLeft: "inherit" }} 
                                    data-bs-dismiss="modal" 
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                <h6 className="font-16 mb-3">
                                    اگر شما کد تخفیف دارید، برای ثبت آن از طریق زیر اقدام کنید.
                                </h6>

                                {/* نمایش کدهای تخفیف موجود (برای تست) */}
                                <div className="alert alert-info mb-3">
                                    <h6>کدهای تخفیف موجود:</h6>
                                    <ul className="mb-0">
                                        {Object.entries(discountCodes).map(([code, details]) => (
                                            <li key={code}>
                                                <strong>{code}</strong> - {details.description}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <form onSubmit={handleDiscountSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="discount" className='form-label py-2'>
                                            کد تخفیف:
                                        </label>
                                        <input 
                                            type="text" 
                                            id="discount"
                                            value={discountCode}
                                            onChange={(e) => setDiscountCode(e.target.value)}
                                            className='form-control rounded-3 mb-3' 
                                            placeholder='برای مثال EYD1402'
                                            disabled={isLoading}
                                        />
                                    </div>

                                    {/* نمایش تخفیف اعمال شده */}
                                    {appliedDiscount && (
                                        <div className="alert alert-success">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div>
                                                    <strong>{appliedDiscount.description}</strong><br/>
                                                    <small>مبلغ تخفیف: {appliedDiscount.amount.toLocaleString()} تومان</small>
                                                </div>
                                                <button 
                                                    type="button"
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={removeDiscount}
                                                >
                                                    حذف
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    <button 
                                        type="submit"
                                        className='btn main-color-one-bg border-0 mb-2 me-2' 
                                        style={{ width: "12rem", padding: "10px 0" }}
                                        disabled={isLoading || !discountCode.trim()}
                                    >
                                        {isLoading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                                در حال بررسی...
                                            </>
                                        ) : (
                                            'ثبت کد تخفیف'
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DiscountModal;