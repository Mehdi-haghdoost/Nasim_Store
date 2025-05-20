"use client";

import React from 'react';
import styles from '@/components/layouts/UserPanelLayout.module.css';
import Header from '../modules/header/Header';
import Footer from '../modules/footer/Footer';
import BreadCroumb from '../modules/breadCroumb/BreadCroumb';
import Sidebar from '../modules/p-user/Sidebar';
import ActiveLink from '@/utils/ActiveLink';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '@/Redux/actions/authThunks';
import swal from 'sweetalert';

function Layout({ children }) {

    const path = usePathname();
    const router = useRouter();
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useSelector((state) => state.auth);

    const logoutHandler = () => {
        swal({
            title: "آیا از خروج اطمینان دارید ؟",
            icon: "warning",
            buttons: ["نه", "آره"]
        }).then((result) => {
            if (result) {
                dispatch(logoutUser()).then(() => {
                    router.push("/");
                });
            }
        });
    };

    return (
        <>
            <Header />
            <BreadCroumb />
            <div className={styles.content}>
                <div className="container-fluid">
                    <div className={`d-block d-lg-none ${styles.custom_filter}`}>
                        <button
                            type='button'
                            data-bs-toggle="offcanvas"
                            className='btn btn-filter-float border-0 main-color-two-bg shadow-box px-4 rounded-3 position-fixed'
                            data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"
                        >
                            <i className="bi bi-list font-20 fw-bold text-white"></i>
                            <span className="d-block font-14 text-white">منو</span>
                        </button>

                        <div className="offcanvas offcanvas-end" tabIndex="-1" id='offcanvasRight'
                            aria-labelledby="offcanvasRightLabel"
                        >
                            <div className={`offcanvas-header ${styles.offcanvas_header}`}>
                                <h5 className="offcanvas-title" id='offcanvasRightLabel'>منو</h5>
                                <button type='button' className='btn-close' data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                            <div className="offcanvas-body">
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
                                                            {user?.username || 'کاربر'}
                                                        </h6>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={styles.profile_box}>
                                                <nav className={`navbar ${styles.profile_box_nav}`}>
                                                    <ul className='navbar-nav flex-column'>
                                                        {path.includes("/p-user") ? (
                                                            <>
                                                                <ActiveLink href="/p-user/profile"  >
                                                                    <i className='bi bi-house-door'></i>
                                                                    پروفایل
                                                                </ActiveLink>
                                                                <ActiveLink href="/p-user/orders">
                                                                    <i className='bi bi-cart-check'></i>
                                                                    سفارش های من
                                                                    <span className={`badge rounded-pill ${styles.badge_spn}`}>
                                                                        {user?.orders?.length || 0}
                                                                    </span>
                                                                </ActiveLink>
                                                                <ActiveLink href="/p-user/address">
                                                                    <i className='bi bi-pin-map'></i>
                                                                    آدرس های من
                                                                </ActiveLink>
                                                                <ActiveLink href="/p-user/notifications">
                                                                    <i className='bi bi-bell'></i>
                                                                    پیام ها و اطلاعیه ها
                                                                </ActiveLink>
                                                                <ActiveLink href="/p-user/comments">
                                                                    <i className='bi bi-chat-dots'></i>
                                                                    نظرات من
                                                                    <span className={`badge rounded-pill ${styles.badge_spn}`}>
                                                                        {user?.comments?.length || 0}
                                                                    </span>
                                                                </ActiveLink>
                                                                <ActiveLink href="/p-user/tickets">
                                                                    <i className='bi bi-question-circle'></i>
                                                                    درخواست پشتیبانی
                                                                </ActiveLink>
                                                                <ActiveLink href="/p-user/wishlists">
                                                                    <i className='bi bi-heart'></i>
                                                                    محصولات مورد علاقه
                                                                    <span className={`badge rounded-pill ${styles.badge_spn}`}>
                                                                        {user?.wishlist?.length || 0}
                                                                    </span>
                                                                </ActiveLink>
                                                                <ActiveLink href="/p-user/discountcodes">
                                                                    <i className='bi bi-gift'></i>
                                                                    کدهای تخفیف من
                                                                </ActiveLink>
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
                                                                    <i className="bi bi-people ms-2"></i>
                                                                    کاربران
                                                                </Link>
                                                                <Link href={"/p-admin"} className='nav-item' >
                                                                    <i className='bi bi-chat-dots ms-2'></i>
                                                                    کامنت ها
                                                                </Link>
                                                                <Link href={"/p-admin"} className='nav-item' >
                                                                    <i className="bi bi bi-ticket ms-2"></i>
                                                                    تیکت ها
                                                                </Link>
                                                            </>
                                                        )}
                                                    </ul>
                                                    <div className={styles.profile_box_logout}
                                                        onClick={logoutHandler}
                                                    >
                                                        <i className='bi bi-arrow-right-square'></i>
                                                        خروج از حساب کاربری
                                                    </div>
                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.dashboard_panel}>
                        <div className='row gy-3'>
                            <div className='col-lg-3 d-lg-block d-none'>
                                <Sidebar />
                            </div>
                            <div className='col-lg-9'>
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Layout;