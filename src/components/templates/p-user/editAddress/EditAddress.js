"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../newAddress/NewAddress.module.css';
import { showSwal } from '@/utils/helpers';
// استفاده از هوک ریداکس
import { useDispatch, useSelector } from 'react-redux';
// استفاده از thunk برای به‌روزرسانی آدرس
import { updateAddress, getAllAddresses } from '@/Redux/actions/addressThunks';
// وارد کردن لیست استان‌ها و شهرها
import { provinces, cities } from '@/data/provincesCities';

const EditAddress = ({ addressId }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    // دریافت اطلاعات کاربر و آدرس‌ها از ریداکس
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

    // دریافت اطلاعات آدرس از ریداکس یا بارگذاری مجدد آدرس‌ها اگر وجود نداشت
    useEffect(() => {
        // ابتدا آدرس‌ها را در حافظه کش جستجو می‌کنیم
        const addresses = user?.addresses || cachedAddresses || [];
        let foundAddress = addresses.find(addr => addr._id === addressId);
        
        if (foundAddress) {
            console.log("Found address from Redux:", foundAddress);
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
            // اگر آدرس در کش نبود، آدرس‌ها را از سرور می‌گیریم
            console.log("Address not found in Redux, fetching from server...");
            dispatch(getAllAddresses())
                .then(response => {
                    if (response.payload) {
                        const newFoundAddress = response.payload.find(addr => addr._id === addressId);
                        if (newFoundAddress) {
                            console.log("Found address after fetching:", newFoundAddress);
                            setFormData({
                                id: addressId,
                                street: newFoundAddress.street || '',
                                province: newFoundAddress.province || '',
                                city: newFoundAddress.city || '',
                                fullAddress: newFoundAddress.fullAddress || '',
                                isDefault: newFoundAddress.isDefault || false,
                                country: newFoundAddress.country || 'ایران'
                            });
                        } else {
                            // اگر بعد از بارگذاری مجدد هم پیدا نشد، به صفحه آدرس‌ها برمی‌گردیم
                            showSwal('آدرس مورد نظر یافت نشد', 'error', 'باشه');
                            router.push('/p-user/address');
                        }
                    }
                })
                .catch(error => {
                    console.error("Error fetching addresses:", error);
                    showSwal('خطا در دریافت اطلاعات آدرس', 'error', 'باشه');
                    router.push('/p-user/address');
                });
        }
    }, [addressId, user, cachedAddresses, dispatch, router]);

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

        console.log("Submitting address data:", formData);
        
        // ارسال درخواست به سرور با استفاده از thunk
        try {
            const result = await dispatch(updateAddress(formData));
            
            if (result.payload) {
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
                                            {!formData.province && <option value="">انتخاب استان</option>}
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
                                            {!formData.city && <option value="">انتخاب شهر</option>}
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