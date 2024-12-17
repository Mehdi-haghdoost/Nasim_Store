import React from 'react'
import styles from './CheckoutSide.module.css';

const CheckoutSide = () => {
    return (
        <div className={`position-sticky ${styles.checkout_side} top-0`}>
            <div className={`${styles.cart_canvas} mb-4`}>
                <div className={styles.item}>
                    <div className={styles.factor}>
                        <div className={styles.title}>
                            <div className="d-flex align-items-start">
                                <i className="bi bi-calendar2-check-fill ms-2 main-color-one-color">
                                    <h6 className="font-16">زمان ارسال</h6>
                                </i>
                            </div>
                        </div>
                        <div className="row gy-3">
                            <div className="col-4">
                                <div className={`${styles.send_item} ${styles.active}`}>
                                    <h6 className="font-14 text-center">یک شنبه</h6>
                                    <p className="font-14 text-center mt-1 mb-0 text-muted">27 آذر ماه</p>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className={`${styles.send_item} `}>
                                    <h6 className="font-14 text-center">دو شنبه</h6>
                                    <p className="font-14 text-center mt-1 mb-0 text-muted">28 آذر ماه</p>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className={`${styles.send_item} `}>
                                    <h6 className="font-14 text-center">سه شنبه</h6>
                                    <p className="font-14 text-center mt-1 mb-0 text-muted">29 آذر ماه</p>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className={`${styles.send_item} `}>
                                    <h6 className="font-14 text-center">چهار شنبه</h6>
                                    <p className="font-14 text-center mt-1 mb-0 text-muted">30 آذر ماه</p>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className={`${styles.send_item} `}>
                                    <h6 className="font-14 text-center">پنجشنبه</h6>
                                    <p className="font-14 text-center mt-1 mb-0 text-muted">1 دی ماه</p>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className={`${styles.send_item} `}>
                                    <h6 className="font-14 text-center">جمعه</h6>
                                    <p className="font-14 text-center mt-1 mb-0 text-muted">2 دی ماه</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${styles.cart_canvas} mb-4`}>
                <div className={styles.item}>
                    <div className={styles.factor}>
                        <div className={styles.title}>
                            <div className="d-flex align-items-start">
                                <i className="bi bi-rocket-fill ms-2 main-color-one-color"></i>
                                <h6 className="font-16">
                                    انتخاب شیوه ارسال
                                </h6>
                            </div>
                        </div>
                        <div className="row gy-2">
                            <div className="col-12">
                                <div className={styles.shipping_item}>
                                    <img src="/images/post-logo.png" className='img-thumbnail' alt="logo" />
                                    <h6 className="font-14 mx-2">پست معمولی :</h6>
                                    <p className="mb-0 text-muteted">8000 تومان</p>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className={`${styles.shipping_item} ${styles.active}`}>
                                    <img src="/images/post-logo.png" className='img-thumbnail' alt="logo" />
                                    <h6 className="font-14 mx-2">پست پیشتاز :</h6>
                                    <p className="mb-0 text-muteted">16000 تومان</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${styles.cart_canvas} mb-4`}>
                <div className={styles.item}>
                    <div className={styles.factor}>
                        <div className={styles.title}>
                            <div className="d-flex align-items-start">
                                <i className="bi bi-credit-card-2-front-fill ms-2 main-color-one-color"></i>
                                <h6 className="font-16">
                                    انتخاب شیوه پرداخت
                                </h6>
                            </div>
                        </div>
                        <div className="row gy-2">
                            <div className="col-12">
                                <div className={`${styles.bank_item} ${styles.active}`}>
                                    <i className="bi bi-credit-card-2-back main-color-one-color"></i>
                                    <h6 className="font-14 mx-2">انتقال مستقیم بانکی</h6>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className={styles.bank_item}>
                                    <i className="bi bi-house-fill main-color-one-color"></i>
                                    <h6 className="font-14 mx-2">پرداخت هنگام دریافت</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.cart_canvas}>
                <div className={styles.item}>
                    <div className={styles.factor}>
                        <div className={styles.title}>
                            <div className="d-flex align-items-start">
                                <img src="/images/shopping-bag.png" className='img-fluid' alt="shopping-bag" />
                                <h6 className="font-16">سفارش شما</h6>
                            </div>
                        </div>
                        <div className="d-flex mb-3 align-items-center justify-content-between">
                            <p className="fw-bold mb-0">محصول</p>
                            <p className="fw-bold mb-0">قیمت کل</p>
                        </div>
                        <div className={`${styles.factor_item} p-2 rounded-3 shadow-sm bg-light d-flex align-items-center justify-content-between`}>
                            <p className="mb-0">هدست مخصوص بازی پابجی</p>
                            <p className="mb-0">1,750,000 تومان </p>
                        </div>
                        <div className={`${styles.factor_item} p-2 rounded-3 shadow-sm bg-light d-flex align-items-center justify-content-between`}>
                            <p className="mb-0 fw-bold">تخفیف</p>
                            <p className="mb-0">500,000تومان </p>
                        </div>
                        <div className={`${styles.factor_item} p-2 rounded-3 shadow-sm bg-light d-flex align-items-center justify-content-between`}>
                            <p className="mb-0 fw-bold">جمع کل</p>
                            <p className="mb-0">4,000,000 تومان </p>
                        </div>
                        <div className={`${styles.action} mt-3 d-flex align-items-center justify-content-center`}>
                            <button className='btn border-0 main-color-two-bg rounded-3 py-2 d-block w-100'>پرداخت</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutSide