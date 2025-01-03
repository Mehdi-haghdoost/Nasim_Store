'use client';

import React, { useState } from 'react'
import styles from './CartProductItem.module.css';

const CartProductItem = () => {

    const [productCount, setProductCount] = useState(1)

    return (
        <div className={styles.cart_product_item}>
            <div className="content-box">
                <div className="container-fluid">
                    <div className={styles.cart_items}>
                        <div className={styles.item}>
                            <div className="row gy-2">
                                <div className="col-2 w-100-in-400">
                                    <div className={styles.image}>
                                        <img src="/images/product/laptop-2.jpg" alt="laptop" className='img-fluid' />
                                    </div>
                                </div>
                                <div className="col-10 w-100-in-400">
                                    <div className="d-flex justify-content-between align-items-start">
                                        <div className='d-flex align-items-start flex-column ms-2'>
                                            <div className={`d-flex align-items-center flex-wrap ${styles.title}`}>
                                                <h6 className='font-16'>
                                                    لپ تاپ 14.2 اینچی اپل مدل 2021 MacBook MKGR3 M1 Pro
                                                    <span className='badge me-2 danger-label rounded-pill'>17%</span>
                                                </h6>
                                            </div>
                                            <div className={`d-flex align-items-center flex-wrap mt-3 ${styles.cart_item_feature}`}>
                                                <div className={`d-flex align-items-center ${styles.item}`}>
                                                    <div className="icon">
                                                        <i className="bi bi-shop"></i>
                                                    </div>
                                                    <div className="saller-name mx-2">فروشنده:</div>
                                                    <div className="saller-name text-muted">ایران موبایل</div>
                                                </div>
                                                <div className={`d-flex align-items-center ${styles.item}`}>
                                                    <div className="icon">
                                                        <i className="bi bi-palette2"></i>
                                                    </div>
                                                    <div className="saller-name mx-2">رنگ:</div>
                                                    <div className="saller-name text-muted">
                                                        <div className={`mt-0 ${styles.product_meta_color_items}`}>
                                                            <label className='btn-light mb-0 px-2 py-1'>
                                                                <span style={{ backgroundColor: "#c00" }}></span>
                                                                قرمز
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={`d-flex align-items-center ${styles.item}`}>
                                                    <div className="icon">
                                                        <i className="bi bi-bounding-box-circles"></i>
                                                    </div>
                                                    <div className="saller-name mx-2">سایز:</div>
                                                    <div className="saller-name text-muted">
                                                        <div className={`mt-0 ${styles.product_meta_color_items}`}>
                                                            <label className='btn-light mb-0 px-2'>
                                                                بزرگ
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`${styles.remove} danger-label`}>
                                            <a href="">
                                                <i className="bi bi-trash-fill font-25"></i>
                                            </a>
                                        </div>
                                    </div>
                                    <div className={`${styles.action} d-flex flex-wrap justify-content-sm-end justify-content-center align-items-center mt-3`}>
                                        <div className={`d-flex align-items-center flex-wrap ${styles.cart_item_feature}`}>
                                            <div className={`d-flex align-items-center ${styles.item} ms-2`}>
                                                <p className={`mb-0 ${styles.old_price} font-16`}>1,9000,000</p>
                                            </div>
                                            <div className={`d-flex align-items-center ${styles.item}`}>
                                                <p className={`${styles.new_price} mb-0 font-16`}>1,300,000 تومان</p>
                                            </div>
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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartProductItem