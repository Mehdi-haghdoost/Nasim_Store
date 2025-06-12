import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import client from "@/graphql/client";
import {
  CREATE_ORDER,
  UPDATE_ORDER,
  CANCEL_ORDER
} from "@/graphql/entities/order/order.mutations";
import {
  GET_USER_ORDERS,
  GET_ORDER_BY_ID,
  GET_ORDER_BY_TRACKING_ID,
  GET_ALL_ORDERS
} from "@/graphql/entities/order/order.queries";

// استخراج پیام خطای کاربرپسند
const extractErrorMessage = (errors) => {
  if (!errors || !Array.isArray(errors) || errors.length === 0) {
    return 'خطای ناشناخته رخ داد';
  }

  const error = errors[0];
  return error.message || 'خطای ناشناخته';
};

// ایجاد سفارش جدید
export const createOrderThunk = createAsyncThunk(
  'order/createOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      console.log('🛍️ Creating order:', orderData);

      const { data, errors } = await client.mutate({
        mutation: CREATE_ORDER,
        variables: { input: orderData },
        fetchPolicy: "no-cache" // برای mutations
      });

      if (errors && errors.length > 0) {
        const errorMessage = extractErrorMessage(errors);
        console.error('❌ GraphQL errors:', errors);
        throw new Error(errorMessage);
      }

      if (!data || !data.createOrder) {
        throw new Error('پاسخ سرور معتبر نیست');
      }

      toast.success('سفارش شما با موفقیت ثبت شد');
      return data.createOrder;

    } catch (error) {
      console.error('❌ Error creating order:', error);
      toast.error(error.message || 'خطا در ثبت سفارش');
      return rejectWithValue(error.message || 'خطا در ثبت سفارش');
    }
  }
);

// دریافت سفارشات کاربر
export const getUserOrdersThunk = createAsyncThunk(
  'order/getUserOrders',
  async (userId = null, { rejectWithValue }) => {
    try {
      console.log('📋 Fetching user orders:', userId);

      const { data, errors } = await client.query({
        query: GET_USER_ORDERS,
        variables: userId ? { userId } : {},
        fetchPolicy: "cache-first", // تغییر از cache-and-network به cache-first
        errorPolicy: "all"
      });

      if (errors && errors.length > 0) {
        const errorMessage = extractErrorMessage(errors);
        console.error('❌ GraphQL errors:', errors);
        throw new Error(errorMessage);
      }

      console.log('✅ Orders fetched successfully:', data.getUserOrders);
      return data.getUserOrders || [];

    } catch (error) {
      console.error('❌ Error fetching user orders:', error);
      return rejectWithValue(error.message || 'خطا در دریافت سفارشات');
    }
  }
);

// دریافت سفارش با ID
export const getOrderByIdThunk = createAsyncThunk(
  'order/getOrderById',
  async (orderId, { rejectWithValue }) => {
    try {
      console.log('🔍 Fetching order by ID:', orderId);

      const { data, errors } = await client.query({
        query: GET_ORDER_BY_ID,
        variables: { orderId },
        fetchPolicy: "cache-first", // تغییر از cache-and-network
        errorPolicy: "all"
      });

      if (errors && errors.length > 0) {
        const errorMessage = extractErrorMessage(errors);
        console.error('❌ GraphQL errors:', errors);
        throw new Error(errorMessage);
      }

      if (!data.getOrderById) {
        throw new Error('سفارش یافت نشد');
      }

      console.log('✅ Order fetched successfully:', data.getOrderById);
      return data.getOrderById;

    } catch (error) {
      console.error('❌ Error fetching order:', error);
      return rejectWithValue(error.message || 'خطا در دریافت سفارش');
    }
  }
);

// پیگیری سفارش با شماره پیگیری
export const getOrderByTrackingIdThunk = createAsyncThunk(
  'order/getOrderByTrackingId',
  async (trackingId, { rejectWithValue }) => {
    try {
      console.log('📦 Tracking order:', trackingId);

      const { data, errors } = await client.query({
        query: GET_ORDER_BY_TRACKING_ID,
        variables: { trackingId },
        fetchPolicy: "network-only", // برای tracking همیشه از شبکه بگیر
        errorPolicy: "all"
      });

      if (errors && errors.length > 0) {
        const errorMessage = extractErrorMessage(errors);
        console.error('❌ GraphQL errors:', errors);
        throw new Error(errorMessage);
      }

      if (!data.getOrderByTrackingId) {
        throw new Error('سفارش با این شماره پیگیری یافت نشد');
      }

      console.log('✅ Order tracked successfully:', data.getOrderByTrackingId);
      return data.getOrderByTrackingId;

    } catch (error) {
      console.error('❌ Error tracking order:', error);
      toast.error(error.message || 'خطا در پیگیری سفارش');
      return rejectWithValue(error.message || 'خطا در پیگیری سفارش');
    }
  }
);

// به‌روزرسانی سفارش
export const updateOrderThunk = createAsyncThunk(
  'order/updateOrder',
  async (updateData, { rejectWithValue }) => {
    try {
      console.log('🔄 Updating order:', updateData);

      const { data, errors } = await client.mutate({
        mutation: UPDATE_ORDER,
        variables: { input: updateData },
        fetchPolicy: "no-cache"
      });

      if (errors && errors.length > 0) {
        const errorMessage = extractErrorMessage(errors);
        console.error('❌ GraphQL errors:', errors);
        throw new Error(errorMessage);
      }

      if (!data || !data.updateOrder) {
        throw new Error('پاسخ سرور معتبر نیست');
      }

      toast.success('سفارش با موفقیت به‌روزرسانی شد');
      return data.updateOrder;

    } catch (error) {
      console.error('❌ Error updating order:', error);
      toast.error(error.message || 'خطا در به‌روزرسانی سفارش');
      return rejectWithValue(error.message || 'خطا در به‌روزرسانی سفارش');
    }
  }
);

// لغو سفارش
export const cancelOrderThunk = createAsyncThunk(
  'order/cancelOrder',
  async (orderId, { rejectWithValue }) => {
    try {
      console.log('❌ Cancelling order:', orderId);

      const { data, errors } = await client.mutate({
        mutation: CANCEL_ORDER,
        variables: { orderId },
        fetchPolicy: "no-cache"
      });

      if (errors && errors.length > 0) {
        const errorMessage = extractErrorMessage(errors);
        console.error('❌ GraphQL errors:', errors);
        throw new Error(errorMessage);
      }

      if (!data || !data.cancelOrder) {
        throw new Error('پاسخ سرور معتبر نیست');
      }

      toast.success('سفارش با موفقیت لغو شد');
      return data.cancelOrder;

    } catch (error) {
      console.error('❌ Error cancelling order:', error);
      toast.error(error.message || 'خطا در لغو سفارش');
      return rejectWithValue(error.message || 'خطا در لغو سفارش');
    }
  }
);

// دریافت همه سفارشات (برای ادمین)
export const getAllOrdersThunk = createAsyncThunk(
  'order/getAllOrders',
  async (_, { rejectWithValue }) => {
    try {
      console.log('📊 Fetching all orders (admin)');

      const { data, errors } = await client.query({
        query: GET_ALL_ORDERS,
        fetchPolicy: "network-only", // ادمین همیشه داده‌های تازه ببینه
        errorPolicy: "all"
      });

      if (errors && errors.length > 0) {
        const errorMessage = extractErrorMessage(errors);
        console.error('❌ GraphQL errors:', errors);
        throw new Error(errorMessage);
      }

      console.log('✅ All orders fetched successfully');
      return data.getAllOrders || [];

    } catch (error) {
      console.error('❌ Error fetching all orders:', error);
      return rejectWithValue(error.message || 'خطا در دریافت سفارشات');
    }
  }
);