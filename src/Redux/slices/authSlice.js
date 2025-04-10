//  # اسلایس مربوط به احراز هویت

import { createSlice } from "@reduxjs/toolkit";

import {
    loginUser,
    registerUser,
    sendOtp,
    sendOtpForLogin,
    confirmOtpAndRegister,
    verifyOtpAndLogin,
    updateUserProfile,
    refreshToken,
    logoutUser
} from "../actions/authThunks";


/**
 * Authentication slice for Redux store
 * Manages user authentication state including tokens and user data
 */

const initialState = {
    isAuthenticated: false,
    token: typeof window !== "undefined" ? localStorage.getItem('token') : null,
    refreshToken: typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null,
    user: null,
    loading: false,
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
        clearError: (state) => {
            state.error = null;
        },
        otpVerifySuccess: (state) => {
            state.otpVerified = true;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Login User
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.token = action.payload.token;
                state.refreshToken = action.payload.refreshToken;
                state.user = action.payload.user;
                state.loading = false;
                state.error = null;
                state.otpVerified = false;
                state.otpSent = false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

        // Register User
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.token = action.payload.token;
                state.refreshToken = action.payload.refreshToken;
                state.user = action.payload.user;
                state.loading = false;
                state.error = null;
                state.registrationType = 'standard';
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

        // Send OTP
        builder
            .addCase(sendOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sendOtp.fulfilled, (state, action) => {
                state.otpSent = true;
                state.otpMessage = action.payload.message;
                state.loading = false;
                state.error = null;
                state.registrationType = action.payload.type || 'otp';
            })
            .addCase(sendOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

        // Send OTP for Login
        builder
            .addCase(sendOtpForLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sendOtpForLogin.fulfilled, (state, action) => {
                state.otpSent = true;
                state.otpMessage = action.payload.message;
                state.loading = false;
                state.error = null;
                state.registrationType = action.payload.type || 'otp';
            })
            .addCase(sendOtpForLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

        // Confirm OTP and Register
        builder
            .addCase(confirmOtpAndRegister.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(confirmOtpAndRegister.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.token = action.payload.token;
                state.refreshToken = action.payload.refreshToken;
                state.user = action.payload.user;
                state.loading = false;
                state.error = null;
                state.otpVerified = true;
            })
            .addCase(confirmOtpAndRegister.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

        // Verify OTP and Login
        builder
            .addCase(verifyOtpAndLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyOtpAndLogin.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.token = action.payload.token;
                state.refreshToken = action.payload.refreshToken;
                state.user = action.payload.user;
                state.loading = false;
                state.error = null;
                state.otpVerified = true;
            })
            .addCase(verifyOtpAndLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

        // Update User Profile
        builder
            .addCase(updateUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.user = { ...state.user, ...action.payload };
                state.loading = false;
                state.error = null;
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

        // Refresh Token
        builder
            .addCase(refreshToken.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(refreshToken.fulfilled, (state, action) => {
                state.token = action.payload.token;
                state.refreshToken = action.payload.refreshToken;
                state.user = action.payload.user;
                state.loading = false;
                state.error = null;
            })
            .addCase(refreshToken.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

        // Logout User
        builder
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.isAuthenticated = false;
                state.token = null;
                state.refreshToken = null;
                state.user = null;
                state.otpSent = false;
                state.otpVerified = false;
                state.otpMessage = null;
                state.registrationType = 'standard';
                state.loading = false;
                state.error = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});


export const { clearError, otpVerifySuccess } = authSlice.actions;
export default authSlice.reducer;
