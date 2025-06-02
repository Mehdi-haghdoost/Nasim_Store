"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useCategory } from '@/Redux/hooks/useCategory';
import { useFilter } from '@/Redux/hooks/useFilter';
import { filterProducts } from '@/Redux/actions/filterThunks';
import { fetchProducts } from '@/Redux/actions/productThunks';
import { useDispatch } from 'react-redux';
import styles from './SearchFilters.module.css';
import PriceRangeSlider from './PriceRangeSlider';
import { useSearchParams, useRouter } from 'next/navigation';

const SearchFilters = () => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();
  const {
    categories: filterCategories,
    updateCategories,
    updateSearchTerm,
    updateSelectedColor,
    updatePriceRange,
    priceRange,
    selectedColor,
    products,
    searchTerm: globalSearchTerm, // استفاده از searchTerm از Redux
  } = useFilter();
  const { categories, loading, error } = useCategory();
  
  // استفاده از searchTerm محلی برای input
  const [localSearchTerm, setLocalSearchTerm] = useState('');
  const scrollRef = useRef(null);

  // همگام‌سازی localSearchTerm با globalSearchTerm
  useEffect(() => {
    setLocalSearchTerm(globalSearchTerm || '');
  }, [globalSearchTerm]);

  // همگام‌سازی جستجو با URL
  useEffect(() => {
    const searchQuery = searchParams.get('search');
    if (searchQuery && searchQuery !== globalSearchTerm) {
      setLocalSearchTerm(searchQuery);
      updateSearchTerm(searchQuery);
      dispatch(filterProducts());
    } else if (!searchQuery && globalSearchTerm) {
      setLocalSearchTerm('');
      updateSearchTerm('');
      dispatch(filterProducts());
    }
  }, [searchParams, dispatch, updateSearchTerm, globalSearchTerm]);

  // همگام‌سازی دسته‌بندی با categoryId از URL
  useEffect(() => {
    const categoryId = searchParams.get('categoryId');
    if (categoryId && !filterCategories.includes(categoryId)) {
      updateCategories([categoryId]);
      dispatch(filterProducts());
    } else if (!categoryId && filterCategories.length > 0) {
      updateCategories([]);
      dispatch(filterProducts());
    }
  }, [searchParams, filterCategories, updateCategories, dispatch]);

  // لود محصولات
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // اعمال فیلتر بعد از دریافت محصولات
  useEffect(() => {
    if (products.length > 0) {
      dispatch(filterProducts());
    }
  }, [products, dispatch]);

  // حفظ موقعیت اسکرول
  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCategoryChange = (categoryId) => {
    const currentScroll = scrollRef.current || window.scrollY;
    const updatedCategories = filterCategories.includes(categoryId)
      ? filterCategories.filter((id) => id !== categoryId)
      : [categoryId]; // فقط یه دسته‌بندی می‌تونه انتخاب بشه
    updateCategories(updatedCategories);
    // آپدیت URL بدون پرش اسکرول
    const newSearchParams = new URLSearchParams(searchParams);
    if (updatedCategories.length > 0) {
      newSearchParams.set('categoryId', updatedCategories[0]);
    } else {
      newSearchParams.delete('categoryId');
    }
    router.push(`/categories?${newSearchParams.toString()}`, { scroll: false });

    dispatch(filterProducts());

    // بازیابی موقعیت اسکرول
    setTimeout(() => {
      window.scrollTo(0, currentScroll);
    }, 0);
  };

  const handleSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setLocalSearchTerm(newSearchTerm);
    
    // اگر input خالی شد، فوراً فیلتر رو اعمال کن
    if (newSearchTerm === '') {
      updateSearchTerm('');
      // حذف پارامتر search از URL
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete('search');
      router.push(`/categories?${newSearchParams.toString()}`, { scroll: false });
      dispatch(filterProducts());
    }
  };

  // مدیریت کلید Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleApplyFilter(e);
    }
  };

  const handleColorChange = (color) => {
    if (selectedColor === color) {
      updateSelectedColor('');
    } else {
      updateSelectedColor(color);
    }
    dispatch(filterProducts());
  };

  const handleApplyFilter = (e) => {
    e.preventDefault();
    const trimmedSearchTerm = localSearchTerm.trim();
    updateSearchTerm(trimmedSearchTerm);
    
    // آپدیت URL با search query
    const newSearchParams = new URLSearchParams(searchParams);
    if (trimmedSearchTerm) {
      newSearchParams.set('search', trimmedSearchTerm);
    } else {
      newSearchParams.delete('search');
    }
    router.push(`/categories?${newSearchParams.toString()}`, { scroll: false });
    
    dispatch(filterProducts());
  };

  const renderCategoriesContent = () => {
    if (loading) {
      return (
        <p className="text-info">
          <i className="bi bi-hourglass-split me-2"></i>در حال بارگذاری دسته‌بندی‌ها...
        </p>
      );
    }

    if (error || categories.length === 0) {
      return (
        <div className="alert alert-danger py-2" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          لیست دسته‌بندی‌ها موجود نیست
        </div>
      );
    }

    return (
      <form>
        {categories.map((category) => {
          const productCount = products.filter(
            (p) => p.category?._id === category._id || p.category === category._id
          ).length;
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
                    {category.icon && <i className={`bi bi-${category.icon} ms-1`}></i>}
                  </span>
                  <span className="text-muted small ms-2">({productCount})</span>
                </label>
              </div>
              <div>
                <span className="fw-bold font-14">({productCount})</span>
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
                    value={localSearchTerm}
                    onChange={handleSearchChange}
                    onKeyPress={handleKeyPress}
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
          <div className={styles.filter_item_content}>{renderCategoriesContent()}</div>
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
          <button className={styles.btn_outline_site} onClick={handleApplyFilter}>
            اعمال فیلتر
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;