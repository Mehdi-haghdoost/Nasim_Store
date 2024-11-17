import React from 'react'
import styles from './orderCart.module.css';
import Link from 'next/link';

function OrderCart() {
    return (
        <div className={styles.site_table_content}>
            <div className={`${styles.image} st-dv st-dv-1`}>
                <img src="images/product/laptop(1).png" alt="laptop" className='img-fluid' />
            </div>
            <div className={`${styles.pro_title} st-dv st-dv-2`}>
                <p className="fw-bold mb-0">
                    لپ تاپ 14.2 اینچی اپل مدل 2021 MacBook MKGR3 M1 Pro
                </p>
            </div>
            <div className={`${styles.order_detail} st-dv st-dv-3`}>
                <div className='d-flex align-items-center'>
                    <p className="mb-0 text-muted">کد سفارش</p>
                    <p className="mb-0 me-2 fw-bold">1456321</p>
                </div>
                <p className="mb-0 text-muted mt-2">
                    27 آبان 1403
                </p>
            </div>
            <div className={`${styles.order_detail} st-dv st-dv-4`}>
                <div className='d-flex align-items-center'>
                    <p className="mb-0 text-muted">مبلغ </p>
                    <p className="mb-0 me-2 fw-bold">1,700,000 تومان</p>
                </div>
                <p className="mb-0 fw-bold mt-2">
                    <i className='bi bi-check-circle-fill main-color-three-color ms-2'></i>
                    تحویل داده شده
                </p>
            </div>
            <div className={`${styles.order_detail} st-dv st-dv-5`}>
                <Link href={"/p-user"}>
                    <div className="d-flex align-items-center">
                        <i className='bi bi-printer ms-2 main-color-one-color'></i>
                        <p className='mb-0 main-color-one-color fw-bold'>مشاهده فاکتور</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default OrderCart;