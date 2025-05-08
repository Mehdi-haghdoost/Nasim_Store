"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './NewAddress.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addAddress } from '@/Redux/actions/addressThunks';
import { showSwal } from '@/utils/helpers';
import { provinces, cities } from '@/data/provincesCities';

const NewAddress = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.auth);


    const [formData, setFormData] = useState({
        street: '',
        province: 'تهران', 
        city: 'تهران', 
        fullAddress: '',
        isDefault: false
    });


    const [availableCities, setAvailableCities] = useState([]);

    useEffect(() => {
        if (formData.province) {
            setAvailableCities(cities[formData.province] || []);

      
            if (!cities[formData.province]?.includes(formData.city) && cities[formData.province]?.length > 0) {
                setFormData(prev => ({
                    ...prev,
                    city: cities[formData.province][0]
                }));
            }
        }
    }, [formData.province]);


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.street || !formData.province || !formData.city || !formData.fullAddress) {
            showSwal('لطفاً همه‌ی فیلدهای ضروری را پر کنید', 'error', 'باشه');
            return;
        }

        try {
            const response = await dispatch(addAddress(formData));

            if (response?.payload) {
                showSwal('آدرس با موفقیت ثبت شد', 'success', 'باشه');
                router.push('/p-user/address');
            } else {
                showSwal('خطا در ثبت آدرس', 'error', 'باشه');
            }
        } catch (error) {
            console.error('Error adding address:', error);
            showSwal('خطا در ثبت آدرس', 'error', 'باشه');
        }
    };

    return (
        <div className="ui-boxs">
            <div className="ui-box">
                <div className="ui-box-item ui-box-white">
                    <div className="ui-box-item-title p-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <h4 className="fw-bold">
                                ثبت آدرس
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
                                        {loading ? 'در حال ثبت...' : 'ثبت آدرس'}
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

export default NewAddress;