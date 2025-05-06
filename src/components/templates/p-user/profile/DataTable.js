"use client";

import React from 'react';
import styles from './DataTable.module.css';
import { useSelector } from 'react-redux';

const DataTable = () => {
    const { user } = useSelector((state) => state.auth);
    console.log('user ===>', user);

    // اگر آدرس‌ها وجود داشته باشد، آدرس پیش‌فرض را به نمایش بگذاریم
    const defaultAddress = user?.addresses?.find(address => address.isDefault) || user?.addresses?.[0];

    return (
        <main className={styles.dataTable}>
            <table className={`table main-table shadow-one main-table-2`}>
                <tbody>
                    <tr>
                        <td className="text-end p-3">
                            <h6>نام و نام خانوادگی</h6>
                            <p className="mt-2">{user?.username || 'مهدی حق دوست'}</p>
                        </td>
                        <td className="text-end p-3">
                            <h6>شماره تلفن</h6>
                            <p className="mt-2">{user?.phone || '09211367465'}</p>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-end p-3">
                            <h6>پست الکترونیک</h6>
                            <p className="mt-2">{user?.email || 'mahdi.leo2014@gmail.com'}</p>
                        </td>
                        <td className="text-end p-3">
                            <h6>کد ملی</h6>
                            <p className="mt-2">{user?.nationalId || '00146564664664'}</p>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-end p-3">
                            <h6>عضویت</h6>
                            <p className="mt-2">4 آذر 1403</p>
                        </td>
                        <td className="text-end p-3">
                            <h6>کد پستی</h6>
                            <p className="mt-2">{user?.postalCode || '3321546987'}</p>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-end p-3" colSpan="2">
                            <h6>آدرس</h6>
                            {/* نمایش آدرس پیش‌فرض یا اولین آدرس */}
                            <p className="mt-2">
                                {defaultAddress ? `${defaultAddress.fullAddress}, ${defaultAddress.city}, ${defaultAddress.province}` : 'آدرس موجود نیست'}
                            </p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </main>
    );
};

export default DataTable;
