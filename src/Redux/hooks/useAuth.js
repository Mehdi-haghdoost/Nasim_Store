import { useSelector, useDispatch } from "react-redux";
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
import { clearError } from "../slices/authSlice";

export const useAuth = () => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

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

        // Action
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