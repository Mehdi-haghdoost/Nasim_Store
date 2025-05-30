import { createAsyncThunk } from '@reduxjs/toolkit';

// افزودن محصول به لیست مقایسه (اگر بخواهید از API استفاده کنید)
export const addProductToCompare = createAsyncThunk(
    'compare/addProduct',
    async (productData, { rejectWithValue, getState }) => {
        try {
            const { compare } = getState();
            
            // بررسی حداکثر تعداد محصولات
            if (compare.compareProducts.length >= compare.maxProducts) {
                throw new Error(`حداکثر ${compare.maxProducts} محصول قابل مقایسه است`);
            }
            
            // بررسی تکراری نبودن محصول
            const existingProduct = compare.compareProducts.find(p => p._id === productData._id);
            if (existingProduct) {
                throw new Error('این محصول قبلاً به لیست مقایسه اضافه شده است');
            }

            // اگر بخواهید از API استفاده کنید
            // const response = await fetch('/api/user/compare', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Authorization': `Bearer ${localStorage.getItem('token')}`
            //     },
            //     body: JSON.stringify({ productId: productData._id })
            // });

            // if (!response.ok) {
            //     const errorData = await response.json();
            //     throw new Error(errorData.message || 'خطا در افزودن به لیست مقایسه');
            // }

            // const result = await response.json();
            // return result.product;

            // برای الان فقط محصول را برمی‌گردانیم (Local Storage)
            const existingCompare = JSON.parse(localStorage.getItem('compareProducts') || '[]');
            
            if (existingCompare.length >= 3) {
                throw new Error('حداکثر 3 محصول قابل مقایسه است');
            }
            
            if (existingCompare.find(p => p._id === productData._id)) {
                throw new Error('این محصول قبلاً به لیست مقایسه اضافه شده است');
            }
            
            const updatedCompare = [...existingCompare, productData];
            localStorage.setItem('compareProducts', JSON.stringify(updatedCompare));
            
            return productData;
            
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// حذف محصول از لیست مقایسه
export const removeProductFromCompare = createAsyncThunk(
    'compare/removeProduct',
    async (productId, { rejectWithValue }) => {
        try {
            // اگر بخواهید از API استفاده کنید
            // const response = await fetch(`/api/user/compare/${productId}`, {
            //     method: 'DELETE',
            //     headers: {
            //         'Authorization': `Bearer ${localStorage.getItem('token')}`
            //     }
            // });

            // if (!response.ok) {
            //     const errorData = await response.json();
            //     throw new Error(errorData.message || 'خطا در حذف از لیست مقایسه');
            // }

            // Local Storage
            const existingCompare = JSON.parse(localStorage.getItem('compareProducts') || '[]');
            const updatedCompare = existingCompare.filter(p => p._id !== productId);
            localStorage.setItem('compareProducts', JSON.stringify(updatedCompare));
            
            return productId;
            
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// پاک کردن کل لیست مقایسه
export const clearCompareList = createAsyncThunk(
    'compare/clearList',
    async (_, { rejectWithValue }) => {
        try {
            // اگر بخواهید از API استفاده کنید
            // const response = await fetch('/api/user/compare', {
            //     method: 'DELETE',
            //     headers: {
            //         'Authorization': `Bearer ${localStorage.getItem('token')}`
            //     }
            // });

            // if (!response.ok) {
            //     const errorData = await response.json();
            //     throw new Error(errorData.message || 'خطا در پاک کردن لیست مقایسه');
            // }

            // Local Storage
            localStorage.removeItem('compareProducts');
            
            return [];
            
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// دریافت محصولات مقایسه
export const getCompareProducts = createAsyncThunk(
    'compare/getProducts',
    async (_, { rejectWithValue }) => {
        try {
            // اگر بخواهید از API استفاده کنید
            // const response = await fetch('/api/user/compare', {
            //     headers: {
            //         'Authorization': `Bearer ${localStorage.getItem('token')}`
            //     }
            // });

            // if (!response.ok) {
            //     const errorData = await response.json();
            //     throw new Error(errorData.message || 'خطا در دریافت لیست مقایسه');
            // }

            // const result = await response.json();
            // return result.products;

            // Local Storage
            const compareProducts = JSON.parse(localStorage.getItem('compareProducts') || '[]');
            return compareProducts;
            
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// بررسی اینکه آیا محصول در لیست مقایسه هست یا نه
export const checkProductInCompare = createAsyncThunk(
    'compare/checkProduct',
    async (productId, { getState }) => {
        try {
            const { compare } = getState();
            return compare.compareProducts.some(p => p._id === productId);
        } catch (error) {
            return false;
        }
    }
);