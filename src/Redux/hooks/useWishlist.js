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
  
  const getWishlist = useCallback(() => {
    return dispatch(getUserWishlist())
      .unwrap()
      .catch(error => {
        console.error('Error in getWishlist:', error);
        // خطا را به صورت مناسب مدیریت می‌کنیم تا promise رد نشود
        return [];
      });
  }, [dispatch]);
  
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
  
  const checkProductInWishlist = useCallback((productId) => {
    return dispatch(checkIsInWishlist({ productId }))
      .unwrap()
      .catch(() => {
        // در صورت خطا فرض می‌کنیم محصول در لیست علاقه‌مندی‌ها نیست
        return false;
      });
  }, [dispatch]);
  
  const clearError = useCallback(() => {
    dispatch(clearWishlistError());
  }, [dispatch]);
  
  const resetWishlistState = useCallback(() => {
    dispatch(resetWishlist());
  }, [dispatch]);
  
  const isProductInWishlist = useCallback((productId) => {
    return isInWishlistStatus[productId] || false;
  }, [isInWishlistStatus]);
  
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