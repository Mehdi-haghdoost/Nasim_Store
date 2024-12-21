import React from 'react'
import styles from './PaymentFailure.module.css';
import Link from 'next/link';

const PaymentFailure = () => {
    return (
        <div className='container-fluid'>
            <div className={`${styles.payment_status} ${styles.fail_pay}`}>
                <div className={styles.icon}>
                    <i className="bi bi-emoji-frown-fill"></i>
                </div>
                <div className={styles.title}>
                    <h3>پرداخت شما ناموفق بود</h3>
                    <p>دوباره تلاش کنید</p>
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
                        <p>1403/10/1</p>
                    </div>
                    <div className={styles.pay_table_item}>
                        <h6 className="font-16">کد تراکنش</h6>
                        <p>abG856f23</p>
                    </div>
                    <div className={styles.pay_table_item}>
                        <h6 className="font-16 text-danger"> مقدار تخفیف</h6>
                        <p>500,000 تومان</p>
                    </div>
                    <div className={styles.pay_table_item}>
                        <h6 className="font-16">مقدار پرداختی </h6>
                        <p>500,000 تومان</p>
                    </div>
                </div>
                <div className={styles.pay_table}>
                    <div className={styles.pay_table_title}>
                        <h5 className="font-18">وضعیت سفارش</h5>
                    </div>
                    <div className={styles.pay_table_item}>
                        <h6 className="font-16">شماره سفارش</h6>
                        <p className="mb-0" className="mb-0">45320235</p>
                    </div>
                    <div className={styles.pay_table_item}>
                        <h6 className="font-16">قیمت کل</h6>
                        <p className="mb-0">75,000,000 تومان</p>
                    </div>
                    <div className={styles.pay_table_item}>
                        <h6 className="font-16">وضعیت پرداخت</h6>
                        <p className="mb-0 text-danger">پرداخت نشده</p>
                    </div>
                    <div className={styles.pay_table_item}>
                        <h6 className="font-16 text-danger"> وضعیت سفارش</h6>
                        <p className="mb-0 text-danger">ناموفق</p>
                    </div>
                </div>
            </div>
            <div className="text-center my-4">
                <Link href={'/'}
                    className='btn d-inline-block main-color-three-bg mx-auto'
                >
                    پرداخت مجدد
                </Link>
            </div>
        </div>
    )
}

export default PaymentFailure;