"use client";

import React, { useState, useEffect } from 'react';
import styles from './CheckoutFrom.module.css';
import CheckoutSide from './CheckoutSide';
import { useCart } from '@/Redux/hooks/useCart';
import { useAuth } from '@/Redux/hooks/useAuth';
import useAddress from '@/Redux/hooks/useAddress';
import { showSwal } from '@/utils/helpers';
import { useRouter } from 'next/navigation';

// Import کردن فایل استان‌ها و شهرها
import provincesData from '@/data/provincesCities';

const CheckoutFrom = () => {
    const router = useRouter();
    const { items, finalPrice, loading: cartLoading } = useCart();
    const { user, isAuthenticated } = useAuth();
    const { addresses, loading: addressLoading } = useAddress();
    
    // State برای هیدریشن
    const [isMounted, setIsMounted] = useState(false);
    
    // State برای فرم
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        province: '',
        city: '',
        street: '',
        unit: '',
        phone: '',
        email: '',
        postalCode: '',
        orderNotes: ''
    });

    // State برای آدرس انتخاب شده
    const [selectedAddressId, setSelectedAddressId] = useState('');

    // State برای validation
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // استفاده از داده‌های فایل
    const provinces = provincesData.provinces;
    const cities = provincesData.cities;

    // مدیریت hydration
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // بارگذاری اطلاعات کاربر
    useEffect(() => {
        if (isMounted && isAuthenticated && user) {
            setFormData(prev => ({
                ...prev,
                firstName: user.username ? user.username.split(' ')[0] : '',
                lastName: user.username ? user.username.split(' ').slice(1).join(' ') : '',
                phone: user.phone || '',
                email: user.email || '',
                postalCode: user.postalCode || ''
            }));

            // انتخاب آدرس پیش‌فرض
            if (addresses && addresses.length > 0) {
                const defaultAddress = addresses.find(addr => addr.isDefault);
                if (defaultAddress) {
                    setSelectedAddressId(defaultAddress._id);
                    fillFormWithAddress(defaultAddress);
                }
            }
        }
    }, [isMounted, isAuthenticated, user, addresses]);

    // پر کردن فرم با اطلاعات آدرس
    const fillFormWithAddress = (address) => {
        setFormData(prev => ({
            ...prev,
            province: address.province || '',
            city: address.city || '',
            street: address.address || address.street || '',
            unit: address.unit || '',
            postalCode: address.postalCode || ''
        }));
    };

    // مدیریت انتخاب آدرس
    const handleAddressSelect = (addressId) => {
        setSelectedAddressId(addressId);
        if (addressId === '') {
            setFormData(prev => ({
                ...prev,
                province: '',
                city: '',
                street: '',
                unit: '',
                postalCode: ''
            }));
        } else {
            const selectedAddress = addresses.find(addr => addr._id === addressId);
            if (selectedAddress) {
                fillFormWithAddress(selectedAddress);
            }
        }
    };

    // بررسی سبد خرید خالی
    useEffect(() => {
        if (isMounted && !cartLoading && (!items || items.length === 0)) {
            showSwal("سبد خرید شما خالی است!", "warning", "بازگشت به فروشگاه");
            router.push('/');
        }
    }, [isMounted, items, cartLoading, router]);

    // مدیریت تغییر ورودی‌ها
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        if (name === 'province') {
            setFormData(prev => ({
                ...prev,
                province: value,
                city: ''
            }));
        }
        
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    // validation فرم
    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'نام الزامی است';
        }
        if (!formData.lastName.trim()) {
            newErrors.lastName = 'نام خانوادگی الزامی است';
        }
        if (!formData.province) {
            newErrors.province = 'انتخاب استان الزامی است';
        }
        if (!formData.city) {
            newErrors.city = 'انتخاب شهر الزامی است';
        }
        if (!formData.street.trim()) {
            newErrors.street = 'آدرس الزامی است';
        }
        if (!formData.phone.trim()) {
            newErrors.phone = 'شماره تلفن الزامی است';
        } else if (!/^09\d{9}$/.test(formData.phone.replace(/\s/g, ''))) {
            newErrors.phone = 'شماره تلفن معتبر نیست';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'ایمیل الزامی است';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'ایمیل معتبر نیست';
        }
        if (!formData.postalCode.trim()) {
            newErrors.postalCode = 'کد پستی الزامی است';
        } else if (!/^\d{10}$/.test(formData.postalCode.replace(/\s/g, ''))) {
            newErrors.postalCode = 'کد پستی باید ۱۰ رقم باشد';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // ارسال فرم
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            showSwal("لطفا خطاهای فرم را برطرف کنید", "error", "باشه");
            return;
        }

        setIsSubmitting(true);

        try {
            const orderData = {
                customerInfo: {
                    ...formData,
                    userId: user?._id || null,
                    nationalId: user?.nationalId || null
                },
                items: items,
                totalPrice: finalPrice,
                timestamp: Date.now()
            };

            localStorage.setItem('checkout_data', JSON.stringify(orderData));
            showSwal("اطلاعات با موفقیت ثبت شد", "success", "ادامه");
            
        } catch (error) {
            console.error('Error submitting form:', error);
            showSwal("خطا در ثبت اطلاعات", "error", "تلاش مجدد");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isMounted) {
        return null;
    }

    if (cartLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{minHeight: '400px'}}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">در حال بارگذاری...</span>
                </div>
            </div>
        );
    }

    return (
        <div className='row gy-3'>
            <div className="col-lg-8">
                <div className="content-box position-sticky top-0">
                    <div className="container-fluid">
                        <div className={styles.checkout_froms}>
                            <div className={styles.checkout_from_title}>
                                <h5 className="mb-3">جزئیات پرداخت</h5>
                            </div>
                            
                            {/* انتخاب آدرس ذخیره شده */}
                            {isAuthenticated && addresses && addresses.length > 0 && (
                                <div className="alert alert-info mb-4">
                                    <h6 className="mb-3">
                                        <i className="bi bi-geo-alt me-2"></i>
                                        آدرس‌های ذخیره شده
                                        {addressLoading && (
                                            <span className="spinner-border spinner-border-sm ms-2" role="status"></span>
                                        )}
                                    </h6>
                                    <div className="form-group">
                                        <select 
                                            value={selectedAddressId}
                                            onChange={(e) => handleAddressSelect(e.target.value)}
                                            className="form-select rounded-3"
                                            disabled={addressLoading}
                                        >
                                            <option value="">آدرس جدید وارد کنید</option>
                                            {addresses.map(address => (
                                                <option key={address._id} value={address._id}>
                                                    {address.title || 'آدرس'} - {address.province || ''}, {address.city || ''}
                                                    {address.isDefault && ' (پیش‌فرض)'}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            )}

                            <div className={styles.checkout_from}>
                                <form onSubmit={handleSubmit}>
                                    {/* نام و نام خانوادگی */}
                                    <div className='form-group'>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className='form-group'>
                                                    <label htmlFor="firstName" className='form-label'>
                                                        نام <span className='text-danger me-1'>*</span>
                                                    </label>
                                                    <input 
                                                        type="text" 
                                                        id='firstName'
                                                        name='firstName'
                                                        value={formData.firstName}
                                                        onChange={handleInputChange}
                                                        className={`form-control rounded-3 ${errors.firstName ? 'is-invalid' : ''}`}
                                                    />
                                                    {errors.firstName && (
                                                        <div className="invalid-feedback">{errors.firstName}</div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className='form-group'>
                                                    <label htmlFor="lastName" className='form-label'>
                                                        نام خانوادگی <span className='text-danger me-1'>*</span>
                                                    </label>
                                                    <input 
                                                        type="text" 
                                                        id='lastName'
                                                        name='lastName'
                                                        value={formData.lastName}
                                                        onChange={handleInputChange}
                                                        className={`form-control rounded-3 ${errors.lastName ? 'is-invalid' : ''}`}
                                                    />
                                                    {errors.lastName && (
                                                        <div className="invalid-feedback">{errors.lastName}</div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* استان و شهر */}
                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className='form-group'>
                                                    <label htmlFor="province" className='form-label'>
                                                        استان <span className='text-danger me-1'>*</span>
                                                    </label>
                                                    <select 
                                                        id="province"
                                                        name="province"
                                                        value={formData.province}
                                                        onChange={handleInputChange}
                                                        style={{direction: "rtl"}} 
                                                        className={`form-select rounded-3 ${errors.province ? 'is-invalid' : ''}`}
                                                    >
                                                        <option value="">انتخاب استان</option>
                                                        {provinces && provinces.map(province => (
                                                            <option key={province} value={province}>{province}</option>
                                                        ))}
                                                    </select>
                                                    {errors.province && (
                                                        <div className="invalid-feedback">{errors.province}</div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className='form-group'>
                                                    <label htmlFor="city" className='form-label'>
                                                        شهر <span className='text-danger me-1'>*</span>
                                                    </label>
                                                    <select 
                                                        id="city"
                                                        name="city"
                                                        value={formData.city}
                                                        onChange={handleInputChange}
                                                        className={`form-select rounded-3 ${errors.city ? 'is-invalid' : ''}`}
                                                        disabled={!formData.province}
                                                    >
                                                        <option value="">انتخاب شهر</option>
                                                        {formData.province && cities && cities[formData.province] && cities[formData.province].map(city => (
                                                            <option key={city} value={city}>{city}</option>
                                                        ))}
                                                    </select>
                                                    {errors.city && (
                                                        <div className="invalid-feedback">{errors.city}</div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* آدرس */}
                                    <div className="form-group">
                                        <label htmlFor="street" className="form-label">
                                            آدرس کامل <span className="text-danger me-1">*</span>
                                        </label>
                                        <input 
                                            type="text" 
                                            placeholder="پلاک خانه و نام خیابان"
                                            id='street'
                                            name='street'
                                            value={formData.street}
                                            onChange={handleInputChange}
                                            className={`form-control rounded-3 ${errors.street ? 'is-invalid' : ''}`}
                                        />
                                        {errors.street && (
                                            <div className="invalid-feedback">{errors.street}</div>
                                        )}
                                    </div>

                                    {/* واحد */}
                                    <div className="form-group">
                                        <input 
                                            type="text" 
                                            placeholder='شماره واحد، بلوک، پلاک (اختیاری)'
                                            id='unit'
                                            name='unit'
                                            value={formData.unit}
                                            onChange={handleInputChange}
                                            className='form-control rounded-3'
                                        />
                                    </div>

                                    {/* تلفن */}
                                    <div className="form-group">
                                        <label htmlFor="phone" className='form-label'>
                                            شماره موبایل <span className="text-danger me-1">*</span>
                                        </label>
                                        <input 
                                            type="text"
                                            id='phone'
                                            name='phone'
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            placeholder="09123456789"
                                            className={`form-control rounded-3 ${errors.phone ? 'is-invalid' : ''}`}
                                        />
                                        {errors.phone && (
                                            <div className="invalid-feedback">{errors.phone}</div>
                                        )}
                                    </div>

                                    {/* ایمیل */}
                                    <div className="form-group">
                                        <label htmlFor="email" className='form-label'>
                                            آدرس ایمیل <span className="text-danger me-1">*</span>
                                        </label>
                                        <input 
                                            type="email"
                                            id='email'
                                            name='email'
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className={`form-control rounded-3 ${errors.email ? 'is-invalid' : ''}`}
                                        />
                                        {errors.email && (
                                            <div className="invalid-feedback">{errors.email}</div>
                                        )}
                                    </div>

                                    {/* کد پستی */}
                                    <div className="form-group">
                                        <label htmlFor="postalCode" className='form-label'>
                                            کد پستی <span className="text-danger me-1">*</span>
                                        </label>
                                        <input 
                                            type="text"
                                            id='postalCode'
                                            name='postalCode'
                                            value={formData.postalCode}
                                            onChange={handleInputChange}
                                            placeholder="1234567890"
                                            className={`form-control rounded-3 ${errors.postalCode ? 'is-invalid' : ''}`}
                                        />
                                        {errors.postalCode && (
                                            <div className="invalid-feedback">{errors.postalCode}</div>
                                        )}
                                    </div>

                                    {/* یادداشت سفارش */}
                                    <div className="form-group">
                                        <label htmlFor="orderNotes" className='form-label'>
                                            یادداشت های سفارش (اختیاری)
                                        </label>
                                        <textarea 
                                            rows="5" 
                                            id="orderNotes"
                                            name="orderNotes"
                                            value={formData.orderNotes}
                                            onChange={handleInputChange}
                                            className='form-control rounded-3'
                                            placeholder="نکاتی در مورد سفارش به عنوان مثال نکاتی برای تحویل"
                                        ></textarea>
                                    </div>

                                    {/* دکمه ثبت */}
                                    <div className="form-group">
                                        <button 
                                            type="submit" 
                                            disabled={isSubmitting}
                                            className="btn main-color-one-bg border-0 rounded-3 w-100 py-2"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                                    در حال ثبت...
                                                </>
                                            ) : (
                                                'ثبت اطلاعات و ادامه'
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-4">
                <CheckoutSide formData={formData} />
            </div>
        </div>
    );
};

export default CheckoutFrom;