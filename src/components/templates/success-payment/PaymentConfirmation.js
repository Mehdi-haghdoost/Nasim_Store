import React from 'react'
import styles from './PaymentConfirmation.module.css';
import Link from 'next/link';


const PaymentConfirmation = () => {
    return (
        <>
            <div className={styles.payment_status}>
                <div className={styles.icon}>
                    <i className="bi bi-check-circle-fill"></i>
                </div>
                <div className={styles.title}>
                    <h3>پرداخت شما با موفقیت انجام شد</h3>
                    <p>از خرید شما متشکریم :)</p>
                </div>
                <div className={styles.pay_table}>
                    <div className={styles.pay_table_title}>
                        <h5 className="font-18">مشخصات پرداختی</h5>
                    </div>
                    <div className={styles.pay_table_item}>
                        <h6 className="font-16">درگاه پرداختی</h6>
                        <p className="mb-0">بانک ملت</p>
                    </div>
                    <div className={styles.pay_table_item}>
                        <h6 className="font-16">تاریخ</h6>
                        <p className="mb-0"> 1402/04/01</p>
                    </div>
                    <div className={styles.pay_table_item}>
                        <h6 className="font-16">کد تراکنش</h6>
                        <p className="mb-0">abG856f23</p>
                    </div>
                    <div className={styles.pay_table_item}>
                        <h6 className="font-16 text-danger">مقدار تخفیف</h6>
                        <p className="mb-0 text-danger">500,000 تومان</p>
                    </div>
                    <div className={styles.pay_table_item}>
                        <h6 className="font-16 main-color-three-color">مقدار پرداختی</h6>
                        <p className="mb-0 main-color-three-color">500,000 تومان</p>
                    </div>
                </div>
                <div className={styles.pay_table}>
                    <div className={styles.pay_table_title}>
                        <h5 className="font-18">وضعیت سفارش</h5>
                    </div>
                    <div className={styles.pay_table_item}>
                        <h6 className="font-16">شماره سفارش</h6>
                        <p className="mb-0">45320235</p>
                    </div>
                    <div className={styles.pay_table_item}>
                        <h6 className="font-16">قیمت کل</h6>
                        <p className="mb-0">75,000,000 تومان</p>
                    </div>
                    <div className={styles.pay_table_item}>
                        <h6 className="font-16">وضعیت پرداخت</h6>
                        <p className="mb-0">پرداخت شده</p>
                    </div>
                    <div className={styles.pay_table_item}>
                        <h6 className="font-16 main-color-three-color">وضعیت سفارش</h6>
                        <p className="mb-0 main-color-three-color">تایید شده</p>
                    </div>
                </div>
            </div>
            <div className="text-center my-4">
                <Link href={"/p-user"} className='btn d-inline-block main-color-three-bg mx-auto'>
                    رفتن به حساب کاربری
                </Link>
            </div>
        </>
    )
}

export default PaymentConfirmation