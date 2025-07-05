// import { useSelector, useDispatch } from "react-redux";
// import { useEffect } from "react";
// import {
//     loginUser,
//     registerUser,
//     sendOtp,
//     sendOtpForLogin,
//     confirmOtpAndRegister,
//     verifyOtpAndLogin,
//     updateUserProfile,
//     refreshToken,
//     logoutUser,
//     checkAuth
// } from "../actions/authThunks";
// import { clearError } from "../slices/authSlice";

// export const useAuth = () => {
//     const dispatch = useDispatch();
//     const auth = useSelector(state => state.auth);

//     // بررسی خودکار auth هنگام بارگذاری اولیه (فقط اگر token وجود داشته باشد)
//     useEffect(() => {
//         // فقط در client side و فقط اگر refresh token وجود داشته باشد
//         if (typeof window !== 'undefined' && !auth.isAuthenticated && !auth.loading) {
//             const hasRefreshToken = document.cookie.includes('refreshToken=') && 
//                                   !document.cookie.includes('refreshToken=;') &&
//                                   !document.cookie.includes('refreshToken=undefined');
            
//             if (hasRefreshToken) {
//                 dispatch(checkAuth());
//             }
//         }
//     }, [dispatch, auth.isAuthenticated, auth.loading]);

//     // توابع کمکی برای عملیات احراز هویت
//     const login = (phoneOrEmail, password) => {
//         dispatch(clearError());
//         return dispatch(loginUser({ phoneOrEmail, password }));
//     };

//     const register = (username, email, phone, password) => {
//         dispatch(clearError());
//         return dispatch(registerUser({ username, email, phone, password }));
//     };

//     const logout = () => {
//         dispatch(clearError());
//         return dispatch(logoutUser());
//     };

//     const requestOtp = (phone) => {
//         dispatch(clearError());
//         return dispatch(sendOtp(phone));
//     };

//     const requestLoginOtp = (phone) => {
//         dispatch(clearError());
//         return dispatch(sendOtpForLogin(phone));
//     };

//     const confirmOtp = (phone, code) => {
//         dispatch(clearError());
//         return dispatch(confirmOtpAndRegister({ phone, code }));
//     };

//     const loginWithOtp = (phone, code) => {
//         dispatch(clearError());
//         return dispatch(verifyOtpAndLogin({ phone, code }));
//     };

//     const updateProfile = (profileData) => {
//         dispatch(clearError());
//         return dispatch(updateUserProfile(profileData));
//     };

//     const refreshAuthToken = () => {
//         dispatch(clearError());
//         return dispatch(refreshToken());
//     };

//     return {
//         // State
//         isAuthenticated: auth.isAuthenticated,
//         user: auth.user,
//         loading: auth.loading,
//         error: auth.error,
//         otpSent: auth.otpSent,
//         otpVerified: auth.otpVerified,
//         otpMessage: auth.otpMessage,
//         registrationType: auth.registrationType,

//         // Actions
//         login,
//         register,
//         logout,
//         requestOtp,
//         requestLoginOtp,
//         confirmOtp,
//         loginWithOtp,
//         updateProfile,
//         refreshAuthToken,
//         clearError: () => dispatch(clearError()),
//     };
// };

// export default useAuth;

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import {
    loginUser,
    registerUser,
    sendOtp,
    sendOtpForLogin,
    confirmOtpAndRegister,
    verifyOtpAndLogin,
    updateUserProfile,
    refreshToken,
    logoutUser,
    checkAuth
} from "../actions/authThunks";
import { clearError } from "../slices/authSlice";

export const useAuth = () => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const hasInitialized = useRef(false);

    // بررسی خودکار auth هنگام بارگذاری اولیه (فقط یک بار)
    useEffect(() => {
        // جلوگیری از اجرای مکرر
        if (hasInitialized.current) return;
        
        // فقط در client side اجرا شود
        if (typeof window === 'undefined') return;
        
        // اگر قبلاً authenticated است یا در حال loading است، نیازی به چک مجدد نیست
        if (auth.isAuthenticated || auth.loading) {
            hasInitialized.current = true;
            return;
        }
        
        // بررسی وجود refresh token در کوکی
        const checkCookie = () => {
            const cookies = document.cookie.split(';');
            const refreshTokenCookie = cookies.find(cookie => 
                cookie.trim().startsWith('refreshToken=')
            );
            
            if (refreshTokenCookie) {
                const tokenValue = refreshTokenCookie.split('=')[1];
                // اگر token وجود دارد و خالی نیست
                if (tokenValue && tokenValue !== 'undefined' && tokenValue !== 'null' && tokenValue.trim() !== '') {
                    return true;
                }
            }
            return false;
        };

        if (checkCookie()) {
            hasInitialized.current = true;
            dispatch(checkAuth());
        } else {
            hasInitialized.current = true;
        }
    }, []); // فقط یک بار در mount اجرا شود

    // توابع کمکی برای عملیات احراز هویت
    const login = (phoneOrEmail, password) => {
        dispatch(clearError());
        return dispatch(loginUser({ phoneOrEmail, password }));
    };

    const register = (username, email, phone, password) => {
        dispatch(clearError());
        return dispatch(registerUser({ username, email, phone, password }));
    };

    const logout = () => {
        dispatch(clearError());
        hasInitialized.current = false; // Reset برای استفاده مجدد
        return dispatch(logoutUser());
    };

    const requestOtp = (phone) => {
        dispatch(clearError());
        return dispatch(sendOtp(phone));
    };

    const requestLoginOtp = (phone) => {
        dispatch(clearError());
        return dispatch(sendOtpForLogin(phone));
    };

    const confirmOtp = (phone, code) => {
        dispatch(clearError());
        return dispatch(confirmOtpAndRegister({ phone, code }));
    };

    const loginWithOtp = (phone, code) => {
        dispatch(clearError());
        return dispatch(verifyOtpAndLogin({ phone, code }));
    };

    const updateProfile = (profileData) => {
        dispatch(clearError());
        return dispatch(updateUserProfile(profileData));
    };

    const refreshAuthToken = () => {
        dispatch(clearError());
        return dispatch(refreshToken());
    };

    return {
        // State
        isAuthenticated: auth.isAuthenticated,
        user: auth.user,
        loading: auth.loading,
        error: auth.error,
        otpSent: auth.otpSent,
        otpVerified: auth.otpVerified,
        otpMessage: auth.otpMessage,
        registrationType: auth.registrationType,

        // Actions
        login,
        register,
        logout,
        requestOtp,
        requestLoginOtp,
        confirmOtp,
        loginWithOtp,
        updateProfile,
        refreshAuthToken,
        clearError: () => dispatch(clearError()),
    };
};

export default useAuth;