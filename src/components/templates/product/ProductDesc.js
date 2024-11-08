"use client";
import React, { useState } from 'react'
import styles from './ProductDesc.module.css'
import Descriptions from './Descriptions';
import Specifications from './Specifications';
import Informations from './Informations';
import Comments from './Comments';
import { GoStarFill } from "react-icons/go";

function ProductDesc() {

    const [tab, setTab] = useState('descriptions');
    const [productCount, setProductCount] = useState(1)


    return (
        <div className={`${styles.product_desc} py-20`}>
            <div className='container-fluid'>
                <div className='row gy-3'>
                    <div className='col-lg-9'>
                        <div className='content-box'>
                            <div className='container-fluid'>
                                <div className={styles.product_desc}>
                                    <div className={styles.product_desc_tab}>
                                        <ul className={`${styles.product_desc_list} nav`}>
                                            <li className='nav-item'>
                                                <button
                                                    className={tab === "descriptions" ? styles.active_tab : ""}
                                                    onClick={() => setTab("descriptions")}
                                                >
                                                    توضیحات کالا
                                                </button>
                                            </li>
                                            <li className='nav-item'>
                                                <button
                                                    className={tab === "specifications" ? styles.active_tab : ""}
                                                    onClick={() => setTab("specifications")}
                                                >
                                                    مشخصات کالا
                                                </button>
                                            </li>
                                            <li className='nav-item'>
                                                <button
                                                    className={tab === "additional_informations" ? styles.active_tab : ""}
                                                    onClick={() => setTab("additional_informations")}
                                                >
                                                    توضیحات تکمیلی
                                                </button>
                                            </li>
                                            <li className='nav-item'>
                                                <button
                                                    className={tab === "comments" ? styles.active_tab : ""}
                                                    onClick={() => setTab("comments")}
                                                >
                                                    نظرات
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className={styles.product_desc_tab_content}>
                                        <section>
                                            {tab === "descriptions" && <Descriptions />}
                                            {tab === "specifications" && <Specifications />}
                                            {tab === "additional_informations" && <Informations />}
                                            {tab === "comments" && <Comments />}

                                        </section>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-3 d-lg-block d-none position-relative'>
                        <div className={`top-0 position-sticky ${styles.content_box}`}>
                            <div className="container-fluid">
                                <div className={styles.product_float_header}>
                                    <div className="row align-items-center gy-2">
                                        <div className="col-4">
                                            <div className={styles.product_float_image}>
                                                <img src="/images/product/laptop-1.jpg" className='img-fluid' alt="" />
                                            </div>
                                        </div>
                                        <div className="col-8">
                                            <a href="">
                                                <div className={styles.product_float_title}>
                                                    <h6 className='font-16'>
                                                        ساعت هوشمند سامسونگ مدل Galaxy Watch3 SM-R840
                                                        45mm
                                                        بند چرمی
                                                    </h6>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="product-meta-color-items mt-3">
                                    <input
                                        type="radio" className="btn-check" name="options" id="option11" autocomplete="off"
                                    />
                                    <label className="btn " htmlFor="option11">
                                        <span style={{ backgroundColor: '#c00' }}></span>
                                        قرمز
                                    </label>

                                    <input type="radio" className="btn-check" name="options" id="option21" autocomplete="off" />
                                    <label className="btn " htmlFor="option21">
                                        <span style={{ backgroundColor: '#111' }}></span>
                                        مشکی
                                    </label>

                                    <input type="radio" className="btn-check" name="options" id="option31" autocomplete="off"
                                        disabled />
                                    <label className="btn " htmlFor="option31">
                                        <span style={{ backgroundColor: '#00cc5f' }}></span>
                                        سبز
                                    </label>

                                    <input type="radio" className="btn-check" name="options" id="option41" autocomplete="off" />
                                    <label className="btn " htmlFor="option41">
                                        <span style={{ backgroundColor: '#1b69f0' }}></span>
                                        آبی
                                    </label>
                                </div>
                                <div className={`${styles.product_float_brand} my-3`}>
                                    <a href="" className='d-inline'>
                                        <img src="/images/brand1-1.png" className='img-fluid' alt="" />
                                        <p className='mb-0 mr-2 d-inline'>شیائومی</p>
                                    </a>
                                </div>
                                <div className={styles.product_meta_rating}>
                                    <div className='d-flex align-items-center'>
                                        <div className={`text-muted ${styles.count_comment}`}>16 دیدگاه</div>
                                        <div className={styles.count_rating}>
                                            <span>(17) 4.5</span>
                                            <GoStarFill />
                                        </div>
                                    </div>
                                </div>
                                <div className={`${styles.product_meta_garanty} justify-content-start`}>
                                    <i className='bi bi-shield-fill-check'></i>
                                    <span className='text-muted'>گارانتی اصالت و سلامت فیزیکی کالا</span>
                                </div>
                                <div className={`${styles.product_meta_price} p-0 bg-transparent shadow-none`} >
                                    <div className='row gy-3'>
                                    <div className="col-6 w-100-in-400">
                                        <p className={`mb-0 ${styles.old_price} font-16 text-lg-start text-center`}>1,500,000 تومان</p>
                                    </div>
                                    <div className="col-6 w-100-in-400">
                                        <h6 className={`font-16 ${styles.new_price} main-color-one-color`}>1,200,000 تومان</h6>
                                    </div>
                                    </div>
                                </div>
                                <div className={`${styles.product_meta_action} p-0 bg-transparent shadow-none`}>
                                    <div className="row gy-3">
                                        <div className="col-12 w-100-in-400">
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
                                                        type="number"
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
                                        <div className='col-12 w-100-in-400'>
                                            <div className='d-flex justify-content-center'>
                                                <a href="" className='btn border-0 main-color-three-bg w-100'>
                                                    <i className='bi bi-basket text-white font-20 ms-1'></i>
                                                    خرید کالا
                                                </a>
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

export default ProductDesc