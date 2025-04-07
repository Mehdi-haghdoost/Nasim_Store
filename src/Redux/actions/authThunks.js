// # اکشن‌های غیرهمزمان برای احراز هویت با استفاده از createAsyncThunk

import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    LOGIN_USER,
    REGISTER_USER,
    LOGOUT,
    SEND_OTP,
    SEND_OTP_FOR_LOGIN,
    CONFIRM_OTP_AND_REGISTER,
    VERIFY_OTP_AND_LOGIN,
    UPDATE_USER_PROFILE,
    REFRESH_TOKEN
} from '@/graphql/entities/users/user.mutations';

import client from "@/graphql/client";


/**
 * Login user async thunk
 * Handles authentication with email/phone and password
 */
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ phoneOrEmail, password }, { rejectWithValue }) => {
        try {
            const { data } = await client.mutate({
                mutation: LOGIN_USER,
                variables: { phoneOrEmail, password }
            });

            if (data?.loginUser) {
                // ذخیره توکن ها در localStorage
                localStorage.setItem('token', data.loginUser.token);
                localStorage.setItem('refreshToken', data.loginUser.refreshToken);

                return data.loginUser;
            }

            return rejectWithValue('خطا در ورود به سیستم');
        } catch (error) {
            return rejectWithValue(error.message || 'خطا در ورود به سیستم');
        }
    }
);

/**
 * Register user async thunk
 * Handles user registration with username, email, phone and password
 */

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async ({ username, email, phone, password }, { rejectWithValue }) => {
        try {
            const { data } = await client.mutate({
                mutation: REGISTER_USER,
                variables: { username, email, phone, password }
            });

            if (data?.registerUser) {
                // ذخیره توکن ها در localStorage
                localStorage.setItem('token', data.registerUser.token);
                localStorage.setItem('refreshToken', data.registerUser.refreshToken);

                return data.registerUser;
            }

            return rejectWithValue('خطا در ثبت نام')
        } catch (error) {
            return rejectWithValue(error.message || 'خطا در ثبت‌نام');
        }
    }
)
