import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    ADD_ADDRESS,
    DELETE_ADDRESS,
    UPDATE_ADDRESS_DEFAULT,
    UPDATE_ADDRESS
} from '@/graphql/entities/address/address.mutations';
import { 
    GET_ALL_ADDRESSES 
} from '@/graphql/entities/address/address.queries';
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
 * Get all addresses async thunk
 */
export const getAllAddresses = createAsyncThunk(
    'auth/getAllAddresses',
    async (_, { rejectWithValue }) => {
        try {
            const { data, errors } = await client.query({
                query: GET_ALL_ADDRESSES,
                fetchPolicy: 'network-only' // اجبار به دریافت داده‌های تازه از سرور
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

/**
 * Update address async thunk
 */
export const updateAddress = createAsyncThunk(
    'auth/updateAddress',
    async (addressData, { rejectWithValue }) => {
        try {
            const { id, ...input } = addressData;
            
            console.log("Updating address with data:", { id, input });
            
            const { data, errors } = await client.mutate({
                mutation: UPDATE_ADDRESS,
                variables: { 
                    id: id,
                    input: input
                }
            });

            console.log("Update address response:", { data, errors });

            if (errors && Array.isArray(errors) && errors.length > 0) {
                return rejectWithValue(errors[0].message || 'خطای ناشناخته از سرور');
            }

            if (data?.updateAddress) {
                return data.updateAddress;
            }

            return rejectWithValue('خطا در به‌روزرسانی آدرس');
        } catch (error) {
            console.error("Update address error:", error);
            return rejectWithValue(error.message || 'خطا در به‌روزرسانی آدرس');
        }
    }
);