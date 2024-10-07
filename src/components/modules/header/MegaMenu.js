import React from 'react'
import styles from './MegaMenu.module.css'
import { useState,useEffect } from 'react';

function MegaMenu() {

    const [fixedTop,setFixedTop] = useState(false)

    useEffect(() => {
        const fixedNavbarToTop = () => {
            const currentScroll = window.pageYOffset
           
            if(currentScroll >150) {
                setFixedTop(true)
            } else {
                setFixedTop(false)
            }
        }
        window.addEventListener('scroll',fixedNavbarToTop)
        return () => window.removeEventListener('scroll',fixedNavbarToTop)
    },[])

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
                                                        className={`dropdown-menu ${ styles.main_menu_active }`} aria-labelledby="hoveredMenu2">
                                                        <li className={`${styles.main_menu_sub} nav-item dropdown`}>
                                                            <a className="dropdown-ite" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
                                                                aria-expanded="false">
                                                                <i className="bi bi-phone"></i>
                                                                <span>موبایل</span>
                                                            </a>
                                                            <ul className="dropdown-menu " aria-labelledby="navbarDropdown"
                                                            >
                                                                <div>
                                                                    <li><a className={`${styles.main_menu_sub_title} dropdown-item`} href="">برند های مختلف گوشی</a>
                                                                    </li>
                                                                    <li><a href="">گوشی اپل</a></li>
                                                                    <li><a href="">گوشی سامسونگ</a></li>
                                                                    <li><a href="">گوشی شیائومی</a></li>
                                                                    <li><a href="">گوشی بلک بری</a></li>
                                                                    <li><a href="">گوشی ایرانی</a></li>
                                                                </div>
                                                                <div>
                                                                    <li><a className={`${styles.main_menu_sub_title} dropdown-item`} href="">گوشی بر اساس قیمت</a></li>
                                                                    <li><a href="">گوشی تا 2 میلیون</a></li>
                                                                    <li><a href="">گوشی تا 5 میلیون</a></li>
                                                                    <li><a href="">گوشی تا 10 میلیون</a></li>
                                                                    <li><a href="">گوشی تا 12 میلیون</a></li>
                                                                    <li><a href="">گوشی تا 15 میلیون</a></li>
                                                                </div>
                                                                <div>
                                                                    <li><a className={`${styles.main_menu_sub_title} dropdown-item`} href="">گوشی براساس حافظه
                                                                        داخلی</a></li>
                                                                    <li><a href="">گوشی تا 16 گیگابایت</a></li>
                                                                    <li><a href="">گوشی تا 32 گیگابایت</a></li>
                                                                    <li><a href="">گوشی تا 64 گیگابایت</a></li>
                                                                    <li><a href="">گوشی تا 128 گیگابایت</a></li>
                                                                    <li><a href="">گوشی تا 256 گیگابایت</a></li>
                                                                    <li><a href="">گوشی تا 512 گیگابایت</a></li>
                                                                    <li><a href="">گوشی تا 1 ترابایت</a></li>
                                                                </div>
                                                                <div>
                                                                    <li><a className={`${styles.main_menu_sub_title} dropdown-item`} href="">گوشی براساس کاربری</a>
                                                                    </li>
                                                                    <li><a href="">گوشی اقتصادی</a></li>
                                                                    <li><a href="">گوشی دانش آموزی</a></li>
                                                                    <li><a href="">گوشی لاکچری</a></li>
                                                                    <li><a href="">گوشی پرچمدار</a></li>
                                                                </div>
                                                            </ul>
                                                        </li>
                                                        <li className={`${styles.main_menu_sub} nav-item dropdown`}>
                                                            <a className="dropdown-item" href="#" id="navbarDropdown2" role="button" data-bs-toggle="dropdown"
                                                                aria-expanded="false">
                                                                <i className="bi bi-tablet"></i>
                                                                <span>
                                                                    تبلت
                                                                </span>
                                                            </a>
                                                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown2">
                                                                <div>
                                                                    <li><a className={`${styles.main_menu_sub_title} dropdown-item`} href="">برند های مختلف تبلت</a>
                                                                    </li>
                                                                    <li><a href="">تبلت اپل</a></li>
                                                                    <li><a href="">تبلت سامسونگ</a></li>
                                                                    <li><a href="">تبلت شیائومی</a></li>
                                                                    <li><a href="">تبلت بلک بری</a></li>
                                                                    <li><a href="">تبلت ایرانی</a></li>
                                                                </div>
                                                                <div>
                                                                    <li><a className={`${styles.main_menu_sub_title} dropdown-item`} href="">تبلت بر اساس قیمت</a></li>
                                                                    <li><a href="">تبلت تا 2 میلیون</a></li>
                                                                    <li><a href="">تبلت تا 5 میلیون</a></li>
                                                                    <li><a href="">تبلت تا 10 میلیون</a></li>
                                                                    <li><a href="">تبلت تا 12 میلیون</a></li>
                                                                    <li><a href="">تبلت تا 15 میلیون</a></li>
                                                                </div>
                                                                <div>
                                                                    <li><a className={`${styles.main_menu_sub_title} dropdown-item`} href="">تبلت براساس حافظه
                                                                        داخلی</a></li>
                                                                    <li><a href="">تبلت تا 16 گیگابایت</a></li>
                                                                    <li><a href="">تبلت تا 32 گیگابایت</a></li>
                                                                    <li><a href="">تبلت تا 64 گیگابایت</a></li>
                                                                    <li><a href="">تبلت تا 128 گیگابایت</a></li>
                                                                    <li><a href="">تبلت تا 256 گیگابایت</a></li>
                                                                    <li><a href="">تبلت تا 512 گیگابایت</a></li>
                                                                    <li><a href="">تبلت تا 1 ترابایت</a></li>
                                                                </div>
                                                                <div>
                                                                    <li><a className={`${styles.main_menu_sub_title} dropdown-item`} href="">تبلت براساس کاربری</a>
                                                                    </li>
                                                                    <li><a href="">تبلت اقتصادی</a></li>
                                                                    <li><a href="">تبلت دانش آموزی</a></li>
                                                                    <li><a href="">تبلت لاکچری</a></li>
                                                                    <li><a href="">تبلت پرچمدار</a></li>
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
                                                                    لپتاپ
                                                                </span>
                                                            </a>
                                                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown4">
                                                                <div>
                                                                    <li><a className={`${styles.main_menu_sub_title} dropdown-item`} href="">بر اساس برند</a>
                                                                    </li>
                                                                    <li><a href="">لپتاپ اپل</a></li>
                                                                    <li><a href="">لپتاپ سامسونگ </a></li>
                                                                    <li><a href=""> لپتاپ شیائومی </a></li>
                                                                    <li><a href=""> لپتاپ بلک بری</a></li>
                                                                    <li><a href="">لپتاپ ایرانی</a></li>
                                                                </div>
                                                                <div>
                                                                    <li><a className={`${styles.main_menu_sub_title} dropdown-item`} href="">بر اساس قیمت</a></li>
                                                                    <li><a href="">لپتاپ تا 2 میلیون</a></li>
                                                                    <li><a href="">لپتاپ تا 5 میلیون</a></li>
                                                                    <li><a href="">لپتاپ تا 10 میلیون</a></li>
                                                                    <li><a href="">لپتاپ تا 12 میلیون</a></li>
                                                                    <li><a href="">لپتاپ تا 15 میلیون</a></li>
                                                                </div>
                                                                <div>
                                                                    <li><a className={`${styles.main_menu_sub_title} dropdown-item`} href="">بر اساس حافظه داخلی</a></li>
                                                                    <li><a href="">لبتاپ تا 16 گیگابایت</a></li>
                                                                    <li><a href="">لبتاپ تا 32 گیگابایت</a></li>
                                                                    <li><a href="">لبتاپ تا 64 گیگابایت</a></li>
                                                                    <li><a href="">لبتاپ تا 128 گیگابایت</a></li>
                                                                    <li><a href="">لبتاپ تا 256 گیگابایت</a></li>
                                                                    <li><a href="">لبتاپ تا 512 گیگابایت</a></li>
                                                                    <li><a href="">لبتاپ تا 1 ترابایت</a></li>
                                                                </div>
                                                                <div>
                                                                    <li><a className={`${styles.main_menu_sub_title} dropdown-item`} href="">بر اساس کاربری</a></li>
                                                                    <li><a href="">لبتاپ اقتصادی</a></li>
                                                                    <li><a href="">لبتاپ دانش آموزی</a></li>
                                                                    <li><a href="">لبتاپ لاکچری</a></li>
                                                                    <li><a href="">لبتاپ پرچمدار</a></li>
                                                                </div>

                                                            </ul>
                                                        </li>
                                                        <li className={`${styles.main_menu_sub} nav-item dropdown`}>
                                                            <a className="dropdown-item" href="#" id="navbarDropdown5" role="button" data-bs-toggle="dropdown"
                                                                aria-expanded="false">
                                                                <i className="bi bi-tag"></i>
                                                                <span>
                                                                    پرفروش ترین ها
                                                                </span>
                                                            </a>
                                                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown5">
                                                                <div>
                                                                    <li><a className={`${styles.main_menu_sub_title} dropdown-item`} href="">زیر منو شماره 1 </a></li>
                                                                    <li><a href="">زیر منو شماره 1</a></li>
                                                                    <li><a href="">زیر منو شماره 1</a></li>
                                                                    <li><a href="">زیر منو شماره 1</a></li>
                                                                    <li><a href="">زیر منو شماره 1</a></li>
                                                                    <li><a href="">زیر منو شماره 1</a></li>
                                                                </div>
                                                                <div>
                                                                    <li><a className={`${styles.main_menu_sub_title} dropdown-item`} href="">زیر منو شماره 1 </a></li>
                                                                    <li><a href="">زیر منو شماره 1</a></li>
                                                                    <li><a href="">زیر منو شماره 1</a></li>
                                                                    <li><a href="">زیر منو شماره 1</a></li>
                                                                    <li><a href="">زیر منو شماره 1</a></li>
                                                                    <li><a href="">زیر منو شماره 1</a></li>
                                                                </div>
                                                                <div>
                                                                    <li><a className={`${styles.main_menu_sub_title} dropdown-item`} href="">زیر منو شماره 1 </a></li>
                                                                    <li><a href="">زیر منو شماره 1</a></li>
                                                                    <li><a href="">زیر منو شماره 1</a></li>
                                                                    <li><a href="">زیر منو شماره 1</a></li>
                                                                    <li><a href="">زیر منو شماره 1</a></li>
                                                                    <li><a href="">زیر منو شماره 1</a></li>
                                                                </div>
                                                            </ul>
                                                        </li>

                                                    </ul>
                                                </li>
                                                <li className="nav-item" >
                                                    <a className={`nav-link ${styles.mega_menu_nav_link} dropdown-item`} href="#" id="hoveredMenu2" role="button" data-bs-toggle="dropdown"
                                                                aria-expanded="false">
                                                        <i className="bi bi-tablet"></i>
                                                        <span>منو</span>
                                                    </a>
                                                    <ul className={` ${styles.main_menu_sub_list_second_active }`} aria-labelledby="hoveredMenu2">
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
                                                    <a className={`nav-link ${styles.mega_menu_nav_link} dropdown-item`} href="#" id="hoveredMenu3" role="button" data-bs-toggle="dropdown"
                                                                aria-expanded="false">
                                                        <i className="bi bi-menu-app"></i>
                                                        <span>منو ساده</span>
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
                                                    <a href="" className="nav-link border-animate fromCenter">
                                                        <i
                                                            className="bi bi-tag">

                                                        </i>
                                                        تخفیف ها و پیشنهاد ها</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="" className="nav-link border-animate fromCenter">سوالی
                                                        دارید</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="" className="nav-link border-animate fromCenter">در نسیم استور
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