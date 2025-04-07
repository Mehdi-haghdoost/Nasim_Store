//  # اسلایس مربوط به احراز هویت

import { createSlice } from "@reduxjs/toolkit";


/**
 * Authentication slice for Redux store
 * Manages user authentication state including tokens and user data
 */

const initialState = {
    isAuthenticated: false,
    token: typeof window !== "undefined" ? localStorage.getItem('token') : null,
    refreshToken: typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null,
    user: null,
    lodaing: false,
    error: null,
    otpSent: false,
    otpVerified: false,
    otpMessage: null,
    registrationType: 'standard',  // 'standard', 'otp'
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.lodaing = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.lodaing = false;
        },
        clearError: (state) => {
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.token = action.payload.token;
            state.refreshToken = action.payload.refreshToken;
            state.user = action.payload.user;
            state.loading = false;
            state.error = false;
            state.otpVerified = false;
            state.otpSent = false;

            // ذخیره توکن ها در localStorage
            if (typeof window !== 'undefined') {
                localStorage.setItem('token', action.payload.token);
                localStorage.setItem('refreshToken', action.payload.refreshToken);
            }
        },

        registerSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.token = action.payload.token;
            state.refreshToken = action.payload.refreshToken;
            state.user = action.payload.user;
            state.loading = false;
            state.error = null;
            state.registrationType = 'standard';

            // ذخیره توکن ها در localStorage
            if (typeof window !== 'undefined') {
                localStorage.setItem('token', action.payload.token);
                localStorage.setItem('refreshToken', action.payload.refreshToken);
            }
        },

        otpSendSuccess: (state, action) => {
            state.otpSent = true;
            state.otpMessage = action.payload.message;
            state.loading = false;
            state.error = null;
            state.registrationType = action.payload.type || 'otp';
        },

        otpVerifySuccess: (state) => {
            state.otpVerified = true;
            state.loading = false;
            state.error = null;
        },

        updateUser: (state, action) => {
            state.user = { ...state.user, ...action.payload };
        },

        refreshTokenSuccess: (state, action) => {
            state.token = action.payload.token;
            state.refreshToken = action.payload.token;
            state.user = action.payload.user;

            if (typeof window !== 'undefined') {
                localStorage.setItem('token', action.payload.token);
                localStorage.setItem('refreshToken', action.payload.refreshToken);
            }
        },

        logout: (state) => {
            state.isAuthenticated = false;
            state.token = null;
            state.refreshToken = null;
            state.user = null;
            state.otpSent = false;
            state.otpVerified = false;
            state.otpMessage = null;
            state.registrationType = 'standard';

            // حذف توکن‌ها از localStorage
            if (typeof window !== 'undefined') {
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
            }
        },
    },
});

export const {
    setLoading,
    setError,
    clearError,
    loginSuccess,
    registerSuccess,
    otpSendSuccess,
    otpVerifySuccess,
    updateUser,
    refreshTokenSuccess,
    logout
} = authSlice.actions;

export default authSlice.reducer;