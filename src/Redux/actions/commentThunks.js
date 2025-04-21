import { createAsyncThunk } from "@reduxjs/toolkit";
import { REPLY_TO_COMMENT } from "@/graphql/entities/comments/comment.mutations";
import client from "@/graphql/client";
import { fetchProduct } from "./productThunks";

export const replyToComment = createAsyncThunk(
  'comment/replyToComment',
  async ({ parentId, commentText, name, email }, { rejectWithValue, dispatch, getState }) => {
    try {
      const { data, errors } = await client.mutate({
        mutation: REPLY_TO_COMMENT,
        variables: {
          input: {
            parentId,
            commentText,
            name,
            email
          }
        }
      });

      if (errors && Array.isArray(errors) && errors.length > 0) {
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

      return rejectWithValue('خطا در ثبت پاسخ');
    } catch (error) {
      return rejectWithValue(error.message || 'خطا در ثبت پاسخ');
    }
  }
);