import React from 'react'
import styles from './CartFactor.module.css';

const CartFactor = () => {
    return (
        <div className={`position-sticky top-0 ${styles.cart_canvas}`}>
            <div className={styles.item}>
                <div className={styles.factor}>
                    <div className={styles.title}>
                        <div className='d-flex align-items-center'>
                            <img src="/images/shopping-bag.png" alt="shopping-bag" className="img-fluid" />
                            <h6 className="font-16">سفارش شما</h6>
                        </div>
                    </div>
                    <div className='d-flex mb-3 align-items-center justify-content-between'>
                        <p className="fw-bold mb-0">محصول</p>
                        <p className="fw-bold mb-0">قیمت کل</p>
                    </div>
                    <div className={`${styles.factor_item} p-2 rounded-3 shadow-sm bg-light d-flex align-items-center justify-content-between`}>
                        <p className="mb-0">هدست مخصوص بازی پابجی</p>
                        <p className="mb-0">1,750,000 تومان</p>
                    </div>
                    <div className={`${styles.factor_item} p-2 rounded-3 shadow-sm bg-light d-flex align-items-center justify-content-between`}>
                        <p className="mb-0 fw-bold">تخفیف :</p>
                        <p className="mb-0">500,000 تومان</p>
                    </div>
                    <div className={`${styles.factor_item} p-2 rounded-3 shadow-sm bg-light d-flex align-items-center justify-content-between`}>
                        <p className="mb-0 fw-bold">جمع کل :</p>
                        <p className="mb-0">4,000,000 تومان</p>
                    </div>
                    <div className=' mt-3 d-flex align-items-center justify-content-center'>
                        <a href="" className='btn border-0 main-color-one-bg rounded-3 d-block w-100'>تسویه حساب</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartFactor