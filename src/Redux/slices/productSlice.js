import { createSlice } from "@reduxjs/toolkit";
import { fetchProduct } from "../actions/productThunks";

const initialState = {
    product: null,
    loading: false,
    error: null,
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearProduct: (state) => {
            state.product = null;
            state.error = null;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
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
            });
    },
});

export const { clearError, clearProduct } = productSlice.actions;
export default productSlice.reducer;