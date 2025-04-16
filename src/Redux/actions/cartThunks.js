// # اکشن‌های غیرهمزمان برای مدیریت سبد خرید با استفاده از localStorage

import { createAsyncThunk } from "@reduxjs/toolkit";

// کلید ذخیره‌سازی سبد خرید در localStorage
const CART_STORAGE_KEY = 'nassim_store_cart';

/**
 * محاسبه مجموع قیمت‌های سبد خرید
 * @param {Array} items آیتم‌های سبد خرید
 * @returns {Object} اطلاعات محاسبه شده سبد خرید
 */
const calculateCartInfo = (items) => {
  let totalPrice = 0;
  let totalDiscount = 0;
  
  items.forEach(item => {
    const product = item.product;
    const quantity = item.quantity;
    
    if (product.hasDiscount) {
      totalPrice += product.price * quantity;
      totalDiscount += (product.price - product.discountedPrice) * quantity;
    } else {
      totalPrice += product.price * quantity;
    }
  });
  
  return {
    items,
    totalPrice,
    totalDiscount,
    finalPrice: totalPrice - totalDiscount,
  };
};

/**
 * ذخیره سبد خرید در localStorage
 * @param {Object} cartInfo اطلاعات سبد خرید
 */
const saveCartToLocalStorage = (cartInfo) => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartInfo));
  } catch (error) {
    console.error('خطا در ذخیره سبد خرید در localStorage:', error);
  }
};

/**
 * خواندن سبد خرید از localStorage
 * @returns {Object|null} اطلاعات سبد خرید یا null در صورت خطا
 */
const getCartFromLocalStorage = () => {
  if (typeof window === 'undefined') return null;
  
  try {
    const cartData = localStorage.getItem(CART_STORAGE_KEY);
    return cartData ? JSON.parse(cartData) : null;
  } catch (error) {
    console.error('خطا در خواندن سبد خرید از localStorage:', error);
    return null;
  }
};

/**
 * Thunk برای افزودن محصول به سبد خرید
 */
export const addToCartThunk = createAsyncThunk(
  'cart/addToCart',
  async ({ product, quantity = 1, color = null, size = null, sellerId = null }, { rejectWithValue }) => {
    try {
      // دریافت سبد خرید فعلی
      const cartData = getCartFromLocalStorage() || { items: [] };
      const items = cartData.items || [];
      
      // بررسی موجودی محصول
      if (product.stock < quantity) {
        return rejectWithValue('موجودی محصول کافی نیست');
      }
      
      // بررسی آیا محصول قبلاً در سبد خرید وجود دارد
      const existingItemIndex = items.findIndex(
        item => item.product._id === product._id && 
                item.color === color && 
                item.size === size
      );
      
      if (existingItemIndex > -1) {
        // اگر محصول موجود است، تعداد آن را افزایش می‌دهیم
        items[existingItemIndex].quantity += quantity;
      } else {
        // در غیر این صورت، یک آیتم جدید اضافه می‌کنیم
        items.push({
          product,
          quantity,
          color,
          size,
          selectedSeller: sellerId,
          _id: Math.random().toString(36).substr(2, 9) // یک شناسه موقت برای آیتم سبد خرید
        });
      }
      
      // محاسبه مجدد اطلاعات سبد خرید
      const cartInfo = calculateCartInfo(items);
      
      // ذخیره در localStorage
      saveCartToLocalStorage(cartInfo);
      
      return cartInfo;
    } catch (error) {
      console.error('خطا در افزودن به سبد خرید:', error);
      return rejectWithValue(error.message || 'خطا در افزودن به سبد خرید');
    }
  }
);

/**
 * Thunk برای به‌روزرسانی تعداد محصول در سبد خرید
 */
