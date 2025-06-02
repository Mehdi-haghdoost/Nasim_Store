import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const CART_STORAGE_KEY = 'nassim_store_cart';

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

const saveCartToLocalStorage = (cartInfo) => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartInfo));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

const getCartFromLocalStorage = () => {
  if (typeof window === 'undefined') return null;

  try {
    const cartData = localStorage.getItem(CART_STORAGE_KEY);
    const parsedData = cartData ? JSON.parse(cartData) : null;
    return parsedData;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return null;
  }
};

const normalizeSellerData = (sellerData) => {
  if (!sellerData) return null;

  if (typeof sellerData === 'object' && sellerData._id) {
    return {
      _id: sellerData._id,
      name: sellerData.name || "فروشنده نامشخص"
    };
  }

  if (typeof sellerData === 'string') {
    return {
      _id: sellerData,
      name: "فروشگاه نسیم"
    };
  }

  return null;
};

export const addToCartThunk = createAsyncThunk(
  'cart/addToCart',
  async ({ product, quantity = 1, color = null, size = null, sellerId = null }, { rejectWithValue }) => {
    try {
      const cartData = getCartFromLocalStorage() || { items: [] };
      let items = cartData.items || [];

      items = items.filter(item => item._id && item.product && item.product._id);
      if (product.stock < quantity) {
        toast.error('موجودی محصول کافی نیست');
        return rejectWithValue('موجودی محصول کافی نیست');
      }

      const normalizedSeller = normalizeSellerData(sellerId);

      const existingItemIndex = items.findIndex(item => {
        let itemProductId = String(item.product._id);
        let currentProductId = String(product._id);

        if (itemProductId.includes('_')) {
          itemProductId = itemProductId.split('_')[0];
        }
        if (currentProductId.includes('_')) {
          currentProductId = currentProductId.split('_')[0];
        }

        const productIdMatch = itemProductId === currentProductId;
        let colorMatch = (item.color === null && color === null) || String(item.color) === String(color);
        let sizeMatch = (item.size === null && size === null) || String(item.size) === String(size);
        let sellerMatch = (item.selectedSeller === null && normalizedSeller === null) ||
          (normalizedSeller && item.selectedSeller && String(item.selectedSeller._id) === String(normalizedSeller._id));
        return productIdMatch && colorMatch && sizeMatch && sellerMatch;
      });
      if (existingItemIndex > -1) {
        items[existingItemIndex].quantity += quantity;
      } else {
        items.push({
          product,
          quantity,
          color,
          size,
          selectedSeller: normalizedSeller,
          _id: uuidv4()
        });
      }

      const cartInfo = calculateCartInfo(items);
      saveCartToLocalStorage(cartInfo);
      toast.success('کالای مورد نظر با موفقیت به سبد خرید افزوده شد');
      return cartInfo;
    } catch (error) {
      console.error('Error in addToCartThunk:', error);
      toast.error(error.message || 'خطا در افزودن به سبد خرید');
      return rejectWithValue(error.message || 'خطا در افزودن به سبد خرید');
    }
  }
);


export const updateCartItemThunk = createAsyncThunk(
  'cart/updateCartItem',
  async ({ itemId, quantity }, { rejectWithValue }) => {
    try {
      const cartData = getCartFromLocalStorage() || { items: [] };
      let items = JSON.parse(JSON.stringify(cartData.items || [])); // کپی عمیق
      const itemIndex = items.findIndex(item => item._id === itemId);
      if (itemIndex === -1) {
        console.error('Item not found in cart:', { itemId, availableIds: items.map(i => i._id) });
        toast.error('آیتم موردنظر در سبد خرید یافت نشد');
        return rejectWithValue('آیتم موردنظر در سبد خرید یافت نشد');
      }

      const item = items[itemIndex];

      if (item.product.stock < quantity) {
        toast.error('موجودی محصول کافی نیست');
        return rejectWithValue('موجودی محصول کافی نیست');
      }

      if (quantity <= 0) {
        items = items.filter(item => item._id !== itemId);
        toast.info('کالا از سبد خرید حذف شد');
      } else {
        items[itemIndex] = { ...items[itemIndex], quantity }; // ایجاد یک شیء جدید
        toast.success('تعداد کالا با موفقیت تغییر کرد');
      }

      const cartInfo = calculateCartInfo(items);
      saveCartToLocalStorage(cartInfo);
      return cartInfo;
    } catch (error) {
      console.error('Error in updateCartItemThunk:', error);
      toast.error(error.message || 'خطا در به‌روزرسانی سبد خرید');
      return rejectWithValue(error.message || 'خطا در به‌روزرسانی سبد خرید');
    }
  }
);

