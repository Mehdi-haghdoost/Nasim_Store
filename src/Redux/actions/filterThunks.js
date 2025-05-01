// src/Redux/actions/filterThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { simpleSearch } from '@/utils/simpleSearch'; // اضافه کردن این import

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
      'محصولات اولیه': products.map(p => ({ title: p.title, category: p.category?._id || p.category })),
    });

    let result = [...products];

    // فیلتر کردن بر اساس دسته‌بندی
    if (categories.length > 0) {
      result = result.filter((product) => {
        if (!product.category) {
          console.log('محصول بدون دسته‌بندی:', product.title);
          return false;
        }

        let productCategoryId;
        if (typeof product.category === 'object' && product.category._id) {
          productCategoryId = product.category._id.toString();
        } else {
          productCategoryId = product.category.toString();
        }

        const matches = categories.some((catId) => catId.toString() === productCategoryId);
        console.log('محصول:', product.title, 'دسته‌بندی:', productCategoryId, 'منطبق:', matches);
        return matches;
      });
      console.log('فیلتر دسته‌بندی: از', products.length, 'به', result.length, 'محصول');
    } else {
      console.log('هیچ دسته‌بندی‌ای انتخاب نشده، همه محصولات نگه داشته می‌شوند');
    }

    // فیلتر کردن بر اساس محدوده قیمت
    if (priceRange && (priceRange.min > 0 || priceRange.max < 50000000)) {
      result = result.filter((product) => {
        const price = product.hasDiscount ? product.discountedPrice : product.price;
        const matches = price >= priceRange.min && price <= priceRange.max;
        if (!matches) {
          console.log('محصول خارج از رنج قیمت:', product.title, '-', price);
        }
        return matches;
      });
      console.log('فیلتر قیمت: از', products.length, 'به', result.length, 'محصول');
    }

    // فیلتر کردن بر اساس رنگ
    if (selectedColor && selectedColor.trim() !== '') {
      result = result.filter((product) => {
        if (!product.colors || !Array.isArray(product.colors)) {
          console.log('محصول بدون آرایه رنگ‌ها:', product.title);
          return false;
        }

        const matches = product.colors.some((colorObj) => {
          if (typeof colorObj !== 'object') return false;
          const colorMatches = colorObj.color === selectedColor;
          const isAvailable = colorObj.available === undefined || colorObj.available === true;
          if (colorMatches) {
            console.log(`محصول "${product.title}" - رنگ ${colorObj.color} - در دسترس: ${isAvailable}`);
          }
          return colorMatches && isAvailable;
        });
        return matches;
      });
      console.log('فیلتر رنگ: از', products.length, 'به', result.length, 'محصول');
    }

    // فیلتر کردن بر اساس عبارت جستجو - بخش اصلاح شده با جستجوی ساده
    if (searchTerm && searchTerm.trim() !== '') {
      const searchTermTrimmed = searchTerm.trim();
      
      result = result.filter((product) => {
        // بررسی عنوان محصول
        const titleMatch = product.title && simpleSearch(product.title, searchTermTrimmed);
        
        // بررسی نام اصلی محصول
        const originalNameMatch = product.originalName && simpleSearch(product.originalName, searchTermTrimmed);
        
        // بررسی در توضیحات محصول - فقط اگر عنوان و نام اصلی پیدا نشد
        const descriptionMatch = !titleMatch && !originalNameMatch && 
                                product.description && simpleSearch(product.description, searchTermTrimmed);
        
        const matches = titleMatch || originalNameMatch || descriptionMatch;
        
        if (matches) {
          console.log(`محصول "${product.title}" با "${searchTerm}" مطابقت دارد`);
        }
        
        return matches;
      });
      console.log('فیلتر جستجو: از', products.length, 'به', result.length, 'محصول');
    }

    // اعمال مرتب‌سازی
    if (sortOption && sortOption !== 'default') {
      console.log('اعمال مرتب‌سازی:', sortOption);
      switch (sortOption) {
        case 'rating-desc':
          result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
          break;
        case 'sales-desc':
          result.sort((a, b) => (b.salesCount || 0) - (a.salesCount || 0));
          break;
        case 'createdAt-desc':
          result.sort((a, b) => {
            const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return dateB - dateA;
          });
          break;
        case 'price-asc':
          result.sort((a, b) => {
            const priceA = a.hasDiscount ? a.discountedPrice : a.price;
            const priceB = b.hasDiscount ? b.discountedPrice : b.price;
            return priceA - priceB;
          });
          break;
        case 'price-desc':
          result.sort((a, b) => {
            const priceA = a.hasDiscount ? a.discountedPrice : a.price;
            const priceB = b.hasDiscount ? b.discountedPrice : b.price;
            return priceB - priceA;
          });
          break;
        default:
          break;
      }
    }

    console.log('محصولات فیلترشده نهایی:', result.map(p => ({ title: p.title, category: p.category?._id || p.category })));
    console.log(result.length, 'محصول پس از اعمال همه فیلترها یافت شد');
    return result;
  }
);