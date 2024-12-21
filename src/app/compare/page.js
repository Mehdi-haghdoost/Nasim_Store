import React from 'react'
import styles from '@/styles/compare.module.css';
import BreadCroumb from '@/components/modules/breadCroumb/BreadCroumb';
import Footer from '@/components/modules/footer/Footer';
import Header from '@/components/modules/header/Header';



const page = () => {
    return (
        <>
            <Header />
            <BreadCroumb />
            <div className="content">
                <div className="container-fluid">
                    <div className="header-content mb-4 bg-white shadow-box rounded-3 p-3 d-flex align-items-center justify-content-between flex-wrap">
                        <div className={`d-flex align-items-center ${styles.title}`}>
                            <img src="/images/square.png" alt="square" className="img-fluid" />
                            <h5 className="font-16 me-3">
                                مقایسه
                                <span className='main-color-one-color d-inline-block me-1'>
                                    محصول
                                </span>
                            </h5>
                        </div>
                    </div>
                    <div className="content-box">
                        <div className="container-fluid">
                            <div className={styles.compare}>
                                <div className="row">
                                    <div className="col-4">
                                        <div className="table-responsive">
                                            <table className={`table table-bordered fixed ${styles.compare_table}`}>
                                                <thead>
                                                    <tr>
                                                        <th>
                                                            <div className={styles.compare_add}>
                                                                <div className={styles.compare_add_product}>
                                                                    <div className={styles.cap_icon}>
                                                                        <i className="bi bi-box-arrow-down"></i>
                                                                    </div>
                                                                    <div className={styles.cap_title}>
                                                                        <p className="text-muted">برای افزودن محصول کلیک کنید</p>
                                                                    </div>
                                                                    <div className={styles.cap_btn}>
                                                                        <button className="btn border-0 main-color-one-bg">افزودن کالا به مقایسه</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td colSpan="5" className='text-end'>
                                                            <i className="bi bi-chevron-double-left"></i>
                                                            <span>قیمت</span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan="5" className={styles.td_head}>
                                                            <i className="bi bi-chevron-double-left"></i>
                                                            <span>پردازنده</span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default page;