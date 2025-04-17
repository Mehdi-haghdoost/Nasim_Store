import { useSelector, useDispatch } from "react-redux";
import { fetchProduct } from "../actions/productThunks";
import { clearError, clearProduct } from "../slices/productSlice";

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

    return {
        product: productState.product,
        loading: productState.loading,
        error: productState.error,
        getProduct,
        clearError: () => dispatch(clearError()),
        resetProduct,
    };
};

export default useProduct;