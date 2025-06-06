import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { 
  addToCartThunk, 
  updateCartItemThunk, 
  removeFromCartThunk, 
  clearCartThunk,
  syncCartFromLocalStorage,
  // mergeGuestCartWithUserCartThunk 
} from "../actions/cartThunks";
import { clearCartError, clearCartState } from "../slices/cartSlice";
import { useAuth } from "./useAuth";

export const useCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const { user, isAuthenticated } = useAuth();
  const hasMerged = useRef(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // همگام‌سازی اولیه سبد خرید
  useEffect(() => {
    const initializeCart = async () => {
      try {
        await dispatch(syncCartFromLocalStorage()).unwrap();
        setIsInitialized(true);
      } catch (error) {
        console.error('Error during cart initialization:', error);
        setIsInitialized(true); 
      }
    };
    
    initializeCart();
  }, [dispatch]);

  // ادغام سبد خرید مهمان
  useEffect(() => {
    // برای دیباگ، وجود تابع را چک می‌کنیم
    if (isInitialized && isAuthenticated && user?._id && !hasMerged.current) {
      // اگر تابع وجود دارد، آن را اجرا می‌کنیم
      if (typeof mergeGuestCartWithUserCartThunk === 'function') {
        dispatch(mergeGuestCartWithUserCartThunk(user._id));
        hasMerged.current = true;
      } else {
        console.error('mergeGuestCartWithUserCartThunk is not a function');
      }
    }
  }, [isInitialized, isAuthenticated, user, dispatch]);

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
    hasMerged.current = false;
  };

  return {
    // وضعیت
    items: cart.items || [],
    totalPrice: cart.totalPrice || 0,
    totalDiscount: cart.totalDiscount || 0,
    finalPrice: cart.finalPrice || 0,
    loading: cart.loading || false,
    error: cart.error || null,
    
    // آیا سبد خرید آماده استفاده است
    isReady: isInitialized,
    
    // تعداد آیتم‌های سبد خرید
    itemCount: cart.items ? cart.items.reduce((total, item) => total + item.quantity, 0) : 0,
    
    // اکشن‌ها
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    resetCart,
    clearError: () => dispatch(clearCartError()),
  };
};