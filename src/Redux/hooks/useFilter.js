// src/Redux/hooks/useFilter.js
'use client';
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

export const useFilter = () => {
    const dispatch = useDispatch();
    const { categories, priceRange, selectedColor, searchTerm, filteredProducts } = useSelector(state => state.filter);
    const { products, productsLoading } = useSelector(state => state.product);

    return {
        categories,
        priceRange,
        selectedColor,
        searchTerm,
        filteredProducts,
        isLoading: productsLoading,

        // Filter actions
        updateCategories: (categoryIds) => dispatch(setCategories(categoryIds)),
        updatePriceRange: (range) => dispatch(setPriceRange(range)),
        updateSelectedColor: (color) => dispatch(setSelectedColor(color)),
        updateSearchTerm: (term) => dispatch(setSearchTerm(term)),
        applyFilters: () => dispatch(filterProducts()),
        clearFilters: () => dispatch(resetFilters()),
    };
};