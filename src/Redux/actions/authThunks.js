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
  REFRESH_TOKEN,
} from "@/graphql/entities/users/user.mutations";
import client from "@/graphql/client";
import { gql } from "@apollo/client";

/**
 * Check auth async thunk
 * Checks if the user is authenticated by querying the 'me' endpoint
 */
export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const { data, errors } = await client.query({
        query: gql`
          query Me {
            me {
              _id
              username
              email
              phone
              role
              addresses {
                _id
                fullAddress
                city
                province
                isDefault
              }
            }
          }
        `,
        fetchPolicy: "network-only",
      });


      if (errors && Array.isArray(errors) && errors.length > 0) {
        return rejectWithValue(errors[0].message || "خطای ناشناخته از سرور");
      }

      if (data?.me) {
        return { user: data.me, isAuthenticated: true };
      }

      return rejectWithValue("کاربر احراز هویت نشده است");
    } catch (error) {
      return rejectWithValue(error.message || "خطا در بررسی احراز هویت");
    }
  }
);

/**
 * Login user async thunk
 */
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ phoneOrEmail, password }, { rejectWithValue }) => {
    try {
      const { data, errors } = await client.mutate({
        mutation: LOGIN_USER,
        variables: { phoneOrEmail, password },
      });


      if (errors && Array.isArray(errors) && errors.length > 0) {
        return rejectWithValue(errors[0].message || "خطای ناشناخته از سرور");
      }

      if (data?.loginUser) {
        return data.loginUser;
      }

      return rejectWithValue("خطا در ورود به سیستم");
    } catch (error) {
      return rejectWithValue(error.message || "خطا در ورود به سیستم");
    }
  }
);

/**
 * Register user async thunk
 */
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ username, email, phone, password }, { rejectWithValue }) => {
    try {
      const variables = { username, email, password };
      if (phone) variables.phone = phone;

      const { data, errors } = await client.mutate({
        mutation: REGISTER_USER,
        variables,
      });

      if (errors && Array.isArray(errors) && errors.length > 0) {
        return rejectWithValue(errors[0].message || "خطای ناشناخته از سرور");
      }

      if (data?.registerUser) {
        return data.registerUser;
      }

      return rejectWithValue("پاسخ سرور نامعتبر است");
    } catch (error) {
      return rejectWithValue(error.message || "خطا در ثبت‌نام");
    }
  }
);

/**
 * Confirm OTP and register async thunk
 */
export const confirmOtpAndRegister = createAsyncThunk(
  "auth/confirmOtpAndRegister",
  async ({ phone, code }, { rejectWithValue }) => {
    try {
      const { data, errors } = await client.mutate({
        mutation: CONFIRM_OTP_AND_REGISTER,
        variables: { phone, code },
      });

      if (errors && Array.isArray(errors) && errors.length > 0) {
        return rejectWithValue(errors[0].message || "خطای ناشناخته از سرور");
      }

      if (data?.confirmOtpAndRegister) {
        return data.confirmOtpAndRegister;
      }

      return rejectWithValue("خطا در کد تایید و ثبت نام");
    } catch (error) {
      return rejectWithValue(error.message || "خطا در تایید کد و ثبت‌نام");
    }
  }
);

/**
 * Verify OTP and login async thunk
 */
export const verifyOtpAndLogin = createAsyncThunk(
  "auth/verifyOtpAndLogin",
  async ({ phone, code }, { rejectWithValue }) => {
    try {
      const { data, errors } = await client.mutate({
        mutation: VERIFY_OTP_AND_LOGIN,
        variables: { phone, code },
      });

      if (errors && Array.isArray(errors) && errors.length > 0) {
        return rejectWithValue(errors[0].message || "خطای ناشناخته از سرور");
      }

      if (data?.verifyOtpAndLogin) {
        return data.verifyOtpAndLogin;
      }

      return rejectWithValue("خطا در تایید کد و ورود");
    } catch (error) {
      return rejectWithValue(error.message || "خطا در تایید کد و ورود");
    }
  }
);

/**
 * Refresh token async thunk
 */
export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const { data, errors } = await client.mutate({
        mutation: REFRESH_TOKEN,
      });

      if (errors && Array.isArray(errors) && errors.length > 0) {
        return rejectWithValue(errors[0].message || "خطای ناشناخته از سرور");
      }

      if (data?.refreshTokenMutation) {
        return data.refreshTokenMutation;
      }

      return rejectWithValue("خطا در تجدید توکن");
    } catch (error) {
      return rejectWithValue(error.message || "خطا در تجدید توکن");
    }
  }
);

/**
 * Logout user async thunk
 */
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await client.mutate({
        mutation: LOGOUT,
      });

      // حذف کوکی‌ها (اگر در مرورگر باشیم)
      if (typeof document !== "undefined") {
        document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      }

      // پاک کردن سبد خرید کاربر
      dispatch({ type: "cart/clearCartState" });

      return true;
    } catch (error) {
      return rejectWithValue(error.message || "خطا در خروج از سیستم");
    }
  }
);

/**
 * Send OTP async thunk
 */
export const sendOtp = createAsyncThunk(
  "auth/sendOtp",
  async (phone, { rejectWithValue }) => {
    try {
      const { data, errors } = await client.mutate({
        mutation: SEND_OTP,
        variables: { phone },
      });

      if (errors && Array.isArray(errors) && errors.length > 0) {
        return rejectWithValue(errors[0].message || "خطای ناشناخته از سرور");
      }

      if (data?.sendOtp) {
        return {
          message: data.sendOtp.message,
          type: "register",
        };
      }

      return rejectWithValue("خطا در ارسال کد تایید");
    } catch (error) {
      return rejectWithValue(error.message || "خطا در ارسال کد تایید");
    }
  }
);

/**
 * Send OTP for login async thunk
 */
export const sendOtpForLogin = createAsyncThunk(
  "auth/sendOtpForLogin",
  async (phone, { rejectWithValue }) => {
    try {
      const { data, errors } = await client.mutate({
        mutation: SEND_OTP_FOR_LOGIN,
        variables: { phone },
      });

      if (errors && Array.isArray(errors) && errors.length > 0) {
        return rejectWithValue(errors[0].message || "خطای ناشناخته از سرور");
      }

      if (data?.sendOtpForLogin) {
        return {
          message: data.sendOtpForLogin.message,
          type: "login",
        };
      }

      return rejectWithValue("خطا در ارسال کد تایید ورود");
    } catch (error) {
      return rejectWithValue(error.message || "خطا در ارسال کد تایید ورود");
    }
  }
);

/**
 * Update user profile async thunk
 */
export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async (input, { rejectWithValue }) => {
    try {
      const { data, errors } = await client.mutate({
        mutation: UPDATE_USER_PROFILE,
        variables: { input },
      });

      if (errors && Array.isArray(errors) && errors.length > 0) {
        return rejectWithValue(errors[0].message || "خطای ناشناخته از سرور");
      }

      if (data?.updateUserProfile) {
        return data.updateUserProfile;
      }

      return rejectWithValue("خطا در به‌روزرسانی پروفایل");
    } catch (error) {
      return rejectWithValue(error.message || "خطا در به‌روزرسانی پروفایل");
    }
  }
);