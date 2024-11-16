"use client";

import React from 'react'
import styles from '@/components/modules/p-user/Sidebar.module.css';
import { usePathname } from 'next/navigation';
import Link from "next/link";

function Sidebar() {

    const path = usePathname();

    return (
        <div className={styles.panel_side}>
            <div className="content-box pb-0">
                <div className="container-fluid">
                    <div className={styles.panel_box}>
                        <div className='d-flex align-items-center'>
                            <img src="/images/user.png"
                                className={`img-fluid rounded-circle ms-3 shadow-md ${styles.img_profile_panel}`}
                                alt="userPhoto" />
                            <div className='d-grid gap-2'>
                                <h6 className='font-14 main-color-one-color'>
                                    حساب کاربری من
                                </h6>
                                <h6 className='font-14'>
                                    مهدی حق دوست
                                </h6>
                            </div>
                        </div>
                    </div>
                    <div className={styles.profile_box}>
                        <nav className={`navbar ${styles.profile_box_nav}`}>
                            <ul className='navbar-nav flex-column'>
                                {path.includes("/p-user") ? (
                                    <>
                                        <Link href={"/p-user"} className={`nav-link ${styles.sidbar_link_active}`} >
                                            <i className='bi bi-house-door'></i>
                                            پروفایل
                                        </Link>
                                        <Link href={"/p-user"} className='nav-item'>
                                            <i className='bi bi-cart-check'></i>
                                            سفارش های من
                                            <span className={`badge rounded-pill ${styles.badge_spn}`}>5</span>
                                        </Link>
                                        <Link href={"/p-user"} className='nav-item'>
                                            <i className='bi bi-pin-map'></i>
                                            آدرس های من
                                        </Link>
                                        <Link href={"/p-user"} className='nav-item'>
                                            <i className='bi bi-bell'></i>
                                            پیام ها و اطلاعیه ها
                                        </Link>
                                        <Link href={"/p-user"} className='nav-item'>
                                            <i className='bi bi-chat-dots'></i>
                                            نظرات من
                                        </Link>
                                        <Link href={"/p-user"} className='nav-item'>
                                            <i className='bi bi-question-circle'></i>
                                            درخواست پشتیبانی
                                        </Link>
                                        <Link href={"/p-user"} className='nav-item'>
                                            <i className='bi bi-heart'></i>
                                            محصولات مورد علاقه
                                        </Link>
                                        <Link href={"/p-user"} className='nav-item'>
                                            <i className='bi bi-gift'></i>
                                            کدهای تخفیف من
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link href={"/p-admin"} className={`nav-item ${styles.sidbar_link_active}`} >
                                            <i className='bi bi-house ms-2'></i>
                                            پروفایل
                                            <small className='badge rounded-pill bg-danger'>5</small>
                                        </Link>

                                        <Link href={"/p-admin"} className='nav-item' >
                                            <i className='bi bi-lightbulb ms-2'></i>
                                            آموزش
                                        </Link>
                                        <Link href={"/p-admin"} className='nav-item' >
                                            <i className='bi bi-cart-check ms-2'></i>
                                            سفارشات
                                        </Link>
                                        <Link href={"/p-admin"} className='nav-item' >
                                            <i className='bi bi-tags ms-2'></i>
                                            تخفیفات
                                        </Link>
                                        <Link href={"/p-admin"} className='nav-item' >
                                        <i class="bi bi-people ms-2"></i>
                                            کاربران
                                        </Link>
                                        <Link href={"/p-admin"} className='nav-item' >
                                            <i className='bi bi-chat-dots ms-2'></i>
                                            کامنت ها
                                        </Link>
                                        <Link href={"/p-admin"} className='nav-item' >
                                        <i class="bi bi bi-ticket ms-2"></i>
                                            تیکت ها
                                        </Link>
                                    </>
                                )}
                            </ul>
                            <div className={styles.profile_box_logout}>
                                <i className='bi bi-arrow-right-square'></i>
                                خروج از حساب کاربری
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;