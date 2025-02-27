import React from 'react'
import styles from './MegaMenu.module.css'
import { useState, useEffect } from 'react';

function MegaMenu() {

    const [fixedTop, setFixedTop] = useState(false)

    useEffect(() => {
        const fixedNavbarToTop = () => {
            const currentScroll = window.pageYOffset

            if (currentScroll > 150) {
                setFixedTop(true)
            } else {
                setFixedTop(false)
            }
        }
        window.addEventListener('scroll', fixedNavbarToTop)
        return () => window.removeEventListener('scroll', fixedNavbarToTop)
    }, [])

    return (
        <div className={`${styles.mega_menu} d-lg-block d-none`}>
            <div className="container-fluid">
                <div className={`${fixedTop ? styles.navbar_fixed : ''}`}>
                    <div className={styles.header_mega_menu}>
                        <div className="col-lg-9">
                            <nav className="navbar navbar-expand-lg navbar-light">
                                <div className="container-fluid">
                                    <ul className={`navbar-nav ${styles.mega_menu_navbar}`}>
                                        <li className="nav-item">
                                            <a className={`nav-link ${styles.mega_menu_category_button} dropdown-item`} href="" id="hoveredMenu1" role="button" data-bs-toggle="dropdown"
                                                aria-expanded="false">

                                                <i className="bi bi-list"></i>
                                                دسته بندی کالاها
                                            </a>
                                            <ul
                                                className={`dropdown-menu ${styles.main_menu_active}`} aria-labelledby="hoveredMenu2">
                                                <li className={`${styles.main_menu_sub} nav-item dropdown`}>
                                                    <a className="dropdown-ite" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
                                                        aria-expanded="false">
                                                        <i className="bi bi-phone"></i>
                                                        <span>کالاهای دیجیتال و گجت‌ها</span>
                                                    </a>
                                                    <ul className="dropdown-menu " aria-labelledby="navbarDropdown"
                                                    >
                                                        <div>
                                                            <li><a className={`${styles.main_menu_sub_title} dropdown-item`} href="">گوشی‌های هوشمند</a>
                                                            </li>
                                                            <li><a href="">گوشی اپل</a></li>
                                                            <li><a href="">گوشی سامسونگ</a></li>
                                                            <li><a href="">گوشی شیائومی</a></li>
                                                            <li><a href="">گوشی بلک بری</a></li>
                                                            <li><a href="">گوشی ایرانی</a></li>
                                                        </div>
                                                        <div>
                                                            <li><a className={`${styles.main_menu_sub_title} dropdown-item`} href="">لپ‌تاپ‌ها</a></li>
                                                            <li><a href="">لپ‌تاپ‌های گیمینگ</a></li>
                                                            <li><a href="">لپ‌تاپ‌های فوق‌باریک</a></li>
                                                            <li><a href="">لپ‌تاپ‌های تجاری</a></li>
                                                            <li><a href="">لپ‌تاپ‌های اقتصادی</a></li>
                                                            <li><a href="">لپ‌تاپ‌های دانشجویی</a></li>
                                                        </div>
                                                        <div>
                                                            <li><a className={`${styles.main_menu_sub_title} dropdown-item`} href=""> تبلت‌ها </a></li>
                                                            <li><a href="">تبلت‌های رده‌بالا</a></li>
                                                            <li><a href="">تبلت‌های استاندارد</a></li>
                                                            <li><a href="">تبلت‌های کودکان</a></li>
                                                            <li><a href="">تبلت‌های اقتصادی</a></li>
                                                            <li><a href="">تبلت‌های چندرسانه‌ای</a></li>
                                                            <li><a href="">تبلت‌های مقاوم</a></li>
                                                            <li><a href="">تبلت‌های تاشو</a></li>
                                                        </div>
                                                        <div>
                                                            <li><a className={`${styles.main_menu_sub_title} dropdown-item`} href=""> هدفون و اسپیکر</a></li>
                                                            <li><a href=""> هدفون‌های بی‌سیم</a></li>
                                                            <li><a href=""> هدفون‌های دورگوشی</a></li>
                                                            <li><a href=""> اسپیکرهای بلوتوثی</a></li>
                                                            <li><a href=""> هدست‌های گیمینگ</a></li>
                                                        </div>
                                                    </ul>
                                                </li>
                                                <li className={`${styles.main_menu_sub} nav-item dropdown`}>
                                                    <a className="dropdown-item" href="#" id="navbarDropdown2" role="button" data-bs-toggle="dropdown"
                                                        aria-expanded="false">
                                                        <i className="bi bi-tablet"></i>
                                                        <span>
                                                            ساعت‌های هوشمند و پوشیدنی‌ها
                                                        </span>
                                                    </a>
                                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown2">
                                                        <div>
                                                            <li><a className={`${styles.main_menu_sub_title} dropdown-item`} href="">ساعت‌های هوشمند رده‌بالا</a>
                                                            </li>
                                                            <li><a href="">ساعت‌های هوشمند لوکس</a></li>
                                                            <li><a href="">ساعت‌های هوشمند پرقدرت</a></li>
                                                            <li><a href="">ساعت‌های هوشمند ماجراجویی</a></li>
                                                            <li><a href="">ساعت‌های هوشمند مد و فناوری</a></li>
                                                            <li><a href="">ساعت‌های لوکس متصل</a></li>
                                                        </div>
                                                        <div>
                                                            <li><a className={`${styles.main_menu_sub_title} dropdown-item`} href="">ساعت‌های هوشمند تناسب‌اندام</a></li>
                                                            <li><a href="">ساعت‌های هوشمند دویدن</a></li>
                                                            <li><a href="">ساعت‌های هوشمند دوچرخه‌سواری</a></li>
                                                            <li><a href="">ساعت‌های هوشمند تمرینات بدنسازی</a></li>
                                                            <li><a href="">ساعت‌های هوشمند چندمنظوره</a></li>
                                                            <li><a href="">ساعت‌های هوشمند تمرکز روی سلامت</a></li>
                                                        </div>
                                                        <div>
                                                            <li><a className={`${styles.main_menu_sub_title} dropdown-item`} href="">ردیاب‌های سلامتی پوشیدنی</a></li>
                                                            <li><a href="">ردیاب‌های خواب</a></li>
                                                            <li><a href="">ردیاب‌های ضربان قلب</a></li>
                                                            <li><a href="">ردیاب‌های استرس و سلامت کلی</a></li>
                                                            <li><a href="">ردیاب‌های اکسیژن خون</a></li>
                                                            <li><a href="">ردیاب‌های فعالیت برای سالمندان</a></li>
                                                        </div>
                                                        <div>
                                                            <li><a className={`${styles.main_menu_sub_title} dropdown-item`} href="">ساعت‌های هوشمند هیبریدی</a>
                                                            </li>
                                                            <li><a href="">ساعت‌های هوشمند ترکیبی کلاسیک</a></li>
                                                            <li><a href="">ساعت‌های هوشمند ترکیبی لوکس</a></li>
                                                            <li><a href="">ساعت‌های هوشمند ترکیبی ماجراجویی</a></li>
                                                            <li><a href="">ساعت‌های هوشمند ترکیبی مد</a></li>
                                                        </div>
                                                    </ul>
                                                </li>
                                                <li className={`${styles.main_menu_sub} nav-item dropdown`}>
                                                    <a className="dropdown-item" href="#" id="navbarDropdown3" role="button" data-bs-toggle="dropdown"
                                                        aria-expanded="false"
                                                    >
                                                        <i className="bi bi-shield"></i>
                                                        <span>
                                                            آنتی ویروس
                                                        </span>
                                                    </a>
                                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown3">
                                                        <div>
                                                            <li><a className={`${styles.main_menu_sub_title} dropdown-item`} href="">بر اساس برند</a>
                                                            </li>
                                                            <li><a href="">نود 32</a></li>
                                                            <li><a href="">کسپر اسکای </a></li>
                                                            <li><a href="">سکوریتی 360 </a></li>
                                                            <li><a href=""> بیت دیفندر</a></li>
                                                            <li><a href="">ایمن</a></li>
                                                        </div>
                                                        <div>
                                                            <li><a className={`${styles.main_menu_sub_title} dropdown-item`} href="">بر اساس ویندوز</a></li>
                                                            <li><a href="">ویندوز 7</a></li>
                                                            <li><a href="">ویندوز 8</a></li>
                                                            <li><a href="">ویندوز 8.1</a></li>
                                                            <li><a href="">ویندوز 10</a></li>
                                                            <li><a href="">ویندوز 11</a></li>
                                                        </div>
                                                    </ul>
                                                </li>
                                                <li className={`${styles.main_menu_sub} nav-item dropdown`}>
                                                    <a className="dropdown-item" href="#" id="navbarDropdown4" role="button" data-bs-toggle="dropdown"
                                                        aria-expanded="false">
                                                        <i className="bi bi-laptop"></i>
                                                        <span>
                                                            کنسول‌های بازی
                                                        </span>
                                                    </a>
                                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown4">
                                                        <div>
                                                            <li><a className={`${styles.main_menu_sub_title} dropdown-item`} href="">بر اساس برند</a>
                                                            </li>
                                                            <li><a href="">پلی‌استیشن</a></li>
                                                            <li><a href="">ایکس‌باکس </a></li>
                                                            <li><a href=""> نینتندو </a></li>
                                                            <li><a href=""> سگا</a></li>
                                                            <li><a href="">گیم استیک</a></li>
                                                        </div>
                                                        <div>
                                                            <li><a className={`${styles.main_menu_sub_title} dropdown-item`} href="">بر اساس قیمت</a></li>
                                                            <li><a href="">کنسول تا 20 میلیون</a></li>
                                                            <li><a href="">کنسول تا 35 میلیون</a></li>
                                                            <li><a href="">کنسول تا 40 میلیون</a></li>
                                                            <li><a href="">کنسول تا 45 میلیون</a></li>
                                                            <li><a href="">کنسول تا 70 میلیون</a></li>
                                                        </div>
                                                        <div>
                                                            <li><a className={`${styles.main_menu_sub_title} dropdown-item`} href="">بر اساس حافظه داخلی</a></li>
                                                            <li><a href=""> حافظه کم - زیر ۵۰ گیگابایت</a></li>
                                                            <li><a href=""> حافظه متوسط - ۵۰ تا ۲۵۰ گیگابایت</a></li>
                                                            <li><a href="">حافظه بالا - ۵۰۰ گیگابایت تا ۱ ترابایت </a></li>
                                                            <li><a href="">حافظه پیشرفته - بیش از ۱ ترابایت </a></li>
                                                            <li><a href="">بدون حافظه داخلی</a></li>
                                                        </div>
                                                        <div>
                                                            <li><a className={`${styles.main_menu_sub_title} dropdown-item`} href="">بر اساس کاربری</a></li>
                                                            <li><a href=""> نسول‌های خانگی</a></li>
                                                            <li><a href=""> کنسول‌های دستی</a></li>
                                                            <li><a href=""> کنسول‌های هیبریدی</a></li>
                                                            <li><a href=""> کنسول‌های مینی و کلاسیک</a></li>
                                                        </div>

                                                    </ul>
                                                </li>
                                                <li className={`${styles.main_menu_sub} nav-item dropdown`}>
                                                    <a className="dropdown-item" href="#" id="navbarDropdown5" role="button" data-bs-toggle="dropdown"
                                                        aria-expanded="false">
                                                        <i className="bi bi-tag"></i>
                                                        <span>
                                                            لوازم جانبی
                                                        </span>
                                                    </a>
                                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown5">
                                                        <div>
                                                            <li><a className={`${styles.main_menu_sub_title} dropdown-item`} href="">کنترلرها و تجهیزات ورودی  </a></li>
                                                            <li><a href="">دسته‌های بازی</a></li>
                                                            <li><a href="">فرمان و پدال مخصوص بازی‌های ریسینگ</a></li>
                                                            <li><a href="">دسته‌های آرکید</a></li>
                                                            <li><a href="">کنترلرهای ویژه بازی‌های VR</a></li>
                                                        </div>
                                                        <div>
                                                            <li><a className={`${styles.main_menu_sub_title} dropdown-item`} href="">تجهیزات صوتی و تصویری</a></li>
                                                            <li><a href="">هدست‌های گیمینگ</a></li>
                                                            <li><a href="">اسپیکرهای مخصوص گیمینگ</a></li>
                                                            <li><a href="">مانیتورها و تلویزیون‌های مخصوص بازی</a></li>
                                                            <li><a href="">عینک‌های VR</a></li>
                                                            <li><a href=""></a></li>
                                                        </div>
                                                        <div>
                                                            <li><a className={`${styles.main_menu_sub_title} dropdown-item`} href="">حافظه و تجهیزات ذخیره‌سازی</a></li>
                                                            <li><a href="">هاردهای اکسترنال و SSD</a></li>
                                                            <li><a href="">کارت‌های حافظه</a></li>
                                                            <li><a href="">داک‌های شارژ و پایه‌های نگهدارنده برای کنترلرها و کنسول</a></li>
                                                            <li><a href=""></a></li>
                                                            <li><a href=""></a></li>
                                                        </div>
                                                        <div>
                                                            <li><a className={`${styles.main_menu_sub_title} dropdown-item`} href="">لوازم شارژ و اتصال</a></li>
                                                            <li><a href="">شارژرهای سیمی</a></li>
                                                            <li><a href="">شارژرهای بی‌سیم</a></li>
                                                            <li><a href="">پاوربانک‌ها</a></li>
                                                            <li><a href="">داکینگ استیشن‌ها و هاب‌ها</a></li>
                                                            <li><a href="">شارژرها و آداپتورهای خودروs</a></li>
                                                        </div>
                                                    </ul>
                                                </li>

                                            </ul>
                                        </li>
                                        <li className="nav-item" >
                                            <a className={`nav-link ${styles.mega_menu_nav_link} dropdown-item`} href="#" id="hoveredMenu2" role="button" data-bs-toggle="dropdown"
                                                aria-expanded="false">
                                                <i className="bi bi-tablet"></i>
                                                <span className={`${styles.border_animate}`}>منو</span>
                                            </a>
                                            <ul className={` ${styles.main_menu_sub_list_second_active}`} aria-labelledby="hoveredMenu2">
                                                <div>
                                                    <li className={styles.main_menu_sub_list_item}><a href="" className={`${styles.main_menu_sub_title} dropdown-item`}>بـرند</a></li>
                                                    <li className={styles.main_menu_sub_list_item}><a className="dropdown-item" href="">سامـسونگ</a></li>
                                                    <li className={styles.main_menu_sub_list_item}><a className="dropdown-item" href="">اپـل</a></li>
                                                    <li className={styles.main_menu_sub_list_item}><a className="dropdown-item" href="">شیـائومی</a></li>
                                                    <li className={styles.main_menu_sub_list_item}><a className="dropdown-item" href="">ال جی</a></li>
                                                    <li className={styles.main_menu_sub_list_item}><a className="dropdown-item" href="">وان پـلاس</a></li>
                                                    <li className={styles.main_menu_sub_list_item}><a className="dropdown-item" href="">جی ال ایـکس</a></li>
                                                    <li className={styles.main_menu_sub_list_item}><a className="dropdown-item" href="">هـو آوی</a></li>
                                                    <li className={styles.main_menu_sub_list_item}><a className="dropdown-item" href="">بلک بـری</a></li>
                                                    <li className={styles.main_menu_sub_list_item}><a className="dropdown-item" href="">توشـیبا</a></li>
                                                    <li className={styles.main_menu_sub_list_item}><a className="dropdown-item" href="">دایـناکورد</a></li>
                                                </div>
                                                <div>
                                                    <li className={styles.main_menu_sub_list_item}><a href="" className={styles.main_menu_sub_title}>براساس رده بندی </a>
                                                    </li>
                                                    <li className={styles.main_menu_sub_list_item}><a className="dropdown-item" href="">دکـمه ای</a></li>
                                                    <li className={styles.main_menu_sub_list_item}><a className="dropdown-item" href="">لـمسـی</a></li>
                                                    <li className={styles.main_menu_sub_list_item}><a className="dropdown-item" href="">نـظـامی</a></li>
                                                    <li className={styles.main_menu_sub_list_item}><a className="dropdown-item" href="">ضـد آب</a></li>
                                                    <li className={styles.main_menu_sub_list_item}><a className="dropdown-item" href="">مسـافرتی</a></li>
                                                    <li className={styles.main_menu_sub_list_item}><a className="dropdown-item" href="">خـارنی</a></li>
                                                </div>
                                                <div>
                                                    <li className={styles.main_menu_sub_list_item}><a className={` ${styles.main_menu_sub_title} dropdown-item`} href="" >براساس کشور </a></li>
                                                    <li className={styles.main_menu_sub_list_item}><a className="dropdown-item" href="">ایران</a></li>
                                                    <li className={styles.main_menu_sub_list_item}><a className="dropdown-item" href="">ژاپن</a></li>
                                                    <li className={styles.main_menu_sub_list_item}><a className="dropdown-item" href="">فرانسه</a></li>
                                                    <li className={styles.main_menu_sub_list_item}><a className="dropdown-item" href="">کره جنوبی</a></li>
                                                    <li className={styles.main_menu_sub_list_item}><a className="dropdown-item" href="">آمریکا</a></li>
                                                    <li className={styles.main_menu_sub_list_item}><a className="dropdown-item" href="">سوئد</a></li>
                                                    <li className={styles.main_menu_sub_list_item}><a className="dropdown-item" href="">تایوان</a></li>
                                                </div>
                                                <div>
                                                    <li className={styles.main_menu_sub_list_item}><a className={` ${styles.main_menu_sub_title} dropdown-item`}>براساس رنگ</a></li>
                                                    <li className={styles.main_menu_sub_list_item}><a className="dropdown-item" href="">قرمز</a></li>
                                                    <li className={styles.main_menu_sub_list_item}><a className="dropdown-item" href="">قهوه ای</a></li>
                                                    <li className={styles.main_menu_sub_list_item}><a className="dropdown-item" href="">سبز</a></li>
                                                    <li className={styles.main_menu_sub_list_item}><a className="dropdown-item" href="">بنفش</a></li>
                                                    <li className={styles.main_menu_sub_list_item}><a className="dropdown-item" href="">نارنجی</a></li>
                                                    <li className={styles.main_menu_sub_list_item}><a className="dropdown-item" href="">نیلی</a></li>
                                                </div>
                                            </ul>
                                        </li>
                                        <li className="nav-item" >
                                            <a className={`nav-link ${styles.mega_menu_nav_link} dropdown-item border-animate`} href="#" id="hoveredMenu3" role="button" data-bs-toggle="dropdown"
                                                aria-expanded="false">
                                                <i className="bi bi-menu-app"></i>
                                                <span className={`${styles.border_animate}`}>منو ساده</span>
                                            </a>
                                            <ul
                                                aria-labelledby="hoveredMenu3"
                                                className={`${styles.main_menu_sub_list_third_active}`}
                                            >
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
                                            </ul>
                                        </li>
                                        <li className="nav-item">
                                            <a href="" className={`nav-link ${styles.border_animate} fromCenter`}>
                                                <i
                                                    className="bi bi-tag">

                                                </i>
                                                تخفیف ها و پیشنهاد ها</a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="" className={`nav-link ${styles.border_animate} fromCenter`}>سوالی
                                                دارید</a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="" className={`nav-link ${styles.border_animate} fromCenter`}>در نسیم استور
                                                بفروشید</a>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
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
    )
}

export default MegaMenu