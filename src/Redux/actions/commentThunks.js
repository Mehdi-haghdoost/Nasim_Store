import { createAsyncThunk } from "@reduxjs/toolkit";
import { ADD_COMMENT, REPLY_TO_COMMENT } from "@/graphql/entities/comments/comment.mutations";
import { GET_USER_COMMENTS } from "@/graphql/entities/comments/comment.queries";
import client from "@/graphql/client";
import { fetchProduct } from "./productThunks";

export const addComment = createAsyncThunk(
  'comment/addComment',
  async ({ product, commentText, rating, name, email, website, strengths, weaknesses }, { rejectWithValue, dispatch }) => {
    try {
      const { data, errors } = await client.mutate({
        mutation: ADD_COMMENT,
        variables: {
          input: {
            product,
            commentText,
            rating,
            name,
            email,
            website,
            strengths,
            weaknesses
          }
        }
      });

      if (errors && Array.isArray(errors) && errors.length > 0) {
        return rejectWithValue(errors[0].message || 'خطای ناشناخته از سرور');
      }

      if (data?.addComment) {
        // بعد از ثبت موفق کامنت، محصول را دوباره دریافت می‌کنیم 
        dispatch(fetchProduct(product));
        return data.addComment;
      }

      return rejectWithValue('خطا در ثبت کامنت');
    } catch (error) {
      return rejectWithValue(error.message || 'خطا در ثبت کامنت');
    }
  }
);

export const replyToComment = createAsyncThunk(
  'comment/replyToComment',
  async ({ parentId, commentText, name, email, rating }, { rejectWithValue, dispatch, getState }) => {
    try {
      // تست console.log برای اطمینان از ارسال درست پارامترها
      console.log("ارسال درخواست پاسخ به کامنت با پارامترها:", {
        parentId, commentText, name, email, rating
      });

      const { data, errors } = await client.mutate({
        mutation: REPLY_TO_COMMENT,
        variables: {
          input: {
            parentId,
            commentText,
            name,
            email,
            rating
          }
        }
      });

      if (errors && Array.isArray(errors) && errors.length > 0) {
        console.error("خطا در پاسخ GraphQL:", errors);
        return rejectWithValue(errors[0].message || 'خطای ناشناخته از سرور');
      }

      if (data?.replyToComment) {
        // بعد از ثبت موفق پاسخ، محصول را دوباره دریافت می‌کنیم تا اطلاعات کامنت‌ها به‌روز شود
        const { product } = getState().product;
        if (product && product._id) {
          dispatch(fetchProduct(product._id));
        }
        return data.replyToComment;
      }

      console.error("داده‌ای از سرور دریافت نشد.");
      return rejectWithValue('خطا در ثبت پاسخ');
    } catch (error) {
      console.error("خطای ارتباط با سرور:", error);
      return rejectWithValue(error.message || 'خطا در ثبت پاسخ');
    }
  }
);

export const getUserComments = createAsyncThunk(
  'comment/getUserComments',
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      console.log('GET_USER_COMMENTS query:', GET_USER_COMMENTS);
      console.log('Fetching user comments with params:', { page, limit });

      const { data, errors } = await client.query({
        query: GET_USER_COMMENTS,
        variables: { page, limit },
        fetchPolicy: 'network-only',
      });

      console.log('Response data:', data);
      console.log('Errors:', errors);

      if (errors && Array.isArray(errors) && errors.length > 0) {
        console.error("GraphQL errors:", errors);
        return rejectWithValue(errors[0].message || 'خطای ناشناخته از سرور');
      }

      if (data?.getUserComments) {
        console.log('User comments retrieved successfully:', data.getUserComments);
        return data.getUserComments;
      }

      console.error('No data returned from getUserComments query');
      return rejectWithValue('خطا در دریافت کامنت‌های کاربر');
    } catch (error) {
      console.error("Error fetching user comments:", error);
      console.error("Error stack:", error.stack);
      return rejectWithValue(error.message || 'خطا در دریافت کامنت‌های کاربر');
    }
  }
);