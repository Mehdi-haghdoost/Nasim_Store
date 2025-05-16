"use client"; 

import React from 'react';
import styles from './Pagination.module.css';

const Pagination = ({ currentPage = 1, totalPages = 1, onPageChange }) => {
  // تابع کمکی برای تولید آرایه‌ای از اعداد صفحه با توجه به صفحه فعلی و کل صفحات
  const getPageNumbers = () => {
    // اگر تعداد صفحات کمتر از ۷ است، همه‌شان را نمایش بده
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // استراتژی نمایش صفحات با "..." در میانه
    let pages = [];
    
    // همیشه صفحه اول را نمایش بده
    pages.push(1);
    
    // اگر صفحه فعلی نزدیک به ابتدا است
    if (currentPage <= 4) {
      pages.push(2, 3, 4, 5);
      pages.push('...');
      pages.push(totalPages);
    } 
    // اگر صفحه فعلی نزدیک به انتها است
    else if (currentPage > totalPages - 4) {
      pages.push('...');
      pages.push(totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } 
    // اگر صفحه فعلی در میانه است
    else {
      pages.push('...');
      pages.push(currentPage - 1, currentPage, currentPage + 1);
      pages.push('...');
      pages.push(totalPages);
    }
    
    return pages;
  };

  const handlePageClick = (page, e) => {
    e.preventDefault();
    if (page !== '...' && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div className={`mt-5 ${styles.my_paginate}`}>
      <nav>
        <ul className='pagination flex-wrap justify-content-center'>
          {/* دکمه قبلی */}
          <li className={`${styles.page_item} ${currentPage === 1 ? styles.disabled : ''}`}>
            <a 
              href="" 
              className={`rounded-3 ${styles.page_link}`}
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) onPageChange(currentPage - 1);
              }}
            >
              قبلی
            </a>
          </li>

          {/* دکمه‌های شماره صفحه */}
          {getPageNumbers().map((page, index) => (
            <li 
              key={index} 
              className={`${styles.page_item} ${page === currentPage ? styles.active : ''} ${page === '...' ? styles.disabled : ''}`}
            >
              <a 
                href="" 
                className={`rounded-3 ${styles.page_link}`}
                onClick={(e) => handlePageClick(page, e)}
              >
                {page}
              </a>
            </li>
          ))}

          {/* دکمه بعدی */}
          <li className={`${styles.page_item} ${currentPage === totalPages ? styles.disabled : ''}`}>
            <a 
              href="" 
              className={`rounded-3 ${styles.page_link}`}
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) onPageChange(currentPage + 1);
              }}
            >
              بعدی
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;