import React from 'react'
import styles from './SellerTable.module.css';

const SellerTable = () => {
    return (
        <div className={`table-responsive shadow-box ${styles.roundedTable} p-0`}>
            <table className={`table rounded-0 ${styles.main_table}`}>
                <thead className="text-center">
                    <tr>
                        <th className="title-font">#</th>
                        <th className="title-font">شماره سفارش</th>
                        <th className="title-font">تاریخ ثبت سفارش</th>
                        <th className="title-font">مبلغ پرداختی</th>
                        <th className="title-font">وضعیت سفارش</th>
                        <th className="title-font">جزییات</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    <tr>
                        <td className="font-14">1</td>
                        <td className="font-14">2354632</td>
                        <td className="font-14">شنبه 10 آذر 1403</td>
                        <td className="font-14">500,000 تومان</td>
                        <td className="font-14">
                            <a href="#" className='title-font'>سفارش مرجوع شده</a>
                        </td>
                        <td className="font-14">
                            <a href="#" className="btn border-0 main-color-one-bg waves-effect waves-light">
                                <i className="bi bi-chevron-left text-white"></i>
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td className="font-14">1</td>
                        <td className="font-14">2354632</td>
                        <td className="font-14">شنبه 10 آذر 1403</td>
                        <td className="font-14">500,000 تومان</td>
                        <td className="font-14">
                            <a href="#" className='title-font'>سفارش لغو شده</a>
                        </td>
                        <td className="font-14">
                            <a href="#" className="btn border-0 main-color-one-bg waves-effect waves-light">
                                <i className="bi bi-chevron-left text-white"></i>
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td className="font-14">1</td>
                        <td className="font-14">2354632</td>
                        <td className="font-14">شنبه 10 آذر 1403</td>
                        <td className="font-14">500,000 تومان</td>
                        <td className="font-14">
                            <a href="#" className='title-font'>سفارش تحویل داده شده</a>
                        </td>
                        <td className="font-14">
                            <a href="#" className="btn border-0 main-color-one-bg waves-effect waves-light">
                                <i className="bi bi-chevron-left text-white"></i>
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td className="font-14">1</td>
                        <td className="font-14">2354632</td>
                        <td className="font-14">شنبه 10 آذر 1403</td>
                        <td className="font-14">500,000 تومان</td>
                        <td className="font-14">
                            <a href="#" className='title-font'>سفارش در انتظار پرداخت</a>
                        </td>
                        <td className="font-14">
                            <a href="#" className="btn border-0 main-color-one-bg waves-effect waves-light">
                                <i className="bi bi-chevron-left text-white"></i>
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default SellerTable