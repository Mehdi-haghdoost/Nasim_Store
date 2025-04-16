// # اسلایس مربوط به سبد خرید با ذخیره‌سازی در localStorage

import { createSlice } from "@reduxjs/toolkit";
import { 
  addToCartThunk, 
  updateCartItemThunk, 
  removeFromCartThunk, 
  clearCartThunk,
  syncCartFromLocalStorage
} from "../actions/cartThunks";

// هنگام لود شدن سبد خرید، از localStorage آن را بارگذاری می‌کنیم
const loadInitialState = () => {
  if (typeof window === 'undefined') {
    return { items: [], totalPrice: 0, totalDiscount: 0, finalPrice: 0 };
  }
  
  try {
    const cartData = localStorage.getItem('nassim_store_cart');
    if (cartData) {
      const parsedCart = JSON.parse(cartData);
      return {
        items: parsedCart.items || [],
        totalPrice: parsedCart.totalPrice || 0,
        totalDiscount: parsedCart.totalDiscount || 0,
        finalPrice: parsedCart.finalPrice || 0,
      };
    }
  } catch (error) {
    console.error('خطا در خواندن سبد خرید از localStorage:', error);
  }
  
  return { items: [], totalPrice: 0, totalDiscount: 0, finalPrice: 0 };
};

const initialState = {
  ...loadInitialState(),
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCartError: (state) => {
      state.error = null;
    },
    calculateCartTotals: (state) => {
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
    },
    clearCartState: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.totalDiscount = 0;
      state.finalPrice = 0;
      state.loading = false;
      state.error = null;
      
      // پاک کردن از localStorage
      if (typeof window !== 'undefined') {
        try {
          localStorage.removeItem('nassim_store_cart');
        } catch (error) {
          console.error('خطا در پاک کردن سبد خرید از localStorage:', error);
        }
      }
    },
    mergeGuestCartWithUserCart: (state, action) => {
      const { guestCartItems } = action.payload;
      
      if (!guestCartItems || guestCartItems.length === 0) return;
      
      // ترکیب سبد خرید مهمان با سبد خرید کاربر لاگین شده
      guestCartItems.forEach(guestItem => {
        const existingItemIndex = state.items.findIndex(item => 
          item.product._id === guestItem.product._id && 
          item.color === guestItem.color && 
          item.size === guestItem.size
        );
        
        if (existingItemIndex !== -1) {
          // افزایش تعداد اگر محصول از قبل در سبد وجود دارد
          state.items[existingItemIndex].quantity += guestItem.quantity;
        } else {
          // افزودن محصول جدید به سبد
          state.items.push(guestItem);
        }
      });
      
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
  },
  extraReducers: (builder) => {
    // Add to Cart
    builder
      .addCase(addToCartThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCartThunk.fulfilled, (state, action) => {
        const { items, totalPrice, totalDiscount, finalPrice } = action.payload;
        state.items = items;
        state.totalPrice = totalPrice;
        state.totalDiscount = totalDiscount;
        state.finalPrice = finalPrice;
        state.loading = false;
        state.error = null;
      })
      .addCase(addToCartThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
    // Update Cart Item
      .addCase(updateCartItemThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItemThunk.fulfilled, (state, action) => {
        const { items, totalPrice, totalDiscount, finalPrice } = action.payload;
        state.items = items;
        state.totalPrice = totalPrice;
        state.totalDiscount = totalDiscount;
        state.finalPrice = finalPrice;
        state.loading = false;
        state.error = null;
      })
      .addCase(updateCartItemThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
    // Remove from Cart
      .addCase(removeFromCartThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCartThunk.fulfilled, (state, action) => {
        const { items, totalPrice, totalDiscount, finalPrice } = action.payload;
        state.items = items;
        state.totalPrice = totalPrice;
        state.totalDiscount = totalDiscount;
        state.finalPrice = finalPrice;
        state.loading = false;
        state.error = null;
      })
      .addCase(removeFromCartThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
    // Clear Cart
      .addCase(clearCartThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearCartThunk.fulfilled, (state) => {
        state.items = [];
        state.totalPrice = 0;
        state.totalDiscount = 0;
        state.finalPrice = 0;
        state.loading = false;
        state.error = null;
      })
      .addCase(clearCartThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
    // Sync Cart from LocalStorage
      .addCase(syncCartFromLocalStorage.fulfilled, (state, action) => {
        if (action.payload) {
          const { items, totalPrice, totalDiscount, finalPrice } = action.payload;
          state.items = items || [];
          state.totalPrice = totalPrice || 0;
          state.totalDiscount = totalDiscount || 0;
          state.finalPrice = finalPrice || 0;
        }
      });
  },
});

export const { 
  clearCartError, 
  calculateCartTotals, 
  clearCartState,
  mergeGuestCartWithUserCart
} = cartSlice.actions;
export default cartSlice.reducer;