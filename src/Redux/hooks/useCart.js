// import { useSelector, useDispatch } from "react-redux";
// import { useEffect, useRef, useState } from "react";
// import { 
//   addToCartThunk, 
//   updateCartItemThunk, 
//   removeFromCartThunk, 
//   clearCartThunk,
//   syncCartFromLocalStorage,
//   // mergeGuestCartWithUserCartThunk 
// } from "../actions/cartThunks";
// import { clearCartError, clearCartState } from "../slices/cartSlice";
// import { useAuth } from "./useAuth";

// export const useCart = () => {
//   const dispatch = useDispatch();
//   const cart = useSelector(state => state.cart);
//   const { user, isAuthenticated } = useAuth();
//   const hasMerged = useRef(false);
//   const [isInitialized, setIsInitialized] = useState(false);

//   // همگام‌سازی اولیه سبد خرید
//   useEffect(() => {
//     const initializeCart = async () => {
//       try {
//         await dispatch(syncCartFromLocalStorage()).unwrap();
//         setIsInitialized(true);
//       } catch (error) {
//         console.error('Error during cart initialization:', error);
//         setIsInitialized(true); 
//       }
//     };
    
//     initializeCart();
//   }, [dispatch]);

//   // ادغام سبد خرید مهمان
//   useEffect(() => {
//     // برای دیباگ، وجود تابع را چک می‌کنیم
//     if (isInitialized && isAuthenticated && user?._id && !hasMerged.current) {
//       // اگر تابع وجود دارد، آن را اجرا می‌کنیم
//       if (typeof mergeGuestCartWithUserCartThunk === 'function') {
//         dispatch(mergeGuestCartWithUserCartThunk(user._id));
//         hasMerged.current = true;
//       } else {
//         console.error('mergeGuestCartWithUserCartThunk is not a function');
//       }
//     }
//   }, [isInitialized, isAuthenticated, user, dispatch]);

//   // افزودن محصول به سبد خرید
//   const addToCart = (product, quantity = 1, color = null, size = null, sellerId = null) => {
//     dispatch(clearCartError());
//     return dispatch(addToCartThunk({ product, quantity, color, size, sellerId }));
//   };

//   // به‌روزرسانی تعداد محصول در سبد خرید
//   const updateCartItem = (itemId, quantity) => {
//     dispatch(clearCartError());
//     return dispatch(updateCartItemThunk({ itemId, quantity }));
//   };

//   // حذف محصول از سبد خرید
//   const removeFromCart = (itemId) => {
//     dispatch(clearCartError());
//     return dispatch(removeFromCartThunk(itemId));
//   };

//   // پاک کردن کامل سبد خرید
//   const clearCart = () => {
//     dispatch(clearCartError());
//     return dispatch(clearCartThunk());
//   };

//   // پاک کردن کامل وضعیت سبد خرید (مورد استفاده در خروج از حساب کاربری)
//   const resetCart = () => {
//     dispatch(clearCartState());
//     hasMerged.current = false;
//   };

//   return {
//     // وضعیت
//     items: cart.items || [],
//     totalPrice: cart.totalPrice || 0,
//     totalDiscount: cart.totalDiscount || 0,
//     finalPrice: cart.finalPrice || 0,
//     loading: cart.loading || false,
//     error: cart.error || null,
    
//     // آیا سبد خرید آماده استفاده است
//     isReady: isInitialized,
    
//     // تعداد آیتم‌های سبد خرید
//     itemCount: cart.items ? cart.items.reduce((total, item) => total + item.quantity, 0) : 0,
    
//     // اکشن‌ها
//     addToCart,
//     updateCartItem,
//     removeFromCart,
//     clearCart,
//     resetCart,
//     clearError: () => dispatch(clearCartError()),
//   };
// };


import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState, useCallback } from "react";
import { 
  addToCartThunk, 
  updateCartItemThunk, 
  removeFromCartThunk, 
  clearCartThunk,
  syncCartFromLocalStorage,
  fetchUserCart,
  syncGuestCartWithUser
} from "../actions/cartThunks";
import { clearCartError, clearCartState, setCartHydrated } from "../slices/cartSlice";
import { useAuth } from "./useAuth";

