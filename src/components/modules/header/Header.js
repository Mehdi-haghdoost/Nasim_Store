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
                                <i type="button" onClick={() => setActiveHamburger(true)} className="bi bi-list font-30"></i>

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
                                                            <li className={`nav-item ${styles.hamburger_navbar_item}`}><Link href="/" className="nav-link">لمسی</Link></li>
                                                            <li className={`nav-item ${styles.hamburger_navbar_item}`}><Link href="/" className="nav-link">دکمه ای</Link>
                                                            </li>
                                                            <li className={`nav-item ${styles.hamburger_navbar_item}`}><Link href="/" className="nav-link">نظامی</Link></li>
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
                                                            <li className={`nav-item ${styles.hamburger_navbar_item}`}><Link href="/" className="nav-link">لمسی</Link></li>
                                                            <li className={`nav-item ${styles.hamburger_navbar_item}`}><Link href="/" className="nav-link">دانض آموزی</Link>
                                                            </li>
                                                            <li className={`nav-item ${styles.hamburger_navbar_item}`}><Link href="/" className="nav-link">مخصوص بازی</Link></li>
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

                                                            <Link className="nav-link" href="/">بر اساس قیمت</Link>
                                                            <span
                                                                onClick={() => handleItemCheck(8)}
                                                                className={styles.hamburger_showSubMenu}
                                                            >
                                                                <i className={activeSubMenu[8] ? 'bi bi-chevron-down' : 'bi bi-chevron-left'}></i>
                                                            </span>
                                                        </div>
                                                        <ul className={`navbar-nav ${activeSubMenu[8] ? styles.hamburger_navbar_submenu_show : styles.hamburger_navbar_submenu_hide} `}>
                                                            <li className={`nav-item ${styles.hamburger_navbar_item}`}><Link href="/" className="nav-link">ارزان</Link></li>
                                                            <li className={`nav-item ${styles.hamburger_navbar_item}`}><Link href="/" className="nav-link">اقتصادی</Link>
                                                            </li>
                                                            <li className={`nav-item ${styles.hamburger_navbar_item}`}><Link href="/" className="nav-link">گران</Link></li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className={`nav-item ${styles.hamburger_navbar_item} `}>
                                                <div className={styles.hamburger_navbar_item_wrapper}>
                                                    <Link href="/" className='nav-link'>
                                                        صفحات
                                                    </Link>
                                                    <span
                                                        onClick={() => handleItemCheck(9)}
                                                        className={styles.hamburger_showSubMenu}>
                                                        <i className={`bi bi-chevron-${activeSubMenu[9] ? 'down' : 'left'}`}></i>
                                                    </span>
                                                </div>
                                                <ul className={`navbar-nav ${activeSubMenu[9] ? styles.hamburger_navbar_submenu_show : styles.hamburger_navbar_submenu_hide} `}>
                                                    <li className={`nav-item ${styles.hamburger_navbar_item_submenu} `}><Link href="/" className="nav-link">صفحه اصلی</Link>
                                                    </li>

                                                    <li className={`nav-item ${styles.hamburger_navbar_item_submenu} `}><Link href="/" className="nav-link">صفحه محصول</Link>
                                                    </li>

                                                    <li className={`nav-item ${styles.hamburger_navbar_item_submenu} `}><Link href="/" className="nav-link">صفحه دسته بندی</Link>
                                                    </li>

                                                    <li className={`nav-item ${styles.hamburger_navbar_item_submenu} `}><Link href="/" className="nav-link">صفحه سبد خرید</Link>
                                                    </li>

                                                    <li className={`nav-item ${styles.hamburger_navbar_item_submenu} `}><Link href="/" className="nav-link">صفحه جستجو</Link>
                                                    </li>

                                                    <li className={`nav-item ${styles.hamburger_navbar_item_submenu} `}><Link href="/" className="nav-link">دسته بندی محصولات خطی</Link>
                                                    </li>

                                                    <li className={`nav-item ${styles.hamburger_navbar_item_submenu} `}><Link href="/" className="nav-link">صفحه 404</Link>
                                                    </li>

                                                    <li className={`nav-item ${styles.hamburger_navbar_item_submenu} `}><Link href="/" className="nav-link">صفحه ورود</Link>
                                                    </li>

                                                    <li className={`nav-item ${styles.hamburger_navbar_item_submenu} `}><Link href="/" className="nav-link">صفحه ثبت نامم</Link>
                                                    </li>

                                                    <li className={`nav-item ${styles.hamburger_navbar_item_submenu} `}><Link href="/" className="nav-link">صفحه فراموشی رمز عبور</Link>
                                                    </li>

                                                    <li className={`nav-item ${styles.hamburger_navbar_item_submenu} `}><Link href="/" className="nav-link">صفحه وبلاگ</Link>
                                                    </li>

                                                    <li className={`nav-item ${styles.hamburger_navbar_item_submenu} `}><Link href="/" className="nav-link">صفحه مقایسه محصول</Link>
                                                    </li>

                                                    <li className={`nav-item ${styles.hamburger_navbar_item_submenu} `}><Link href="/" className="nav-link">صفحه پرداخت مرحله ای</Link>
                                                    </li>

                                                    <li className={`nav-item ${styles.hamburger_navbar_item_submenu} `}><Link href="/" className="nav-link">پرداخت موفق</Link>
                                                    </li>

                                                    <li className={`nav-item ${styles.hamburger_navbar_item_submenu} `}><Link href="/" className="nav-link">صفحه پرداخت ناموفق</Link>
                                                    </li>

                                                    <li className={`nav-item ${styles.hamburger_navbar_item_submenu} `}><Link href="/" className="nav-link">محصول ناموجود</Link>
                                                    </li>

                                                    <li className={`nav-item ${styles.hamburger_navbar_item_submenu} `}><Link href="/" className="nav-link">سبد خرید خالی</Link>
                                                    </li>

                                                    <li className={`nav-item ${styles.hamburger_navbar_item_submenu} `}><Link href="/" className="nav-link">داشبورد کاربری</Link>
                                                    </li>

                                                    <li className={`nav-item ${styles.hamburger_navbar_item_submenu} `}><Link href="/" className="nav-link">سفارشات</Link>
                                                    </li>

                                                    <li className={`nav-item ${styles.hamburger_navbar_item_submenu} `}><Link href="/" className="nav-link">محصولات مورد علاقه</Link>
                                                    </li>

                                                    <li className={`nav-item ${styles.hamburger_navbar_item_submenu} `}><Link href="/" className="nav-link">اطلاعیه</Link>
                                                    </li>

                                                    <li className={`nav-item ${styles.hamburger_navbar_item_submenu} `}><Link href="/" className="nav-link">نفرات</Link>
                                                    </li>

                                                    <li className={`nav-item ${styles.hamburger_navbar_item_submenu} `}><Link href="/" className="nav-link">آدرس ها</Link>
                                                    </li>

                                                    <li className={`nav-item ${styles.hamburger_navbar_item_submenu} `}><Link href="/" className="nav-link">آخرین بازدید ها</Link>
                                                    </li>

                                                </ul>
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
                    <div className="d-lg-none d-block col-6 order-lg-5 order-2 ">
                        <div className='d-flex align-items-center justify-content-end'>
                            <a href="" className='btn btn-light shadow-sm no-highlight btn-lg btn-action-cart '>
                                <i className="bi bi-basket font-30"></i>
                                <span className={`${styles.header_cart_counter} main-color-one-bg d-inline-block rounded-pill`}>
                                    5
                                </span>
                            </a>
                            <div className={styles.avatar}
                                onClick={() => handleItemCheck(15)}
                            >
                                <Link href="/" role="button"
                                    className={`btn btn-white ${styles.header_register_icon} border-0 rounded-pill`}>
                                    <figure className={`${styles.avatar_figure}`}>
                                        <img src="/images/user.png" alt="mehdi_haghdoost" />
                                    </figure>
                                </Link>
                                <ul className={`navbar-nav ${activeSubMenu[15] ? styles.avatar_dropdown_show : styles.avatar_dropdown_hide} `}>
                                    <li><Link href="" className={styles.avatar_dropdown_item}><i className="bi bi-house-door"></i>پروفایل</Link>
                                    </li>
                                    <li><Link href="" className={styles.avatar_dropdown_item}><i className="bi bi-cart-check"></i>سفارش های
                                        من</Link></li>
                                    <li><Link href="" className={styles.avatar_dropdown_item}><i className="bi bi-pin-map"></i>آدرس های
                                        من</Link></li>
                                    <li><Link href="" className={styles.avatar_dropdown_item}><i className="bi bi-bell"></i>پیام ها و
                                        اطلاعیه ها</Link></li>
                                    <li><Link href="" className={styles.avatar_dropdown_item}><i className="bi bi-chat-dots"></i>نظرات
                                        من</Link></li>
                                    <li><Link href="" className={styles.avatar_dropdown_item}><i className="bi bi-question-circle"></i>درخواست
                                        پشتیبانی</Link></li>
                                    <li><Link href="" className={styles.avatar_dropdown_item}><i className="bi bi-heart"></i>محصولات مورد
                                        علاقه</Link></li>
                                    <li><Link href="" className={styles.avatar_dropdown_item}><i className="bi bi-gift"></i>کد های تخفیف
                                        من</Link></li>
                                    <li><Link href="" className={styles.avatar_dropdown_item}><i
                                        className="bi bi-arrow-right-square"></i>خروج از حساب کاربری</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
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
                                <Link href='' >
                                    <i className='bi bi-shop font-20 text-muted me-1'></i>
                                    <span className={`main-color-one-bg ${styles.header_counter} rounded-pill`}>5</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                    {/* end auth */}
                </div>

                {/* mega-menu-start */}
                <div className={`${styles.mega_menu} d-lg-block d-none`}>
                    <div className="container-fluid">
                        <div>
                            <div className={styles.header_mega_menu}>
                                <div className="col-lg-9">
                                    <div className="top-menu-menu">
                                        <ul className={styles.mega_menu_navbar}>
                                            {/* <li className="position-relative m-0"></li> */}
                                            <li className="nav-item main-menu-head">
                                                <a href=""
                                                    className={`${styles.mega_menu_category_button} nav-link btn `}>
                                                    <i className="bi bi-list">                                                    </i>
                                                    دسته بندی کالاها
                                                </a>
                                                {/* <ul className="main-menu mega-container">
                                                    <li className="main-menu-sub-active-li"><a href=""><i className="bi bi-phone"></i>
                                                        موبایل</a>
                                                        <ul className="main-menu-sub back-menu"
                                                        >
                                                            <li><a className="title my-flex-baseline" href="">برند های مختلف گوشی</a>
                                                            </li>
                                                            <li><a href="">گوشی اپل</a></li>
                                                            <li><a href="">گوشی سامسونگ</a></li>
                                                            <li><a href="">گوشی شیائومی</a></li>
                                                            <li><a href="">گوشی بلک بری</a></li>
                                                            <li><a href="">گوشی ایرانی</a></li>
                                                            <li><a className="title my-flex-baseline" href="">گوشی بر اساس قیمت</a></li>
                                                            <li><a href="">گوشی تا 2 میلیون</a></li>
                                                            <li><a href="">گوشی تا 5 میلیون</a></li>
                                                            <li><a href="">گوشی تا 10 میلیون</a></li>
                                                            <li><a href="">گوشی تا 12 میلیون</a></li>
                                                            <li><a href="">گوشی تا 15 میلیون</a></li>
                                                            <li><a className="title my-flex-baseline" href="">گوشی براساس حافظه
                                                                داخلی</a></li>
                                                            <li><a href="">گوشی تا 16 گیگابایت</a></li>
                                                            <li><a href="">گوشی تا 32 گیگابایت</a></li>
                                                            <li><a href="">گوشی تا 64 گیگابایت</a></li>
                                                            <li><a href="">گوشی تا 128 گیگابایت</a></li>
                                                            <li><a href="">گوشی تا 256 گیگابایت</a></li>
                                                            <li><a href="">گوشی تا 512 گیگابایت</a></li>
                                                            <li><a href="">گوشی تا 1 ترابایت</a></li>
                                                            <li><a className="title my-flex-baseline" href="">گوشی براساس کاربری</a>
                                                            </li>
                                                            <li><a href="">گوشی اقتصادی</a></li>
                                                            <li><a href="">گوشی دانش آموزی</a></li>
                                                            <li><a href="">گوشی لاکچری</a></li>
                                                            <li><a href="">گوشی پرچمدار</a></li>
                                                        </ul>
                                                    </li>
                                                    <li><a href=""><i className="bi bi-tablet"></i> تبلت</a>
                                                        <ul className="main-menu-sub back-menu"
                                                        >
                                                            <li><a className="title my-flex-baseline" href="">برند های مختلف تبلت</a>
                                                            </li>
                                                            <li><a href="">تبلت اپل</a></li>
                                                            <li><a href="">تبلت سامسونگ</a></li>
                                                            <li><a href="">تبلت شیائومی</a></li>
                                                            <li><a href="">تبلت بلک بری</a></li>
                                                            <li><a href="">تبلت ایرانی</a></li>
                                                            <li><a className="title my-flex-baseline" href="">تبلت بر اساس قیمت</a></li>
                                                            <li><a href="">تبلت تا 2 میلیون</a></li>
                                                            <li><a href="">تبلت تا 5 میلیون</a></li>
                                                            <li><a href="">تبلت تا 10 میلیون</a></li>
                                                            <li><a href="">تبلت تا 12 میلیون</a></li>
                                                            <li><a href="">تبلت تا 15 میلیون</a></li>
                                                            <li><a className="title my-flex-baseline" href="">تبلت براساس حافظه
                                                                داخلی</a></li>
                                                            <li><a href="">تبلت تا 16 گیگابایت</a></li>
                                                            <li><a href="">تبلت تا 32 گیگابایت</a></li>
                                                            <li><a href="">تبلت تا 64 گیگابایت</a></li>
                                                            <li><a href="">تبلت تا 128 گیگابایت</a></li>
                                                            <li><a href="">تبلت تا 256 گیگابایت</a></li>
                                                            <li><a href="">تبلت تا 512 گیگابایت</a></li>
                                                            <li><a href="">تبلت تا 1 ترابایت</a></li>
                                                            <li><a className="title my-flex-baseline" href="">تبلت براساس کاربری</a>
                                                            </li>
                                                            <li><a href="">گتبلتوشی اقتصادی</a></li>
                                                            <li><a href="">تبلت دانش آموزی</a></li>
                                                            <li><a href="">تبلت لاکچری</a></li>
                                                            <li><a href="">تبلت پرچمدار</a></li>
                                                        </ul>
                                                    </li>
                                                    <li><a href=""><i className="bi bi-shield"></i>آنتی ویروس</a>
                                                        <ul className="main-menu-sub back-menu"
                                                        >
                                                            <li><a className="title my-flex-baseline" href="">براساس برند</a></li>
                                                            <li><a href="">نود 32</a></li>
                                                            <li><a href="">کسپر اسکای</a></li>
                                                            <li><a href="">360 سکوریتی</a></li>
                                                            <li><a href="">بیت دیفیندر</a></li>
                                                            <li><a href="">ایمن</a></li>
                                                            <li><a className="title my-flex-baseline" href="">براساس ویندوز</a></li>
                                                            <li><a href="">ویندوز 7</a></li>
                                                            <li><a href="">ویندوز 8</a></li>
                                                            <li><a href="">ویندوز 8.1</a></li>
                                                            <li><a href="">ویندوز 10</a></li>
                                                            <li><a href="">ویندوز 11</a></li>
                                                            <li><a className="title my-flex-baseline" href="">براساس برند</a></li>
                                                            <li><a href="">نود 32</a></li>
                                                            <li><a href="">کسپر اسکای</a></li>
                                                            <li><a href="">360 سکوریتی</a></li>
                                                            <li><a href="">بیت دیفیندر</a></li>
                                                            <li><a href="">ایمن</a></li>
                                                        </ul>
                                                    </li>
                                                    <li><a href=""><i className="bi bi-laptop"></i>لبتاپ</a>
                                                        <ul className="main-menu-sub back-menu"
                                                        >
                                                            <li><a className="title my-flex-baseline" href="">برند های مختلف لبتاپ</a>
                                                            </li>
                                                            <li><a href="">لبتاپ اپل</a></li>
                                                            <li><a href="">لبتاپ سامسونگ</a></li>
                                                            <li><a href="">لبتاپ شیائومی</a></li>
                                                            <li><a href="">لبتاپ بلک بری</a></li>
                                                            <li><a href="">لبتاپ ایرانی</a></li>
                                                            <li><a className="title my-flex-baseline" href="">لبتاپ بر اساس قیمت</a>
                                                            </li>
                                                            <li><a href="">لبتاپ تا 2 میلیون</a></li>
                                                            <li><a href="">لبتاپ تا 5 میلیون</a></li>
                                                            <li><a href="">لبتاپ تا 10 میلیون</a></li>
                                                            <li><a href="">لبتاپ تا 12 میلیون</a></li>
                                                            <li><a href="">لبتاپ تا 15 میلیون</a></li>
                                                            <li><a className="title my-flex-baseline" href="">لبتاپ براساس حافظه
                                                                داخلی</a></li>
                                                            <li><a href="">لبتاپ تا 16 گیگابایت</a></li>
                                                            <li><a href="">لبتاپ تا 32 گیگابایت</a></li>
                                                            <li><a href="">لبتاپ تا 64 گیگابایت</a></li>
                                                            <li><a href="">لبتاپ تا 128 گیگابایت</a></li>
                                                            <li><a href="">لبتاپ تا 256 گیگابایت</a></li>
                                                            <li><a href="">لبتاپ تا 512 گیگابایت</a></li>
                                                            <li><a href="">لبتاپ تا 1 ترابایت</a></li>
                                                            <li><a className="title my-flex-baseline" href="">لبتاپ براساس کاربری</a>
                                                            </li>
                                                            <li><a href="">لبتاپ اقتصادی</a></li>
                                                            <li><a href="">لبتاپ دانش آموزی</a></li>
                                                            <li><a href="">لبتاپ لاکچری</a></li>
                                                            <li><a href="">لبتاپ پرچمدار</a></li>
                                                        </ul>
                                                    </li>
                                                    <li><a href=""><i className="bi bi-tag"></i>پر فروش ترین ها</a>
                                                        <ul className="main-menu-sub back-menu"
                                                        >
                                                            <li><a className="title my-flex-baseline" href="">زیر منو شماره 1 </a></li>
                                                            <li><a href="">زیر منو شماره 1</a></li>
                                                            <li><a href="">زیر منو شماره 1</a></li>
                                                            <li><a href="">زیر منو شماره 1</a></li>
                                                            <li><a href="">زیر منو شماره 1</a></li>
                                                            <li><a href="">زیر منو شماره 1</a></li>
                                                            <li><a className="title my-flex-baseline" href="">زیر منو شماره 1 </a></li>
                                                            <li><a href="">زیر منو شماره 1</a></li>
                                                            <li><a href="">زیر منو شماره 1</a></li>
                                                            <li><a href="">زیر منو شماره 1</a></li>
                                                            <li><a href="">زیر منو شماره 1</a></li>
                                                            <li><a href="">زیر منو شماره 1</a></li>
                                                            <li><a href="">زیر منو شماره 1</a></li>
                                                            <li><a className="title my-flex-baseline" href="">زیر منو شماره 1 </a></li>
                                                            <li><a href="">زیر منو شماره 1</a></li>
                                                            <li><a href="">زیر منو شماره 1</a></li>
                                                            <li><a href="">زیر منو شماره 1</a></li>
                                                            <li><a href="">زیر منو شماره 1</a></li>
                                                            <li><a href="">زیر منو شماره 1</a></li>
                                                            <li><a href="">زیر منو شماره 1</a></li>
                                                            <li><a className="title my-flex-baseline" href="">زیر منو شماره 1 </a></li>
                                                            <li><a href="">زیر منو شماره 1</a></li>
                                                            <li><a href="">زیر منو شماره 1</a></li>
                                                            <li><a href="">زیر منو شماره 1</a></li>
                                                        </ul>
                                                    </li>
                                                </ul> */}
                                            </li>
                                            <li className="nav-item"><a href="" className="nav-link border-animate fromCenter">
                                                <i className="bi bi-tablet"></i>
                                                <span>منو</span>
                                            </a>
                                                {/* <ul className="list-unstyled shadow-lg back-menu sub-menu mega-container"
                                                >
                                                    <li><a href="" className="title">بـرند</a></li>
                                                    <li><a href="">سامـسونگ</a></li>
                                                    <li><a href="">اپـل</a></li>
                                                    <li><a href="">شیـائومی</a></li>
                                                    <li><a href="">ال جی</a></li>
                                                    <li><a href="">وان پـلاس</a></li>
                                                    <li><a href="">جی ال ایـکس</a></li>
                                                    <li><a href="">هـو آوی</a></li>
                                                    <li><a href="">بلک بـری</a></li>
                                                    <li><a href="">توشـیبا</a></li>
                                                    <li><a href="">دایـناکورد</a></li>
                                                    <li><a href="" className="title">براساس رده بندی </a>
                                                    </li>
                                                    <li><a href="">دکـمه ای</a></li>
                                                    <li><a href="">لـمسـی</a></li>
                                                    <li><a href="">نـظـامی</a></li>
                                                    <li><a href="">ضـد آب</a></li>
                                                    <li><a href="">مسـافرتی</a></li>
                                                    <li><a href="">خـارنی</a></li>
                                                    <li><a href="" className="title">براساس کشور </a></li>
                                                    <li><a href="">ایران</a></li>
                                                    <li><a href="">ژاپن</a></li>
                                                    <li><a href="">فرانسه</a></li>
                                                    <li><a href="">کره جنوبی</a></li>
                                                    <li><a href="">آمریکا</a></li>
                                                    <li><a href="">سوئد</a></li>
                                                    <li><a href="">تایوان</a></li>
                                                    <li><a href="" className="title">براساس رنگ</a></li>
                                                    <li><a href="">قرمز</a></li>
                                                    <li><a href="">قهوه ای</a></li>
                                                    <li><a href="">سبز</a></li>
                                                    <li><a href="">بنفش</a></li>
                                                    <li><a href="">نارنجی</a></li>
                                                    <li><a href="">نیلی</a></li>
                                                </ul> */}
                                            </li>
                                            <li className="nav-item">
                                                <a href="" className="nav-link border-animate fromCenter">

                                                    <i
                                                        className="bi bi-menu-app">
                                                    </i>
                                                    <span>منو ساده</span>
                                                </a>
                                                {/* <ul className="level-one">
                                                    <li><a href="">منو شماره 1</a></li>
                                                    <li><a href="">منو شماره 2</a></li>
                                                    <li className="position-relative"><a href="">منو شماره 3 <i
                                                        className="bi bi-chevron-left"></i></a>
                                                        <ul className="level-two">
                                                            <li><a href="">زیر منو شماره 1</a></li>
                                                            <li><a href="">2 زیر منو شماره </a></li>
                                                            <li><a href="">3 زیر منو شماره </a></li>
                                                        </ul>
                                                    </li>
                                                    <li><a href="">منو شماره 4</a></li>
                                                    <li><a href="">منو شماره 5</a></li>
                                                    <li><a href="">منو شماره 6</a></li>
                                                </ul> */}
                                            </li>
                                            <li className="nav-item">
                                                <a href="" className="nav-link border-animate fromCenter">
                                                    <i
                                                        className="bi bi-tag">

                                                    </i>
                                                    تخفیف ها و پیشنهاد ها</a>
                                            </li>
                                            <li className="nav-item"><a href="" className="nav-link border-animate fromCenter">سوالی
                                                دارید</a>
                                            </li>
                                            <li className="nav-item"><a href="" className="nav-link border-animate fromCenter">در نسیم استور
                                                بفروشید</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="d-flex align-items-center justify-content-end">
                                        <a href=""
                                            className={` ${styles.mega_menu_contact} main-color-three-bg btn border-0 d-flex align-items-center rounded-pill ms-3`}>09211367465
                                            <i className="bi bi-whatsapp text-white"></i>
                                        </a>
                                        <a href=""
                                            className={` ${styles.mega_menu_contact} main-color-two-bg btn border-0 d-flex align-items-center  rounded-pill`}>09211367465<i
                                                className="bi bi-telephone-fill ms-2 text-white"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* mega-mebu-end */}

            </div>
        </header>
    )
}

export default Header