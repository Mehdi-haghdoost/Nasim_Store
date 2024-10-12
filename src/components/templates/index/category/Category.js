import React from 'react'
import styles from './Category.module.css'
function Category() {
    return (
        <div className="category py-20">
            <div className="container-fluid">
                <div className="header-content mb-4 bg-white shadow-box rounded-3 p-3 d-flex align-items-center justify-content-between flex-wrap">
                    <div className={`${styles.title} d-flex align-items-center`}>
                        <img src="/images/square.png" alt="" className="img-fluid" />
                        <h5 className="font-16">دسته بندی
                            <span
                                className="main-color-one-color d-inline-block "> محصولات
                            </span>
                        </h5>
                    </div>
                    <div className="link">
                        <a href="" className="border-animate fromCenter pb-1 fw-bold d-flex align-items-center">
                            مشاهده همه
                            <i className="bi bi-chevron-double-left main-color-one-color"></i>
                        </a>
                    </div>
                </div>
                <div className={`${styles.category_items}`}>
                    <div className="row gy-3 justify-content-center">
                        <div className="col-lg-3 col-sm-6 col-12">

                            <div className={`${styles.category_item} p-3 rounded-3 bg-white shadow-box`}>
                                <a href="">
                                    <div
                                        className="d-flex align-items-center justify-content-md-flex-start justify-content-between">
                                        <div className={`${styles.image}`}>
                                            <img src="/images/mobile.png" alt="" className="img-fluid" />
                                        </div>
                                        <div className="text ms-3">
                                            <p className="text-center font-14 text-overflow-1">تلفن همراه</p>
                                            <a href=""
                                                className={`btn text-muted-two btn-sm font-14 px-3 ${styles.light_btn} shadow-sm`}><span>مشاهده</span>
                                                <i
                                                    className="bi bi-chevron-double-left font-16 main-color-one-color ms-2"></i></a>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 col-12">

                            <div className={`${styles.category_item} p-3 rounded-3 bg-white shadow-box`}>
                                <a href="">
                                    <div
                                        className="d-flex align-items-center justify-content-md-flex-start justify-content-between">
                                        <div className={`${styles.image}`}>
                                            <img src="/images/varzeshi.png" alt="" className="img-fluid" />
                                        </div>
                                        <div className="text ms-3">
                                            <p className="text-center font-14 text-overflow-1">کالای ورزشی</p>
                                            <a href=""
                                                className={`btn text-muted-two btn-sm font-14 px-3 ${styles.light_btn} shadow-sm`}><span>مشاهده</span>
                                                <i
                                                    className="bi bi-chevron-double-left font-16 main-color-one-color ms-2"></i></a>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 col-12">

                            <div className={`${styles.category_item} p-3 rounded-3 bg-white shadow-box`}>
                                <a href="">
                                    <div
                                        className="d-flex align-items-center justify-content-md-flex-start justify-content-between">
                                        <div className={`${styles.image}`}>
                                            <img src="/images/kalaye-degital.png" alt="" className="img-fluid" />
                                        </div>
                                        <div className="text ms-3">
                                            <p className="text-center font-14 text-overflow-1">کالای دیجیتال</p>
                                            <a href=""
                                                className={`btn text-muted-two btn-sm font-14 px-3 ${styles.light_btn} shadow-sm`}><span>مشاهده</span>
                                                <i
                                                    className="bi bi-chevron-double-left font-16 main-color-one-color ms-2"></i></a>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 col-12">

                            <div className={`${styles.category_item} p-3 rounded-3 bg-white shadow-box`}>
                                <a href="">
                                    <div
                                        className="d-flex align-items-center justify-content-md-flex-start justify-content-between">
                                        <div className={`${styles.image}`}>
                                            <img src="/images/poshak.png" alt="" className="img-fluid" />
                                        </div>
                                        <div className="text ms-3">
                                            <p className="text-center font-14 text-overflow-1">پوشاک</p>
                                            <a href=""
                                                className={`btn text-muted-two btn-sm font-14 px-3 ${styles.light_btn} shadow-sm`}><span>مشاهده</span>
                                                <i
                                                    className="bi bi-chevron-double-left font-16 main-color-one-color ms-2"></i></a>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 col-12">

                            <div className={`${styles.category_item} p-3 rounded-3 bg-white shadow-box`}>
                                <a href="">
                                    <div
                                        className="d-flex align-items-center justify-content-md-flex-start justify-content-between">
                                        <div className={`${styles.image}`}>
                                            <img src="/images/lavazem-tahrir.png" alt="" className="img-fluid" />
                                        </div>
                                        <div className="text ms-3">
                                            <p className="text-center font-14 text-overflow-1">لوازم تحریر</p>
                                            <a href=""
                                                className={`btn text-muted-two btn-sm font-14 px-3 ${styles.light_btn} shadow-sm`}><span>مشاهده</span>
                                                <i
                                                    className="bi bi-chevron-double-left font-16 main-color-one-color ms-2"></i></a>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 col-12">

                            <div className={`${styles.category_item} p-3 rounded-3 bg-white shadow-box`}>
                                <a href="">
                                    <div
                                        className="d-flex align-items-center justify-content-md-flex-start justify-content-between">
                                        <div className={`${styles.image}`}>
                                            <img src="/images/milk.png" alt="" className="img-fluid" />
                                        </div>
                                        <div className="text ms-3">
                                            <p className="text-center font-14 text-overflow-1">کالای سوپر مارکتی</p>
                                            <a href=""
                                                className={`btn text-muted-two btn-sm font-14 px-3 ${styles.light_btn} shadow-sm`}><span>مشاهده</span>
                                                <i
                                                    className="bi bi-chevron-double-left font-16 main-color-one-color ms-2"></i></a>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 col-12">

                            <div className={`${styles.category_item} p-3 rounded-3 bg-white shadow-box`}>
                                <a href="">
                                    <div
                                        className="d-flex align-items-center justify-content-md-flex-start justify-content-between">
                                        <div className={`${styles.image}`}>
                                            <img src="/images/children.png" alt="" className="img-fluid" />
                                        </div>
                                        <div className="text ms-3">
                                            <p className="text-center font-14 text-overflow-1">اسباب بازی</p>
                                            <a href=""
                                                className={`btn text-muted-two btn-sm font-14 px-3 ${styles.light_btn} shadow-sm`}><span>مشاهده</span>
                                                <i
                                                    className="bi bi-chevron-double-left font-16 main-color-one-color ms-2"></i></a>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 col-12">

                            <div className={`${styles.category_item} p-3 rounded-3 bg-white shadow-box`}>
                                <a href="">
                                    <div
                                        className="d-flex align-items-center justify-content-md-flex-start justify-content-between">
                                        <div className={`${styles.image}`}>
                                            <img src="/images/abzar-khodro.png" alt="" className="img-fluid" />
                                        </div>
                                        <div className="text ms-3">
                                            <p className="text-center font-14 text-overflow-1">لوازم خودرو</p>
                                            <a href=""
                                                className={`btn text-muted-two btn-sm font-14 px-3 ${styles.light_btn} shadow-sm`}><span>مشاهده</span>
                                                <i
                                                    className="bi bi-chevron-double-left font-16 main-color-one-color ms-2"></i></a>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Category