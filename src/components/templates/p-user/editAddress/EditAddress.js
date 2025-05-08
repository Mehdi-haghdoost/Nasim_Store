"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../newAddress/NewAddress.module.css'; // استفاده از همان استایل ثبت آدرس
import { useDispatch, useSelector } from 'react-redux';
import { updateAddress } from '@/Redux/actions/addressThunks';
import { showSwal } from '@/utils/helpers';
// وارد کردن لیست استان‌ها و شهرها
import { provinces, cities } from '@/data/provincesCities';

const EditAddress = ({ addressId }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { user, cachedAddresses, loading } = useSelector(state => state.auth);

    // استیت‌های فرم برای ویرایش آدرس
    const [formData, setFormData] = useState({
        id: addressId,
        street: '',
        province: '',
        city: '',
        fullAddress: '',
        isDefault: false,
        country: 'ایران'
    });

    // لیست شهرهای استان انتخاب شده
    const [availableCities, setAvailableCities] = useState([]);

    // دریافت اطلاعات آدرس مورد نظر
    useEffect(() => {
        // بررسی آیا آدرس در localStorage وجود دارد
        let foundAddress = null;

        if (typeof window !== 'undefined') {
            const savedAddress = localStorage.getItem('editAddress');
            if (savedAddress) {
                try {
                    foundAddress = JSON.parse(savedAddress);
                    localStorage.removeItem('editAddress'); // پاک کردن بعد از استفاده
                } catch (error) {
                    console.error('Error parsing saved address:', error);
                }
            }
        }

        // اگر در localStorage پیدا نشد، از state کاربر جستجو کنیم
        if (!foundAddress) {
            const addresses = user?.addresses || cachedAddresses || [];
            foundAddress = addresses.find(addr => addr._id === addressId);
        }

        // تنظیم فرم با مقادیر آدرس یافت شده
        if (foundAddress) {
            setFormData({
                id: addressId,
                street: foundAddress.street || '',
                province: foundAddress.province || '',
                city: foundAddress.city || '',
                fullAddress: foundAddress.fullAddress || '',
                isDefault: foundAddress.isDefault || false,
                country: foundAddress.country || 'ایران'
            });
        } else {
            // اگر آدرس پیدا نشد، به صفحه آدرس‌ها برگردیم
            showSwal('آدرس مورد نظر یافت نشد', 'error', 'باشه');
            router.push('/p-user/address');
        }
    }, [addressId, user, cachedAddresses, router]);

    // وقتی استان تغییر می‌کند، لیست شهرها را به‌روزرسانی می‌کنیم
    useEffect(() => {
        if (formData.province) {
            setAvailableCities(cities[formData.province] || []);

            // اگر شهر انتخابی جزو شهرهای استان جدید نباشد، اولین شهر را انتخاب می‌کنیم
            if (!cities[formData.province]?.includes(formData.city) && cities[formData.province]?.length > 0) {
                setFormData(prev => ({
                    ...prev,
                    city: cities[formData.province][0]
                }));
            }
        }
    }, [formData.province]);

    // تغییر مقادیر فرم
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    // ارسال فرم
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.street || !formData.province || !formData.city || !formData.fullAddress) {
            showSwal('لطفاً همه‌ی فیلدهای ضروری را پر کنید', 'error', 'باشه');
            return;
        }

        // ارسال درخواست به سرور
        try {
            const response = await dispatch(updateAddress(formData));

            if (response?.payload) {
                showSwal('آدرس با موفقیت ویرایش شد', 'success', 'باشه');
                router.push('/p-user/address');
            } else {
                showSwal('خطا در ویرایش آدرس', 'error', 'باشه');
            }
        } catch (error) {
            console.error('Error updating address:', error);
            showSwal('خطا در ویرایش آدرس', 'error', 'باشه');
        }
    };

    return (
        <div className="ui-boxs">
            <div className="ui-box">
                <div className="ui-box-item ui-box-white">
                    <div className="ui-box-item-title p-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <h4 className="fw-bold">
                                ویرایش آدرس
                            </h4>
                        </div>
                    </div>
                    <div className="ui-box-item-desc">
                        <form onSubmit={handleSubmit}>
                            <div className="row g-3">
                                <div className="col-12">
                                    <div className={`${styles.comment_item} mb-3`}>
                                        <input
                                            type="text"
                                            className='form-control'
                                            id='floatingInputStreet'
                                            name='street'
                                            value={formData.street}
                                            onChange={handleChange}
                                            placeholder="خیابان، کوچه، پلاک..."
                                            required
                                        />
                                        <label htmlFor="floatingInputStreet" className='form-lable label-float fw-bold'>
                                            آدرس خیابان
                                        </label>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className={styles.comment_item} htmlFor="floatingInputOstan">
                                        <label className='lable-float fw-bold'>
                                            استان
                                            <span className="text-danger">*</span>
                                        </label>
                                        <select
                                            name="province"
                                            id="floatingInputOstan"
                                            className='form-select'
                                            value={formData.province}
                                            onChange={handleChange}
                                            required
                                        >
                                            {provinces.map(province => (
                                                <option key={province} value={province}>
                                                    {province}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className={styles.comment_item}>
                                        <label htmlFor="floatingInputCity" className='lable-float fw-bold'>
                                            شهر
                                            <span className="text-danger">*</span>
                                        </label>
                                        <select
                                            name="city"
                                            id="floatingInputCity"
                                            className='form-select'
                                            value={formData.city}
                                            onChange={handleChange}
                                            required
                                        >
                                            {availableCities.map(city => (
                                                <option key={city} value={city}>
                                                    {city}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className={styles.comment_item}>
                                        <textarea
                                            name="fullAddress"
                                            id="floatingInputDesc"
                                            className='form-control py-3'
                                            rows="5"
                                            value={formData.fullAddress}
                                            onChange={handleChange}
                                            placeholder="آدرس کامل خود را وارد کنید (شامل جزئیات مانند پلاک، طبقه، واحد و ...)"
                                            required
                                        ></textarea>
                                        <label htmlFor="floatingInputDesc" className='form-label label-float fw-bold'>
                                            آدرس کامل
                                        </label>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="defaultAddressCheck"
                                            name="isDefault"
                                            checked={formData.isDefault}
                                            onChange={handleChange}
                                        />
                                        <label className="form-check-label" htmlFor="defaultAddressCheck">
                                            تنظیم به عنوان آدرس پیش‌فرض
                                        </label>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <button
                                        type='submit'
                                        className='btn main-color-one-bg my-3 border-0 px-5 py-3'
                                        disabled={loading}
                                    >
                                        {loading ? 'در حال ویرایش...' : 'ویرایش آدرس'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditAddress;