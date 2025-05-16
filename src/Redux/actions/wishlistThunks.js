import { createAsyncThunk } from '@reduxjs/toolkit';
import client from '@/graphql/client';
import { GET_USER_WISHLIST, IS_IN_WISHLIST } from '@/graphql/entities/wishlist/wishlist.queries';
import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } from '@/graphql/entities/wishlist/wishlist.mutations';

// دریافت لیست علاقه‌مندی‌های کاربر
export const getUserWishlist = createAsyncThunk(
  'wishlist/getUserWishlist',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await client.query({
        query: GET_USER_WISHLIST,
        fetchPolicy: 'network-only' // برای اطمینان از به‌روز بودن داده‌ها
      });
      return data.getUserWishlist;
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      return rejectWithValue(error.message || 'خطا در دریافت لیست علاقه‌مندی‌ها');
    }
  }
);

// افزودن محصول به لیست علاقه‌مندی‌ها
export const addToWishlist = createAsyncThunk(
  'wishlist/addToWishlist',
  async ({ productId, product }, { rejectWithValue }) => {
    try {
      const { data } = await client.mutate({
        mutation: ADD_TO_WISHLIST,
        variables: {
          input: { productId }
        }
      });
      
      // بررسی پاسخ
      if (!data.addToWishlist.success) {
        throw new Error(data.addToWishlist.message || 'خطا در افزودن به لیست علاقه‌مندی‌ها');
      }
      
      return data.addToWishlist;
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      return rejectWithValue(error.message || 'خطا در افزودن به لیست علاقه‌مندی‌ها');
    }
  }
);

// حذف محصول از لیست علاقه‌مندی‌ها
export const removeFromWishlist = createAsyncThunk(
  'wishlist/removeFromWishlist',
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await client.mutate({
        mutation: REMOVE_FROM_WISHLIST,
        variables: {
          input: { productId }
        }
      });
      
      // بررسی پاسخ
      if (!data.removeFromWishlist.success) {
        throw new Error(data.removeFromWishlist.message || 'خطا در حذف از لیست علاقه‌مندی‌ها');
      }
      
      return data.removeFromWishlist;
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      return rejectWithValue(error.message || 'خطا در حذف از لیست علاقه‌مندی‌ها');
    }
  }
);

// بررسی آیا محصول در لیست علاقه‌مندی‌ها وجود دارد
export const checkIsInWishlist = createAsyncThunk(
  'wishlist/checkIsInWishlist',
  async ({ productId }, { rejectWithValue }) => {
    try {
      const { data } = await client.query({
        query: IS_IN_WISHLIST,
        variables: { productId },
        fetchPolicy: 'network-only'
      });
      
      return data.isInWishlist;
    } catch (error) {
      console.error('Error checking wishlist status:', error);
      return rejectWithValue(error.message || 'خطا در بررسی وضعیت علاقه‌مندی');
    }
  }
);