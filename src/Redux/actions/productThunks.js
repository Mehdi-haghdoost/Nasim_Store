// src/Redux/actions/productThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { GET_PRODUCT, GET_ALL_PRODUCTS } from "@/graphql/entities/products/product.queries";
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

export const fetchProducts = createAsyncThunk(
    'product/fetchProducts',
    async (_, { rejectWithValue }) => {
        try {
            console.log("شروع درخواست محصولات از سرور...");
            const { data, errors } = await client.query({
                query: GET_ALL_PRODUCTS,
                fetchPolicy: 'network-only',
            });

            console.log("پاسخ سرور:", { data, errors });

            if (errors && Array.isArray(errors) && errors.length > 0) {
                console.error("خطا در دریافت محصولات:", errors);
                return rejectWithValue(errors[0].message || 'خطای ناشناخته از سرور');
            }

            if (data?.products) {
                console.log(`${data.products.length} محصول دریافت شد`, data.products.map(p => ({
                    title: p.title,
                    category: p.category?._id || p.category
                })));
                return data.products;
            }

            console.warn("هیچ محصولی دریافت نشد: data.products خالی یا تعریف‌نشده است");
            return rejectWithValue('محصولات یافت نشد');
        } catch (error) {
            console.error("خطا در درخواست GraphQL:", error);
            return rejectWithValue(error.message || 'خطا در دریافت محصولات');
        }
    }
)