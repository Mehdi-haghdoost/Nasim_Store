// src/Redux/hooks/useCompare.js
import { useSelector, useDispatch } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { 
    addProductToCompare, 
    removeProductFromCompare, 
    clearCompareList,
    getCompareProducts,
    checkProductInCompare 
} from '../actions/compareThunks';
import { 
    addToCompareLocal,
    removeFromCompareLocal,
    clearCompareLocal,
    toggleCompareModal,
    setCompareModalOpen,
    clearError
} from '../slices/compareSlice';
import { useToast } from './useToast';

export const useCompare = () => {
    const dispatch = useDispatch();
    const { showToast } = useToast();
    
    const { 
        compareProducts, 
        loading, 
        error, 
        maxProducts,
        isCompareModalOpen 
    } = useSelector(state => state.compare);

    // بارگذاری محصولات مقایسه در ابتدا
    useEffect(() => {
        dispatch(getCompareProducts());
    }, [dispatch]);

    // نمایش خطا در صورت وجود
    useEffect(() => {
        if (error) {
            showToast(error, 'error');
            dispatch(clearError());
        }
    }, [error, showToast, dispatch]);

    // افزودن محصول به مقایسه
    const addToCompare = useCallback(async (product) => {
        try {
            if (compareProducts.length >= maxProducts) {
                showToast(`حداکثر ${maxProducts} محصول قابل مقایسه است`, 'warning');
                return false;
            }

            const existingProduct = compareProducts.find(p => p._id === product._id);
            if (existingProduct) {
                showToast('این محصول قبلاً به لیست مقایسه اضافه شده است', 'warning');
                return false;
            }

            // استفاده از thunk (با API) یا local action
            const result = await dispatch(addProductToCompare(product));
            
            if (addProductToCompare.fulfilled.match(result)) {
                showToast('محصول به لیست مقایسه اضافه شد', 'success');
                return true;
            } else {
                return false;
            }
        } catch (error) {
            showToast('خطا در افزودن محصول به مقایسه', 'error');
            return false;
        }
    }, [dispatch, compareProducts, maxProducts, showToast]);

    const addToCompareLocalAction = useCallback((product) => {
        console.log('Adding product to compare:', product);
        console.log('Current compare products:', compareProducts);
        
        if (compareProducts.length >= maxProducts) {
            console.log('Max products reached');
            showToast(`حداکثر ${maxProducts} محصول قابل مقایسه است`, 'warning');
            return false;
        }

        const existingProduct = compareProducts.find(p => p._id === product._id);
        if (existingProduct) {
            console.log('Product already exists');
            showToast('این محصول قبلاً به لیست مقایسه اضافه شده است', 'warning');
            return false;
        }

        const updatedCompare = [...compareProducts, product];
        console.log('Updated compare list:', updatedCompare);
        
        localStorage.setItem('compareProducts', JSON.stringify(updatedCompare));
        console.log('Saved to localStorage');
        
        dispatch(addToCompareLocal(product));
        console.log('Dispatched to Redux');
        
        console.log('Showing toast...');
        showToast('محصول به لیست مقایسه اضافه شد', 'success');
        
        return true;
    }, [dispatch, compareProducts, maxProducts, showToast]);

    // حذف محصول از مقایسه
    const removeFromCompare = useCallback(async (productId) => {
        try {
            const result = await dispatch(removeProductFromCompare(productId));
            
            if (removeProductFromCompare.fulfilled.match(result)) {
                showToast('محصول از لیست مقایسه حذف شد', 'success');
                return true;
            } else {
                return false;
            }
        } catch (error) {
            showToast('خطا در حذف محصول از مقایسه', 'error');
            return false;
        }
    }, [dispatch, showToast]);

    const removeFromCompareLocalAction = useCallback((productId) => {
        const updatedCompare = compareProducts.filter(p => p._id !== productId);
        localStorage.setItem('compareProducts', JSON.stringify(updatedCompare));
        
        dispatch(removeFromCompareLocal(productId));
        
        showToast('محصول از لیست مقایسه حذف شد', 'success');
        return true;
    }, [dispatch, compareProducts, showToast]);

    // پاک کردن تمام محصولات مقایسه
    const clearCompare = useCallback(async () => {
        try {
            const result = await dispatch(clearCompareList());
            
            if (clearCompareList.fulfilled.match(result)) {
                showToast('لیست مقایسه پاک شد', 'success');
                return true;
            } else {
                return false;
            }
        } catch (error) {
            showToast('خطا در پاک کردن لیست مقایسه', 'error');
            return false;
        }
    }, [dispatch, showToast]);

    // پاک کردن به صورت محلی
    const clearCompareLocal = useCallback(() => {
        dispatch(clearCompareLocal());
        localStorage.removeItem('compareProducts');
        showToast('لیست مقایسه پاک شد', 'success');
        return true;
    }, [dispatch, showToast]);

    // بررسی وجود محصول در لیست مقایسه
    const isInCompare = useCallback((productId) => {
        return compareProducts.some(p => p._id === productId);
    }, [compareProducts]);

    // باز و بسته کردن مودال مقایسه
    const toggleModal = useCallback(() => {
        dispatch(toggleCompareModal());
    }, [dispatch]);

    const openModal = useCallback(() => {
        dispatch(setCompareModalOpen(true));
    }, [dispatch]);

    const closeModal = useCallback(() => {
        dispatch(setCompareModalOpen(false));
    }, [dispatch]);

    // دریافت تعداد محصولات مقایسه
    const compareCount = compareProducts.length;

    // بررسی اینکه آیا امکان افزودن محصول جدید وجود دارد
    const canAddMore = compareCount < maxProducts;

    // دریافت محصولات مقایسه
    const refreshCompareProducts = useCallback(() => {
        dispatch(getCompareProducts());
    }, [dispatch]);

    return {
        // State
        compareProducts,
        loading,
        error,
        maxProducts,
        compareCount,
        canAddMore,
        isCompareModalOpen,

        // Actions
        addToCompare,
        addToCompareLocal,
        removeFromCompare,
        removeFromCompareLocal,
        clearCompare,
        clearCompareLocal,
        isInCompare,
        refreshCompareProducts,

        // Modal Actions
        toggleModal,
        openModal,
        closeModal,

        // Utils
        checkProductInCompare: (productId) => dispatch(checkProductInCompare(productId))
    };
};