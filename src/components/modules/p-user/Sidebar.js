"use client";

import React from 'react';
import styles from './Sidebar.module.css';
import ActiveLink from '@/utils/ActiveLink';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '@/Redux/actions/authThunks';
import { useRouter } from 'next/navigation';
import swal from 'sweetalert'; // اگر از sweetalert استفاده می‌کنید، مطمئن شوید import شده باشد

function Sidebar() {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const router = useRouter();

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
                                    {user?.username || 'مهدی حق دوست'}
                                </h6>
                            </div>
                        </div>
                    </div>
                    <div className={styles.profile_box}>
                        <nav className={`navbar ${styles.profile_box_nav}`}>
                            <ul className='navbar-nav flex-column'>
                                <ActiveLink href="/p-user" exact>
                                    <i className='bi bi-house-door'></i>
                                    داشبورد
                                </ActiveLink>
                                <ActiveLink href="/p-user/profile">
                                    <i className='bi bi-person'></i>
                                    پروفایل
                                </ActiveLink>
                                <ActiveLink href="/p-user/orders">
                                    <i className='bi bi-cart-check'></i>
                                    سفارش های من
                                    <span className={`badge rounded-pill ${styles.badge_spn}`}>5</span>
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
                                </ActiveLink>
                                <ActiveLink href="/p-user/tickets">
                                    <i className='bi bi-question-circle'></i>
                                    درخواست پشتیبانی
                                </ActiveLink>
                                <ActiveLink href="/p-user/wishlists">
                                    <i className='bi bi-heart'></i>
                                    محصولات مورد علاقه
                                </ActiveLink>
                                <ActiveLink href="/p-user/discountcodes">
                                    <i className='bi bi-gift'></i>
                                    کدهای تخفیف من
                                </ActiveLink>
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
    );
}

export default Sidebar;