export const useCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const { user, isAuthenticated } = useAuth();
  const hasSynced = useRef(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const previousAuthState = useRef(isAuthenticated);
  const initializationInProgress = useRef(false);

  // لاگ دیباگ فقط وقتی تغییر مهم داشته باشیم
  const prevItemsLength = useRef(cart.items?.length || 0);
  const prevIsAuthenticated = useRef(isAuthenticated);
  const prevLoading = useRef(cart.loading);

  useEffect(() => {
    // فقط لاگ کن اگر تغییر مهم باشد
    if (
      prevItemsLength.current !== (cart.items?.length || 0) ||
      prevIsAuthenticated.current !== isAuthenticated ||
      prevLoading.current !== cart.loading
    ) {
      console.log('🛒 Cart State Important Change:', {
        itemsLength: cart.items?.length || 0,
        isAuthenticated,
        loading: cart.loading,
        isReady: isInitialized && cart.isHydrated,
        totalPrice: cart.totalPrice,
        isEmpty: (cart.items?.length || 0) === 0
      });

      // بروزرسانی refs
      prevItemsLength.current = cart.items?.length || 0;
      prevIsAuthenticated.current = isAuthenticated;
      prevLoading.current = cart.loading;
    }
  }, [cart.items?.length, isAuthenticated, cart.loading, isInitialized, cart.isHydrated, cart.totalPrice]);

  // **سینک خودکار سبد خرید هنگام تغییر وضعیت لاگین**
  useEffect(() => {
    const handleAuthChange = async () => {
      // اگر کاربر تازه لاگین کرده
      if (!previousAuthState.current && isAuthenticated && user?._id) {
        console.log('🔄 User just logged in, starting automatic cart sync...');
        
        try {
          // سینک سبد مهمان با سبد کاربر
          const result = await dispatch(syncGuestCartWithUser()).unwrap();
          console.log('✅ Automatic cart sync successful:', result);
          hasSynced.current = true;
        } catch (error) {
          console.warn('⚠️ Automatic sync failed, trying fallback:', error);
          
          // اگر سینک ناموفق بود، حداقل سبد کاربر را بارگذاری کن
          try {
            const userCart = await dispatch(fetchUserCart()).unwrap();
            console.log('✅ Fallback: User cart loaded:', userCart);
          } catch (fallbackError) {
            console.error('❌ Both sync and fallback failed:', fallbackError);
          }
        }
      }
      
      // اگر کاربر خروج کرده
      else if (previousAuthState.current && !isAuthenticated) {
        console.log('🚪 User logged out, resetting cart to localStorage mode...');
        
        // Reset cart state
        dispatch(clearCartState());
        setIsInitialized(false);
        hasSynced.current = false;
        initializationInProgress.current = false;
        
        // بارگذاری سبد از localStorage
        try {
          const localCart = await dispatch(syncCartFromLocalStorage()).unwrap();
          dispatch(setCartHydrated());
          setIsInitialized(true);
          console.log('✅ Cart reset to localStorage mode:', localCart);
        } catch (error) {
          console.error('❌ Error loading localStorage cart after logout:', error);
          dispatch(setCartHydrated());
          setIsInitialized(true);
        }
      }
      
      // بروزرسانی مرجع وضعیت قبلی
      previousAuthState.current = isAuthenticated;
    };

    handleAuthChange();
  }, [isAuthenticated, user?._id, dispatch]);

  // تابع initialization مستقل - فقط برای بارگذاری اولیه
  const initializeCart = useCallback(async () => {
    if (initializationInProgress.current) {
      console.log('⏳ Cart initialization already in progress, skipping...');
      return;
    }

    try {
      initializationInProgress.current = true;
      console.log('🚀 Starting initial cart load:', {
        isAuthenticated,
        userId: user?._id,
        isHydrated: cart.isHydrated,
        isInitialized
      });

      if (isAuthenticated && user?._id) {
        console.log('👤 Loading authenticated user cart...');
        
        try {
          const result = await dispatch(fetchUserCart()).unwrap();
          console.log('✅ User cart loaded:', {
            itemsCount: result.items?.length || 0,
            totalPrice: result.totalPrice
          });
        } catch (error) {
          console.warn('⚠️ fetchUserCart failed, falling back to localStorage:', error.message);
          await dispatch(syncCartFromLocalStorage()).unwrap();
        }
      } else {
        console.log('👥 Loading guest cart from localStorage...');
        await dispatch(syncCartFromLocalStorage()).unwrap();
      }

      dispatch(setCartHydrated());
      setIsInitialized(true);
      console.log('✅ Initial cart load completed');
      
    } catch (error) {
      console.error('❌ Cart initialization error:', error);
      dispatch(setCartHydrated());
      setIsInitialized(true);
    } finally {
      initializationInProgress.current = false;
    }
  }, [dispatch, isAuthenticated, user?._id, cart.isHydrated, isInitialized]);

  // اجرای initialization فقط برای بارگذاری اولیه
  useEffect(() => {
    if (!isInitialized && !cart.isHydrated && !initializationInProgress.current) {
      console.log('🎬 Triggering initial cart load...');
      initializeCart();
    }
  }, [initializeCart, isInitialized, cart.isHydrated]);

  // محاسبه values بدون لاگ اضافی
  const safeItems = Array.isArray(cart.items) ? cart.items : [];
  const totalQuantity = safeItems.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);

  // Action functions
  const addToCart = useCallback(async (product, quantity = 1, color = null, size = null, sellerId = null) => {
    dispatch(clearCartError());
    try {
      const result = await dispatch(addToCartThunk({ 
        product, quantity, color, size, sellerId 
      })).unwrap();
      return result;
    } catch (error) {
      console.error('❌ Add to cart failed:', error);
      throw error;
    }
  }, [dispatch]);

  const updateCartItem = useCallback(async (itemId, quantity) => {
    dispatch(clearCartError());
    try {
      const result = await dispatch(updateCartItemThunk({ itemId, quantity })).unwrap();
      return result;
    } catch (error) {
      console.error('❌ Update cart item failed:', error);
      throw error;
    }
  }, [dispatch]);

  const removeFromCart = useCallback(async (itemId) => {
    dispatch(clearCartError());
    try {
      const result = await dispatch(removeFromCartThunk(itemId)).unwrap();
      return result;
    } catch (error) {
      console.error('❌ Remove from cart failed:', error);
      throw error;
    }
  }, [dispatch]);

  const clearCart = useCallback(async () => {
    dispatch(clearCartError());
    try {
      const result = await dispatch(clearCartThunk()).unwrap();
      return result;
    } catch (error) {
      console.error('❌ Clear cart failed:', error);
      throw error;
    }
  }, [dispatch]);

  const refreshCart = useCallback(async () => {
    console.log('🔄 Manual refresh cart requested');
    dispatch(clearCartError());
    try {
      if (isAuthenticated) {
        const result = await dispatch(fetchUserCart()).unwrap();
        console.log('✅ Manual refresh result (server)');
        return result;
      } else {
        const result = await dispatch(syncCartFromLocalStorage()).unwrap();
        console.log('✅ Manual refresh result (localStorage)');
        return result;
      }
    } catch (error) {
      console.error('❌ Refresh cart failed:', error);
      throw error;
    }
  }, [dispatch, isAuthenticated]);

  const resetCart = useCallback(() => {
    console.log('🔄 Manual reset cart');
    dispatch(clearCartState());
    hasSynced.current = false;
    setIsInitialized(false);
    initializationInProgress.current = false;
    previousAuthState.current = isAuthenticated;
  }, [dispatch, isAuthenticated]);

  // Helper functions
  const isProductInCart = useCallback((productId, options = {}) => {
    const { color = null, size = null, sellerId = null } = options;
    if (!Array.isArray(cart.items)) return false;
    
    return cart.items.some(item => {
      const productMatch = String(item.product._id) === String(productId);
      const colorMatch = (item.color === color) || (!item.color && !color);
      const sizeMatch = (item.size === size) || (!item.size && !size);
      const sellerMatch = String(item.selectedSeller?._id) === String(sellerId) || 
                          (!item.selectedSeller && !sellerId);
      
      return productMatch && colorMatch && sizeMatch && sellerMatch;
    });
  }, [cart.items]);

  const getProductQuantityInCart = useCallback((productId, options = {}) => {
    const { color = null, size = null, sellerId = null } = options;
    if (!Array.isArray(cart.items)) return 0;
    
    const item = cart.items.find(item => {
      const productMatch = String(item.product._id) === String(productId);
      const colorMatch = (item.color === color) || (!item.color && !color);
      const sizeMatch = (item.size === size) || (!item.size && !size);
      const sellerMatch = String(item.selectedSeller?._id) === String(sellerId) || 
                          (!item.selectedSeller && !sellerId);
      
      return productMatch && colorMatch && sizeMatch && sellerMatch;
    });

    return item ? item.quantity : 0;
  }, [cart.items]);

  const getDiscountPercentage = useCallback(() => {
    if (cart.totalPrice === 0) return 0;
    return Math.round((cart.totalDiscount / cart.totalPrice) * 100);
  }, [cart.totalPrice, cart.totalDiscount]);

  const getTotalItemsCount = useCallback(() => {
    return totalQuantity;
  }, [totalQuantity]);

  return {
    // State
    items: safeItems,
    totalPrice: cart.totalPrice || 0,
    totalDiscount: cart.totalDiscount || 0,
    finalPrice: cart.finalPrice || 0,
    loading: cart.loading || false,
    error: cart.error || null,
    lastModified: cart.lastModified,
    
    // Status
    isReady: isInitialized && cart.isHydrated,
    isInitialized,
    isHydrated: cart.isHydrated,
    
    // Counts
    itemCount: totalQuantity,
    totalQuantity: totalQuantity,
    isEmpty: safeItems.length === 0,
    hasDiscount: (cart.totalDiscount || 0) > 0,
    discountPercentage: getDiscountPercentage(),
    
    // Actions
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    refreshCart,
    resetCart,
    clearError: useCallback(() => dispatch(clearCartError()), [dispatch]),

    // Helpers
    isProductInCart,
    getProductQuantityInCart,
    getDiscountPercentage,
    getTotalItemsCount,
  };
};