import React from 'react'
import styles from './details.module.css'

import ProductImagesSlider from '../product/product-images-slider/ImageSlider';
import Gallery from '../product/product-images-slider/ImageSlider';
function Details() {
    return (
        <div className="product-meta py-20">
            <div className="container-fluid">
                <div className="content-box">
                    <div className="container-fluid">
                        <div className="row gy-3">
                            <div className="col-lg-4">
                                <div className={styles.pro_gallery}>
                                    <div className={styles.icon_product_box}>
                                        <div className={styles.icon_product_box_item} data-bs-toggle="modal" data-bs-target="#shareModal" data-bs-placement="right" aria-label="اشتراک گذاری" data-bs-original-title="اشتراک گذاری">
                                            <i className="bi bi-share"></i>
                                        </div>
                                        <div className={styles.icon_product_box_item} data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="افزودن به علاقه مندی">
                                            <i className="bi bi-heart"></i>
                                        </div>
                                        <div className={styles.icon_product_box_item} data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="مقایسه محصول">
                                            <i className="bi bi-arrow-left-right"></i>
                                        </div>
                                        <div className={styles.icon_product_box_item} data-bs-toggle="modal" data-bs-target="#chartModal" data-toggle="tooltip" data-bs-placement="right" aria-label="نمودار تغییر قیمت" data-bs-original-title="نمودار تغییر قیمت">
                                            <i className="bi bi-bar-chart"></i>
                                        </div>
                                    </div>
                                
                                   <Gallery />
                                   
                                </div>
                            </div>
                            <div className="col-lg-8">
                                <div className={styles.product_meta_title}>
                                    <div className="row align-items-baseline gy-3">
                                        <div className="col-lg-8">
                                            <h5 className="font-16">
                                                ساعت هوشمند سامسونگ مدل Galaxy Watch3 SM-R840 45mm بند چرمی
                                            </h5>
                                            <p className="mb-0 mt-2 text-muted">Samsung smart watch model Galaxy Watch3 SM-R840 45mm
                                                leather strap</p>
                                        </div>
                                        <div className="col-lg-4">
                                            <a href="" className="text-lg-start d-block">
                                                <img src="/images/brand1-1.png" alt="" className="img-fluid" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.product_meta_feature}>
                                    <div className="row gy-3">
                                        <div className="col-lg-8">
                                            <div className={styles.product_meta_feature_items}>
                                                <h5 className="title font-16 mb-2">ویژگی های کالا</h5>
                                                <ul className="navbar-nav">
                                                    <li className="nav item"><span>نوع اتصال:</span><strong>با سیم</strong></li>
                                                    <li className="nav item"><span>رابط ها:</span><strong>3.5 میلیمتری</strong></li>
                                                    <li className="nav item"><span>مقدار رم :</span><strong>8 گیگابایت</strong></li>
                                                    <li className="nav item"><span>نوع گوشی:</span><strong>دوگوشی</strong></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className={styles.product_meta_rating}>
                                                <div className="d-flex align-items-center justify-content-lg-end">
                                                    <div className={`${styles.count_comment} text-muted`}>16 دیدگاه</div>
                                                    <div className={styles.count_rating}>
                                                        <span>(17) 4.5</span>
                                                        <i className="bi bi-star-fill"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={`${styles.product_meta_garanty} justify-content-lg-end justify-content-start`}>
                                                <i className="bi bi-shield-fill-check"></i>
                                                <span className="text-muted"> گارانتی اصالت و سلامت فیزیکی کالا
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.product_meta_color}>
                                    <h5 className="font-16">
                                        انتخاب رنگ کالا
                                    </h5>
                                    <div className={styles.product_meta_color_items}>
                                        <input type="radio" className={styles.btn_check} name="options" id="option1" autocomplete="off" checked="" />
                                        <label className="btn " for="option1">
                                            <span style={{ backgroundColor: '#c00' }}></span>
                                            قرمز
                                        </label>

                                        <input type="radio" className={styles.btn_check} name="options" id="option2" autocomplete="off" />
                                        <label className="btn " for="option2">
                                            <span style={{ backgroundColor: '#111' }}></span>
                                            مشکی
                                        </label>

                                        <input type="radio" className={styles.btn_check} name="options" id="option3" autocomplete="off" disabled="" />
                                        <label className="btn " for="option3">
                                            <span style={{ backgroundColor: '#00cc5f' }}></span>
                                            سبز
                                        </label>

                                        <input type="radio" className={styles.btn_check} name="options" id="option4" autocomplete="off" />
                                        <label className="btn " for="option4">
                                            <span style={{ backgroundColor: '#1b69f0' }}></span>
                                            آبی
                                        </label>
                                    </div>
                                </div>
                                <div className={`${styles.productmeta_count} text-muted`}>
                                    <span>14 عدد در انبار</span>
                                </div>
                                <div className={styles.product_meta_action}>
                                    <div className="row align-items-center gy-3">
                                        <div className="col-lg-3 col-6 w-100-in-400">
                                            <p className={`mb-0 ${styles.old_price} font-16 text-lg-start text-center`}>1,500,000 تومان</p>
                                        </div>
                                        <div className="col-lg-3 col-6 w-100-in-400">
                                            <h6 className={`font-16 ${styles.new_price} main-color-one-color`}>1,200,000 تومان</h6>
                                        </div>
                                        <div className="col-lg-3 col-6 w-100-in-400">
                                            <div className="d-flex justify-content-center">
                                                <a href="" className="btn w-100 border-0 main-color-three-bg"><i className="bi bi-basket text-white font-20 ms-1"></i>خرید کالا</a>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-6 w-100-in-400">
                                            <div className="counter">
                                                <div className="input-group bootstrap-touchspin bootstrap-touchspin-injected"><span className="input-group-btn input-group-prepend"><button className="btn-counter waves-effect waves-light bootstrap-touchspin-down" type="button">-</button></span>
                                                    <input type="text" name="count" className="counter form-counter" value="1" />
                                                    <span className="input-group-btn input-group-append">
                                                        <button className="btn-counter waves-effect waves-light bootstrap-touchspin-up" type="button">+</button>
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
        </div>
    )
}
export default Details;
