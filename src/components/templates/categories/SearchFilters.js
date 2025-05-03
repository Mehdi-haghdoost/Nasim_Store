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
  } = useFilter();
  const { categories, loading, error } = useCategory();
  const [searchTerm, setSearchTerm] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    console.log('دسته‌بندی‌های لودشده:', categories.map(c => ({ _id: c._id, name: c.name })));
    console.log('دسته‌بندی‌های انتخاب‌شده:', filterCategories);
    console.log('نمونه محصولات:', products.slice(0, 5));
    console.log('وضعیت فیلترها:', { دسته‌بندی: filterCategories, رنگ: selectedColor, جستجو: searchTerm, قیمت: priceRange });
    if (loading) console.log('در حال لود دسته‌بندی‌ها...');
    if (error) console.error('خطا در لود دسته‌بندی‌ها:', error);
  }, [categories, filterCategories, products, selectedColor, searchTerm, priceRange, loading, error]);

  // همگام‌سازی دسته‌بندی با categoryId از URL
  useEffect(() => {
    const categoryId = searchParams.get('categoryId');
    if (categoryId && !filterCategories.includes(categoryId)) {
      console.log('همگام‌سازی دسته‌بندی با URL:', categoryId);
      updateCategories([categoryId]);
      dispatch(filterProducts());
    } else if (!categoryId && filterCategories.length > 0) {
      console.log('حذف دسته‌بندی‌های انتخاب‌شده چون categoryId در URL نیست');
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
      console.log('محصولات دریافت شدند، اعمال فیلتر');
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
    console.log('دسته‌بندی‌های به‌روز شده:', updatedCategories);

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
    setSearchTerm(e.target.value);
    if (e.target.value === '') {
      updateSearchTerm('');
      dispatch(filterProducts());
    }
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

  const handleApplyFilter = (e) => {
    e.preventDefault();
    updateSearchTerm(searchTerm);
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