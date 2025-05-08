// # اسلایس مربوط به احراز هویت با پشتیبانی از کوکی‌ها

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

const initialState = {
    isAuthenticated: false,
    token: null, // دیگر ذخیره نمی‌کنیم چون از کوکی‌ها استفاده می‌شه
    refreshToken: null, // دیگر ذخیره نمی‌کنیم چون از کوکی‌ها استفاده می‌شه
    user: null,
    loading: false,
    error: null,
    otpSent: false,
    otpVerified: false,
    otpMessage: null,
    registrationType: 'standard', // 'standard', 'otp'
    cachedAddresses: [] // آرایه‌ای برای ذخیره موقت آدرس‌ها
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
                state.user = action.payload.user;
                // اگر در داده‌های کاربر آدرس وجود داشت، آن را کش می‌کنیم
                if (action.payload.user.addresses && action.payload.user.addresses.length > 0) {
                    state.cachedAddresses = action.payload.user.addresses;
                }
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
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload.user;
                // اگر در داده‌های کاربر آدرس وجود داشت، آن را کش می‌کنیم
                if (action.payload.user.addresses && action.payload.user.addresses.length > 0) {
                    state.cachedAddresses = action.payload.user.addresses;
                }
                state.loading = false;
                state.error = null;
                state.registrationType = 'standard';
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Send OTP
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
            .addCase(confirmOtpAndRegister.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(confirmOtpAndRegister.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload.user;
                // اگر در داده‌های کاربر آدرس وجود داشت، آن را کش می‌کنیم
                if (action.payload.user.addresses && action.payload.user.addresses.length > 0) {
                    state.cachedAddresses = action.payload.user.addresses;
                }
                state.loading = false;
                state.error = null;
                state.otpVerified = true;
            })
            .addCase(confirmOtpAndRegister.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Verify OTP and Login
            .addCase(verifyOtpAndLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyOtpAndLogin.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload.user;
                // اگر در داده‌های کاربر آدرس وجود داشت، آن را کش می‌کنیم
                if (action.payload.user.addresses && action.payload.user.addresses.length > 0) {
                    state.cachedAddresses = action.payload.user.addresses;
                }
                state.loading = false;
                state.error = null;
                state.otpVerified = true;
            })
            .addCase(verifyOtpAndLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Update User Profile
            .addCase(updateUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                // بروزرسانی اطلاعات کاربر با حفظ آدرس‌های کش شده
                state.user = { 
                    ...state.user, 
                    ...action.payload,
                    addresses: state.user.addresses || state.cachedAddresses 
                };
                state.loading = false;
                state.error = null;
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Refresh Token
            .addCase(refreshToken.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(refreshToken.fulfilled, (state, action) => {
                if (action.payload.user) {
                    state.isAuthenticated = true;
                    state.user = action.payload.user;
                    // اگر در داده‌های کاربر آدرس وجود داشت، آن را کش می‌کنیم
                    if (action.payload.user.addresses && action.payload.user.addresses.length > 0) {
                        state.cachedAddresses = action.payload.user.addresses;
                    }
                } else {
                    state.isAuthenticated = false;
                }
                state.loading = false;
                state.error = null;
            })
            .addCase(refreshToken.rejected, (state, action) => {
                state.isAuthenticated = false;
                state.user = null;
                state.loading = false;
                state.error = action.payload || 'خطا در تجدید توکن';
            })

            // Logout User
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.isAuthenticated = false;
                state.user = null;
                state.otpSent = false;
                state.otpVerified = false;
                state.otpMessage = null;
                state.registrationType = 'standard';
                state.loading = false;
                state.error = null;
                state.cachedAddresses = []; // پاک کردن آدرس‌های کش شده
                // سبد خرید کاربر لاگین شده در localStorage باقی می‌ماند
                // اما کلید آن را عوض می‌کنیم تا به سبد خرید مهمان تبدیل شود
                // این کار در cartThunks انجام می‌شود
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearError, otpVerifySuccess } = authSlice.actions;
export default authSlice.reducer;