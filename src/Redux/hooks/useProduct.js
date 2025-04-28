// src/Redux/hooks/useProduct.js
'use client'
import { useSelector, useDispatch } from "react-redux";
import { fetchProduct, fetchProducts } from "../actions/productThunks";
import { clearError, clearProduct } from "../slices/productSlice";
import { useEffect } from "react";

export const useProduct = () => {
    const dispatch = useDispatch();
    const productState = useSelector(state => state.product);
    
    // محصولات را از استیت ریداکس می‌گیریم
    const { product, products, loading, productsLoading, error } = productState;

    useEffect(() => {
        // اگر محصولات هنوز لود نشده باشند، درخواست کن
        if (products && products.length === 0 && !productsLoading) {
            console.log("درخواست بارگذاری محصولات...");
            dispatch(fetchProducts());
        }
    }, [dispatch, products, productsLoading]);

    const getProduct = (id) => {
        dispatch(clearError()); // پاک کردن خطا قبل از درخواست
        return dispatch(fetchProduct(id)); // برگرداندن پرامیس
    };

    const resetProduct = () => {
        // فقط وقتی لازم بود پاک کن، نه خودکار
        return dispatch(clearProduct());
    };

    const getProducts = () => {
        return dispatch(fetchProducts());
    };

    return {
        product,
        products: products || [],
        loading,
        productsLoading,
        error,
        getProduct,
        getProducts,
        clearError: () => dispatch(clearError()),
        resetProduct,
    };
};

export default useProduct;