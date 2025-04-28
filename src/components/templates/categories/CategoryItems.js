'use client'
import React, { useEffect } from 'react'
import styles from './CategoryItems.module.css';
import ProductBox from '@/components/modules/categories/ProductBox';
import { useSelector, useDispatch } from 'react-redux';
import { filterProducts } from '../../../Redux/actions/filterThunks';
import { useProduct } from '../../../Redux/hooks/useProduct';

const CategoryItems = () => {
    const dispatch = useDispatch();
    const { getProducts, products, productsLoading } = useProduct();
    const { filteredProducts } = useSelector(state => state.filter);

    // بارگذاری محصولات و فیلتر اولیه
    useEffect(() => {
        if (!productsLoading && (!products || products.length === 0)) {
            getProducts().then(() => {
                dispatch(filterProducts());
            });
        } else if (!productsLoading && products.length > 0 && (!filteredProducts || filteredProducts.length === 0)) {
            dispatch(filterProducts());
        }
    }, [dispatch, getProducts, products, productsLoading, filteredProducts]);

    // انتخاب محصولات برای نمایش (فیلتر شده یا همه)
    const displayProducts = filteredProducts && filteredProducts.length > 0 ? filteredProducts : products;

    if (productsLoading) {
        return (
            <div className="d-flex justify-content-center my-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">در حال بارگذاری...</span>
                </div>
            </div>
        );
    }

    if (!displayProducts || displayProducts.length === 0) {
        return (
            <div className="alert alert-info text-center my-5">
                <i className="bi bi-exclamation-circle-fill me-2"></i>
                محصولی با این مشخصات یافت نشد.
            </div>
        );
    }

    return (
        <div className={styles.category_items}>
            <div className="row g-3">
                {displayProducts.map(product => (
                    <ProductBox key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
}

export default CategoryItems;