// src/components/templates/categories/CategoryItems.js
"use client";

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useFilter } from '@/Redux/hooks/useFilter';
import { fetchProducts } from '@/Redux/actions/productThunks';
import ProductBox from '@/components/modules/categories/ProductBox';
import styles from './CategoryItems.module.css';

const CategoryItems = () => {
  const dispatch = useDispatch();
  const { filteredProducts, isLoading } = useFilter();



  useEffect(() => {

    dispatch(fetchProducts());
  }, [dispatch]);

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

  if (filteredProducts.length === 0) {
    return (
      <div className={`${styles.category_items} ${styles.status_container}`}>
        <div className="text-center p-5 my-4 rounded-3 shadow-sm">
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