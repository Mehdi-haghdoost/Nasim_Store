import { createAsyncThunk } from "@reduxjs/toolkit";
import { ADD_COMMENT, REPLY_TO_COMMENT, DELETE_COMMENT } from "@/graphql/entities/comments/comment.mutations";
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
        return rejectWithValue(errors[0].message || 'مشکلی در ثبت کامنت رخ داد.');
      }

      if (data?.addComment) {
        dispatch(fetchProduct(product));
        return data.addComment;
      }

      return rejectWithValue('مشکلی در ثبت کامنت رخ داد.');
    } catch (error) {
      console.error('Error in addComment:', error);
      return rejectWithValue('مشکلی در ارتباط با سرور رخ داد. لطفاً دوباره تلاش کنید.');
    }
  }
);

export const replyToComment = createAsyncThunk(
  'comment/replyToComment',
  async ({ parentId, commentText, name, email, rating }, { rejectWithValue, dispatch, getState }) => {
    try {
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
        return rejectWithValue(errors[0].message || 'مشکلی در ثبت پاسخ رخ داد.');
      }

      if (data?.replyToComment) {
        const { product } = getState().product;
        if (product && product._id) {
          dispatch(fetchProduct(product._id));
        }
        return data.replyToComment;
      }

      console.error("داده‌ای از سرور دریافت نشد.");
      return rejectWithValue('مشکلی در ثبت پاسخ رخ داد.');
    } catch (error) {
      console.error("خطای ارتباط با سرور:", error);
      return rejectWithValue('مشکلی در ارتباط با سرور رخ داد. لطفاً دوباره تلاش کنید.');
    }
  }
);

export const getUserComments = createAsyncThunk(
  'comment/getUserComments',
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const { data, errors } = await client.query({
        query: GET_USER_COMMENTS,
        variables: { page, limit },
        fetchPolicy: 'network-only',
      });
      if (errors && Array.isArray(errors) && errors.length > 0) {
        console.error("GraphQL errors:", errors);
        return rejectWithValue(errors[0].message || 'مشکلی در دریافت کامنت‌ها رخ داد.');
      }

      if (data?.getUserComments) {
        return data.getUserComments;
      }

      console.error('No data returned from getUserComments query');
      return rejectWithValue('مشکلی در دریافت کامنت‌ها رخ داد.');
    } catch (error) {
      console.error("Error fetching user comments:", error);
      console.error("Error stack:", error.stack);
      return rejectWithValue('مشکلی در ارتباط با سرور رخ داد. لطفاً دوباره تلاش کنید.');
    }
  }
);

export const deleteComment = createAsyncThunk(
  'comment/deleteComment',
  async (commentId, { rejectWithValue, dispatch, getState }) => {
    try {
      const { comment } = getState();
      const currentPage = comment.currentPage || 1;
      const limit = 10;
      const { data, errors } = await client.mutate({
        mutation: DELETE_COMMENT,
        variables: { commentId },
        refetchQueries: [{
          query: GET_USER_COMMENTS,
          variables: { page: currentPage, limit },
          fetchPolicy: 'network-only',
        }],
      });
      if (errors && Array.isArray(errors) && errors.length > 0) {
        console.error('GraphQL errors in deleteComment:', errors);
        return rejectWithValue(errors[0].message || 'مشکلی در حذف دیدگاه رخ داد.');
      }

      if (data?.deleteComment && data.deleteComment.success) {
        return data.deleteComment;
      }

      return rejectWithValue('مشکلی در حذف دیدگاه رخ داد.');
    } catch (error) {
      console.error('Error in deleteComment:', error);
      return rejectWithValue('مشکلی در ارتباط با سرور رخ داد. لطفاً دوباره تلاش کنید.');
    }
  }
);