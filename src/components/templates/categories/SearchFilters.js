"use client";

import React, { useState, useEffect } from 'react';
import { useCategory } from '@/Redux/hooks/useCategory';
import { useFilter } from '@/Redux/hooks/useFilter';
import { filterProducts } from '@/Redux/actions/filterThunks';
import { fetchProducts } from '@/Redux/actions/productThunks';
import { useDispatch } from 'react-redux';
import styles from './SearchFilters.module.css';
import PriceRangeSlider from './PriceRangeSlider';

const SearchFilters = () => {
  const dispatch = useDispatch();

  const {
    categories: filterCategories,
    updateCategories,
    updateSearchTerm,
    updateSelectedColor,
    updatePriceRange,
    priceRange,
    selectedColor,
    products,
  } = useFilter();

  const { categories, loading, error } = useCategory();
  const [searchTerm, setSearchTerm] = useState('');

  // دریافت محصولات هنگام لود کامپوننت
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    console.log('products sample:', products.slice(0, 5));
  }, [products]);

  useEffect(() => {
    console.log('دسته‌بندی‌های لودشده:', categories.map(c => ({ _id: c._id, name: c.name })));
    console.log('دسته‌بندی‌های انتخاب‌شده:', filterCategories);
  }, [categories, filterCategories]);

  const handleCategoryChange = (categoryId) => {
    const updatedCategories = filterCategories.includes(categoryId)
      ? filterCategories.filter((id) => id !== categoryId)
      : [...filterCategories, categoryId];
    updateCategories(updatedCategories);
    dispatch(filterProducts());
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleColorChange = (color) => {
    console.log('رنگ انتخاب‌شده:', color);
    if (selectedColor === color) {
      updateSelectedColor('');
    } else {
      updateSelectedColor(color);
    }
    dispatch(filterProducts());
  };

  // تابع جدید برای پیدا کردن دسته‌بندی‌های مرتبط با جستجو
  const findRelatedCategories = (searchValue) => {
    if (!searchValue || !searchValue.trim() || products.length === 0) {
      return [];
    }

    const searchTermLower = searchValue.toLowerCase().trim();
    
    // پیدا کردن محصولات مطابق با جستجو
    const matchingProducts = products.filter(product => 
      (product.title && product.title.toLowerCase().includes(searchTermLower)) ||
      (product.originalName && product.originalName.toLowerCase().includes(searchTermLower)) ||
      (product.description && product.description.toLowerCase().includes(searchTermLower))
    );
    
    console.log('محصولات مطابق با جستجو:', matchingProducts.map(p => p.title));
    
    // استخراج دسته‌بندی‌های منحصر به فرد
    const relatedCategoryIds = [...new Set(matchingProducts.map(product => {
      if (typeof product.category === 'object' && product.category?._id) {
        return product.category._id;
      } else if (product.category) {
        return product.category.toString();
      }
      return null;
    }).filter(id => id !== null))];
    
    console.log('دسته‌بندی‌های مرتبط با جستجو:', relatedCategoryIds);
    return relatedCategoryIds;
  };

  const handleApplyFilter = (e) => {
    e.preventDefault();
    
    // اعمال جستجو
    updateSearchTerm(searchTerm);
    
    // پیدا کردن دسته‌بندی‌های مرتبط با جستجو
    const relatedCategoryIds = findRelatedCategories(searchTerm);
    
    // اگر جستجو خالی نباشد و دسته‌بندی‌های مرتبطی پیدا شود
    if (searchTerm.trim() !== '' && relatedCategoryIds.length > 0) {
      // انتخاب دسته‌بندی‌های مرتبط
      updateCategories(relatedCategoryIds);
    }
    
    // اعمال فیلتر
    dispatch(filterProducts());
  };

  useEffect(() => {
    console.log('وضعیت فیلترها:', {
      دسته‌بندی: filterCategories,
      رنگ: selectedColor,
      جستجو: searchTerm,
      قیمت: priceRange
    });
  }, [filterCategories, selectedColor, searchTerm, priceRange]);

  const renderCategoriesContent = () => {
    if (loading) {
      return <p className="text-info"><i className="bi bi-hourglass-split me-2"></i>در حال بارگذاری دسته‌بندی‌ها...</p>;
    }

    if (error || categories.length === 0) {
      return <div className="alert alert-danger py-2" role="alert">
        <i className="bi bi-exclamation-triangle-fill me-2"></i>
        لیست دسته‌بندی‌ها موجود نیست
      </div>;
    }

    return (
      <form>
        {categories.map((category) => {
          const productCount = products.filter(p => p.category?._id === category._id || p.category === category._id).length;
          console.log('دسته:', category.name, ' - category._id:', category._id)
          return (
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
                  className="form-check-label d-flex align-items-center justify-content-between w-100"
                >
                  <span>
                    {category.name}
                    {category.icon && (
                      <i className={`bi bi-${category.icon} ms-1`}></i>
                    )}
                  </span>
                  <span className="text-muted small ms-2">({productCount})</span>
                </label>
              </div>
              <div>
                <span className="fw-bold font-14">
                  ({productCount})
                </span>
              </div>
            </div>
          );
        })}
      </form>
    );
  };

  return (
    <div className={`${styles.filter_items} position-sticky top-0`}>
      <div className="container-fluid">
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

        <div className={styles.filter_item}>
          <h5 className={styles.filter_item_title}>دسته‌بندی‌ها</h5>
          <div className={styles.filter_item_content}>
            {renderCategoriesContent()}
          </div>
        </div>

        <div className={styles.filter_item}>
          <PriceRangeSlider
            initialRange={priceRange}
            onRangeChange={(range) => {
              updatePriceRange(range);
              setTimeout(() => dispatch(filterProducts()), 100);
            }}
          />
        </div>

        <div className={styles.filter_item}>
          <h5 className={styles.filter_item_title}>رنگ محصول</h5>
          <div className={styles.filter_item_content}>
            <div className="product-meta-color-items">
              {[{ id: 'option11', color: 'قرمز', hex: '#c00' },
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
            {selectedColor && (
              <div className="text-center mt-2">
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => {
                    updateSelectedColor('');
                    dispatch(filterProducts());
                  }}
                >
                  <i className="bi bi-x-lg me-1"></i>
                  حذف فیلتر رنگ
                </button>
              </div>
            )}
          </div>
        </div>

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