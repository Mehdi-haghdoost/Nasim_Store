// import { createSlice } from "@reduxjs/toolkit";
// import {
//   loginUser,
//   registerUser,
//   sendOtp,
//   sendOtpForLogin,
//   confirmOtpAndRegister,
//   verifyOtpAndLogin,
//   updateUserProfile,
//   refreshToken,
//   logoutUser,
//   checkAuth,
// } from "../actions/authThunks";
// import {
//   addAddress,
//   deleteAddress,
//   setDefaultAddress,
//   getAllAddresses,
//   updateAddress,
// } from "../actions/addressThunks";

// const initialState = {
//   isAuthenticated: false,
//   token: null,
//   refreshToken: null,
//   user: null,
//   loading: false,
//   error: null,
//   otpSent: false,
//   otpVerified: false,
//   otpMessage: null,
//   registrationType: "standard",
//   cachedAddresses: [],
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     clearError: (state) => {
//       state.error = null;
//     },
//     otpVerifySuccess: (state) => {
//       state.otpVerified = true;
//       state.loading = false;
//       state.error = null;
//     },
//     resetAuthState: (state) => {
//       return initialState;
//     },
//   },
//   extraReducers: (builder) => {
//     // Check Auth
//     builder
//       .addCase(checkAuth.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(checkAuth.fulfilled, (state, action) => {
//         state.isAuthenticated = true;
//         state.user = action.payload.user;
//         state.cachedAddresses = action.payload.user.addresses || [];
//         state.loading = false;
//         state.error = null;
//       })
//       .addCase(checkAuth.rejected, (state, action) => {
//         state.isAuthenticated = false;
//         state.user = null;
//         state.cachedAddresses = [];
//         state.loading = false;
//         if (action.payload && !action.payload.includes("Refresh Token")) {
//           state.error = action.payload;
//         }
//       })

//       // Login User
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.isAuthenticated = true;
//         state.user = action.payload.user;
//         state.cachedAddresses = action.payload.user.addresses || [];
//         state.loading = false;
//         state.error = null;
//         state.otpVerified = false;
//         state.otpSent = false;
//         // در اینجا سینک سبد خرید در عمل انجام خواهد شد
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Register User
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.isAuthenticated = true;
//         state.user = action.payload.user;
//         state.cachedAddresses = action.payload.user.addresses || [];
//         state.loading = false;
//         state.error = null;
//         state.registrationType = "standard";
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Send OTP
//       .addCase(sendOtp.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(sendOtp.fulfilled, (state, action) => {
//         state.otpSent = true;
//         state.otpMessage = action.payload.message;
//         state.loading = false;
//         state.error = null;
//         state.registrationType = action.payload.type || "otp";
//       })
//       .addCase(sendOtp.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Send OTP for Login
//       .addCase(sendOtpForLogin.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(sendOtpForLogin.fulfilled, (state, action) => {
//         state.otpSent = true;
//         state.otpMessage = action.payload.message;
//         state.loading = false;
//         state.error = null;
//         state.registrationType = action.payload.type || "otp";
//       })
//       .addCase(sendOtpForLogin.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Confirm OTP and Register
//       .addCase(confirmOtpAndRegister.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(confirmOtpAndRegister.fulfilled, (state, action) => {
//         state.isAuthenticated = true;
//         state.user = action.payload.user;
//         state.cachedAddresses = action.payload.user.addresses || [];
//         state.loading = false;
//         state.error = null;
//         state.otpVerified = true;
//       })
//       .addCase(confirmOtpAndRegister.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Verify OTP and Login
//       .addCase(verifyOtpAndLogin.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(verifyOtpAndLogin.fulfilled, (state, action) => {
//         state.isAuthenticated = true;
//         state.user = action.payload.user;
//         state.cachedAddresses = action.payload.user.addresses || [];
//         state.loading = false;
//         state.error = null;
//         state.otpVerified = true;
//       })
//       .addCase(verifyOtpAndLogin.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Update User Profile - حل شده!
//       .addCase(updateUserProfile.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updateUserProfile.fulfilled, (state, action) => {
//         // بجای جایگزین کردن کل user، فقط فیلدهای جدید را merge می‌کنیم
//         if (state.user && action.payload) {
//           state.user = {
//             ...state.user,
//             ...action.payload,
//             // حفظ آدرس‌ها و سایر فیلدهای مهم
//             addresses: state.user.addresses || state.cachedAddresses || [],
//             _id: state.user._id, // حفظ ID
//             role: state.user.role, // حفظ نقش
//             wishlist: state.user.wishlist || [], // حفظ wishlist
//             cart: state.user.cart || [], // حفظ سبد خرید
//             orders: state.user.orders || [], // حفظ سفارشات
//             orderHistory: state.user.orderHistory || [], // حفظ تاریخچه سفارشات
//             discountCoupons: state.user.discountCoupons || [], // حفظ کد تخفیف‌ها
//           };
//         }
//         state.loading = false;
//         state.error = null;
//       })
//       .addCase(updateUserProfile.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Refresh Token
//       .addCase(refreshToken.pending, (state) => {
//         state.error = null;
//       })
//       .addCase(refreshToken.fulfilled, (state, action) => {
//         if (action.payload.user) {
//           state.isAuthenticated = true;
//           state.user = action.payload.user;
//           state.cachedAddresses = action.payload.user.addresses || [];
//         } else {
//           state.isAuthenticated = false;
//         }
//         state.loading = false;
//         state.error = null;
//       })
//       .addCase(refreshToken.rejected, (state, action) => {
//         state.isAuthenticated = false;
//         state.user = null;
//         state.loading = false;
//         if (action.payload && !action.payload.includes("Refresh Token")) {
//           state.error = action.payload;
//         }
//       })

//       // Logout User
//       .addCase(logoutUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(logoutUser.fulfilled, (state) => {
//         state.isAuthenticated = false;
//         state.user = null;
//         state.otpSent = false;
//         state.otpVerified = false;
//         state.otpMessage = null;
//         state.registrationType = "standard";
//         state.loading = false;
//         state.error = null;
//         state.cachedAddresses = [];
//       })
//       .addCase(logoutUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Address actions...
//       .addCase(addAddress.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(addAddress.fulfilled, (state, action) => {
//         const newAddress = action.payload;
//         if (newAddress.isDefault) {
//           if (state.user?.addresses) {
//             state.user.addresses = state.user.addresses.map((addr) => ({
//               ...addr,
//               isDefault: false,
//             }));
//           }
//           if (state.cachedAddresses) {
//             state.cachedAddresses = state.cachedAddresses.map((addr) => ({
//               ...addr,
//               isDefault: false,
//             }));
//           }
//         }
//         if (state.user?.addresses) {
//           state.user.addresses = [...state.user.addresses, newAddress];
//         } else if (state.user) {
//           state.user.addresses = [newAddress];
//         }
//         state.cachedAddresses = state.user?.addresses || [newAddress];
//         state.loading = false;
//         state.error = null;
//       })
//       .addCase(addAddress.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Delete Address
//       .addCase(deleteAddress.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(deleteAddress.fulfilled, (state, action) => {
//         const deletedAddressId = action.payload;
//         if (state.user?.addresses) {
//           state.user.addresses = state.user.addresses.filter(
//             (addr) => addr._id !== deletedAddressId
//           );
//         }
//         if (state.cachedAddresses?.length) {
//           state.cachedAddresses = state.cachedAddresses.filter(
//             (addr) => addr._id !== deletedAddressId
//           );
//         }
//         state.loading = false;
//         state.error = null;
//       })
//       .addCase(deleteAddress.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Set Default Address
//       .addCase(setDefaultAddress.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(setDefaultAddress.fulfilled, (state, action) => {
//         const defaultAddress = action.payload;
//         if (state.user?.addresses) {
//           state.user.addresses = state.user.addresses.map((addr) => ({
//             ...addr,
//             isDefault: addr._id === defaultAddress._id,
//           }));
//         }
//         if (state.cachedAddresses?.length) {
//           state.cachedAddresses = state.cachedAddresses.map((addr) => ({
//             ...addr,
//             isDefault: addr._id === defaultAddress._id,
//           }));
//         }
//         state.loading = false;
//         state.error = null;
//       })
//       .addCase(setDefaultAddress.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Get All Addresses
//       .addCase(getAllAddresses.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getAllAddresses.fulfilled, (state, action) => {
//         const addresses = action.payload;
//         if (state.user) {
//           state.user.addresses = addresses;
//         }
//         state.cachedAddresses = addresses;
//         state.loading = false;
//         state.error = null;
//       })
//       .addCase(getAllAddresses.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Update Address
//       .addCase(updateAddress.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updateAddress.fulfilled, (state, action) => {
//         const updatedAddress = action.payload;
//         if (updatedAddress.isDefault) {
//           if (state.user?.addresses) {
//             state.user.addresses = state.user.addresses.map((addr) =>
//               addr._id !== updatedAddress._id ? { ...addr, isDefault: false } : addr
//             );
//           }
//           if (state.cachedAddresses?.length > 0) {
//             state.cachedAddresses = state.cachedAddresses.map((addr) =>
//               addr._id !== updatedAddress._id ? { ...addr, isDefault: false } : addr
//             );
//           }
//         }
//         if (state.user?.addresses) {
//           state.user.addresses = state.user.addresses.map((addr) =>
//             addr._id === updatedAddress._id ? updatedAddress : addr
//           );
//         }
//         if (state.cachedAddresses?.length > 0) {
//           state.cachedAddresses = state.cachedAddresses.map((addr) =>
//             addr._id === updatedAddress._id ? updatedAddress : addr
//           );
//         }
//         state.loading = false;
//         state.error = null;
//       })
//       .addCase(updateAddress.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { clearError, otpVerifySuccess, resetAuthState } = authSlice.actions;
// export default authSlice.reducer;

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
  logoutUser,
  checkAuth,
} from "../actions/authThunks";
import {
  addAddress,
  deleteAddress,
  setDefaultAddress,
  getAllAddresses,
  updateAddress,
} from "../actions/addressThunks";

