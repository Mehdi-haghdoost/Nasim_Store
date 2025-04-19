import { createAsyncThunk } from "@reduxjs/toolkit";
import { GET_PRODUCT } from "@/graphql/entities/products/product.queries";
import client from "@/graphql/client";

export const fetchProduct = createAsyncThunk(
    'product/fetchProduct',
    async (id, { rejectWithValue }) => {
        try {
            const { data, errors } = await client.query({
                query: GET_PRODUCT,
                variables: { id },
                fetchPolicy: 'network-only',
            });

            if (errors && Array.isArray(errors) && errors.length > 0) {
                return rejectWithValue(errors[0].message || 'خطای ناشناخته از سرور');
            }

            if (data?.product) {
                return data.product;
            }

            return rejectWithValue('محصول یافت نشد');
        } catch (error) {
            return rejectWithValue(error.message || 'خطا در دریافت محصول');
        }
    }
);