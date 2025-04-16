// # هوک مدیریت سبد خرید مبتنی بر localStorage و Redux

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { 
  addToCartThunk, 
  updateCartItemThunk, 
  removeFromCartThunk, 
  clearCartThunk,
  syncCartFromLocalStorage,
  mergeGuestCartWithUserCartThunk
} from "../actions/cartThunks";
import { clearCartError, clearCartState } from "../slices/cartSlice";
import { useAuth } from "./useAuth";

export const useCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const { user, isAuthenticated } = useAuth();
  
  // همگام‌سازی سبد خرید از localStorage هنگام بارگذاری کامپوننت
  useEffect(() => {
    dispatch(syncCartFromLocalStorage());
  }, [dispatch]);
  
  // ادغام سبد خرید مهمان با سبد خرید کاربر هنگام لاگین
  useEffect(() => {
    if (isAuthenticated && user?._id) {
      dispatch(mergeGuestCartWithUserCartThunk(user._id));
    }
  }, [isAuthenticated, user, dispatch]);
  
  // افزودن محصول به سبد خرید
  const addToCart = (product, quantity = 1, color = null, size = null, sellerId = null) => {
    dispatch(clearCartError());
    return dispatch(addToCartThunk({ product, quantity, color, size, sellerId }));
  };
  
  // به‌روزرسانی تعداد محصول در سبد خرید
  const updateCartItem = (itemId, quantity) => {
    dispatch(clearCartError());
    return dispatch(updateCartItemThunk({ itemId, quantity }));
  };
  
  // حذف محصول از سبد خرید
  const removeFromCart = (itemId) => {
    dispatch(clearCartError());
    return dispatch(removeFromCartThunk(itemId));
  };
  
  // پاک کردن کامل سبد خرید
  const clearCart = () => {
    dispatch(clearCartError());
    return dispatch(clearCartThunk());
  };
  
  // پاک کردن کامل وضعیت سبد خرید (مورد استفاده در خروج از حساب کاربری)
  const resetCart = () => {
    dispatch(clearCartState());
  };
  
  return {
    // وضعیت
    items: cart.items,
    totalPrice: cart.totalPrice,
    totalDiscount: cart.totalDiscount,
    finalPrice: cart.finalPrice,
    loading: cart.loading,
    error: cart.error,
    
    // تعداد آیتم‌های سبد خرید
    itemCount: cart.items.reduce((total, item) => total + item.quantity, 0),
    
    // اکشن‌ها
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    resetCart,
    clearError: () => dispatch(clearCartError()),
  };
};