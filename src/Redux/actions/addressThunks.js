// src/Redux/actions/addressThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    ADD_ADDRESS,
    DELETE_ADDRESS,
    UPDATE_ADDRESS_DEFAULT,
    GET_ALL_ADDRESSES,
    UPDATE_ADDRESS
} from '@/graphql/entities/address/address.mutations';
import client from "@/graphql/client";

/**
 * Add new address async thunk
 */
export const addAddress = createAsyncThunk(
    'auth/addAddress',
    async (addressData, { rejectWithValue }) => {
        try {
            const { data, errors } = await client.mutate({
                mutation: ADD_ADDRESS,
                variables: { input: addressData }
            });

            console.log("Add address response:", { data, errors });

            if (errors && Array.isArray(errors) && errors.length > 0) {
                return rejectWithValue(errors[0].message || 'خطای ناشناخته از سرور');
            }

            if (data?.addNewAddress) {
                return data.addNewAddress;
            }

            return rejectWithValue('خطا در ثبت آدرس جدید');
        } catch (error) {
            console.error("Add address error:", error);
            return rejectWithValue(error.message || 'خطا در ثبت آدرس جدید');
        }
    }
);

/**
 * Set default address async thunk
 */
export const setDefaultAddress = createAsyncThunk(
    'auth/setDefaultAddress',
    async (addressId, { rejectWithValue }) => {
        try {
            const { data, errors } = await client.mutate({
                mutation: UPDATE_ADDRESS_DEFAULT,
                variables: { 
                    input: {
                        addressId: addressId,
                        isDefault: true
                    }
                }
            });

            console.log("Set default address response:", { data, errors });

            if (errors && Array.isArray(errors) && errors.length > 0) {
                return rejectWithValue(errors[0].message || 'خطای ناشناخته از سرور');
            }

            if (data?.updateAddressDefault) {
                return data.updateAddressDefault;
            }

            return rejectWithValue('خطا در تنظیم آدرس پیش‌فرض');
        } catch (error) {
            console.error("Set default address error:", error);
            return rejectWithValue(error.message || 'خطا در تنظیم آدرس پیش‌فرض');
        }
    }
);

/**
 * Delete address async thunk
 */
export const deleteAddress = createAsyncThunk(
    'auth/deleteAddress',
    async (addressId, { rejectWithValue }) => {
        try {
            const { data, errors } = await client.mutate({
                mutation: DELETE_ADDRESS,
                variables: { addressId }
            });

            console.log("Delete address response:", { data, errors });

            if (errors && Array.isArray(errors) && errors.length > 0) {
                return rejectWithValue(errors[0].message || 'خطای ناشناخته از سرور');
            }

            if (data?.deleteAddress) {
                return addressId; // برگرداندن ID آدرس حذف شده
            }

            return rejectWithValue('خطا در حذف آدرس');
        } catch (error) {
            console.error("Delete address error:", error);
            return rejectWithValue(error.message || 'خطا در حذف آدرس');
        }
    }
);

/**
 * Update address async thunk
 * در صورت نیاز به استفاده از mutation واقعی UPDATE_ADDRESS
 */
export const updateAddress = createAsyncThunk(
    'auth/updateAddress',
    async (addressData, { dispatch, rejectWithValue }) => {
        try {
            const { id, ...updateData } = addressData;
            console.log("Update address data:", { id, updateData });
            
            // استراتژی حذف و سپس اضافه به عنوان روش جایگزین
            // 1. حذف آدرس قدیمی
            const deleteResponse = await dispatch(deleteAddress(id));
            if (!deleteResponse.payload) {
                return rejectWithValue('خطا در حذف آدرس قدیمی');
            }
            
            // 2. اضافه کردن آدرس جدید
            const addResponse = await dispatch(addAddress(updateData));
            if (addResponse.payload) {
                return addResponse.payload;
            }
            
            return rejectWithValue('خطا در اضافه کردن آدرس جدید');
        } catch (error) {
            console.error("Update address error:", error);
            return rejectWithValue(error.message || 'خطا در به‌روزرسانی آدرس');
        }
    }
);

/**
 * Get all addresses async thunk
 */
export const getAllAddresses = createAsyncThunk(
    'auth/getAllAddresses',
    async (_, { rejectWithValue }) => {
        try {
            const { data, errors } = await client.query({
                query: GET_ALL_ADDRESSES
            });

            console.log("Get all addresses response:", { data, errors });

            if (errors && Array.isArray(errors) && errors.length > 0) {
                return rejectWithValue(errors[0].message || 'خطای ناشناخته از سرور');
            }

            if (data?.getAllAddress) {
                return data.getAllAddress;
            }

            return rejectWithValue('خطا در دریافت آدرس‌ها');
        } catch (error) {
            console.error("Get all addresses error:", error);
            return rejectWithValue(error.message || 'خطا در دریافت آدرس‌ها');
        }
    }
);