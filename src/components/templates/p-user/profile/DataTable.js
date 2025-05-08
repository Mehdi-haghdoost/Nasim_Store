// C:\Users\LENOVO\Desktop\Nassim_Store\src\components\templates\p-user\profile\DataTable.js
import React from 'react';
import styles from './DataTable.module.css';
import { useSelector } from 'react-redux';

const DataTable = () => {
    const { user, loading } = useSelector((state) => state.auth);
    console.log('user ===>', user);

    // آدرس پیش‌فرض ثابت
    const defaultAddressText = 'تهران-شهریار-شهرک اندیشه-فاز 3-خیابان ولیعصر-بن بست شجاعت.مجتمع اسکان';

    // اگر داده‌ها در حال بارگذاری هستند، نشانگر بارگذاری نمایش داده شود
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
                            <p className="mt-2">{defaultAddressText}</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </main>
    );
};

export default DataTable;