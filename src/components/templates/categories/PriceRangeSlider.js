"use client";

import React, { useState } from 'react';
import { FiRefreshCw } from 'react-icons/fi';
import styles from './PriceRangeSlider.module.css';

const PriceRangeSlider = () => {

    const [priceRange, setPriceRange] = useState({ min: 100, max: 1000 })
    const handlePriceChange = (e) => {
        const { name, value } = e.target;
        setPriceRange({ ...priceRange, [name]: Number(value) });
    };

    const resetSlider = () => {
        setPriceRange({ min: 100, max: 1000 });
    };
    return (
        <div>
            <h5 className={styles.filter_item_title}>قیمت</h5>
            <div className={styles.filter_item_content}>
                <div className='p-3 mx-auto bg-white rounded shadow-lg d-flex flex-column align-items-center mb-3 w-100'>
                    <div className='d-flex justify-content-between w-100'>
                        <input
                            type='range'
                            name='min'
                            min="0"
                            max="1000"
                            value={priceRange.min}
                            onChange={handlePriceChange}
                            className='form-range d-none d-sm-block d-md-block d-lg-block d-xl-block d-xxl-block'
                        />
                        <input
                            type='range'
                            name='max'
                            min="0"
                            max="1000"
                            value={priceRange.max}
                            onChange={handlePriceChange}
                            className='form-range d-none d-sm-block d-md-block d-lg-block d-xl-block d-xxl-block'
                        />
                    </div>
                    <div className='fs-6 fw-medium'>
                        ${priceRange.min} - ${priceRange.max}
                    </div>
                    <button
                        onClick={resetSlider}
                        className={`px-4 py-2 bg-primary text-white rounded d-flex align-items-center ${styles.reset_price}`}
                        style={{ backgroundColor: "#007bff", borderRadius: "0.25rem" }}
                    >
                        <FiRefreshCw className='ms-2' />
                        بازنشانی

                    </button>
                </div>
            </div>
        </div>
    )
}

export default PriceRangeSlider