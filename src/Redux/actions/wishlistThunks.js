import { createAsyncThunk } from '@reduxjs/toolkit';
import client from '@/graphql/client';
import { GET_USER_WISHLIST, IS_IN_WISHLIST } from '@/graphql/entities/wishlist/wishlist.queries';
import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } from '@/graphql/entities/wishlist/wishlist.mutations';

export const getUserWishlist = createAsyncThunk(
  'wishlist/getUserWishlist',
  async (_, { rejectWithValue }) => {
    try {
      console.log('Fetching wishlist with query:', GET_USER_WISHLIST);
      
      const { data, errors } = await client.query({
        query: GET_USER_WISHLIST,
        fetchPolicy: 'network-only'
      });
      
      console.log('Wishlist response:', { data, errors });
      
      if (errors && errors.length > 0) {
        console.error('GraphQL errors:', errors);
        // هنگام خطا آرایه خالی برمی‌گردانیم به جای rejectWithValue
        // این باعث می‌شود صفحه به جای نمایش خطا، صفحه خالی نمایش دهد
        return [];
      }
      
      if (!data || !data.getUserWishlist) {
        console.log('No wishlist data found or empty array returned');
        return [];
      }
      
      // اضافه کردن لاگ اطلاعات محصولات
      console.log('Wishlist products received:', data.getUserWishlist.length, 'items');
      
      return data.getUserWishlist;
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      // هنگام خطا آرایه خالی برمی‌گردانیم به جای rejectWithValue
      return [];
    }
  }
);


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
      
      if (!data.addToWishlist.success) {
        throw new Error(data.addToWishlist.message || 'خطا در افزودن به لیست علاقه‌مندی‌ها');
      }
      
      return data.addToWishlist;
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      return rejectWithValue('خطا در افزودن به لیست علاقه‌مندی‌ها');
    }
  }
);

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
      
      if (!data.removeFromWishlist.success) {
        throw new Error(data.removeFromWishlist.message || 'خطا در حذف از لیست علاقه‌مندی‌ها');
      }
      
      return data.removeFromWishlist;
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      return rejectWithValue('خطا در حذف از لیست علاقه‌مندی‌ها');
    }
  }
);

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
      return rejectWithValue('خطا در بررسی وضعیت علاقه‌مندی');
    }
  }
);