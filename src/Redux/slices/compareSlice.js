// src/Redux/slices/compareSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { 
    addProductToCompare, 
    removeProductFromCompare, 
    clearCompareList,
    getCompareProducts 
} from '../actions/compareThunks';

const initialState = {
    compareProducts: [],
    loading: false,
    error: null,
    maxProducts: 3, // حداکثر 3 محصول قابل مقایسه
    isCompareModalOpen: false
};

const compareSlice = createSlice({
    name: 'compare',
    initialState,
    reducers: {
        addToCompareLocal: (state, action) => {
            const product = action.payload;
            const existingProduct = state.compareProducts.find(p => p._id === product._id);
            
            if (!existingProduct && state.compareProducts.length < state.maxProducts) {
                state.compareProducts.push(product);
            }
        },
        
        removeFromCompareLocal: (state, action) => {
            const productId = action.payload;
            state.compareProducts = state.compareProducts.filter(p => p._id !== productId);
        },
        
        // پاک کردن تمام محصولات مقایسه
        clearCompareLocal: (state) => {
            state.compareProducts = [];
        },
        
        // باز و بسته کردن مودال مقایسه
        toggleCompareModal: (state) => {
            state.isCompareModalOpen = !state.isCompareModalOpen;
        },
        
        // تنظیم وضعیت مودال
        setCompareModalOpen: (state, action) => {
            state.isCompareModalOpen = action.payload;
        },
        
        // پاک کردن خطاها
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // افزودن محصول به مقایسه
            .addCase(addProductToCompare.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addProductToCompare.fulfilled, (state, action) => {
                state.loading = false;
                const product = action.payload;
                const existingProduct = state.compareProducts.find(p => p._id === product._id);
                
                if (!existingProduct && state.compareProducts.length < state.maxProducts) {
                    state.compareProducts.push(product);
                }
            })
            .addCase(addProductToCompare.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'خطا در افزودن محصول به مقایسه';
            })
            
            // حذف محصول از مقایسه
            .addCase(removeProductFromCompare.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeProductFromCompare.fulfilled, (state, action) => {
                state.loading = false;
                const productId = action.payload;
                state.compareProducts = state.compareProducts.filter(p => p._id !== productId);
            })
            .addCase(removeProductFromCompare.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'خطا در حذف محصول از مقایسه';
            })
            
            // پاک کردن لیست مقایسه
            .addCase(clearCompareList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(clearCompareList.fulfilled, (state) => {
                state.loading = false;
                state.compareProducts = [];
            })
            .addCase(clearCompareList.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'خطا در پاک کردن لیست مقایسه';
            })
            
            // دریافت محصولات مقایسه
            .addCase(getCompareProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCompareProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.compareProducts = action.payload || [];
            })
            .addCase(getCompareProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'خطا در دریافت محصولات مقایسه';
            });
    }
});

export const {
    addToCompareLocal,
    removeFromCompareLocal,
    clearCompareLocal,
    toggleCompareModal,
    setCompareModalOpen,
    clearError
} = compareSlice.actions;

export default compareSlice.reducer;