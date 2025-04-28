"use client";

import React, { useState } from 'react';
import { useCategory } from '@/Redux/hooks/useCategory';
import { useFilter } from '@/Redux/hooks/useFilter';
import { filterProducts } from '@/Redux/actions/filterThunks';
import { useDispatch } from 'react-redux';
import styles from './SearchFilters.module.css';
import PriceRangeSlider from './PriceRangeSlider';

const SearchFilters = () => {
  const dispatch = useDispatch();
  const { categories: filterCategories, updateCategories, updateSearchTerm, updateSelectedColor, priceRange, selectedColor } = useFilter();
  const { categories, loading, error } = useCategory();
  const [searchTerm, setSearchTerm] = useState('');

  // Handle category checkbox changes
  const handleCategoryChange = (categoryId) => {
    const updatedCategories = filterCategories.includes(categoryId)
      ? filterCategories.filter((id) => id !== categoryId)
      : [...filterCategories, categoryId];
    updateCategories(updatedCategories);
  };

  // Handle search input changes
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle color radio changes
  const handleColorChange = (color) => {
    console.log('رنگ انتخاب‌شده:', color);
    updateSelectedColor(color);
  };

  // Handle apply filter button
  const handleApplyFilter = (e) => {
    e.preventDefault();
    updateSearchTerm(searchTerm);
    dispatch(filterProducts());
  };

  return (
    <div className={`${styles.filter_items} position-sticky top-0`}>
      <div className="container-fluid">
        {/* Search Section */}
        <div className={styles.filter_item}>
          <h5 className={styles.filter_item_title}>جستجو</h5>
          <div className={styles.filter_item_content}>
            <div className={styles.search_form}>
              <form onSubmit={handleApplyFilter}>
                <div className={styles.search_field}>
                  <input
                    type="text"
                    placeholder="جستجوی محصولات ..."
                    className={`form-control ${styles.search_input}`}
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  <button
                    className={`btn main-color-one-bg rounded-pill ${styles.search_btn}`}
                    type="submit"
                    disabled={loading}
                  >
                    <i className="bi bi-search"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div className={styles.filter_item}>
          <h5 className={styles.filter_item_title}>دسته‌بندی‌ها</h5>
          <div className={styles.filter_item_content}>
            {loading ? (
              <p>در حال بارگذاری دسته‌بندی‌ها...</p>
            ) : error ? (
              <p className="text-danger">خطا در بارگذاری دسته‌بندی‌ها: {error}</p>
            ) : categories.length === 0 ? (
              <p>دسته‌بندی‌ای یافت نشد</p>
            ) : (
              <form>
                {categories.map((category) => (
                  <div
                    key={category._id}
                    className="d-flex align-items-center justify-content-between flex-wrap mb-3"
                  >
                    <div className="form-check d-flex">
                      <input
                        type="checkbox"
                        id={`category-${category._id}`}
                        className="form-check-input ms-2"
                        checked={filterCategories.includes(category._id)}
                        onChange={() => handleCategoryChange(category._id)}
                      />
                      <label
                        htmlFor={`category-${category._id}`}
                        className="form-check-label"
                      >
                        {category.name}
                        {category.icon && (
                          <i className={`bi bi-${category.icon} ms-1`}></i>
                        )}
                      </label>
                    </div>
                    <div>
                      <span className="fw-bold font-14">
                        ({category.products ? category.products.length : 0})
                      </span>
                    </div>
                  </div>
                ))}
              </form>
            )}
          </div>
        </div>

        {/* Price Range Section */}
        <div className={styles.filter_item}>
          <PriceRangeSlider
            initialRange={priceRange}
            onRangeChange={(range) => dispatch(setPriceRange(range))}
          />
        </div>

        {/* Color Section */}
        <div className={styles.filter_item}>
          <h5 className={styles.filter_item_title}>رنگ محصول</h5>
          <div className={styles.filter_item_content}>
            <div className="product-meta-color-items">
              {[
                { id: 'option11', color: 'قرمز', hex: '#c00' },
                { id: 'option22', color: 'مشکی', hex: '#111' },
                { id: 'option33', color: 'سبز', hex: '#00cc5f' },
                { id: 'option44', color: 'آبی', hex: '#1b69f0' },
                { id: 'option55', color: 'بنفش', hex: '#891bf0' },
                { id: 'option66', color: 'نارنجی', hex: '#f0501b' },
              ].map(({ id, color, hex }) => (
                <React.Fragment key={id}>
                  <input
                    type="radio"
                    className="btn-check"
                    name="color-options"
                    id={id}
                    autoComplete="off"
                    checked={selectedColor === color}
                    onChange={() => handleColorChange(color)}
                  />
                  <label htmlFor={id} className="btn">
                    <span style={{ backgroundColor: hex }}></span>
                    {color}
                  </label>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Apply Filter Button */}
        <div className={`${styles.filter_item} text-center`}>
          <button
            className={styles.btn_outline_site}
            onClick={handleApplyFilter}
          >
            اعمال فیلتر
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;