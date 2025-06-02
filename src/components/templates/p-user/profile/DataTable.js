import React from 'react';
import styles from './DataTable.module.css';
import { useSelector } from 'react-redux';

const DataTable = () => {
    const { user, loading, cachedAddresses } = useSelector((state) => state.auth);
    // استفاده از آدرس‌های کاربر یا آدرس‌های کش شده
    const addresses = user?.addresses || cachedAddresses;

    // پیدا کردن آدرس پیش‌فرض یا اولین آدرس
    const defaultAddress = addresses?.find(addr => addr?.isDefault) || addresses?.[0];

    // نمایش اسپینر در زمان بارگذاری
    if (loading) {
        return (
            <main className={styles.dataTable}>
                <div className="text-center p-3">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">در حال بارگذاری...</span>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className={styles.dataTable}>
            <table className={`table main-table shadow-one main-table-2`}>
                <tbody>
                    <tr>
                        <td className="text-end p-3">
                            <h6>نام و نام خانوادگی</h6>
                            <p className="mt-2">{user?.username || ''}</p>
                        </td>
                        <td className="text-end p-3">
                            <h6>شماره تلفن</h6>
                            <p className="mt-2">{user?.phone || ''}</p>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-end p-3">
                            <h6>پست الکترونیک</h6>
                            <p className="mt-2">{user?.email || ''}</p>
                        </td>
                        <td className="text-end p-3">
                            <h6>کد ملی</h6>
                            <p className="mt-2">{user?.nationalId || ''}</p>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-end p-3">
                            <h6>عضویت</h6>
                            <p className="mt-2">4 آذر 1403</p>
                        </td>
                        <td className="text-end p-3">
                            <h6>کد پستی</h6>
                            <p className="mt-2">{user?.postalCode || ''}</p>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-end p-3" colSpan="2">
                            <h6>آدرس</h6>
                            <p className="mt-2">
                                {defaultAddress
                                    ? `${defaultAddress.fullAddress}`
                                    : 'آدرسی ثبت نشده است'
                                }
                            </p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </main>
    );
};

export default DataTable;