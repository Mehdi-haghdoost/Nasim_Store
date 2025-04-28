import { createAsyncThunk } from "@reduxjs/toolkit";
import { setFilteredProducts } from "../slices/filterSlice";

export const filterProducts = createAsyncThunk(
    'filter/filterProducts',
    async (_, { getState, dispatch }) => {
        const { product, filter } = getState();
        const { products } = product;
        const { categories, priceRange, selectedColor, searchTerm } = filter;

        if (!products || products.length === 0) {
            dispatch(setFilteredProducts([]));
            return;
        }

        let result = [...products];

        // فیلتر بر اساس دسته‌بندی
        if (categories.length > 0) {
            result = result.filter(product =>
                categories.includes(product.category?._id)
            );
        }

        // فیلتر بر اساس بازه قیمت
        result = result.filter(product => {
            const price = product.hasDiscount ? product.discountedPrice : product.price;
            return price >= priceRange.min && price <= priceRange.max;
        });

        // فیلتر بر اساس رنگ
        if (selectedColor) {
            result = result.filter(product =>
                product.colors &&
                product.colors.some(c =>
                    c.color.toLowerCase() === selectedColor.toLowerCase() && c.available
                )
            );
        }

        // فیلتر بر اساس عبارت جستجو
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter(product =>
                product.title.toLowerCase().includes(term) ||
                product.originalName.toLowerCase().includes(term)
            );
        }

        dispatch(setFilteredProducts(result));
    }
);