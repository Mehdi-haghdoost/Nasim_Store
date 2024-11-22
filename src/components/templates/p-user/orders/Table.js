
import React from 'react'
import styles from './table.module.css'
import Link from 'next/link'


const Table = () => {

    return (
        <div className={`p-0 ${styles.responsive_table}`}>
            <table className={`main-table rounded-0 ${styles.table}`}>
                <thead className='text-bg-dark bg-opacity-75 text-center'>
                    <tr>
                        <th>#</th>
                        <th>شماره سفارش</th>
                        <th>تاریخ ثبت سفارش</th>
                        <th>مبلغ پرداختی</th>
                        <th>وضعیت سفارش</th>
                        <th>جزئیات</th>
                    </tr>
                </thead>
                <tbody className='text-center'>
                    <tr>
                        <td className='font-14'>1</td>
                        <td className='font-14'>2354632</td>
                        <td className='font-14'>سه  شنبه 29 آبان 1403</td>
                        <td className='font-14'>580,000 تومان</td>
                        <td className='font-14'>
                            <span className="success-label rounded-pill">
                                سفارش در حال ارسال
                            </span>
                        </td>
                        <td className='font-14'>
                            <Link href={'/p-user/order-detail/669937a4f94d2d4db2394576'}
                                className='btn btn-sm border-0 main-color-one-bg'
                            >
                                مشاهده
                                <i className='bi bi-chevron-left text-white font-16'></i>
                            </Link>
                        </td>
                    </tr>
                    <tr>
                        <td className='font-14'>1</td>
                        <td className='font-14'>2354632</td>
                        <td className='font-14'>سه  شنبه 29 آبان 1403</td>
                        <td className='font-14'>580,000 تومان</td>
                        <td className='font-14'>
                            <span className="danger-label rounded-pill">
                                لغو شده
                            </span>
                        </td>
                        <td className='font-14'>
                            <Link href={'/p-user/order-detail/669937a4f94d2d4db2394576'}
                                className='btn btn-sm border-0 main-color-one-bg'
                            >
                                مشاهده
                                <i className='bi bi-chevron-left text-white font-16'></i>
                            </Link>
                        </td>
                    </tr>
                    <tr>
                        <td className='font-14'>1</td>
                        <td className='font-14'>2354632</td>
                        <td className='font-14'>سه  شنبه 29 آبان 1403</td>
                        <td className='font-14'>580,000 تومان</td>
                        <td className='font-14'>
                            <span className="success-label rounded-pill">
                                سفارش در حال ارسال
                            </span>
                        </td>
                        <td className='font-14'>
                            <Link href={`/p-user/order-detail/669937a4f94d2d4db2394576`}
                                className='btn btn-sm border-0 main-color-one-bg'
                            >
                                مشاهده
                                <i className='bi bi-chevron-left text-white font-16'></i>
                            </Link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Table