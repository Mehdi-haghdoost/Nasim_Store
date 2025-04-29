'use client';
import { useSelector, useDispatch } from "react-redux";
import {
    setCategories,
    setPriceRange,
    setSelectedColor,
    setSearchTerm,
    setSortOption,
    setFilters,
    resetFilters
} from "../slices/filterSlice";
import { filterProducts } from "../actions/filterThunks";

export const useFilter = () => {
    const dispatch = useDispatch();
    const { categories, priceRange, selectedColor, searchTerm, sortOption, filteredProducts } = useSelector(state => state.filter);
    const { products, productsLoading } = useSelector(state => state.product);

    return {
        categories,
        priceRange,
        selectedColor,
        searchTerm,
        sortOption, // اضافه کردن گزینه مرتب‌سازی
        filteredProducts,
        isLoading: productsLoading,

        // Filter actions
        updateCategories: (categoryIds) => dispatch(setCategories(categoryIds)),
        updatePriceRange: (range) => dispatch(setPriceRange(range)),
        updateSelectedColor: (color) => dispatch(setSelectedColor(color)),
        updateSearchTerm: (term) => dispatch(setSearchTerm(term)),
        updateSortOption: (option) => dispatch(setSortOption(option)), // اضافه کردن اکشن مرتب‌سازی
        applyFilters: () => dispatch(filterProducts()),
        clearFilters: () => dispatch(resetFilters()),
    };
};