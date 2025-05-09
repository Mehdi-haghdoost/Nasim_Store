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

    console.log("🔍 Debug - Component Mounted with addressId:", addressId);
    console.log("🔍 Debug - user?.addresses:", user?.addresses);
    console.log("🔍 Debug - cachedAddresses:", cachedAddresses);

    // استیت‌های فرم برای ویرایش آدرس
    const [formData, setFormData] = useState({
        id: addressId,
        street: '',
        province: '',
        city: '',
        fullAddress: '',
        isDefault: false
    });

    console.log("🔍 Debug - Initial formData:", formData);

    // لیست شهرهای استان انتخاب شده
    const [availableCities, setAvailableCities] = useState([]);

    // ابتدا آدرس‌ها را از سرور بگیریم
    useEffect(() => {
        dispatch(getAllAddresses())
            .then(response => {
                console.log("🔍 Debug - getAllAddresses response:", response);
            })
            .catch(error => {
                console.error("🔍 Debug - Error in getAllAddresses:", error);
            });
    }, [dispatch]);

    // دریافت اطلاعات آدرس از ریداکس یا بارگذاری مجدد آدرس‌ها اگر وجود نداشت
    useEffect(() => {
        console.log("🔍 Debug - useEffect for fetching address triggered");

        // ابتدا آدرس‌ها را در حافظه کش جستجو می‌کنیم
        const addresses = user?.addresses || cachedAddresses || [];
        console.log("🔍 Debug - All addresses to search in:", addresses);

        let foundAddress = addresses.find(addr => addr._id === addressId);
        console.log("🔍 Debug - Found address in Redux:", foundAddress);

        if (foundAddress) {
            console.log("🔍 Debug - Found address street value:", foundAddress.street);
            console.log("🔍 Debug - All address properties:", Object.keys(foundAddress));

            // اگر street وجود نداشت، از fullAddress استخراج می‌کنیم
            const streetValue = foundAddress.street || extractStreetFromFullAddress(foundAddress.fullAddress, foundAddress.province, foundAddress.city);

            setFormData({
                id: addressId,
                street: streetValue,
                province: foundAddress.province || '',
                city: foundAddress.city || '',
                fullAddress: foundAddress.fullAddress || '',
                isDefault: foundAddress.isDefault || false
            });

            console.log("🔍 Debug - formData after update:", {
                id: addressId,
                street: streetValue,
                province: foundAddress.province || '',
                city: foundAddress.city || '',
                fullAddress: foundAddress.fullAddress || '',
                isDefault: foundAddress.isDefault || false
            });
        } else {
            // اگر آدرس در کش نبود، آدرس‌ها را از سرور می‌گیریم
            console.log("🔍 Debug - Address not found in Redux, fetching from server...");
            dispatch(getAllAddresses())
                .then(response => {
                    console.log("🔍 Debug - getAllAddresses response:", response);

                    if (response.payload) {
                        console.log("🔍 Debug - Addresses from server:", response.payload);

                        const newFoundAddress = response.payload.find(addr => addr._id === addressId);
                        console.log("🔍 Debug - Found address from server:", newFoundAddress);

                        if (newFoundAddress) {
                            console.log("🔍 Debug - Address street from server:", newFoundAddress.street);

                            // اگر street وجود نداشت، از fullAddress استخراج می‌کنیم
                            const streetValue = newFoundAddress.street || extractStreetFromFullAddress(newFoundAddress.fullAddress, newFoundAddress.province, newFoundAddress.city);

                            setFormData({
                                id: addressId,
                                street: streetValue,
                                province: newFoundAddress.province || '',
                                city: newFoundAddress.city || '',
                                fullAddress: newFoundAddress.fullAddress || '',
                                isDefault: newFoundAddress.isDefault || false
                            });

                            console.log("🔍 Debug - formData after server update:", {
                                id: addressId,
                                street: streetValue,
                                province: newFoundAddress.province || '',
                                city: newFoundAddress.city || '',
                                fullAddress: newFoundAddress.fullAddress || '',
                                isDefault: newFoundAddress.isDefault || false
                            });
                        } else {
                            // اگر بعد از بارگذاری مجدد هم پیدا نشد، به صفحه آدرس‌ها برمی‌گردیم
                            console.log("🔍 Debug - Address not found even after server fetch");
                            showSwal('آدرس مورد نظر یافت نشد', 'error', 'باشه');
                            router.push('/p-user/address');
                        }
                    }
                })
                .catch(error => {
                    console.error("🔍 Debug - Error fetching addresses:", error);
                    showSwal('خطا در دریافت اطلاعات آدرس', 'error', 'باشه');
                    router.push('/p-user/address');
                });
        }
    }, [addressId, user, cachedAddresses, dispatch, router]);

    // تابع کمکی برای استخراج خیابان از آدرس کامل (برای زمانی که field نیست)
    const extractStreetFromFullAddress = (fullAddress, province, city) => {
        if (!fullAddress) return '';

        // حذف استان و شهر از ابتدای آدرس کامل
        let street = fullAddress;
        if (province) {
            street = street.replace(`استان ${province}`, '');
        }
        if (city) {
            street = street.replace(`شهر ${city}`, '').replace(city, '');
        }

        // حذف فاصله‌های اضافی و مرتب کردن متن
        street = street.trim();

        return street;
    };

    // وقتی استان تغییر می‌کند، لیست شهرها را به‌روزرسانی می‌کنیم
    useEffect(() => {
        console.log("🔍 Debug - useEffect for province change triggered:", formData.province);

        if (formData.province) {
            setAvailableCities(cities[formData.province] || []);

            // اگر شهر انتخابی جزو شهرهای استان جدید نباشد، اولین شهر را انتخاب می‌کنیم
            if (!cities[formData.province]?.includes(formData.city) && cities[formData.province]?.length > 0) {
                console.log("🔍 Debug - City not in province, updating to first city");

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
        console.log(`🔍 Debug - Form field changed: ${name} = ${type === 'checkbox' ? checked : value}`);

        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    // ارسال فرم
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("🔍 Debug - Form submitted");

        if (!formData.street || !formData.province || !formData.city || !formData.fullAddress) {
            console.log("🔍 Debug - Form validation failed");
            showSwal('لطفاً همه‌ی فیلدهای ضروری را پر کنید', 'error', 'باشه');
            return;
        }

        console.log("🔍 Debug - Submitting address data:", formData);

        // ارسال درخواست به سرور با استفاده از thunk
        try {
            const result = await dispatch(updateAddress(formData));
            console.log("🔍 Debug - updateAddress result:", result);

            if (result.payload) {
                console.log("🔍 Debug - Address updated successfully");
                showSwal('آدرس با موفقیت ویرایش شد', 'success', 'باشه');
                router.push('/p-user/address');
            } else {
                console.log("🔍 Debug - Address update failed");
                showSwal('خطا در ویرایش آدرس', 'error', 'باشه');
            }
        } catch (error) {
            console.error('🔍 Debug - Error updating address:', error);
            showSwal('خطا در ویرایش آدرس', 'error', 'باشه');
        }
    };

    console.log("🔍 Debug - Current formData before render:", formData);

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