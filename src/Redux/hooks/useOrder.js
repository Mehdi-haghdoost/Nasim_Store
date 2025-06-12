import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import {
  createOrderThunk,
  getUserOrdersThunk,
  getOrderByIdThunk,
  getOrderByTrackingIdThunk,
  updateOrderThunk,
  cancelOrderThunk,
  getAllOrdersThunk
} from "../actions/orderThunks";
import {
  clearOrderError,
  clearCurrentOrder,
  clearLastCreatedOrder,
  updateOrderStats
} from "../slices/orderSlice";

export const useOrder = () => {
  const dispatch = useDispatch();
  const order = useSelector(state => state.order);

  // ایجاد سفارش جدید
  const createOrder = useCallback(async (orderData) => {
    try {
      console.log('🛍️ Creating order via hook:', orderData);
      const result = await dispatch(createOrderThunk(orderData)).unwrap();
      console.log('✅ Order created successfully:', result);
      return result;
    } catch (error) {
      console.error('❌ Error in createOrder hook:', error);
      throw error;
    }
  }, [dispatch]);

  // دریافت سفارشات کاربر
  const getUserOrders = useCallback(async (userId = null) => {
    try {
      console.log('📋 Getting user orders via hook, userId:', userId);
      const result = await dispatch(getUserOrdersThunk(userId)).unwrap();
      console.log('✅ User orders fetched successfully:', result?.length, 'orders');
      return result;
    } catch (error) {
      console.error('❌ Error in getUserOrders hook:', error);
      throw error;
    }
  }, [dispatch]);

  // دریافت سفارش با ID
  const getOrderById = useCallback(async (orderId) => {
    try {
      console.log('🔍 Getting order by ID via hook:', orderId);
      const result = await dispatch(getOrderByIdThunk(orderId)).unwrap();
      console.log('✅ Order fetched by ID successfully:', result?._id);
      return result;
    } catch (error) {
      console.error('❌ Error in getOrderById hook:', error);
      throw error;
    }
  }, [dispatch]);

  // پیگیری سفارش با شماره پیگیری
  const getOrderByTrackingId = useCallback(async (trackingId) => {
    try {
      console.log('📦 Tracking order via hook:', trackingId);
      const result = await dispatch(getOrderByTrackingIdThunk(trackingId)).unwrap();
      console.log('✅ Order tracked successfully:', result?.trackingId);
      return result;
    } catch (error) {
      console.error('❌ Error in getOrderByTrackingId hook:', error);
      throw error;
    }
  }, [dispatch]);

  // به‌روزرسانی سفارش
  const updateOrder = useCallback(async (updateData) => {
    try {
      console.log('🔄 Updating order via hook:', updateData);
      const result = await dispatch(updateOrderThunk(updateData)).unwrap();
      console.log('✅ Order updated successfully:', result?._id);
      return result;
    } catch (error) {
      console.error('❌ Error in updateOrder hook:', error);
      throw error;
    }
  }, [dispatch]);

  // لغو سفارش
  const cancelOrder = useCallback(async (orderId) => {
    try {
      console.log('❌ Cancelling order via hook:', orderId);
      const result = await dispatch(cancelOrderThunk(orderId)).unwrap();
      console.log('✅ Order cancelled successfully:', result?._id);
      return result;
    } catch (error) {
      console.error('❌ Error in cancelOrder hook:', error);
      throw error;
    }
  }, [dispatch]);

  // دریافت همه سفارشات (ادمین)
  const getAllOrders = useCallback(async () => {
    try {
      console.log('📊 Getting all orders via hook (admin)');
      const result = await dispatch(getAllOrdersThunk()).unwrap();
      console.log('✅ All orders fetched successfully:', result?.length, 'orders');
      return result;
    } catch (error) {
      console.error('❌ Error in getAllOrders hook:', error);
      throw error;
    }
  }, [dispatch]);

  // تبدیل localStorage order_details به فرمت مناسب GraphQL
  const convertOrderDetailsToGraphQL = useCallback((orderDetails, userId) => {
    try {
      console.log('🔄 Converting order details to GraphQL format');
      const { customerInfo, items, deliveryDay, shippingMethod, paymentMethod, pricing, appliedDiscount } = orderDetails;

      const convertedData = {
        user: userId,
        items: items.map(item => ({
          product: item.product._id,
          quantity: item.quantity,
          name: item.product.title || item.product.name,
          price: item.product.hasDiscount ? item.product.discountedPrice : item.product.price,
          image: item.product.image || '/images/default-product.jpg'
        })),
        recipient: `${customerInfo.firstName} ${customerInfo.lastName}`,
        phoneNumber: customerInfo.phone,
        shippingAddress: `${customerInfo.street}, ${customerInfo.city}, ${customerInfo.province}${customerInfo.unit ? `, واحد ${customerInfo.unit}` : ''}`,
        postalCode: customerInfo.postalCode,
        totalAmount: pricing.finalPrice,
        paymentMethod: paymentMethod,
        discountCoupon: appliedDiscount ? {
          code: appliedDiscount.code,
          discountPercentage: appliedDiscount.percent,
          used: true
        } : undefined,
        shippingCost: pricing.shippingCost,
        deliveryDate: deliveryDay ? new Date(deliveryDay.date).toISOString() : undefined
      };

      console.log('✅ Order details converted successfully');
      return convertedData;
    } catch (error) {
      console.error('❌ Error converting order details:', error);
      throw error;
    }
  }, []);

  // ایجاد سفارش از localStorage
  const createOrderFromLocalStorage = useCallback(async (userId) => {
    try {
      console.log('🛒 Creating order from localStorage for user:', userId);
      
      const orderDetailsStr = localStorage.getItem('order_details');
      if (!orderDetailsStr) {
        throw new Error('اطلاعات سفارش در localStorage یافت نشد');
      }

      const orderDetails = JSON.parse(orderDetailsStr);
      const graphqlOrderData = convertOrderDetailsToGraphQL(orderDetails, userId);
      
      const result = await createOrder(graphqlOrderData);
      
      // پاک کردن localStorage پس از ثبت موفق
      localStorage.removeItem('order_details');
      localStorage.removeItem('checkout_data');
      
      console.log('✅ Order created from localStorage successfully');
      return result;
    } catch (error) {
      console.error('❌ Error creating order from localStorage:', error);
      throw error;
    }
  }, [createOrder, convertOrderDetailsToGraphQL]);

  // دریافت جزئیات محصول از items
  const getProductDetails = useCallback((orderItem) => {
    try {
      // اولویت با product populate شده
      if (orderItem.product) {
        return {
          _id: orderItem.product._id,
          title: orderItem.product.title,
          image: orderItem.product.image,
          price: orderItem.product.price,
          discountedPrice: orderItem.product.discountedPrice,
          hasDiscount: orderItem.product.hasDiscount,
          finalPrice: orderItem.product.hasDiscount ? orderItem.product.discountedPrice : orderItem.product.price
        };
      }
      
      // fallback به item data
      return {
        _id: orderItem.product || 'unknown',
        title: orderItem.name,
        image: orderItem.image,
        price: orderItem.price,
        discountedPrice: orderItem.price,
        hasDiscount: false,
        finalPrice: orderItem.price
      };
    } catch (error) {
      console.error('❌ Error getting product details:', error);
      return {
        _id: 'unknown',
        title: 'محصول نامشخص',
        image: '/images/product/product-image1.jpg',
        price: 0,
        discountedPrice: 0,
        hasDiscount: false,
        finalPrice: 0
      };
    }
  }, []);

  // محاسبه خلاصه سفارش
  const getOrderSummary = useCallback((order) => {
    try {
      if (!order || !order.items) return null;

      const itemCount = order.items.reduce((total, item) => total + item.quantity, 0);
      const firstProduct = order.items[0];
      const productDetails = getProductDetails(firstProduct);

      return {
        _id: order._id,
        trackingId: order.trackingId,
        orderDate: order.orderDate,
        status: order.status,
        totalAmount: order.totalAmount,
        itemCount,
        firstProduct: productDetails,
        hasMultipleProducts: order.items.length > 1,
        additionalProductsCount: order.items.length - 1,
        recipient: order.recipient,
        phoneNumber: order.phoneNumber,
        shippingAddress: order.shippingAddress
      };
    } catch (error) {
      console.error('❌ Error getting order summary:', error);
      return null;
    }
  }, [getProductDetails]);

  // Helper functions
  const getOrderStatusColor = useCallback((status) => {
    switch (status) {
      case 'PENDING':
        return 'warning';
      case 'SHIPPED':
        return 'info';
      case 'DELIVERED':
        return 'success';
      case 'CANCELLED':
        return 'danger';
      default:
        return 'secondary';
    }
  }, []);

  const getOrderStatusText = useCallback((status) => {
    switch (status) {
      case 'PENDING':
        return 'در انتظار پردازش';
      case 'SHIPPED':
        return 'ارسال شده';
      case 'DELIVERED':
        return 'تحویل داده شده';
      case 'CANCELLED':
        return 'لغو شده';
      default:
        return 'نامشخص';
    }
  }, []);

  const getPaymentMethodText = useCallback((method) => {
    switch (method) {
      case 'DirectBankPayment':
        return 'پرداخت آنلاین';
      case 'CashOnDelivery':
        return 'پرداخت در محل';
      default:
        return 'نامشخص';
    }
  }, []);

  return {
    // State
    userOrders: order.userOrders,
    currentOrder: order.currentOrder,
    allOrders: order.allOrders,
    lastCreatedOrder: order.lastCreatedOrder,
    orderStats: order.orderStats,
    
    // Loading states
    loading: order.loading,
    creating: order.creating,
    updating: order.updating,
    cancelling: order.cancelling,
    
    // Error
    error: order.error,
    
    // Actions
    createOrder,
    getUserOrders,
    getOrderById,
    getOrderByTrackingId,
    updateOrder,
    cancelOrder,
    getAllOrders,
    createOrderFromLocalStorage,
    
    // Utils
    clearError: useCallback(() => dispatch(clearOrderError()), [dispatch]),
    clearCurrentOrder: useCallback(() => dispatch(clearCurrentOrder()), [dispatch]),
    clearLastCreatedOrder: useCallback(() => dispatch(clearLastCreatedOrder()), [dispatch]),
    updateStats: useCallback(() => dispatch(updateOrderStats()), [dispatch]),
    convertOrderDetailsToGraphQL,
    
    // Product helpers
    getProductDetails,
    getOrderSummary,
    
    // Helpers
    getOrderStatusColor,
    getOrderStatusText,
    getPaymentMethodText,
  };
};