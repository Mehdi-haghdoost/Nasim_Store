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
);

/**
 * Send OTP async thunk
 * Handles sending verification code to phone for registration
 */
export const sendOtp = createAsyncThunk(
    'auth/sendOtp',
    async (phone, { rejectWithValue }) => {
        try {
            const { data } = await client.mutate({
                mutation: SEND_OTP,
                variables: { phone }
            });

            if (data?.sendOtp) {
                return {
                    message: data.sendOtp.message,
                    type: 'register'
                };
            }

            return rejectWithValue('خطا در ارسال کد تایید');

        } catch (error) {
            return rejectWithValue(error.message || 'خطا در ارسال کد تایید');
        }
    }
);

/**
 * Send OTP for login async thunk
 * Handles sending verification code to phone for login
 */

export const sendOtpForLogin = createAsyncThunk(
    'auth/sendOtpForLogin',
    async (phone, { rejectWithValue }) => {
        try {
            const { data } = await client.mutate({
                mutation: SEND_OTP_FOR_LOGIN,
                variables: { phone }
            });

            if (data?.sendOtpForLogin) {
                return {
                    message: data.sendOtpForLogin.message,
                    type: 'login'
                };
            }

            return rejectWithValue('خطا در ارسال کد تایید ورود');
        } catch (error) {
            return rejectWithValue(error.message || 'خطا در ارسال کد تایید ورود');
        }
    }
);

/**
 * Confirm OTP and register async thunk
 * Handles OTP verification and user registration
 */

export const confirmOtpAndRegister = createAsyncThunk(
    'auth/confirmOtpAndRegister',
    async ({ phone, code }, { rejectWithValue }) => {
        try {
            const { data } = await client.mutate({
                mutation: CONFIRM_OTP_AND_REGISTER,
                variables: { phone, code }
            });

            if (data?.confirmOtpAndRegister) {
                // ذخیره توکن ها در localStorage
                localStorage.setItem('token', data.confirmOtpAndRegister.token);
                localStorage.setItem('refreshToken', data.confirmOtpAndRegister.refreshToken);

                return data.confirmOtpAndRegister;
            };

            return rejectWithValue('خطا در کد تایید و ثبت نام')
        } catch (error) {
            return rejectWithValue(error.message || 'خطا در تایید کد و ثبت‌نام');
        }
    }
);


/**
 * Verify OTP and login async thunk
 * Handles OTP verification and user login
 */
export const verifyOtpAndLogin = createAsyncThunk(
    'auth/verifyOtpAndLogin',
    async ({ phone, code }, { rejectWithValue }) => {
        try {
            const { data } = await client.mutate({
                mutation: VERIFY_OTP_AND_LOGIN,
                variables: { phone, code }
            });

            if (data?.verifyOtpAndLogin) {
                // ذخیره توکن ها در localStorage
                localStorage.setItem('token', data.verifyOtpAndLogin.token);
                localStorage.setItem('refreshToken', data.verifyOtpAndLogin.refreshToken);

                return data.verifyOtpAndLogin;
            }

            return rejectWithValue('خطا در تایید کد و ورود')
        } catch (error) {
            return rejectWithValue(error.message || 'خطا در تایید کد و ورود');
        }
    }
);


/**
 * Update user profile async thunk
 * Handles updating user profile information
 */
export const updateUserProfile = createAsyncThunk(
    'auth/updateUserProfile',
    async (input, { rejectWithValue }) => {
        try {
            const { data } = await client.mutate({
                mutation: UPDATE_USER_PROFILE,
                variables: { input }
            });

            if (data?.updateUserProfile) {
                return data.updateUserProfile;
            };

            return rejectWithValue('خطا در به‌روزرسانی پروفایل');
        } catch (error) {
            return rejectWithValue(error.message || 'خطا در به‌روزرسانی پروفایل');
        }
    }
);

/**
 * Refresh token async thunk
 * Handles refreshing the authentication token
 */
export const refreshToken = createAsyncThunk(
    'auth/refreshToken',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await client.mutate({
                mutation: REFRESH_TOKEN,
            });

            if (data?.refreshTokenMutation) {
                // ذخیره توکن ها در localStorage
                localStorage.setItem('token', data.refreshTokenMutation.token);
                localStorage.setItem('refreshToken', data.refreshTokenMutation.refreshToken);

                return data.refreshTokenMutation;
            };

            return rejectWithValue('خطا در تجدید توکن');
        } catch (error) {
            return rejectWithValue(error.message || 'خطا در تجدید توکن');
        }
    }
);

/**
 * Logout user async thunk
 * Handles user logout and token invalidation
 */
export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, { rejectWithValue }) => {
      try {
        await client.mutate({
          mutation: LOGOUT
        });
        
        // حذف توکن‌ها از localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        
        return true;
      } catch (error) {
        return rejectWithValue(error.message || 'خطا در خروج از سیستم');
      }
    }
  );
