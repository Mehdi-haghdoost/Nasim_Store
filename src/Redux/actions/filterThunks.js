// src/Redux/actions/filterThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setFilteredProducts } from "../slices/filterSlice";
import { fetchProducts } from "./productThunks";

export const filterProducts = createAsyncThunk(
    'filter/filterProducts',
    async (_, { getState, dispatch }) => {
        const { product, filter } = getState();
        
        // اگر محصولات هنوز بارگذاری نشده‌اند، بارگذاری کنید
        if (!product.products || product.products.length === 0) {
            console.log("بارگذاری محصولات قبل از فیلتر...");
            await dispatch(fetchProducts()).unwrap();
        }
        
        // دریافت state به‌روز شده
        const state = getState();
        const { products } = state.product;
        const { categories, priceRange, selectedColor, searchTerm } = state.filter;
        
        if (!products || products.length === 0) {
            console.log("هیچ محصولی برای فیلتر وجود ندارد");
            dispatch(setFilteredProducts([]));
            return;
        }
        
        let result = [...products];
        
        // فیلتر بر اساس دسته‌بندی
        if (categories && categories.length > 0) {
            result = result.filter(product => {
                if (!product.category || !product.category._id) return false;
                
                const productCategoryId = product.category._id.toString();
                return categories.some(catId => catId.toString() === productCategoryId);
            });
        }
        
        // فیلتر بر اساس بازه قیمت
        if (priceRange) {
            result = result.filter(product => {
                const price = product.hasDiscount ? product.discountedPrice : product.price;
                return price >= priceRange.min && price <= priceRange.max;
            });
        }
        
        // فیلتر بر اساس رنگ
        if (selectedColor) {
            result = result.filter(product => {
                if (!product.colors || !Array.isArray(product.colors)) return false;
                
                return product.colors.some(c => 
                    c.color && c.color.toLowerCase() === selectedColor.toLowerCase() && c.available
                );
            });
        }
        
        // فیلتر بر اساس عبارت جستجو
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter(product => 
                product.title.toLowerCase().includes(term) || 
                (product.originalName && product.originalName.toLowerCase().includes(term))
            );
        }
        
        console.log(`${result.length} محصول پس از اعمال فیلترها یافت شد`);
        dispatch(setFilteredProducts(result));
    }
);