const initialState = {
  isAuthenticated: false,
  token: null,
  refreshToken: null,
  user: null,
  loading: false,
  error: null,
  otpSent: false,
  otpVerified: false,
  otpMessage: null,
  registrationType: "standard",
  cachedAddresses: [],
};

const authSlice = createSlice({
  name: "auth",
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
    resetAuthState: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    // Check Auth
    builder
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.cachedAddresses = action.payload.user.addresses || [];
        state.loading = false;
        state.error = null;
        
        // سینک سبد خرید بعد از checkAuth موفق
        console.log('🔄 Auth check successful, triggering cart sync...');
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.cachedAddresses = [];
        state.loading = false;
        if (action.payload && !action.payload.includes("Refresh Token")) {
          state.error = action.payload;
        }
      })

      // Login User
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const wasNotAuthenticated = !state.isAuthenticated;
        
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.cachedAddresses = action.payload.user.addresses || [];
        state.loading = false;
        state.error = null;
        state.otpVerified = false;
        state.otpSent = false;
        
        // اگر کاربر تازه لاگین کرده، سینک سبد خرید را تریگر کن
        if (wasNotAuthenticated) {
          console.log('🔄 User just logged in, triggering cart sync...');
          // این عمل در middleware یا useEffect دیگری انجام خواهد شد
        }
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
        const wasNotAuthenticated = !state.isAuthenticated;
        
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.cachedAddresses = action.payload.user.addresses || [];
        state.loading = false;
        state.error = null;
        state.registrationType = "standard";
        
        // سینک سبد خرید بعد از ثبت‌نام
        if (wasNotAuthenticated) {
          console.log('🔄 User just registered, triggering cart sync...');
        }
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
        state.registrationType = action.payload.type || "otp";
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
        state.registrationType = action.payload.type || "otp";
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
        const wasNotAuthenticated = !state.isAuthenticated;
        
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.cachedAddresses = action.payload.user.addresses || [];
        state.loading = false;
        state.error = null;
        state.otpVerified = true;
        
        // سینک سبد خرید بعد از تایید OTP و ثبت‌نام
        if (wasNotAuthenticated) {
          console.log('🔄 User confirmed OTP and registered, triggering cart sync...');
        }
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
        const wasNotAuthenticated = !state.isAuthenticated;
        
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.cachedAddresses = action.payload.user.addresses || [];
        state.loading = false;
        state.error = null;
        state.otpVerified = true;
        
        // سینک سبد خرید بعد از تایید OTP و لاگین
        if (wasNotAuthenticated) {
          console.log('🔄 User verified OTP and logged in, triggering cart sync...');
        }
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
        if (state.user && action.payload) {
          state.user = {
            ...state.user,
            ...action.payload,
            addresses: state.user.addresses || state.cachedAddresses || [],
            _id: state.user._id,
            role: state.user.role,
            wishlist: state.user.wishlist || [],
            cart: state.user.cart || [],
            orders: state.user.orders || [],
            orderHistory: state.user.orderHistory || [],
            discountCoupons: state.user.discountCoupons || [],
          };
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Refresh Token
      .addCase(refreshToken.pending, (state) => {
        state.error = null;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        if (action.payload.user) {
          const wasNotAuthenticated = !state.isAuthenticated;
          
          state.isAuthenticated = true;
          state.user = action.payload.user;
          state.cachedAddresses = action.payload.user.addresses || [];
          
          // اگر کاربر تازه authenticate شده، سینک کن
          if (wasNotAuthenticated) {
            console.log('🔄 Token refreshed and user authenticated, triggering cart sync...');
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
        if (action.payload && !action.payload.includes("Refresh Token")) {
          state.error = action.payload;
        }
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
        state.registrationType = "standard";
        state.loading = false;
        state.error = null;
        state.cachedAddresses = [];
        
        console.log('🔄 User logged out, cart will be reset to localStorage mode');
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Address actions...
      .addCase(addAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        const newAddress = action.payload;
        if (newAddress.isDefault) {
          if (state.user?.addresses) {
            state.user.addresses = state.user.addresses.map((addr) => ({
              ...addr,
              isDefault: false,
            }));
          }
          if (state.cachedAddresses) {
            state.cachedAddresses = state.cachedAddresses.map((addr) => ({
              ...addr,
              isDefault: false,
            }));
          }
        }
        if (state.user?.addresses) {
          state.user.addresses = [...state.user.addresses, newAddress];
        } else if (state.user) {
          state.user.addresses = [newAddress];
        }
        state.cachedAddresses = state.user?.addresses || [newAddress];
        state.loading = false;
        state.error = null;
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Address
      .addCase(deleteAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        const deletedAddressId = action.payload;
        if (state.user?.addresses) {
          state.user.addresses = state.user.addresses.filter(
            (addr) => addr._id !== deletedAddressId
          );
        }
        if (state.cachedAddresses?.length) {
          state.cachedAddresses = state.cachedAddresses.filter(
            (addr) => addr._id !== deletedAddressId
          );
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Set Default Address
      .addCase(setDefaultAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setDefaultAddress.fulfilled, (state, action) => {
        const defaultAddress = action.payload;
        if (state.user?.addresses) {
          state.user.addresses = state.user.addresses.map((addr) => ({
            ...addr,
            isDefault: addr._id === defaultAddress._id,
          }));
        }
        if (state.cachedAddresses?.length) {
          state.cachedAddresses = state.cachedAddresses.map((addr) => ({
            ...addr,
            isDefault: addr._id === defaultAddress._id,
          }));
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(setDefaultAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get All Addresses
      .addCase(getAllAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllAddresses.fulfilled, (state, action) => {
        const addresses = action.payload;
        if (state.user) {
          state.user.addresses = addresses;
        }
        state.cachedAddresses = addresses;
        state.loading = false;
        state.error = null;
      })
      .addCase(getAllAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Address
      .addCase(updateAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        const updatedAddress = action.payload;
        if (updatedAddress.isDefault) {
          if (state.user?.addresses) {
            state.user.addresses = state.user.addresses.map((addr) =>
              addr._id !== updatedAddress._id ? { ...addr, isDefault: false } : addr
            );
          }
          if (state.cachedAddresses?.length > 0) {
            state.cachedAddresses = state.cachedAddresses.map((addr) =>
              addr._id !== updatedAddress._id ? { ...addr, isDefault: false } : addr
            );
          }
        }
        if (state.user?.addresses) {
          state.user.addresses = state.user.addresses.map((addr) =>
            addr._id === updatedAddress._id ? updatedAddress : addr
          );
        }
        if (state.cachedAddresses?.length > 0) {
          state.cachedAddresses = state.cachedAddresses.map((addr) =>
            addr._id === updatedAddress._id ? updatedAddress : addr
          );
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, otpVerifySuccess, resetAuthState } = authSlice.actions;
export default authSlice.reducer;