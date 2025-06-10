// import { createSlice } from "@reduxjs/toolkit";
// import {
//   addToCartThunk,
//   updateCartItemThunk,
//   removeFromCartThunk,
//   clearCartThunk,
//   syncCartFromLocalStorage
// } from "../actions/cartThunks";

// // هنگام لود شدن سبد خرید، از localStorage آن را بارگذاری می‌کنیم
// const loadInitialState = () => {
//   if (typeof window === 'undefined') {
//     return { items: [], totalPrice: 0, totalDiscount: 0, finalPrice: 0 };
//   }

//   try {
//     const cartData = localStorage.getItem('nassim_store_cart');
//     if (cartData) {
//       const parsedCart = JSON.parse(cartData);
//       return {
//         items: parsedCart.items || [],
//         totalPrice: parsedCart.totalPrice || 0,
//         totalDiscount: parsedCart.totalDiscount || 0,
//         finalPrice: parsedCart.finalPrice || 0,
//       };
//     }
//   } catch (error) {
//     console.error('خطا در خواندن سبد خرید از localStorage:', error);
//   }

//   return { items: [], totalPrice: 0, totalDiscount: 0, finalPrice: 0 };
// };

// const initialState = {
//   ...loadInitialState(),
//   loading: false,
//   error: null,
// };

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     clearCartError: (state) => {
//       state.error = null;
//     },
//     calculateCartTotals: (state) => {
//       let totalPrice = 0;
//       let totalDiscount = 0;

//       state.items.forEach(item => {
//         const product = item.product;
//         const quantity = item.quantity;

//         if (product.hasDiscount) {
//           totalPrice += product.price * quantity;
//           totalDiscount += (product.price - product.discountedPrice) * quantity;
//         } else {
//           totalPrice += product.price * quantity;
//         }
//       });

//       state.totalPrice = totalPrice;
//       state.totalDiscount = totalDiscount;
//       state.finalPrice = totalPrice - totalDiscount;

//       // ذخیره در localStorage
//       if (typeof window !== 'undefined') {
//         try {
//           localStorage.setItem('nassim_store_cart', JSON.stringify({
//             items: state.items,
//             totalPrice: state.totalPrice,
//             totalDiscount: state.totalDiscount,
//             finalPrice: state.finalPrice,
//           }));
//         } catch (error) {
//           console.error('خطا در ذخیره سبد خرید در localStorage:', error);
//         }
//       }
//     },
//     clearCartState: (state) => {
//       state.items = [];
//       state.totalPrice = 0;
//       state.totalDiscount = 0;
//       state.finalPrice = 0;
//       state.loading = false;
//       state.error = null;

//       // پاک کردن از localStorage
//       if (typeof window !== 'undefined') {
//         try {
//           localStorage.removeItem('nassim_store_cart');
//         } catch (error) {
//           console.error('خطا در پاک کردن سبد خرید از localStorage:', error);
//         }
//       }
//     },
//     mergeGuestCartWithUserCart: (state, action) => {
//       const { guestCartItems } = action.payload;

//       if (!guestCartItems || guestCartItems.length === 0) return;

//       // ایجاد کپی از آرایه items موجود
//       const newItems = [...state.items];

//       // ترکیب سبد خرید مهمان با سبد خرید کاربر لاگین شده
//       guestCartItems.forEach(guestItem => {
//         const existingItemIndex = newItems.findIndex(item =>
//           item.product._id === guestItem.product._id &&
//           item.color === guestItem.color &&
//           item.size === guestItem.size
//         );

//         if (existingItemIndex !== -1) {
//           // به جای تغییر مستقیم، یک آیتم جدید ایجاد کرده و جایگزین می‌کنیم
//           newItems[existingItemIndex] = {
//             ...newItems[existingItemIndex],
//             quantity: newItems[existingItemIndex].quantity + guestItem.quantity
//           };
//         } else {
//           // افزودن محصول جدید به سبد
//           newItems.push(guestItem);
//         }
//       });

//       // جایگزینی items با آرایه جدید
//       state.items = newItems;

//       // محاسبه مجدد مجموع قیمت‌ها
//       let totalPrice = 0;
//       let totalDiscount = 0;

//       state.items.forEach(item => {
//         const product = item.product;
//         const quantity = item.quantity;

//         if (product.hasDiscount) {
//           totalPrice += product.price * quantity;
//           totalDiscount += (product.price - product.discountedPrice) * quantity;
//         } else {
//           totalPrice += product.price * quantity;
//         }
//       });

//       state.totalPrice = totalPrice;
//       state.totalDiscount = totalDiscount;
//       state.finalPrice = totalPrice - totalDiscount;

//       // ذخیره در localStorage
//       if (typeof window !== 'undefined') {
//         try {
//           localStorage.setItem('nassim_store_cart', JSON.stringify({
//             items: state.items,
//             totalPrice: state.totalPrice,
//             totalDiscount: state.totalDiscount,
//             finalPrice: state.finalPrice,
//           }));
//         } catch (error) {
//           console.error('خطا در ذخیره سبد خرید در localStorage:', error);
//         }
//       }
//     }
//   },
//   extraReducers: (builder) => {
//     // Add to Cart
//     builder
//       .addCase(addToCartThunk.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(addToCartThunk.fulfilled, (state, action) => {
//         const { items, totalPrice, totalDiscount, finalPrice } = action.payload;
//         state.items = items;
//         state.totalPrice = totalPrice;
//         state.totalDiscount = totalDiscount;
//         state.finalPrice = finalPrice;
//         state.loading = false;
//         state.error = null;
//       })
//       .addCase(addToCartThunk.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Update Cart Item
//       .addCase(updateCartItemThunk.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updateCartItemThunk.fulfilled, (state, action) => {
//         const { items, totalPrice, totalDiscount, finalPrice } = action.payload;
//         state.items = items;
//         state.totalPrice = totalPrice;
//         state.totalDiscount = totalDiscount;
//         state.finalPrice = finalPrice;
//         state.loading = false;
//         state.error = null;
//       })
//       .addCase(updateCartItemThunk.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Remove from Cart
//       .addCase(removeFromCartThunk.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(removeFromCartThunk.fulfilled, (state, action) => {
//         const { items, totalPrice, totalDiscount, finalPrice } = action.payload;
//         state.items = items;
//         state.totalPrice = totalPrice;
//         state.totalDiscount = totalDiscount;
//         state.finalPrice = finalPrice;
//         state.loading = false;
//         state.error = null;
//       })
//       .addCase(removeFromCartThunk.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Clear Cart
//       .addCase(clearCartThunk.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(clearCartThunk.fulfilled, (state) => {
//         state.items = [];
//         state.totalPrice = 0;
//         state.totalDiscount = 0;
//         state.finalPrice = 0;
//         state.loading = false;
//         state.error = null;
//       })
//       .addCase(clearCartThunk.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Sync Cart from LocalStorage
//       .addCase(syncCartFromLocalStorage.fulfilled, (state, action) => {
//         if (action.payload) {
//           const { items, totalPrice, totalDiscount, finalPrice } = action.payload;
//           state.items = items || [];
//           state.totalPrice = totalPrice || 0;
//           state.totalDiscount = totalDiscount || 0;
//           state.finalPrice = finalPrice || 0;
//         }
//       });
//   },
// });

// export const {
//   clearCartError,
//   calculateCartTotals,
//   clearCartState,
//   mergeGuestCartWithUserCart
// } = cartSlice.actions;
// export default cartSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import {
  addToCartThunk,
  updateCartItemThunk,
  removeFromCartThunk,
  clearCartThunk,
  syncCartFromLocalStorage,
  fetchUserCart,
  syncGuestCartWithUser,
  mergeGuestCartWithUserCart
} from "../actions/cartThunks";

