import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts } from './productThunks';

export const filterProducts = createAsyncThunk(
  'filter/filterProducts',
  async (_, { getState, dispatch }) => {
    const state = getState();
    const { products } = state.product;
    const { categories, priceRange, selectedColor, searchTerm, sortOption } = state.filter;

    console.log('شروع فیلتر کردن', products.length, 'محصول با فیلترهای:', {
      'دسته‌بندی‌ها': categories,
      قیمت: priceRange,
      رنگ: selectedColor,
      جستجو: searchTerm,
      'نوع مرتب‌سازی': sortOption,
    });

    let result = [...products];

    // Filter by categories
    if (categories.length > 0) {
      result = result.filter((product) => {
        const productCategoryId = product.category._id.toString();
        const matches = categories.some((catId) => catId.toString() === productCategoryId);
        if (matches) {
          console.log('محصول منطبق با دسته‌بندی:', product.title, '-', productCategoryId);
        }
        return matches;
      });
      console.log('فیلتر دسته‌بندی: از', products.length, 'به', result.length, 'محصول');
    }

    // Filter by price range
    result = result.filter((product) => {
      const price = product.hasDiscount ? product.discountedPrice : product.price;
      const matches = price >= priceRange.min && price <= priceRange.max;
      return matches;
    });
    console.log('فیلتر قیمت: از', products.length, 'به', result.length, 'محصول');

    // Filter by color (only if selectedColor is not empty)
    if (selectedColor) {
      result = result.filter((product) => {
        // بررسی اینکه آیا رنگ‌ها وجود دارد
        if (!product.colors || !Array.isArray(product.colors)) {
          return false;
        }
        const matches = product.colors.some((c) => c.color === selectedColor && c.available);
        return matches;
      });
      console.log('فیلتر رنگ: از', products.length, 'به', result.length, 'محصول');
    }

    // Filter by search term
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase().trim();
      result = result.filter((product) => {
        return (
          product.title.toLowerCase().includes(searchTermLower) ||
          (product.originalName && product.originalName.toLowerCase().includes(searchTermLower)) ||
          (product.description && product.description.toLowerCase().includes(searchTermLower))
        );
      });
      console.log('فیلتر جستجو: از', products.length, 'به', result.length, 'محصول');
    }

    // اعمال مرتب‌سازی بر اساس گزینه انتخاب شده
    if (sortOption && sortOption !== 'default') {
      console.log('اعمال مرتب‌سازی:', sortOption);
      
      switch (sortOption) {
        case 'rating-desc': // محبوب‌ترین
          result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
          break;
          
        case 'sales-desc': // پرفروش‌ترین
          result.sort((a, b) => (b.sales || 0) - (a.sales || 0));
          break;
          
        case 'createdAt-desc': // جدیدترین
          result.sort((a, b) => {
            const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return dateB - dateA;
          });
          break;
          
        case 'price-asc': // ارزان‌ترین
          result.sort((a, b) => {
            const priceA = a.hasDiscount ? a.discountedPrice : a.price;
            const priceB = b.hasDiscount ? b.discountedPrice : b.price;
            return priceA - priceB;
          });
          break;
          
        case 'price-desc': // گران‌ترین
          result.sort((a, b) => {
            const priceA = a.hasDiscount ? a.discountedPrice : a.price;
            const priceB = b.hasDiscount ? b.discountedPrice : b.price;
            return priceB - priceA;
          });
          break;
          
        default:
          // پیش‌فرض - بدون تغییر
          break;
      }
      
      console.log('محصولات پس از مرتب‌سازی:', result.map(p => p.title));
    }

    console.log('محصولات فیلترشده نهایی:', result.map(p => p.title));
    console.log(result.length, 'محصول پس از اعمال همه فیلترها یافت شد');
    return result;
  }
);