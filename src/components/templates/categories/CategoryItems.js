"use client";

import React from 'react';
import { useFilter } from '@/Redux/hooks/useFilter';
import ProductBox from '@/components/modules/categories/ProductBox';
import styles from './CategoryItems.module.css';

const CategoryItems = () => {
  const { filteredProducts, isLoading } = useFilter();

  console.log('CategoryItems - isLoading:', isLoading);
  console.log('CategoryItems - filteredProducts:', filteredProducts);
  console.log('CategoryItems - filteredProducts length:', filteredProducts.length);

  return (
    <div className={styles.category_items}>
      {isLoading ? (
        <p>در حال بارگذاری محصولات...</p>
      ) : filteredProducts.length === 0 ? (
        <p>محصولی یافت نشد</p>
      ) : (
        <div className="row g-3">
          {filteredProducts.map((product) => (
            <ProductBox key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryItems;