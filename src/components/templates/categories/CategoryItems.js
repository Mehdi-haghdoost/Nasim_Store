'use client'
import React from 'react'
import styles from './CategoryItems.module.css';
import ProductBox from '@/components/modules/categories/ProductBox';
import { useFilter } from '../../../Redux/hooks/useFilter';

const CategoryItems = () => {
    const { filteredProducts, isLoading } = useFilter();

    return (
        <div className={styles.category_items}>
            {isLoading ? (
                <div className="d-flex justify-content-center my-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">در حال بارگذاری...</span>
                    </div>
                </div>
            ) : filteredProducts.length > 0 ? (
                <div className="row g-3">
                    {filteredProducts.map(product => (
                        <ProductBox key={product._id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="alert alert-info text-center my-5">
                    <i className="bi bi-exclamation-circle-fill me-2"></i>
                    محصولی با این مشخصات یافت نشد.
                </div>
            )}
        </div>
    )
}

export default CategoryItems