import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    categories: [],
    priceRange: { min: 0, max: 50000000 },
    selectedColor: '',
    searchTerm: '',
    filteredProducts: []
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
        setPriceRange: (state, action) => {
            state.priceRange = action.payload;
        },
        setSelectedColor: (state, action) => {
            state.selectedColor = action.payload;
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        setFilters: (state, action) => {
            return { ...state, ...action.payload };
        },
        setFilteredProducts: (state, action) => {
            state.filteredProducts = action.payload;
        },
        resetFilters: (state) => {
            state.categories = [];
            state.priceRange = { min: 0, max: 50000000 };
            state.selectedColor = '';
            state.searchTerm = '';
        }
    }
});

export const {
    setCategories,
    setPriceRange,
    setSelectedColor,
    setSearchTerm,
    setFilters,
    setFilteredProducts,
    resetFilters
} = filterSlice.actions;

export default filterSlice.reducer;