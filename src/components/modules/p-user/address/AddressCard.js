// src/components/modules/p-user/address/AddressCard.js
"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './AddressCard.module.css';
import { useDispatch } from 'react-redux';
import { deleteAddress, setDefaultAddress } from '@/Redux/actions/addressThunks';
import { showSwal } from '@/utils/helpers';
import swal from 'sweetalert';

const AddressCard = ({ address, user, title }) => {
    const router = useRouter();
    const dispatch = useDispatch();

    // تابع برای حذف آدرس
    const handleDelete = async (e) => {
        e.preventDefault();

        // استفاده مستقیم از swal
        swal({
            title: "آیا از حذف این آدرس اطمینان دارید؟",
            text: "این عملیات غیرقابل بازگشت است",
            icon: "warning",
            buttons: ["انصراف", "بله، حذف شود"],
            dangerMode: true,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    try {
                        const response = await dispatch(deleteAddress(address._id));

                        if (response?.payload) {
                            showSwal("آدرس با موفقیت حذف شد", "success", "باشه");
                        } else {
                            showSwal("خطا در حذف آدرس", "error", "باشه");
                        }
                    } catch (error) {
                        console.error('Error deleting address:', error);
                        showSwal("خطا در حذف آدرس", "error", "باشه");
                    }
                }
            });
    };

    // تابع برای ویرایش آدرس
    const handleEdit = (e) => {
        e.preventDefault();
        // ذخیره آدرس در localStorage برای استفاده در صفحه ویرایش
        if (typeof window !== 'undefined') {
            localStorage.setItem('editAddress', JSON.stringify(address));
        }
        router.push(`/p-user/address/edit/${address._id}`);
    };

    // تابع برای تنظیم به عنوان آدرس پیش‌فرض
    const handleSetDefault = async (e) => {
        e.preventDefault();

        // اگر قبلاً پیش‌فرض است، کاری نکنیم
        if (address.isDefault) {
            showSwal("این آدرس در حال حاضر پیش‌فرض است", "info", "باشه");
            return;
        }

        try {
            const response = await dispatch(setDefaultAddress(address._id));

            if (response?.payload) {
                showSwal("آدرس با موفقیت به عنوان پیش‌فرض تنظیم شد", "success", "باشه");
            } else {
                showSwal("خطا در تنظیم آدرس پیش‌فرض", "error", "باشه");
            }
        } catch (error) {
            console.error('Error setting default address:', error);
            showSwal("خطا در تنظیم آدرس پیش‌فرض", "error", "باشه");
        }
    };

    return (
        <div className="col-md-4">
            <div className="bg-white card addresses-item mb-4 shadow-sm">
                <div className={`p-4 ${styles.gold_members}`}>
                    <div className={styles.media}>
                        <div className={styles.media_body}>
                            <h6 className="mb-1">
                                {address.province} - {address.city}
                                {title && (
                                    <span className="badge fw-normal font-10 float-start main-color-three-bg">
                                        {title}
                                    </span>
                                )}
                            </h6>
                            <p className="text-overflow-2 address-line">
                                {address.fullAddress}
                            </p>
                            <div className="mt-3">
                                <div className="d-flex mb-2 align-items-center">
                                    <i className="bi bi-phone me-2"></i>
                                    <span>شماره همراه: {user?.phone || 'شماره همراهی ثبت نشده'}</span>
                                </div>
                                <div className="d-flex mb-2 align-items-center">
                                    <i className="bi bi-person me-2"></i>
                                    <span>نام تحویل گیرنده: {user?.username || 'نامی ثبت نشده'}</span>
                                </div>
                            </div>
                            <p className="mb-0 text-black btn-group-sm font-weight-bold mt-3">
                                <div className={styles.tooltip}>
                                    <a href="#" className="btn btn-primary btn-sm ms-2" onClick={handleEdit} data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="ویرایش آدرس">
                                        <i className="bi bi-pencil text-white"></i>
                                    </a>
                                    <span className={styles.tooltipText}>ویرایش آدرس</span>
                                </div>
                                <div className={styles.tooltip}>
                                    <a href="#" className="btn btn-danger btn-sm ms-2" onClick={handleDelete} data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="حذف آدرس">
                                        <i className="bi bi-trash text-white"></i>
                                    </a>
                                    <span className={styles.tooltipText}>حذف آدرس</span>
                                </div>
                                <div className={styles.tooltip}>
                                    <a
                                        href="#"
                                        className={`btn ${address.isDefault ? 'btn-secondary' : 'btn-success'} btn-sm ms-2`}
                                        onClick={handleSetDefault}
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        data-bs-title="ثبت به عنوان آدرس پیشفرض"
                                    >
                                        <i className="bi bi-check-lg text-white"></i>
                                    </a>
                                    <span className={styles.tooltipText}> ثبت به عنوان پیش فرض</span>
                                </div>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddressCard;