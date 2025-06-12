import { createSlice } from "@reduxjs/toolkit";
import {
  createOrderThunk,
  getUserOrdersThunk,
  getOrderByIdThunk,
  getOrderByTrackingIdThunk,
  updateOrderThunk,
  cancelOrderThunk,
  getAllOrdersThunk
} from "../actions/orderThunks";

const initialState = {
  // لیست سفارشات کاربر
  userOrders: [],
  
  // سفارش جاری (برای نمایش جزئیات)
  currentOrder: null,
  
  // لیست همه سفارشات (برای ادمین)
  allOrders: [],
  
  // وضعیت بارگذاری
  loading: false,
  
  // خطاها
  error: null,
  
  // آخرین سفارش ایجاد شده
  lastCreatedOrder: null,
  
  // وضعیت عملیات‌های مختلف
  creating: false,
  updating: false,
  cancelling: false,
  
  // آمار سفارشات
  orderStats: {
    total: 0,
    pending: 0,
    shipped: 0,
    delivered: 0,
    cancelled: 0
  }
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    // پاک کردن خطاها
    clearOrderError: (state) => {
      state.error = null;
    },
    
    // ریست کردن سفارش جاری
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
    
    // ریست کردن آخرین سفارش ایجاد شده
    clearLastCreatedOrder: (state) => {
      state.lastCreatedOrder = null;
    },
    
    // به‌روزرسانی آمار سفارشات
    updateOrderStats: (state) => {
      const orders = state.userOrders;
      state.orderStats = {
        total: orders.length,
        pending: orders.filter(order => order.status === 'PENDING').length,
        shipped: orders.filter(order => order.status === 'SHIPPED').length,
        delivered: orders.filter(order => order.status === 'DELIVERED').length,
        cancelled: orders.filter(order => order.status === 'CANCELLED').length
      };
    }
  },
  
  extraReducers: (builder) => {
    // ایجاد سفارش
    builder
      .addCase(createOrderThunk.pending, (state) => {
        state.creating = true;
        state.error = null;
      })
      .addCase(createOrderThunk.fulfilled, (state, action) => {
        state.creating = false;
        state.error = null;
        state.lastCreatedOrder = action.payload;
        
        // افزودن به لیست سفارشات کاربر
        state.userOrders.unshift(action.payload);
        
        // به‌روزرسانی آمار
        const orders = state.userOrders;
        state.orderStats = {
          total: orders.length,
          pending: orders.filter(order => order.status === 'PENDING').length,
          shipped: orders.filter(order => order.status === 'SHIPPED').length,
          delivered: orders.filter(order => order.status === 'DELIVERED').length,
          cancelled: orders.filter(order => order.status === 'CANCELLED').length
        };
      })
      .addCase(createOrderThunk.rejected, (state, action) => {
        state.creating = false;
        state.error = action.payload;
      })

    // دریافت سفارشات کاربر
    builder
      .addCase(getUserOrdersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserOrdersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.userOrders = action.payload;
        
        // محاسبه آمار
        const orders = action.payload;
        state.orderStats = {
          total: orders.length,
          pending: orders.filter(order => order.status === 'PENDING').length,
          shipped: orders.filter(order => order.status === 'SHIPPED').length,
          delivered: orders.filter(order => order.status === 'DELIVERED').length,
          cancelled: orders.filter(order => order.status === 'CANCELLED').length
        };
      })
      .addCase(getUserOrdersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

    // دریافت سفارش با ID
    builder
      .addCase(getOrderByIdThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.currentOrder = action.payload;
      })
      .addCase(getOrderByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.currentOrder = null;
      })

    // پیگیری سفارش
    builder
      .addCase(getOrderByTrackingIdThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderByTrackingIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.currentOrder = action.payload;
      })
      .addCase(getOrderByTrackingIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.currentOrder = null;
      })

    // به‌روزرسانی سفارش
    builder
      .addCase(updateOrderThunk.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(updateOrderThunk.fulfilled, (state, action) => {
        state.updating = false;
        state.error = null;
        
        const updatedOrder = action.payload;
        
        // به‌روزرسانی در لیست سفارشات کاربر
        const orderIndex = state.userOrders.findIndex(order => order._id === updatedOrder._id);
        if (orderIndex !== -1) {
          state.userOrders[orderIndex] = { ...state.userOrders[orderIndex], ...updatedOrder };
        }
        
        // به‌روزرسانی سفارش جاری
        if (state.currentOrder && state.currentOrder._id === updatedOrder._id) {
          state.currentOrder = { ...state.currentOrder, ...updatedOrder };
        }
        
        // به‌روزرسانی در لیست همه سفارشات (برای ادمین)
        const allOrderIndex = state.allOrders.findIndex(order => order._id === updatedOrder._id);
        if (allOrderIndex !== -1) {
          state.allOrders[allOrderIndex] = { ...state.allOrders[allOrderIndex], ...updatedOrder };
        }
      })
      .addCase(updateOrderThunk.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
      })

    // لغو سفارش
    builder
      .addCase(cancelOrderThunk.pending, (state) => {
        state.cancelling = true;
        state.error = null;
      })
      .addCase(cancelOrderThunk.fulfilled, (state, action) => {
        state.cancelling = false;
        state.error = null;
        
        const cancelledOrder = action.payload;
        
        // به‌روزرسانی در لیست سفارشات کاربر
        const orderIndex = state.userOrders.findIndex(order => order._id === cancelledOrder._id);
        if (orderIndex !== -1) {
          state.userOrders[orderIndex] = { ...state.userOrders[orderIndex], ...cancelledOrder };
        }
        
        // به‌روزرسانی سفارش جاری
        if (state.currentOrder && state.currentOrder._id === cancelledOrder._id) {
          state.currentOrder = { ...state.currentOrder, ...cancelledOrder };
        }
        
        // به‌روزرسانی آمار
        const orders = state.userOrders;
        state.orderStats = {
          total: orders.length,
          pending: orders.filter(order => order.status === 'PENDING').length,
          shipped: orders.filter(order => order.status === 'SHIPPED').length,
          delivered: orders.filter(order => order.status === 'DELIVERED').length,
          cancelled: orders.filter(order => order.status === 'CANCELLED').length
        };
      })
      .addCase(cancelOrderThunk.rejected, (state, action) => {
        state.cancelling = false;
        state.error = action.payload;
      })

    // دریافت همه سفارشات (ادمین)
    builder
      .addCase(getAllOrdersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllOrdersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.allOrders = action.payload;
      })
      .addCase(getAllOrdersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearOrderError,
  clearCurrentOrder,
  clearLastCreatedOrder,
  updateOrderStats
} = orderSlice.actions;

export default orderSlice.reducer;