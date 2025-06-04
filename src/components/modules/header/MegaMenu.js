"use client";

import React, { useEffect, useState } from 'react';
import styles from './MegaMenu.module.css';
import { useCategory } from '@/Redux/hooks/useCategory';
import Link from 'next/link';

function MegaMenu() {
  const [fixedTop, setFixedTop] = useState(false);
  const { categories, loading, error } = useCategory();

  useEffect(() => {
    const fixedNavbarToTop = () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 150) {
        setFixedTop(true);
      } else {
        setFixedTop(false);
      }
    };
    window.addEventListener('scroll', fixedNavbarToTop);
    return () => window.removeEventListener('scroll', fixedNavbarToTop);
  }, []);

  // نقشه‌برداری نام دسته‌بندی‌ها به _id
  const categoryMap = categories.reduce((acc, category) => {
    acc[category.name] = category._id;
    return acc;
  }, {});

  // دسته‌بندی‌های اصلی
  const mainCategories = [
    { name: 'کالای دیجیتال', icon: 'bi-phone', displayName: 'کالاهای دیجیتال و گجت‌ها' },
    { name: 'ساعت های هوشمند', icon: 'bi-tablet', displayName: 'ساعت‌های هوشمند و پوشیدنی‌ها' },
    { name: 'آنتی ویروس', icon: 'bi-shield', displayName: 'آنتی ویروس' },
    { name: 'کنسول بازی', icon: 'bi-laptop', displayName: 'کنسول‌های بازی' },
    { name: 'لوازم جانبی', icon: 'bi-tag', displayName: 'لوازم جانبی' },
  ];

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
                      <a
                        className={`nav-link ${styles.mega_menu_category_button} dropdown-item`}
                        href="#"
                        id="hoveredMenu1"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="bi bi-list"></i>
                        دسته‌بندی کالاها
                      </a>
                      <ul
                        className={`dropdown-menu ${styles.main_menu_active}`}
                        aria-labelledby="hoveredMenu1"
                      >
                        {mainCategories.map((mainCategory) => {
                          const categoryId = categoryMap[mainCategory.name];
                          return (
                            <li
                              key={mainCategory.name}
                              className={`${styles.main_menu_sub} nav-item dropdown`}
                            >
                              <Link
                                href={categoryId ? `/categories?categoryId=${categoryId}` : '#'}
                                className="dropdown-item"
                              >
                                <i className={mainCategory.icon}></i>
                                <span>{mainCategory.displayName}</span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                    <li className="nav-item">
                      <a
                        className={`nav-link ${styles.border_animate} fromCenter`}
                        href="#"
                      >
                        <i className="bi bi-tag"></i>
                        تخفیف‌ها و پیشنهادها
                      </a>
                    </li>
                    <li className="nav-item">
                      <Link
                        href="/contact-us"
                        className={`nav-link ${styles.border_animate} fromCenter`}
                      >
                        سوالی دارید
                      </Link>
                    </li>
                    <li className="nav-item">
                      <a
                        className={`nav-link ${styles.border_animate} fromCenter`}
                        href="#"
                      >
                        در نسیم استور بفروشید
                      </a>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
            <div className="col-lg-3">
              <div className="d-flex align-items-center justify-content-end">
                <a
                  href="#"
                  className={`${styles.mega_menu_contact} main-color-three-bg btn border-0 d-flex align-items-center rounded-pill ms-3`}
                >
                  09211367465
                  <i className="bi bi-whatsapp text-white"></i>
                </a>
                <a
                  href="#"
                  className={`${styles.mega_menu_contact} main-color-two-bg btn border-0 d-flex align-items-center rounded-pill`}
                >
                  09211367465
                  <i className="bi bi-telephone-fill ms-2 text-white"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MegaMenu;