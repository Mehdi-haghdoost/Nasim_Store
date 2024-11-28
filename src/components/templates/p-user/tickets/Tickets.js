import React from 'react';
import styles from './Tickets.module.css';
import Link from 'next/link';

const Tickets = () => {
    return (
        <div className={styles.table_custom}>
            <table className="table shadow-none table-bordered">
                <thead>
                    <tr>
                        <th className='align-middle text-center'> <h6 className="font-18 text-muteLink">شناسه</h6></th>
                        <th className='align-middle text-center'> <h6 className="font-18 text-muted">عنوان</h6></th>
                        <th className='align-middle text-center'> <h6 className="font-18 text-muted">تاریخ بروز رسانی</h6></th>
                        <th className='align-middle text-center'> <h6 className="font-18 text-muted">نمایش</h6></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="align-middle text-center"><p className="mt-2 font-16">545315</p></td>
                        <td className="align-middle text-center">
                            <p className="mt-2 font-16">ارسال نشدن فلان سفارش برای من
                                <span className="badge bg-secondary rounded-0 me-2 text-white">
                                    در انتظار پاسخ
                                </span>
                            </p>
                        </td>
                        <td className="align-middle text-center">
                            <p className="mt-2 font-16">9 آذر 1403 ساعت 02:53
                            </p>
                        </td>
                        <td className="align-middle text-center">
                            <Link href="/p-user/tickets/ticket-message" className='btn main-color-three-bg shadow-none btn-sm'>
                                <i className="bi bi-eye ms-1 text-white"></i>
                                نمایش
                            </Link>
                        </td>
                    </tr>
                    <tr>
                        <td className="align-middle text-center"><p className="mt-2 font-16">545315</p></td>
                        <td className="align-middle text-center">
                            <p className="mt-2 font-16">ارسال نشدن فلان سفارش برای من
                                <span className="badge bg-secondary rounded-0 me-2 text-white">
                                    در انتظار پاسخ
                                </span>
                            </p>
                        </td>
                        <td className="align-middle text-center">
                            <p className="mt-2 font-16">9 آذر 1403 ساعت 02:53
                            </p>
                        </td>
                        <td className="align-middle text-center">
                            <Link href="/p-user/tickets/ticket-message" className='btn main-color-three-bg shadow-none btn-sm'>
                                <i className="bi bi-eye ms-1 text-white"></i>
                                نمایش
                            </Link>
                        </td>
                    </tr>
                    <tr>
                        <td className="align-middle text-center"><p className="mt-2 font-16">545315</p></td>
                        <td className="align-middle text-center">
                            <p className="mt-2 font-16">ارسال نشدن فلان سفارش برای من
                                <span className="badge bg-secondary rounded-0 me-2 text-white">
                                    در انتظار پاسخ
                                </span>
                            </p>
                        </td>
                        <td className="align-middle text-center">
                            <p className="mt-2 font-16">9 آذر 1403 ساعت 02:53
                            </p>
                        </td>
                        <td className="align-middle text-center">
                            <Link href="/p-user/tickets/ticket-message" className='btn main-color-three-bg shadow-none btn-sm'>
                                <i className="bi bi-eye ms-1 text-white"></i>
                                نمایش
                            </Link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Tickets