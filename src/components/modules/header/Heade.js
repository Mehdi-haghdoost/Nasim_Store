import React from 'react'
import Link from 'next/link'
import styles from './Header.module.css'

function Header() {
    return (
        <header className={styles.header}>
            <div className='container-fluid'>
                <div className="row align-items-center">
                    {/* logo */}
                    <div className="col-lg-1 col-6 order-lg-1 order-1">
                        <div className="d-flex align-items-center">
                            <div className="d-block d-lg-none"></div>
                            <div className="d-none d-lg-block">
                                <Link href='/'>
                                    <div className="logo">
                                        <img className='img-fluid' src="/images/logo.png" alt="logo" />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    {/* end logo */}

                    {/* action */}
                    <div className="d-lg-none d-block col-6 order-lg-5 order-2 ">hi2</div>
                    {/* end action */}


                    {/* form search */}
                    <div className="col-lg-7 order-lg-2 d-lg-block d-none">
                        <div className="search-form">
                            <form action="">
                                <div className={styles.search_field}>
                                    <input type="text" placeholder='جستجوی محصولات ...' className={`form-control ${styles.search_input}`} />
                                    <button type='button' className={`btn main-color-one-bg ${styles.search_btn} rounded-pill`}>
                                        <i className='bi bi-search'></i>

                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    {/* end form search */}



                    <div className="col-lg-4 order-lg-3 d-lg-block d-none">
                        <div className="d-flex align-items-center justify-content-end">
                            <div className={`btn-group rounded-pill shadow-sm ${styles.header_btn_group} `}>
                                <div>
                                    <Link href='/register' className={`${styles.header_register} btn btn-white border-o rounded-pill`}>
                                        <i className='bi bi-person-circle font-20 text-muted me-1'></i>
                                        <span>ثبت نام</span>
                                    </Link>
                                </div>
                                <Link href="/login" className={`${styles.header_login} btn btn-white border-o rounded-pill`}>ورود</Link>
                            </div>
                            <div className={`${styles.header_whishlist} shadow-sm`}>
                                <Link href='/wishlist'>
                                    <i className='bi bi-bookmark-check font-20 text-muted'></i>
                                </Link>
                            </div>
                            <div className={`${styles.header_cart} ms-1 shadow-sm rounded-pill`}>
                                <Link href='' className={` btn header-cart-toggle  btn-white border-0 `}>
                                    <i className='bi bi-shop font-20 text-muted me-1'></i>
                                <span className={`main-color-one-bg ${styles.header_cart_counter} rounded-pill`}>5</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header