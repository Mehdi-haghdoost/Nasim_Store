"use client";
import React, { useState } from 'react'
import styles from './ProductDesc.module.css'
import Descriptions from './Descriptions';
import Specifications from './Specifications';
import Informations from './Informations';
import Comments from './Comments';
function ProductDesc() {

    const [tab, setTab] = useState('descriptions');


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

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDesc