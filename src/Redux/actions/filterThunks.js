// src/Redux/actions/filterThunks.js - اصلاح شده
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setFilteredProducts } from "../slices/filterSlice";

export const filterProducts = createAsyncThunk(
    'filter/filterProducts',
    async (_, { getState, dispatch }) => {
        const { product, filter } = getState();
        const { products } = product;
        const { categories, priceRange, selectedColor, searchTerm } = filter;
        
        if (!products || products.length === 0) {
            console.log("هیچ محصولی وجود ندارد");
            dispatch(setFilteredProducts([]));
            return;
        }
        
        console.log("تعداد محصولات اولیه:", products.length);
        console.log("دسته‌بندی‌های انتخاب شده:", categories);
        
        let result = [...products];
        
        // فیلتر بر اساس دسته‌بندی
        if (categories.length > 0) {
            result = result.filter(product => {
                // تبدیل هر دو به رشته برای مقایسه یکسان
                const productCategoryId = product.category?._id?.toString();
                const categoryMatch = categories.some(catId => 
                    catId.toString() === productCategoryId
                );
                
                console.log(
                    `محصول: ${product.title}, ` +
                    `دسته‌بندی محصول: ${productCategoryId}, ` +
                    `مطابقت: ${categoryMatch}`
                );
                
                return categoryMatch;
            });
            
            console.log("تعداد محصولات پس از فیلتر دسته‌بندی:", result.length);
        }
        
        // فیلتر بر اساس بازه قیمت
        result = result.filter(product => {
            const price = product.hasDiscount ? product.discountedPrice : product.price;
            const priceMatch = price >= priceRange.min && price <= priceRange.max;
            
            console.log(
                `محصول: ${product.title}, ` +
                `قیمت: ${price}, ` +
                `بازه قیمت: ${priceRange.min} - ${priceRange.max}, ` +
                `مطابقت: ${priceMatch}`
            );
            
            return priceMatch;
        });
        
        console.log("تعداد محصولات پس از فیلتر قیمت:", result.length);
        
        // فیلتر بر اساس رنگ
        if (selectedColor) {
            result = result.filter(product => {
                const colorMatch = product.colors && 
                    product.colors.some(c => 
                        c.color.toLowerCase() === selectedColor.toLowerCase() && c.available
                    );
                
                console.log(
                    `محصول: ${product.title}, ` +
                    `رنگ‌های موجود: ${product.colors?.map(c => c.color).join(', ')}, ` +
                    `رنگ انتخاب شده: ${selectedColor}, ` +
                    `مطابقت: ${colorMatch}`
                );
                
                return colorMatch;
            });
            
            console.log("تعداد محصولات پس از فیلتر رنگ:", result.length);
        }
        
        // فیلتر بر اساس عبارت جستجو
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter(product => {
                const searchMatch = 
                    product.title.toLowerCase().includes(term) || 
                    product.originalName.toLowerCase().includes(term);
                
                console.log(
                    `محصول: ${product.title}, ` +
                    `عبارت جستجو: ${term}, ` +
                    `مطابقت: ${searchMatch}`
                );
                
                return searchMatch;
            });
            
            console.log("تعداد محصولات پس از فیلتر جستجو:", result.length);
        }
        
        console.log("محصولات نهایی پس از فیلتر:", result);
        dispatch(setFilteredProducts(result));
    }
);