"use client";

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshToken } from '@/Redux/actions/authThunks';
import Link from 'next/link';
import styles from './Header.module.css';
import MegaMenu from './MegaMenu';
import AuthHeader from './AuthHeader';
import ShoppingCart from '../CartOffcanvas/ShoppingCart';

function Header() {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { items: cartItems, totalQuantity } = useSelector((state) => state.cart); // اضافه شده
  const [activeHamburger, setActiveHamburger] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState({});
  const [isShowBascket, setIsShowBascket] = useState(false);
  

  useEffect(() => {
    // تنها یک بار هنگام لود کامپوننت اجرا شود و اگر کاربر در حافظه نباشد
    if (!user) {
      dispatch(refreshToken());
    }
  }, [dispatch, user]);

  const showBascket = (e) => {
    e.preventDefault();
    setIsShowBascket((prev) => !prev);
  };

  const handleItemCheck = (index) => {
    setActiveSubMenu({
      ...activeSubMenu,
      [index]: !activeSubMenu[index],
    });
  };

  return (
    <header className={styles.header} style={{ minHeight: '100px' }}>
      <nav className="container-fluid">
        <div className="row align-items-center">
          {/* logo */}
          <div className="col-lg-1 col-6 order-lg-1 order-1">
            <div className="d-flex align-items-center">
              <div className="d-block d-lg-none">
                <i
                  type="button"
                  onClick={() => setActiveHamburger(true)}
                  className="bi bi-list font-30"
                ></i>
                <div
                  className={
                    activeHamburger
                      ? styles.hamburger_menu_show
                      : styles.hamburger_menu_hidden
                  }
                >
                  <div className={styles.hamburger_menu_header}>
                    <h5 className="hamburger_menu_title">فروشگاه نسیم استور</h5>
                    <button
                      onClick={() => setActiveHamburger(false)}
                      className={`btn-close ${styles.hamburger_btn_close}`}
                    ></button>
                  </div>
                  <div className={styles.hamburger_body}>
                    <a href="/" className="text-center d-block mb-3">
                      <img
                        className="img-fluid"
                        width="200"
                        src="/images/logo.png"
                        alt="logo"
                      />
                    </a>
                    <div className="hamburger_body_bottom_form">
                      <div className={styles.search_form}>
                        <form action="">
                          <div className={styles.search_field}>
                            <input
                              placeholder="جستجوی محصولات ..."
                              type="text"
                              className={`form-control ${styles.search_input}`}
                            />
                            <button
                              type="submit"
                              className={`btn ${styles.search_btn} main-color-one-bg rounded-pill`}
                            >
                              <i className="bi bi-search"></i>
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                    <ul className={`navbar-nav ${styles.hamburger_navbar}`}>
                      <li className={`nav-item ${styles.hamburger_navbar_item}`}>
                        <Link href="/" className="nav-link">
                          صفحه اصلی
                        </Link>
                      </li>
                      <li className={`nav-item ${styles.hamburger_navbar_item}`}>
                        <Link href="/categories?category=mobile" className="nav-link">
                          گوشی موبایل
                        </Link>
                      </li>
                      <li className={`nav-item ${styles.hamburger_navbar_item}`}>
                        <Link href="/categories?category=tablet" className="nav-link">
                          تبلت
                        </Link>
                      </li>
                      <li className={`nav-item ${styles.hamburger_navbar_item}`}>
                        <Link href="/categories?category=laptop" className="nav-link">
                          لپتاپ
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  className={
                    activeHamburger
                      ? styles.hamburger_backdrop
                      : styles.hamburger_backdrop_hidden
                  }
                ></div>
              </div>
              <div>
                <Link href="/">
                  <div className="logo">
                    <img
                      className="img-fluid"
                      src="/images/logo.png"
                      alt="logo"
                    />
                  </div>
                </Link>
              </div>
            </div>
          </div>
          {/* end logo */}

          {/* action */}
          <div className="d-lg-none d-block col-6 order-lg-5 order-2">
            <div className="d-flex align-items-center justify-content-end">
              <div
                className={styles.avatar}
                onClick={() => handleItemCheck(15)}
              >
                {isAuthenticated && user ? (
                  <span
                    className={`btn btn-white ${styles.header_register_icon} border-0 rounded-pill`}
                  >
                    <i className="bi bi-person-circle font-20 text-muted me-1"></i>
                    {user.username || 'کاربر'}
                  </span>
                ) : (
                  <Link
                    href="/login-register"
                    className={`btn btn-white ${styles.header_register_icon} border-0 rounded-pill`}
                  >
                    <i className="bi bi-person-circle font-20 text-muted me-1"></i>
                    <span>ورود</span>
                  </Link>
                )}
                <ul
                  className={`navbar-nav ${
                    activeSubMenu[15]
                      ? styles.avatar_dropdown_show
                      : styles.avatar_dropdown_hide
                  }`}
                >
                  <li>
                    <Link href="/p-user" className={styles.avatar_dropdown_item}>
                      <i className="bi bi-house-door"></i>پروفایل
                    </Link>
                  </li>
                  <li>
                    <Link href="/p-user/orders" className={styles.avatar_dropdown_item}>
                      <i className="bi bi-cart-check"></i>سفارش‌های من
                    </Link>
                  </li>
                  <li>
                    <Link href="/p-user/wishlists" className={styles.avatar_dropdown_item}>
                      <i className="bi bi-heart"></i>محصولات مورد علاقه
                    </Link>
                  </li>
                  <li>
                    <button onClick={() => {
                      // اینجا logout function رو صدا کنید
                      handleItemCheck(15); // بستن منو
                    }} className={styles.avatar_dropdown_item}>
                      <i className="bi bi-arrow-right-square"></i>خروج از حساب کاربری
                    </button>
                  </li>
                </ul>
              </div>
              <button
                onClick={(e) => showBascket(e)}
                className={`btn btn-light shadow-sm ${styles.action_link}`}
                style={{ position: 'relative' }}
              >
                <i className="bi bi-basket font-30"></i>
                {/* نمایش تعداد واقعی محصولات */}
                {totalQuantity > 0 && (
                  <span className={`${styles.header_cart_counter} main-color-one-bg rounded-pill`}>
                    {totalQuantity}
                  </span>
                )}
              </button>
            </div>
          </div>
          {/* end action */}

          {/* form search */}
          <div className="col-lg-7 order-lg-2 d-lg-block d-none">
            <div className="search-form">
              <form action="">
                <div className={styles.search_field}>
                  <input
                    type="text"
                    placeholder="جستجوی محصولات ..."
                    className={`form-control ${styles.search_input}`}
                  />
                  <button
                    type="button"
                    className={`btn main-color-one-bg ${styles.search_btn} rounded-pill`}
                  >
                    <i className="bi bi-search"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* end form search */}

          {/* auth */}
          <AuthHeader showBascket={showBascket} />
          {/* end auth */}
        </div>

        {/* mega-menu-start */}
        <MegaMenu />
        {/* mega-menu-end */}
      </nav>
      {isShowBascket && (
        <ShoppingCart
          isShowBascket={isShowBascket}
          showBascket={showBascket}
        />
      )}
    </header>
  );
}

export default Header;