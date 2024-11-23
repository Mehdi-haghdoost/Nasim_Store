import React from 'react';
import styles from './DataTable.module.css';
const DataTable = () => {

    return (
        <main className={styles.dataTable}>
        <table className={`table main-table shadow-one main-table-2`}>
            <tbody>
                <tr>
                    <td className="text-end p-3">
                        <h6>نام و نام خانوادگی</h6>
                        <p className="mt-2">مهدی حق دوست</p>
                    </td>
                    <td className="text-end p-3">
                        <h6>شماره تلفن</h6>
                        <p className="mt-2">09211367465</p>
                    </td>
                </tr>
                <tr>
                    <td className="text-end p-3">
                        <h6>پست الکترونیک</h6>
                        <p className="mt-2">mahdi.leo2014@gmail.com</p>
                    </td>
                    <td className="text-end p-3">
                        <h6>کد ملی </h6>
                        <p className="mt-2">00146564664664</p>
                    </td>
                </tr>
                <tr>
                <td className="text-end p-3">
                        <h6>عضویت </h6>
                        <p className="mt-2">4 آذر 1403</p>
                    </td>
                    <td className="text-end p-3">
                        <h6>کد پستی </h6>
                        <p className="mt-2">3321546987</p>
                    </td>
                </tr>
                <tr>
                <td className="text-end p-3">
                        <h6>آدرس </h6>
                        <p className="mt-2"> تهران اندیشه فاز 3 انتهای خیابان بنفشه پلاک 0</p>
                    </td>
                </tr>
            </tbody>
        </table>
        </main>
    )
}

export default DataTable;