// src/Redux/hooks/useProduct.js
import { useSelector, useDispatch } from "react-redux";
import { fetchProduct, fetchProducts } from "../actions/productThunks";
import { clearError, clearProduct, clearProducts } from "../slices/productSlice";
import { useEffect } from "react";

export const useProduct = () => {
    const dispatch = useDispatch();
    const productState = useSelector(state => state.product);

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

    const resetProducts = () => {
        return dispatch(clearProducts());
    };

    // لود خودکار محصولات هنگام اولین استفاده از هوک (اختیاری)
    useEffect(() => {
        if (productState.products.length === 0 && !productState.productsLoading && !productState.productsError) {
            getProducts();
        }
    }, []);

    return {
        product: productState.product,
        products: productState.products,
        loading: productState.loading,
        productsLoading: productState.productsLoading,
        error: productState.error,
        productsError: productState.productsError,
        getProduct,
        getProducts,
        clearError: () => dispatch(clearError()),
        resetProduct,
        resetProducts,
    };
};

export default useProduct;