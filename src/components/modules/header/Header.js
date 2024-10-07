"use client";
import React, { useState } from 'react'
import Link from 'next/link'
import styles from './Header.module.css'
import MegaMenu from './MegaMenu';
import AuthHeader from './AuthHeader';

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
            <nav className={`container-fluid`}>
                <div className={`row align-items-center`}>
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
                    <AuthHeader />
                    {/* end auth */}
                </div>

                {/* mega-menu-start */}
                <MegaMenu />
                {/* mega-mebu-end */}

            </nav>
        </header>
    )
}

export default Header