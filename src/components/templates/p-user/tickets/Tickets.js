import React from 'react';
import styles from './Tickets.module.css';
import Link from 'next/link';

const Tickets = () => {
    return (
        <div className={styles.table_custom}>
            <table className="table shadow-none table-bordered">
                <thead>
                    <tr>
                        <th className='align-middle text-center'> <h6 className="font-18 text-muteLink">شناسه/p-user/tickets/</h6></th>
                        <th className='align-middle text-center'> <h6 className="font-18 text-muted">عنوان</h6></th>
                        <th className='align-middle text-center'> <h6 className="font-18 text-muted">نمایش</h6></th>
                        <th className='align-middle text-center'> <h6 className="font-18 text-muted">پاسخ</h6></th>
                        <th className='align-middle text-center'> <h6 className="font-18 text-muted">بن</h6></th>
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
                            <Link href="/p-user/tickets/ticket-message" className='btn main-color-three-bg shadow-none btn-sm'>
                                <i className="bi bi-eye ms-1 text-white"></i>
                                نمایش
                            </Link>
                        </td>
                        <td className="align-middle text-center">
                            <a href="" className='btn bg-success text-white shadow-none btn-sm'>
                                <i className="bi bi-eye ms-1 text-white"></i>
                                پاسخ
                            </a>
                        </td>
                        <td className="align-middle text-center">
                            <a href="" className='btn bg-danger text-white shadow-none btn-sm'>
                                <i className="bi bi-eye ms-1 text-white"></i>
                                بن
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td className="align-middle text-center"><p className="mt-2 font-16">545315</p></td>
                        <td className="align-middle text-center">
                            <p className="mt-2 font-16">ارسال نشدن فلان سفارش برای من
                                <span className="badge bg-success rounded-0 me-2 text-white">
                                    پاسخ داده شده
                                </span>
                            </p>
                        </td>
                        <td className="align-middle text-center">
                            <Link href="/p-user/tickets/ticket-message" className='btn main-color-three-bg shadow-none btn-sm'>
                                <i className="bi bi-eye ms-1 text-white"></i>
                                نمایش
                            </Link>
                        </td>
                        <td className="align-middle text-center">
                            <a href="" className='btn bg-success text-white shadow-none btn-sm'>
                                <i className="bi bi-eye ms-1 text-white"></i>
                                پاسخ
                            </a>
                        </td>
                        <td className="align-middle text-center">
                            <a href="" className='btn bg-danger text-white shadow-none btn-sm'>
                                <i className="bi bi-eye ms-1 text-white"></i>
                                بن
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td className="align-middle text-center"><p className="mt-2 font-16">545315</p></td>
                        <td className="align-middle text-center">
                            <p className="mt-2 font-16">ارسال نشدن فلان سفارش برای من
                                <span className="badge bg-danger rounded-0 me-2 text-white">
                                    بسته شده
                                </span>
                            </p>
                        </td>
                        <td className="align-middle text-center">
                            <Link href="/p-user/tickets/ticket-message" className='btn main-color-three-bg shadow-none btn-sm'>
                                <i className="bi bi-eye ms-1 text-white"></i>
                                نمایش
                            </Link>
                        </td>
                        <td className="align-middle text-center">
                            <a href="" className='btn bg-success text-white shadow-none btn-sm'>
                                <i className="bi bi-eye ms-1 text-white"></i>
                                پاسخ
                            </a>
                        </td>
                        <td className="align-middle text-center">
                            <a href="" className='btn bg-danger text-white shadow-none btn-sm'>
                                <i className="bi bi-eye ms-1 text-white"></i>
                                بن
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Tickets