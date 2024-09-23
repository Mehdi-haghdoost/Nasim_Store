"use client";
import React, { useState } from 'react'
import Link from 'next/link'
import styles from './Header.module.css'

function Header() {

    const [activeHamburger, setActiveHamburger] = useState(false)
    const [activeSubMenu, setactiveSubMenu] = useState({})

    const handleItemCheck = (index) => {
        setactiveSubMenu({
            ...activeSubMenu,
            [index]: !activeSubMenu[index]
        });
    };


    return (
        <header className={styles.header}>
            <div className='container-fluid'>
                <div className="row align-items-center">
                    {/* logo */}
                    <div className="col-lg-1 col-6 order-lg-1 order-1">
                        <div className="d-flex align-items-center">
                            <div className="d-block d-lg-none">
                                <i type="button" onClick={() => setActiveHamburger(true)} class="bi bi-list font-30"></i>

                                <div className={activeHamburger ? styles.hamburger_menu_show : styles.hamburger_menu_hidden}>
                                    <div className={styles.hamburger_menu_header}>
                                        <h5 className='hamburger_menu_title'>فروشگاه نسیم استور</h5>
                                        <button
                                            onClick={() => setActiveHamburger(false)}
                                            className={`btn-close ${styles.hamburger_btn_close}`}></button>
                                    </div>

                                    <div className={styles.hamburger_body}>
                                        <a href="" className='text-center d-block mb-3'>
                                            <img className='img-fluid' width="200" src="/images/logo.png" alt="logo" />
                                        </a>
                                        <div className="hamburger_body_bottom_form">
                                            <div className={styles.search_from}>
                                                <form action="">
                                                    <div className={styles.search_field}>
                                                        <input
                                                            placeholder='جسنجوی محصولات ...'
                                                            type="text" className={`form-control ${styles.search_input}`} />
                                                        <button type='submit'
                                                            className={`btn ${styles.search_btn} main-color-one-bg rounded-pill`}
                                                        >
                                                            <i

                                                                className="bi bi-search"></i>
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        <ul className={`navbar-nav ${styles.hamburger_navbar}`}>
                                            <li className={`nav-item ${styles.hamburger_navbar_item} `}>
                                                <Link href="/" className='nav-link'>
                                                    صفحه اصلی
                                                </Link>
                                            </li>
                                            <li className={`nav-item ${styles.hamburger_navbar_item} `}>
                                                <div className={styles.hamburger_navbar_item_wrapper}>
                                                    <Link href="/" className='nav-link'>
                                                        گوشی موبایل
                                                    </Link>
                                                    <span
                                                        onClick={() => handleItemCheck(0)}
                                                        className={styles.hamburger_showSubMenu}>
                                                        <i className={`bi bi-chevron-${activeSubMenu[0] ? 'down' : 'left'}`}></i>
                                                    </span>
                                                </div>
                                                <ul className={`navbar-nav ${activeSubMenu[0] ? styles.hamburger_navbar_submenu_show : styles.hamburger_navbar_submenu_hide}`}>
                                                    <li className={`nav-item ${styles.hamburger_navbar_item_submenu} `}>
                                                        <div className={styles.hamburger_navbar_item_wrapper}>

                                                            <Link className="nav-link" href="/">برند</Link>
                                                            <span
                                                                onClick={() => handleItemCheck(1)}
                                                                className={styles.hamburger_showSubMenu}
                                                            >
                                                                <i className={activeSubMenu[1] ? 'bi bi-chevron-down' : 'bi bi-chevron-left'}></i>
                                                            </span>
                                                        </div>
                                                        <ul className={`navbar-nav ${activeSubMenu[1] ? styles.hamburger_navbar_submenu_show : styles.hamburger_navbar_submenu_hide} `}>
                                                            <li className={`nav-item ${styles.hamburger_navbar_item}`}><Link href="/" className="nav-link">سامسونگ</Link>
                                                            </li>
                                                            <li className={`nav-item ${styles.hamburger_navbar_item}`}><Link href="/" className="nav-link">هوآوی</Link></li>
                                                            <li className={`nav-item ${styles.hamburger_navbar_item}`}><Link href="/" className="nav-link">شیائومی</Link>
                                                            </li>
                                                            <li className={`nav-item ${styles.hamburger_navbar_item}`}><Link href="/" className="nav-link">الجی</Link></li>
                                                            <li className={`nav-item ${styles.hamburger_navbar_item}`}><Link href="/" className="nav-link">سونی</Link></li>
                                                        </ul>
                                                    </li>
                                                    <li className={`nav-item ${styles.hamburger_navbar_item_submenu} `}>
                                                        <div className={styles.hamburger_navbar_item_wrapper}>

                                                            <Link className="nav-link" href="/">بر اساس دسته بندی</Link>
                                                            <span
                                                                onClick={() => handleItemCheck(2)}
                                                                className={styles.hamburger_showSubMenu}
                                                            >
                                                                <i className={activeSubMenu[2] ? 'bi bi-chevron-down' : 'bi bi-chevron-left'}></i>
                                                            </span>
                                                        </div>
                                                        <ul className={`navbar-nav ${activeSubMenu[2] ? styles.hamburger_navbar_submenu_show : styles.hamburger_navbar_submenu_hide} `}>
                                                            <li className={`nav-item ${styles.hamburger_navbar_item}`}><Link href="/" class="nav-link">لمسی</Link></li>
                                                            <li className={`nav-item ${styles.hamburger_navbar_item}`}><Link href="/" class="nav-link">دکمه ای</Link>
                                                            </li>
                                                            <li className={`nav-item ${styles.hamburger_navbar_item}`}><Link href="/" class="nav-link">نظامی</Link></li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className={`nav-item ${styles.hamburger_navbar_item} `}>
                                            <div className={styles.hamburger_navbar_item_wrapper}>
                                                    <Link href="/" className='nav-link'>
                                                        تبلت
                                                    </Link>
                                                    <span
                                                        onClick={() => handleItemCheck(3)}
                                                        className={styles.hamburger_showSubMenu}>
                                                        <i className={`bi bi-chevron-${activeSubMenu[3] ? 'down' : 'left'}`}></i>
                                                    </span>
                                                </div>
                                                <ul className={`navbar-nav ${activeSubMenu[3] ? styles.hamburger_navbar_submenu_show : styles.hamburger_navbar_submenu_hide}`}>
                                                    <li className={`nav-item ${styles.hamburger_navbar_item_submenu} `}>
                                                        <div className={styles.hamburger_navbar_item_wrapper}>

                                                            <Link className="nav-link" href="/">کشور</Link>
                                                            <span
                                                                onClick={() => handleItemCheck(4)}
                                                                className={styles.hamburger_showSubMenu}
                                                            >
                                                                <i className={activeSubMenu[4] ? 'bi bi-chevron-down' : 'bi bi-chevron-left'}></i>
                                                            </span>
                                                        </div>
                                                        <ul className={`navbar-nav ${activeSubMenu[4] ? styles.hamburger_navbar_submenu_show : styles.hamburger_navbar_submenu_hide} `}>
                                                            <li className={`nav-item ${styles.hamburger_navbar_item}`}><Link href="/" className="nav-link">ژاپن</Link>
                                                            </li>
                                                            <li className={`nav-item ${styles.hamburger_navbar_item}`}><Link href="/" className="nav-link">آمریکا</Link></li>
                                                            <li className={`nav-item ${styles.hamburger_navbar_item}`}><Link href="/" className="nav-link">کره جنوبی</Link>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <li className={`nav-item ${styles.hamburger_navbar_item_submenu} `}>
                                                        <div className={styles.hamburger_navbar_item_wrapper}>

                                                            <Link className="nav-link" href="/">بر اساس دسته بندی</Link>
                                                            <span
                                                                onClick={() => handleItemCheck(5)}
                                                                className={styles.hamburger_showSubMenu}
                                                            >
                                                                <i className={activeSubMenu[5] ? 'bi bi-chevron-down' : 'bi bi-chevron-left'}></i>
                                                            </span>
                                                        </div>
                                                        <ul className={`navbar-nav ${activeSubMenu[5] ? styles.hamburger_navbar_submenu_show : styles.hamburger_navbar_submenu_hide} `}>
                                                            <li className={`nav-item ${styles.hamburger_navbar_item}`}><Link href="/" class="nav-link">لمسی</Link></li>
                                                            <li className={`nav-item ${styles.hamburger_navbar_item}`}><Link href="/" class="nav-link">دانض آموزی</Link>
                                                            </li>
                                                            <li className={`nav-item ${styles.hamburger_navbar_item}`}><Link href="/" class="nav-link">مخصوص بازی</Link></li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className={`nav-item ${styles.hamburger_navbar_item} `}>
                                            <div className={styles.hamburger_navbar_item_wrapper}>
                                                    <Link href="/" className='nav-link'>
                                                        لپتاپ
                                                    </Link>
                                                    <span
                                                        onClick={() => handleItemCheck(6)}
                                                        className={styles.hamburger_showSubMenu}>
                                                        <i className={`bi bi-chevron-${activeSubMenu[6] ? 'down' : 'left'}`}></i>
                                                    </span>
                                                </div>
                                                <ul className={`navbar-nav ${activeSubMenu[6] ? styles.hamburger_navbar_submenu_show : styles.hamburger_navbar_submenu_hide}`}>
                                                    <li className={`nav-item ${styles.hamburger_navbar_item_submenu} `}>
                                                        <div className={styles.hamburger_navbar_item_wrapper}>

                                                            <Link className="nav-link" href="/">برند</Link>
                                                            <span
                                                                onClick={() => handleItemCheck(7)}
                                                                className={styles.hamburger_showSubMenu}
                                                            >
                                                                <i className={activeSubMenu[7] ? 'bi bi-chevron-down' : 'bi bi-chevron-left'}></i>
                                                            </span>
                                                        </div>
                                                        <ul className={`navbar-nav ${activeSubMenu[7] ? styles.hamburger_navbar_submenu_show : styles.hamburger_navbar_submenu_hide} `}>
                                                            <li className={`nav-item ${styles.hamburger_navbar_item}`}><Link href="/" className="nav-link">ایسر</Link>
                                                            </li>
                                                            <li className={`nav-item ${styles.hamburger_navbar_item}`}><Link href="/" className="nav-link">اپل</Link></li>
                                                            <li className={`nav-item ${styles.hamburger_navbar_item}`}><Link href="/" className="nav-link">لنوو</Link>
                                                            </li>
                                                            <li className={`nav-item ${styles.hamburger_navbar_item}`}><Link href="/" className="nav-link">ایسوس</Link>
                                                            </li>
                                                            <li className={`nav-item ${styles.hamburger_navbar_item}`}><Link href="/" className="nav-link">سونی</Link>
                                                            </li>
                                                            <li className={`nav-item ${styles.hamburger_navbar_item}`}><Link href="/" className="nav-link">مایکروسافت</Link>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <li className={`nav-item ${styles.hamburger_navbar_item_submenu} `}>
                                                        <div className={styles.hamburger_navbar_item_wrapper}>

                                                            <Link className="nav-link" href="/">بر اساس دسته بندی</Link>
                                                            <span
                                                                onClick={() => handleItemCheck(5)}
                                                                className={styles.hamburger_showSubMenu}
                                                            >
                                                                <i className={activeSubMenu[5] ? 'bi bi-chevron-down' : 'bi bi-chevron-left'}></i>
                                                            </span>
                                                        </div>
                                                        <ul className={`navbar-nav ${activeSubMenu[5] ? styles.hamburger_navbar_submenu_show : styles.hamburger_navbar_submenu_hide} `}>
                                                            <li className={`nav-item ${styles.hamburger_navbar_item}`}><Link href="/" class="nav-link">لمسی</Link></li>
                                                            <li className={`nav-item ${styles.hamburger_navbar_item}`}><Link href="/" class="nav-link">دانض آموزی</Link>
                                                            </li>
                                                            <li className={`nav-item ${styles.hamburger_navbar_item}`}><Link href="/" class="nav-link">مخصوص بازی</Link></li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className={`nav-item ${styles.hamburger_navbar_item} `}>
                                                <Link href="/" className='nav-link'>
                                                    صفحات
                                                </Link>
                                                <span className={styles.hamburger_showSubMenu}>
                                                    <i className="bi bi-chevron-left"></i>
                                                </span>
                                                <ul></ul>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className={activeHamburger ? styles.hamburger_backdrop : styles.hamburger_backdrop_hidden} ></div>
                            </div>
                            <div >
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


                    {/* auth */}
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
                    {/* end auth */}
                </div>
            </div>
        </header>
    )
}

export default Header