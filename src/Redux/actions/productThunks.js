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

            console.log("Fetch product response:", { data, errors });
            console.log("Product data:", data?.product);
            console.log("Image in response:", data?.product?.image);

            if (errors && Array.isArray(errors) && errors.length > 0) {
                console.log("GraphQL errors:", errors);
                return rejectWithValue(errors[0].message || 'خطای ناشناخته از سرور');
            }

            if (data?.product) {
                console.log("Product fetched successfully:", data.product._id);
                return data.product;
            }

            console.log("No product found in response");
            return rejectWithValue('محصول یافت نشد');
        } catch (error) {
            console.error("Fetch product error:", error);
            return rejectWithValue(error.message || 'خطا در دریافت محصول');
        }
    }
);