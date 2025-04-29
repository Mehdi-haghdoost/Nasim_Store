import { createSlice } from '@reduxjs/toolkit';
import { filterProducts } from '../actions/filterThunks';

const initialState = {
    categories: [],
    priceRange: { min: 0, max: 50000000 },
    selectedColor: '',
    searchTerm: '',
    sortOption: 'default', // اضافه کردن گزینه مرتب‌سازی پیش‌فرض
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
        setSortOption: (state, action) => {
            state.sortOption = action.payload;
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
            state.sortOption = 'default';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(filterProducts.pending, (state) => {
                // Optional: Set loading state if needed
            })
            .addCase(filterProducts.fulfilled, (state, action) => {
                state.filteredProducts = action.payload;
            })
            .addCase(filterProducts.rejected, (state, action) => {
                state.filteredProducts = [];
                // Optional: Handle error
            });
    }
});

export const {
    setCategories,
    setPriceRange,
    setSelectedColor,
    setSearchTerm,
    setSortOption,
    setFilters,
    setFilteredProducts,
    resetFilters
} = filterSlice.actions;

export default filterSlice.reducer;