// src/Redux/slices/productSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchProduct, fetchProducts } from "../actions/productThunks";

const initialState = {
    product: null,
    products: [],
    loading: false,
    productsLoading: false, // loading state جداگانه برای لیست محصولات
    error: null,
    productsError: null, // error state جداگانه برای لیست محصولات
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
            state.productsError = null;
        },
        clearProduct: (state) => {
            state.product = null;
            state.error = null;
            state.loading = false;
        },
        clearProducts: (state) => {
            state.products = [];
            state.productsError = null;
            state.productsLoading = false;
        }
    },
    extraReducers: (builder) => {
        builder
            // مدیریت دریافت یک محصول
            .addCase(fetchProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProduct.fulfilled, (state, action) => {
                state.product = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'خطا در دریافت محصول';
                state.product = null;
            })
            
            // مدیریت دریافت همه محصولات
            .addCase(fetchProducts.pending, (state) => {
                state.productsLoading = true;
                state.productsError = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = action.payload;
                state.productsLoading = false;
                state.productsError = null;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.productsLoading = false;
                state.productsError = action.payload || 'خطا در دریافت محصولات';
            });
    },
});

export const { clearError, clearProduct, clearProducts } = productSlice.actions;
export default productSlice.reducer;