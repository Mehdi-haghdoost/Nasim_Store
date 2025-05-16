import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  getUserWishlist,
  addToWishlist,
  removeFromWishlist,
  checkIsInWishlist
} from '../actions/wishlistThunks';
import { clearWishlistError, resetWishlist } from '../slices/wishlistSlice';

export const useWishlist = () => {
  const dispatch = useDispatch();
  const {
    wishlistItems,
    loading,
    error,
    addLoading,
    removeLoading,
    isInWishlistStatus,
    isInWishlistLoading
  } = useSelector(state => state.wishlist);
  
  // دریافت لیست علاقه‌مندی‌ها
  const getWishlist = useCallback(() => {
    return dispatch(getUserWishlist());
  }, [dispatch]);
  
  // افزودن به لیست علاقه‌مندی‌ها با نمایش toast
  const addProductToWishlist = useCallback((productId, product) => {
    return dispatch(addToWishlist({ productId, product }))
      .unwrap()
      .then((result) => {
        toast.success(result.message || 'محصول به لیست علاقه‌مندی‌ها اضافه شد');
        return result;
      })
      .catch((error) => {
        toast.error(error || 'خطا در افزودن به لیست علاقه‌مندی‌ها');
        throw error;
      });
  }, [dispatch]);
  
  // حذف از لیست علاقه‌مندی‌ها با نمایش toast
  const removeProductFromWishlist = useCallback((productId) => {
    return dispatch(removeFromWishlist(productId))
      .unwrap()
      .then((result) => {
        toast.success(result.message || 'محصول از لیست علاقه‌مندی‌ها حذف شد');
        return result;
      })
      .catch((error) => {
        toast.error(error || 'خطا در حذف از لیست علاقه‌مندی‌ها');
        throw error;
      });
  }, [dispatch]);
  
  // بررسی وضعیت علاقه‌مندی محصول
  const checkProductInWishlist = useCallback((productId) => {
    return dispatch(checkIsInWishlist({ productId }));
  }, [dispatch]);
  
  // پاک کردن خطا
  const clearError = useCallback(() => {
    dispatch(clearWishlistError());
  }, [dispatch]);
  
  // بازنشانی وضعیت
  const resetWishlistState = useCallback(() => {
    dispatch(resetWishlist());
  }, [dispatch]);
  
  // بررسی وضعیت علاقه‌مندی یک محصول خاص
  const isProductInWishlist = useCallback((productId) => {
    return isInWishlistStatus[productId] || false;
  }, [isInWishlistStatus]);
  
  // بررسی وضعیت بارگذاری برای یک محصول خاص
  const isLoadingForProduct = useCallback((productId) => {
    return isInWishlistLoading[productId] || false;
  }, [isInWishlistLoading]);
  
  return {
    wishlistItems,
    loading,
    error,
    addLoading,
    removeLoading,
    getWishlist,
    addProductToWishlist,
    removeProductFromWishlist,
    checkProductInWishlist,
    clearError,
    resetWishlistState,
    isProductInWishlist,
    isLoadingForProduct
  };
};