export const updateCartItemThunk = createAsyncThunk(
  'cart/updateCartItem',
  async ({ itemId, quantity }, { rejectWithValue }) => {
    try {
      // دریافت سبد خرید فعلی
      const cartData = getCartFromLocalStorage() || { items: [] };
      let items = cartData.items || [];
      
      // پیدا کردن آیتم مورد نظر
      const itemIndex = items.findIndex(item => item._id === itemId);
      
      if (itemIndex === -1) {
        return rejectWithValue('آیتم موردنظر در سبد خرید یافت نشد');
      }
      
      const item = items[itemIndex];
      
      // بررسی موجودی محصول
      if (item.product.stock < quantity) {
        return rejectWithValue('موجودی محصول کافی نیست');
      }
      
      if (quantity <= 0) {
        // حذف آیتم اگر تعداد 0 یا کمتر باشد
        items = items.filter(item => item._id !== itemId);
      } else {
        // به‌روزرسانی تعداد
        items[itemIndex].quantity = quantity;
      }
      
      // محاسبه مجدد اطلاعات سبد خرید
      const cartInfo = calculateCartInfo(items);
      
      // ذخیره در localStorage
      saveCartToLocalStorage(cartInfo);
      
      return cartInfo;
    } catch (error) {
      console.error('خطا در به‌روزرسانی سبد خرید:', error);
      return rejectWithValue(error.message || 'خطا در به‌روزرسانی سبد خرید');
    }
  }
);

/**
 * Thunk برای حذف یک آیتم از سبد خرید
 */
export const removeFromCartThunk = createAsyncThunk(
  'cart/removeFromCart',
  async (itemId, { rejectWithValue }) => {
    try {
      // دریافت سبد خرید فعلی
      const cartData = getCartFromLocalStorage() || { items: [] };
      const items = (cartData.items || []).filter(item => item._id !== itemId);
      
      // محاسبه مجدد اطلاعات سبد خرید
      const cartInfo = calculateCartInfo(items);
      
      // ذخیره در localStorage
      saveCartToLocalStorage(cartInfo);
      
      return cartInfo;
    } catch (error) {
      console.error('خطا در حذف از سبد خرید:', error);
      return rejectWithValue(error.message || 'خطا در حذف از سبد خرید');
    }
  }
);

/**
 * Thunk برای پاک کردن کامل سبد خرید
 */
export const clearCartThunk = createAsyncThunk(
  'cart/clearCart',
  async (_, { rejectWithValue }) => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(CART_STORAGE_KEY);
      }
      
      return { items: [], totalPrice: 0, totalDiscount: 0, finalPrice: 0 };
    } catch (error) {
      console.error('خطا در پاک کردن سبد خرید:', error);
      return rejectWithValue(error.message || 'خطا در پاک کردن سبد خرید');
    }
  }
);

/**
 * Thunk برای همگام‌سازی سبد خرید از localStorage
 */
export const syncCartFromLocalStorage = createAsyncThunk(
  'cart/syncFromLocalStorage',
  async () => {
    return getCartFromLocalStorage();
  }
);

/**
 * Thunk برای ادغام سبد خرید مهمان با سبد خرید کاربر لاگین شده
 */
export const mergeGuestCartWithUserCartThunk = createAsyncThunk(
  'cart/mergeGuestCart',
  async (userId, { dispatch, getState }) => {
    try {
      // این تابع تنها زمانی که کاربر لاگین کرده باشد اجرا می‌شود
      if (!userId) return;
      
      // دریافت سبد خرید مهمان
      const guestCartData = getCartFromLocalStorage() || { items: [] };
      
      // اگر سبد خرید مهمان خالی است، کاری انجام نمی‌دهیم
      if (!guestCartData.items || guestCartData.items.length === 0) return;
      
      // ارسال اکشن برای ادغام سبد خرید مهمان با سبد خرید کاربر
      dispatch({
        type: 'cart/mergeGuestCartWithUserCart',
        payload: { guestCartItems: guestCartData.items }
      });
      
      // پاک کردن سبد خرید مهمان
      if (typeof window !== 'undefined') {
        localStorage.removeItem(CART_STORAGE_KEY);
      }
      
      return true;
    } catch (error) {
      console.error('خطا در ادغام سبد خرید مهمان:', error);
      return false;
    }
  }
);