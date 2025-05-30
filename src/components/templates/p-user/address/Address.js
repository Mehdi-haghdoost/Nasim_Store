"use client";
import React, { useEffect } from 'react';
import styles from './address.module.css';
import Link from 'next/link';
import AddressCard from '@/components/modules/p-user/address/AddressCard';
import { useSelector, useDispatch } from 'react-redux';
import { refreshToken } from '@/Redux/actions/authThunks';
import { deleteAddress } from '@/Redux/actions/addressThunks';
import { useRouter } from 'next/navigation';
import { showSwal } from '@/utils/helpers';
import swal from 'sweetalert';

const Address = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { user, cachedAddresses, loading } = useSelector(state => state.auth);

    // استفاده از آدرس‌های موجود در state یا آدرس‌های کش شده
    const addresses = user?.addresses || cachedAddresses || [];

    // دریافت اطلاعات کاربر در هنگام بارگذاری صفحه
    useEffect(() => {
        if (!user?.addresses && !cachedAddresses?.length) {
            dispatch(refreshToken());
        }
    }, [dispatch, user, cachedAddresses]);

    // مدیریت ویرایش آدرس
    const handleEdit = (addressId) => {
        router.push(`/p-user/address/edit/${addressId}`);
    };

    // مدیریت حذف آدرس - با همان منطق کامپوننت AddressCard
    const handleDelete = async (addressId) => {
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
                        const response = await dispatch(deleteAddress(addressId));

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

    return (
        <main>
            <div className="ui-boxs">
                <div className="ui-box">
                    <div className="ui-box-item ui-box-white">
                        <div className="ui-box-title" style={{ padding: "15px" }}>
                            <div className="d-flex justify-content-between align-items-center">
                                <h4 className="fw-bold">
                                    آدرس ها
                                </h4>
                                <Link href={'/p-user/address/add-new'} className='btn main-color-one-bg btn-sm waves-effect waves-light d-flex align-items-normal'>
                                    ثبت آدرس جدید
                                    <i className='bi text-white bi-plus-circle me-2'></i>
                                </Link>
                            </div>
                        </div>
                        <div className="ui-box-item-desc">
                            {loading ? (
                                <div className="text-center p-5">
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">در حال بارگذاری...</span>
                                    </div>
                                </div>
                            ) : addresses.length === 0 ? (
                                <div className="text-center p-5">
                                    <p>هیچ آدرسی ثبت نشده است. لطفاً یک آدرس جدید اضافه کنید.</p>
                                </div>
                            ) : (
                                <div className={styles.address}>
                                    {addresses.map((address) => (
                                        <div key={address._id} className={styles.address_item}>
                                            <div className={`flex-nowrap ${styles.address_item_status}`}>
                                                <div className={styles.address_item_status_item}>
                                                    <p className='fw-bold'>
                                                        {address.fullAddress}
                                                    </p>
                                                </div>
                                                <div className={styles.address_item_status_item}>
                                                    <div className="dropdown">
                                                        <a href="#" className='' role='button' id='dropdownMenuLink' data-bs-toggle="dropdown" aria-expanded="false">
                                                            <i className='bi bi-three-dots-vertical text-dark fs-5'></i>
                                                        </a>
                                                        <ul className="dropdown-menu flex-column" aria-labelledby="dropdownMenuLink">
                                                            <li>
                                                                <a 
                                                                    href="#" 
                                                                    className="dropdown-item"
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        handleEdit(address._id);
                                                                    }}
                                                                >
                                                                    <i className='bi bi-pencil ms-2'></i>
                                                                    ویرایش
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a 
                                                                    href="#" 
                                                                    className="dropdown-item text-danger"
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        handleDelete(address._id);
                                                                    }}
                                                                >
                                                                    <i className='bi bi-trash text-danger ms-2'></i>
                                                                    حذف
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={`border-0 ${styles.address_item_detail}`}>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap">
                                                    <div className="d-flex flex-column">
                                                        <div className="text-muted mb-4 d-flex align-items-baseline mb-2">
                                                            <i className="bi bi-pin-map ms-3">
                                                            </i>
                                                            <h6 className="mb-0 font-15 fw-normal">آدرس :</h6>
                                                            <p className="me-2 font-16 mb-0">{`${address.province}، ${address.city}`}</p>
                                                        </div>
                                                        {address.street && (
                                                            <div className="text-muted mb-4 d-flex align-items-baseline mb-2">
                                                                <i className="bi bi-geo-alt ms-3">
                                                                </i>
                                                                <h6 className="mb-0 font-15 fw-normal">خیابان :</h6>
                                                                <p className="me-2 font-16 mb-0">{address.street}</p>
                                                            </div>
                                                        )}
                                                        <div className="text-muted mb-4 d-flex align-items-baseline mb-2">
                                                            <i className="bi bi-envelope ms-3">
                                                            </i>
                                                            <h6 className="mb-0 font-15 fw-normal">شماره تلفن :</h6>
                                                            <p className="me-2 font-16 mb-0">{address.phoneNumber || 'شماره ایی ثبت نشده'}</p>
                                                        </div>
                                                        <div className="text-muted mb-4 d-flex align-items-baseline mb-2">
                                                            <i className="bi bi-phone ms-3">
                                                            </i>
                                                            <h6 className="mb-0 font-15 fw-normal">شماره همراه :</h6>
                                                            <p className="me-2 font-16 mb-0">{user?.phone || 'شماره همراهی ثبت نشده'}</p>
                                                        </div>
                                                        <div className="text-muted mb-4 d-flex align-items-baseline mb-2">
                                                            <i className="bi bi-person ms-3">
                                                            </i>
                                                            <h6 className="mb-0 font-15 fw-normal">نام تحویل گیرنده :</h6>
                                                            <p className="me-2 font-16 mb-0">{user?.username || 'نامی ثبت نشده'}</p>
                                                        </div>
                                                    </div>
                                                    <img src="/images/map.jpg" alt="map" height="150" width="150" className='img-thumbnail' style={{ pointerEvents: "none" }} />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="header-content mb-4 bg-white shadow-box rounded-3 p-3 d-flex align-items-center justify-content-between flex-wrap">
                <div className={`d-flex alig-items-center ${styles.title}`}>
                    <img src="/images/square.png" alt="" className='main-color-one-color d-inline-block me-1' />
                    <h5 className="font-16 me-3">
                        <span className="main-color-one-color d-inline-block me-1">
                            آدرس های
                        </span>
                        <strong className='me-2 font-16'>ثبت شده</strong>
                    </h5>
                </div>
            </div>
            <div className="content-box">
                <div className="container-fluid">
                    <div className="row">
                        {addresses.map((address) => (
                            <AddressCard
                                key={address._id}
                                address={address}
                                user={user}
                                title={address.isDefault ? "آدرس پیشفرض" : ""}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Address;