export const removeFromCartThunk = createAsyncThunk(
  'cart/removeFromCart',
  async (itemId, { rejectWithValue }) => {
    try {
      const cartData = getCartFromLocalStorage() || { items: [] };
      let items = cartData.items || [];
      const itemIndex = items.findIndex(item => item._id === itemId);
      if (itemIndex === -1) {
        console.error('Item not found in cart:', { itemId, availableIds: items.map(i => i._id) });
        toast.error('آیتم موردنظر در سبد خرید یافت نشد');
        return rejectWithValue('آیتم موردنظر در سبد خرید یافت نشد');
      }

      items = items.filter(item => item._id !== itemId);
      const cartInfo = calculateCartInfo(items);
      saveCartToLocalStorage(cartInfo);
      toast.success('کالا با موفقیت از سبد خرید حذف شد');
      return cartInfo;
    } catch (error) {
      console.error('Error in removeFromCartThunk:', error);
      toast.error(error.message || 'خطا در حذف از سبد خرید');
      return rejectWithValue(error.message || 'خطا در حذف از سبد خرید');
    }
  }
);

export const clearCartThunk = createAsyncThunk(
  'cart/clearCart',
  async (_, { rejectWithValue }) => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(CART_STORAGE_KEY);
      }
      toast.success('سبد خرید با موفقیت خالی شد');
      return { items: [], totalPrice: 0, totalDiscount: 0, finalPrice: 0 };
    } catch (error) {
      console.error('Error in clearCartThunk:', error);
      toast.error(error.message || 'خطا در پاک کردن سبد خرید');
      return rejectWithValue(error.message || 'خطا در پاک کردن سبد خرید');
    }
  }
);

export const syncCartFromLocalStorage = createAsyncThunk(
  'cart/syncFromLocalStorage',
  async () => {
    try {
      const cartData = getCartFromLocalStorage();
      // یک کپی تازه برای جلوگیری از مشکل read-only
      const freshCartData = cartData ? JSON.parse(JSON.stringify(cartData)) : { items: [], totalPrice: 0, totalDiscount: 0, finalPrice: 0 };
      return freshCartData;
    } catch (error) {
      console.error('Error in syncCartFromLocalStorage:', error);
      // در صورت خطا، یک سبد خرید خالی برگردانید
      return { items: [], totalPrice: 0, totalDiscount: 0, finalPrice: 0 };
    }
  }
);

mergeGuestCartWithUserCart: (state, action) => {
  const { guestCartItems } = action.payload;
  
  if (!guestCartItems || guestCartItems.length === 0) return;
  
  // ایجاد کپی از آرایه items موجود
  const newItems = [...state.items];
  
  // ترکیب سبد خرید مهمان با سبد خرید کاربر لاگین شده
  guestCartItems.forEach(guestItem => {
    const existingItemIndex = newItems.findIndex(item => 
      item.product._id === guestItem.product._id && 
      item.color === guestItem.color && 
      item.size === guestItem.size
    );
    
    if (existingItemIndex !== -1) {
      // به جای تغییر مستقیم، یک آیتم جدید ایجاد کرده و جایگزین می‌کنیم
      newItems[existingItemIndex] = {
        ...newItems[existingItemIndex],
        quantity: newItems[existingItemIndex].quantity + guestItem.quantity
      };
    } else {
      // افزودن محصول جدید به سبد
      newItems.push(guestItem);
    }
  });
  
  // جایگزینی items با آرایه جدید
  state.items = newItems;
  
  // محاسبه مجدد مجموع قیمت‌ها
  let totalPrice = 0;
  let totalDiscount = 0;
  
  state.items.forEach(item => {
    const product = item.product;
    const quantity = item.quantity;
    
    if (product.hasDiscount) {
      totalPrice += product.price * quantity;
      totalDiscount += (product.price - product.discountedPrice) * quantity;
    } else {
      totalPrice += product.price * quantity;
    }
  });
  
  state.totalPrice = totalPrice;
  state.totalDiscount = totalDiscount;
  state.finalPrice = totalPrice - totalDiscount;
  
  // ذخیره در localStorage
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('nassim_store_cart', JSON.stringify({
        items: state.items,
        totalPrice: state.totalPrice,
        totalDiscount: state.totalDiscount,
        finalPrice: state.finalPrice,
      }));
    } catch (error) {
      console.error('خطا در ذخیره سبد خرید در localStorage:', error);
    }
  }
}

