"use client";

import React from 'react';
import { useFilter } from '@/Redux/hooks/useFilter';
import ProductBox from '@/components/modules/categories/ProductBox';
import styles from './CategoryItems.module.css';

const CategoryItems = () => {
  const { filteredProducts, isLoading } = useFilter();

  // Loading state with improved UI
  if (isLoading) {
    return (
      <div className={`${styles.category_items} ${styles.status_container}`}>
        <div className="text-center p-5 my-4">
          <div className="spinner-border text-primary mb-3" role="status" style={{ width: "3rem", height: "3rem" }}>
            <span className="visually-hidden">در حال بارگذاری...</span>
          </div>
          <h5 className="mt-3 text-primary">در حال بارگذاری محصولات</h5>
          <p className="text-muted">لطفا کمی صبر کنید...</p>
        </div>
      </div>
    );
  }

  // No products found state with improved UI
  if (filteredProducts.length === 0) {
    return (
      <div className={`${styles.category_items} ${styles.status_container}`}>
        <div className="text-center p-5 my-4  rounded-3 shadow-sm">
          <i className="bi bi-search text-muted" style={{ fontSize: "3rem" }}></i>
          <h4 className="mt-3">محصولی یافت نشد</h4>
          <p className="text-muted">متأسفانه محصولی مطابق با معیارهای جستجوی شما پیدا نشد.</p>
          <button 
            className="btn btn-outline-primary mt-2"
            onClick={() => window.location.reload()}
          >
            <i className="bi bi-arrow-repeat me-2"></i>
            بارگذاری مجدد
          </button>
        </div>
      </div>
    );
  }

  // Products found - regular display
  return (
    <div className={styles.category_items}>
      <div className="row g-3">
        {filteredProducts.map((product) => (
          <ProductBox key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryItems;