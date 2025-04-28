'use client'
import { useSelector, useDispatch } from "react-redux";
import {
    setCategories,
    setPriceRange,
    setSelectedColor,
    setSearchTerm,
    setFilters,
    resetFilters
} from "../slices/filterSlice";
import { filterProducts } from "../actions/filterThunks";
import { useEffect } from "react";

export const useFilter = () => {
    const dispatch = useDispatch();
    const { categories, priceRange, selectedColor, searchTerm, filteredProducts } = useSelector(state => state.filter);
    const { products, productsLoading } = useSelector(state => state.product);

    // هر وقت products یا فیلترها تغییر کرد، لیست فیلتر شده رو به‌روز کنیم
    useEffect(() => {
        if (!productsLoading) {
            dispatch(filterProducts());
        }
    }, [dispatch, products, categories, priceRange, selectedColor, searchTerm, productsLoading]);

    return {
        categories,
        priceRange,
        selectedColor,
        searchTerm,
        filteredProducts,
        isLoading: productsLoading,

        // اکشن‌های مختلف فیلتر
        updateCategories: (categoryIds) => dispatch(setCategories(categoryIds)),
        updatePriceRange: (range) => dispatch(setPriceRange(range)),
        updateSelectedColor: (color) => dispatch(setSelectedColor(color)),
        updateSearchTerm: (term) => dispatch(setSearchTerm(term)),
        applyFilters: (filters) => dispatch(setFilters(filters)),
        clearFilters: () => dispatch(resetFilters()),
    };
};