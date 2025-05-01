// src/Redux/hooks/useFilter.js
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

  console.log('useFilter - وضعیت محصولات:', {
    تعداد: products.length,
    محصولات: products.map(p => ({ title: p.title, category: p.category?._id })),
    درحال_بارگذاری: productsLoading
  });

  return {
    categories,
    priceRange,
    selectedColor,
    searchTerm,
    sortOption,
    filteredProducts,
    products,
    isLoading: productsLoading,

    updateCategories: (categoryIds) => dispatch(setCategories(categoryIds)),
    updatePriceRange: (range) => dispatch(setPriceRange(range)),
    updateSelectedColor: (color) => dispatch(setSelectedColor(color)),
    updateSearchTerm: (term) => dispatch(setSearchTerm(term)),
    updateSortOption: (option) => dispatch(setSortOption(option)),
    applyFilters: () => dispatch(filterProducts()),
    clearFilters: () => dispatch(resetFilters()),
  };
};