import { createSlice } from '@reduxjs/toolkit';
import { addToWishlist, removeFromWishlist, getUserWishlist, checkIsInWishlist } from '../actions/wishlistThunks';

const initialState = {
  wishlistItems: [],
  loading: false,
  error: null,
  addLoading: false,
  removeLoading: false,
  isInWishlistStatus: {},  // وضعیت علاقه‌مندی هر محصول {[productId]: boolean}
  isInWishlistLoading: {}  // وضعیت بارگذاری هر محصول {[productId]: boolean}
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    clearWishlistError: (state) => {
      state.error = null;
    },
    resetWishlist: () => initialState,
  },
  extraReducers: (builder) => {
    // دریافت لیست علاقه‌مندی‌ها
    builder.addCase(getUserWishlist.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getUserWishlist.fulfilled, (state, action) => {
      state.loading = false;
      state.wishlistItems = action.payload || [];
    });
    builder.addCase(getUserWishlist.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // افزودن به لیست علاقه‌مندی‌ها
    builder.addCase(addToWishlist.pending, (state) => {
      state.addLoading = true;
      state.error = null;
    });
    builder.addCase(addToWishlist.fulfilled, (state, action) => {
      state.addLoading = false;
      // بررسی اگر محصول به درستی اضافه شده و در پاسخ وجود دارد
      if (action.payload?.productId) {
        // اگر محصول با جزئیات کامل در پاسخ برگشته
        if (action.meta?.arg?.product) {
          const productExists = state.wishlistItems.some(item => item._id === action.payload.productId);
          if (!productExists) {
            state.wishlistItems.push(action.meta.arg.product);
          }
        }
        // آپدیت وضعیت علاقه‌مندی برای این محصول
        state.isInWishlistStatus[action.payload.productId] = true;
      }
    });
    builder.addCase(addToWishlist.rejected, (state, action) => {
      state.addLoading = false;
      state.error = action.error.message;
    });

    // حذف از لیست علاقه‌مندی‌ها
    builder.addCase(removeFromWishlist.pending, (state) => {
      state.removeLoading = true;
      state.error = null;
    });
    builder.addCase(removeFromWishlist.fulfilled, (state, action) => {
      state.removeLoading = false;
      if (action.payload?.productId) {
        // حذف محصول از آرایه
        state.wishlistItems = state.wishlistItems.filter(
          item => item._id !== action.payload.productId
        );
        // آپدیت وضعیت علاقه‌مندی
        state.isInWishlistStatus[action.payload.productId] = false;
      }
    });
    builder.addCase(removeFromWishlist.rejected, (state, action) => {
      state.removeLoading = false;
      state.error = action.error.message;
    });

    // بررسی علاقه‌مندی محصول
    builder.addCase(checkIsInWishlist.pending, (state, action) => {
      const productId = action.meta?.arg?.productId;
      if (productId) {
        state.isInWishlistLoading[productId] = true;
      }
    });
    builder.addCase(checkIsInWishlist.fulfilled, (state, action) => {
      const productId = action.meta?.arg?.productId;
      if (productId) {
        state.isInWishlistLoading[productId] = false;
        state.isInWishlistStatus[productId] = action.payload;
      }
    });
    builder.addCase(checkIsInWishlist.rejected, (state, action) => {
      const productId = action.meta?.arg?.productId;
      if (productId) {
        state.isInWishlistLoading[productId] = false;
      }
    });
  }
});

export const { clearWishlistError, resetWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;