const initialState = {
  items: [],
  totalPrice: 0,
  totalDiscount: 0,
  finalPrice: 0,
  loading: false,
  error: null,
  lastModified: null,
  isHydrated: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCartError: (state) => {
      state.error = null;
    },

    clearCartState: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.totalDiscount = 0;
      state.finalPrice = 0;
      state.loading = false;
      state.error = null;
      state.lastModified = null;
      state.isHydrated = false;
    },

    setCartHydrated: (state) => {
      state.isHydrated = true;
    },

    mergeGuestCart: mergeGuestCartWithUserCart
  },

  extraReducers: (builder) => {
    // افزودن به سبد خرید
    builder
      .addCase(addToCartThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCartThunk.fulfilled, (state, action) => {
        console.log('🟢 addToCartThunk.fulfilled payload:', action.payload);
        const cartData = action.payload;
        state.items = cartData.items || [];
        state.totalPrice = cartData.totalPrice || 0;
        state.totalDiscount = cartData.totalDiscount || 0;
        state.finalPrice = cartData.finalPrice || 0;
        state.lastModified = cartData.lastModified || new Date().toISOString();
        state.loading = false;
        state.error = null;
        state.isHydrated = true;
        console.log('🟢 Cart state after addToCart:', {
          itemsLength: state.items.length,
          items: state.items
        });
      })
      .addCase(addToCartThunk.rejected, (state, action) => {
        console.log('🔴 addToCartThunk.rejected:', action.payload);
        state.loading = false;
        state.error = action.payload;
      })

    // دریافت سبد کاربر از سرور
    builder
      .addCase(fetchUserCart.pending, (state) => {
        console.log('🟡 fetchUserCart.pending');
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserCart.fulfilled, (state, action) => {
        console.log('🟢 fetchUserCart.fulfilled payload:', action.payload);
        const cartData = action.payload;

        // اطمینان از وجود items
        const items = cartData.items || [];
        console.log('📦 Setting cart items:', items);

        state.items = items;
        state.totalPrice = cartData.totalPrice || 0;
        state.totalDiscount = cartData.totalDiscount || 0;
        state.finalPrice = cartData.finalPrice || 0;
        state.lastModified = cartData.lastModified || new Date().toISOString();
        state.loading = false;
        state.error = null;
        state.isHydrated = true;

        console.log('🟢 Cart state after fetchUserCart:', {
          itemsLength: state.items.length,
          items: state.items,
          isHydrated: state.isHydrated
        });
      })
      .addCase(fetchUserCart.rejected, (state, action) => {
        console.log('🔴 fetchUserCart.rejected:', action.payload);
        state.loading = false;
        state.error = action.payload;
        state.isHydrated = true;
      })

    // به‌روزرسانی آیتم سبد خرید
    builder
      .addCase(updateCartItemThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItemThunk.fulfilled, (state, action) => {
        console.log('🟢 updateCartItemThunk.fulfilled payload:', action.payload);
        const cartData = action.payload;
        state.items = cartData.items || [];
        state.totalPrice = cartData.totalPrice || 0;
        state.totalDiscount = cartData.totalDiscount || 0;
        state.finalPrice = cartData.finalPrice || 0;
        state.lastModified = cartData.lastModified || new Date().toISOString();
        state.loading = false;
        state.error = null;
      })
      .addCase(updateCartItemThunk.rejected, (state, action) => {
        console.log('🔴 updateCartItemThunk.rejected:', action.payload);
        state.loading = false;
        state.error = action.payload;
      })

    // حذف از سبد خرید
    builder
      .addCase(removeFromCartThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCartThunk.fulfilled, (state, action) => {
        console.log('🟢 removeFromCartThunk.fulfilled payload:', action.payload);
        const cartData = action.payload;
        state.items = cartData.items || [];
        state.totalPrice = cartData.totalPrice || 0;
        state.totalDiscount = cartData.totalDiscount || 0;
        state.finalPrice = cartData.finalPrice || 0;
        state.lastModified = cartData.lastModified || new Date().toISOString();
        state.loading = false;
        state.error = null;
      })
      .addCase(removeFromCartThunk.rejected, (state, action) => {
        console.log('🔴 removeFromCartThunk.rejected:', action.payload);
        state.loading = false;
        state.error = action.payload;
      })

    // پاک کردن سبد خرید
    builder
      .addCase(clearCartThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearCartThunk.fulfilled, (state) => {
        console.log('🟢 clearCartThunk.fulfilled');
        state.items = [];
        state.totalPrice = 0;
        state.totalDiscount = 0;
        state.finalPrice = 0;
        state.lastModified = new Date().toISOString();
        state.loading = false;
        state.error = null;
      })
      .addCase(clearCartThunk.rejected, (state, action) => {
        console.log('🔴 clearCartThunk.rejected:', action.payload);
        state.loading = false;
        state.error = action.payload;
      })

    // سینک از localStorage
    builder
      .addCase(syncCartFromLocalStorage.pending, (state) => {
        console.log('🟡 syncCartFromLocalStorage.pending');
        state.loading = true;
      })
      .addCase(syncCartFromLocalStorage.fulfilled, (state, action) => {
        console.log('🟢 syncCartFromLocalStorage.fulfilled payload:', action.payload);
        const cartData = action.payload;
        state.items = cartData.items || [];
        state.totalPrice = cartData.totalPrice || 0;
        state.totalDiscount = cartData.totalDiscount || 0;
        state.finalPrice = cartData.finalPrice || 0;
        state.lastModified = cartData.lastModified || new Date().toISOString();
        state.loading = false;
        state.error = null;
        state.isHydrated = true;

        console.log('🟢 Cart state after syncCartFromLocalStorage:', {
          itemsLength: state.items.length,
          items: state.items
        });
      })
      .addCase(syncCartFromLocalStorage.rejected, (state, action) => {
        console.log('🔴 syncCartFromLocalStorage.rejected:', action.payload);
        state.loading = false;
        state.error = action.payload;
        state.isHydrated = true;
      })

    // سینک سبد مهمان با سبد کاربر
    builder
      .addCase(syncGuestCartWithUser.pending, (state) => {
        console.log('🟡 syncGuestCartWithUser.pending');
        state.loading = true;
        state.error = null;
      })
      .addCase(syncGuestCartWithUser.fulfilled, (state, action) => {
        console.log('🟢 syncGuestCartWithUser.fulfilled payload:', action.payload);
        const cartData = action.payload;
        state.items = cartData.items || [];
        state.totalPrice = cartData.totalPrice || 0;
        state.totalDiscount = cartData.totalDiscount || 0;
        state.finalPrice = cartData.finalPrice || 0;
        state.lastModified = cartData.lastModified || new Date().toISOString();
        state.loading = false;
        state.error = null;
        state.isHydrated = true;

        console.log('🟢 Cart state after syncGuestCartWithUser:', {
          itemsLength: state.items.length,
          items: state.items
        });
      })
      .addCase(syncGuestCartWithUser.rejected, (state, action) => {
        console.log('🔴 syncGuestCartWithUser.rejected:', action.payload);
        state.loading = false;
        state.error = action.payload;
        state.isHydrated = true;
      });
  },
});

export const {
  clearCartError,
  clearCartState,
  setCartHydrated,
  mergeGuestCart
} = cartSlice.actions;

export default cartSlice.reducer;