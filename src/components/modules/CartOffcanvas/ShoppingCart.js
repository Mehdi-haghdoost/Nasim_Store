import React, { useState } from 'react'
import styles from './ShoppingCart.module.css';
import Link from 'next/link';

const ShoppingCart = ({ isShowBascket, showBascket }) => {
    const [productCount, setProductCount] = useState(1)
    return (
        <div
            className={`offcanvas cart-canvas offcanvas-start ${isShowBascket ? "show" : ""}`}

        >
            <div className={`${styles.header} offcanvas-header`}>
                <h5 className="offcanvas-title"
                >
                    سبد خرید
                </h5>
                <button type='button'
                    onClick={showBascket}
                    className='btn-close' ></button>
            </div>
            <div className="offcanvas-body">
                <div className={styles.cart_canvases}>
                    <div className={styles.item}>
                        <div className="row gy-2">
                            <div className="col-4">
                                <div className={styles.image}>
                                    <img src="/images/product/laptop-1.jpg" className='img-fluid' alt="laptop-1" />
                                </div>
                            </div>
                            <div className="col-8">
                                <Link href={'/'} style={{ display: "inline-block" }}>
                                    <div className={styles.title}>
                                        <h6 className="font-14">لپتاپ گیمینگ  asus</h6>
                                        <p className="mb-0 text-muted font-12 mt-2"> مدل  TUF Gaming FX507ZC4 | i5 12500H | 32GB | 1TB SSD | RTX </p>
                                    </div>
                                    <div className={styles.price}>
                                        <p className={`text-start mb-2 ${styles.price_off} fw-bold`}>57,499,000 تومان</p>
                                        <p className={`text-start ${styles.discount}`}>60,000,000 تومان</p>
                                    </div>
                                </Link>
                                <div className={`d-flex justify-content-between align-items-center ${styles.action}`}>
                                    <div className={`${styles.remove} bg-light rounded-3`}>
                                        <a href="">
                                            <i className="bi bi-x font-25"></i>
                                        </a>
                                    </div>
                                    <div className={styles.counter}>
                                        <div className="input-group">
                                            <span className="input-group-btn input-group-prepend">
                                                <button
                                                    className="btn-counter waves-effect waves-light bootstrap-touchspin-down"
                                                    type="button"
                                                    onClick={() => setProductCount(productCount > 1 ? productCount - 1 : 1)}
                                                >
                                                    -
                                                </button>
                                            </span>
                                            <input
                                                name="count"
                                                className="counter form-counter"
                                                value={productCount} />
                                            <span className="input-group-btn input-group-append">
                                                <button
                                                    className="btn-counter waves-effect waves-light bootstrap-touchspin-up"
                                                    type="button"
                                                    onClick={() => setProductCount(productCount + 1)}
                                                >
                                                    +
                                                </button>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.factor}>
                            <div className={styles.title}>
                                <div className="d-flex align-items-center">
                                    <img src="/images/product/shopping-bag.png" alt="shopping-png" className='img-fluid' />
                                    <h6 className="font-16">سفارش شما</h6>
                                </div>
                            </div>
                            <div className="d-flex mb-3 align-items-center justify-content-between">
                                <p className="fw-bold mb-0">محصول</p>
                                <p className="fw-bold mb-0">قیمت کل</p>
                            </div>
                            <div className={`${styles.factor_item} p-2 rounded-3 shadow-sm bg-light d-flex align-items-center justify-content-between`}>
                                <p className="mb-0">لپتاپ مخصوص گیمینگ asus</p>
                                <p className="mb-0">57,499,000 تومان</p>
                            </div>
                            <div className={`${styles.factor_item} p-2 rounded-3 shadow-sm bg-light d-flex align-items-center justify-content-between`}>
                                <p className="mb-0">لپتاپ مخصوص گیمینگ asus</p>
                                <p className="mb-0">57,499,000 تومان</p>
                            </div>
                            <div className={`${styles.factor_item} p-2 rounded-3 shadow-sm bg-light d-flex align-items-center justify-content-between`}>
                                <p className="mb-0">جمع کل </p>
                                <p className="mb-0">100,000,000 تومان</p>
                            </div>
                            <div className={`${styles.action} mt-3 d-flex align-items-center justify-content-center`}>
                                <a href="#" className='btn border-0 main-color-two-bg rounded-3'>سبد خرید</a>
                                <a href="#" className='btn border-0 main-color-one-bg rounded-3 me-2'>تسویه حساب</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShoppingCart