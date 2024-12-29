import React from 'react'
import styles from './CategoryItems.module.css';
import ProductBox from '@/components/modules/categories/ProductBox';

const CategoryItems = () => {
    return (
        <div className={styles.category_items}>
            <div className="row g-3">
                <ProductBox />
                <ProductBox />
                <ProductBox />
                <ProductBox />
                <ProductBox />
                <ProductBox />
                <ProductBox />
                <ProductBox />
                <ProductBox />
            </div>
        </div>
    )
}

export default CategoryItems