// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { toast } from 'react-toastify';
// import { v4 as uuidv4 } from 'uuid';

// const CART_STORAGE_KEY = 'nassim_store_cart';

// const calculateCartInfo = (items) => {
//   let totalPrice = 0;
//   let totalDiscount = 0;

//   items.forEach(item => {
//     const product = item.product;
//     const quantity = item.quantity;

//     if (product.hasDiscount) {
//       totalPrice += product.price * quantity;
//       totalDiscount += (product.price - product.discountedPrice) * quantity;
//     } else {
//       totalPrice += product.price * quantity;
//     }
//   });

//   return {
//     items,
//     totalPrice,
//     totalDiscount,
//     finalPrice: totalPrice - totalDiscount,
//   };
// };

// const saveCartToLocalStorage = (cartInfo) => {
//   if (typeof window === 'undefined') return;

//   try {
//     localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartInfo));
//   } catch (error) {
//     console.error('Error saving to localStorage:', error);
//   }
// };

// const getCartFromLocalStorage = () => {
//   if (typeof window === 'undefined') return null;

//   try {
//     const cartData = localStorage.getItem(CART_STORAGE_KEY);
//     const parsedData = cartData ? JSON.parse(cartData) : null;
//     return parsedData;
//   } catch (error) {
//     console.error('Error loading from localStorage:', error);
//     return null;
//   }
// };

// const normalizeSellerData = (sellerData) => {
//   if (!sellerData) return null;

//   if (typeof sellerData === 'object' && sellerData._id) {
//     return {
//       _id: sellerData._id,
//       name: sellerData.name || "فروشنده نامشخص"
//     };
//   }

//   if (typeof sellerData === 'string') {
//     return {
//       _id: sellerData,
//       name: "فروشگاه نسیم"
//     };
//   }

//   return null;
// };

// export const addToCartThunk = createAsyncThunk(
//   'cart/addToCart',
//   async ({ product, quantity = 1, color = null, size = null, sellerId = null }, { rejectWithValue }) => {
//     try {
//       const cartData = getCartFromLocalStorage() || { items: [] };
//       let items = cartData.items || [];

//       items = items.filter(item => item._id && item.product && item.product._id);
//       if (product.stock < quantity) {
//         toast.error('موجودی محصول کافی نیست');
//         return rejectWithValue('موجودی محصول کافی نیست');
//       }

//       const normalizedSeller = normalizeSellerData(sellerId);

//       const existingItemIndex = items.findIndex(item => {
//         let itemProductId = String(item.product._id);
//         let currentProductId = String(product._id);

//         if (itemProductId.includes('_')) {
//           itemProductId = itemProductId.split('_')[0];
//         }
//         if (currentProductId.includes('_')) {
//           currentProductId = currentProductId.split('_')[0];
//         }

//         const productIdMatch = itemProductId === currentProductId;
//         let colorMatch = (item.color === null && color === null) || String(item.color) === String(color);
//         let sizeMatch = (item.size === null && size === null) || String(item.size) === String(size);
//         let sellerMatch = (item.selectedSeller === null && normalizedSeller === null) ||
//           (normalizedSeller && item.selectedSeller && String(item.selectedSeller._id) === String(normalizedSeller._id));
//         return productIdMatch && colorMatch && sizeMatch && sellerMatch;
//       });
//       if (existingItemIndex > -1) {
//         items[existingItemIndex].quantity += quantity;
//       } else {
//         items.push({
//           product,
//           quantity,
//           color,
//           size,
//           selectedSeller: normalizedSeller,
//           _id: uuidv4()
//         });
//       }

//       const cartInfo = calculateCartInfo(items);
//       saveCartToLocalStorage(cartInfo);
//       toast.success('کالای مورد نظر با موفقیت به سبد خرید افزوده شد');
//       return cartInfo;
//     } catch (error) {
//       console.error('Error in addToCartThunk:', error);
//       toast.error(error.message || 'خطا در افزودن به سبد خرید');
//       return rejectWithValue(error.message || 'خطا در افزودن به سبد خرید');
//     }
//   }
// );


// export const updateCartItemThunk = createAsyncThunk(
//   'cart/updateCartItem',
//   async ({ itemId, quantity }, { rejectWithValue }) => {
//     try {
//       const cartData = getCartFromLocalStorage() || { items: [] };
//       let items = JSON.parse(JSON.stringify(cartData.items || [])); // کپی عمیق
//       const itemIndex = items.findIndex(item => item._id === itemId);
//       if (itemIndex === -1) {
//         console.error('Item not found in cart:', { itemId, availableIds: items.map(i => i._id) });
//         toast.error('آیتم موردنظر در سبد خرید یافت نشد');
//         return rejectWithValue('آیتم موردنظر در سبد خرید یافت نشد');
//       }

//       const item = items[itemIndex];

//       if (item.product.stock < quantity) {
//         toast.error('موجودی محصول کافی نیست');
//         return rejectWithValue('موجودی محصول کافی نیست');
//       }

//       if (quantity <= 0) {
//         items = items.filter(item => item._id !== itemId);
//         toast.info('کالا از سبد خرید حذف شد');
//       } else {
//         items[itemIndex] = { ...items[itemIndex], quantity }; // ایجاد یک شیء جدید
//         toast.success('تعداد کالا با موفقیت تغییر کرد');
//       }

//       const cartInfo = calculateCartInfo(items);
//       saveCartToLocalStorage(cartInfo);
//       return cartInfo;
//     } catch (error) {
//       console.error('Error in updateCartItemThunk:', error);
//       toast.error(error.message || 'خطا در به‌روزرسانی سبد خرید');
//       return rejectWithValue(error.message || 'خطا در به‌روزرسانی سبد خرید');
//     }
//   }
// );

// export const removeFromCartThunk = createAsyncThunk(
//   'cart/removeFromCart',
//   async (itemId, { rejectWithValue }) => {
//     try {
//       const cartData = getCartFromLocalStorage() || { items: [] };
//       let items = cartData.items || [];
//       const itemIndex = items.findIndex(item => item._id === itemId);
//       if (itemIndex === -1) {
//         console.error('Item not found in cart:', { itemId, availableIds: items.map(i => i._id) });
//         toast.error('آیتم موردنظر در سبد خرید یافت نشد');
//         return rejectWithValue('آیتم موردنظر در سبد خرید یافت نشد');
//       }

//       items = items.filter(item => item._id !== itemId);
//       const cartInfo = calculateCartInfo(items);
//       saveCartToLocalStorage(cartInfo);
//       toast.success('کالا با موفقیت از سبد خرید حذف شد');
//       return cartInfo;
//     } catch (error) {
//       console.error('Error in removeFromCartThunk:', error);
//       toast.error(error.message || 'خطا در حذف از سبد خرید');
//       return rejectWithValue(error.message || 'خطا در حذف از سبد خرید');
//     }
//   }
// );

// export const clearCartThunk = createAsyncThunk(
//   'cart/clearCart',
//   async (_, { rejectWithValue }) => {
//     try {
//       if (typeof window !== 'undefined') {
//         localStorage.removeItem(CART_STORAGE_KEY);
//       }
//       toast.success('سبد خرید با موفقیت خالی شد');
//       return { items: [], totalPrice: 0, totalDiscount: 0, finalPrice: 0 };
//     } catch (error) {
//       console.error('Error in clearCartThunk:', error);
//       toast.error(error.message || 'خطا در پاک کردن سبد خرید');
//       return rejectWithValue(error.message || 'خطا در پاک کردن سبد خرید');
//     }
//   }
// );

// export const syncCartFromLocalStorage = createAsyncThunk(
//   'cart/syncFromLocalStorage',
//   async () => {
//     try {
//       const cartData = getCartFromLocalStorage();
//       // یک کپی تازه برای جلوگیری از مشکل read-only
//       const freshCartData = cartData ? JSON.parse(JSON.stringify(cartData)) : { items: [], totalPrice: 0, totalDiscount: 0, finalPrice: 0 };
//       return freshCartData;
//     } catch (error) {
//       console.error('Error in syncCartFromLocalStorage:', error);
//       // در صورت خطا، یک سبد خرید خالی برگردانید
//       return { items: [], totalPrice: 0, totalDiscount: 0, finalPrice: 0 };
//     }
//   }
// );

// export const mergeGuestCartWithUserCart= (state, action) => {
//   const { guestCartItems } = action.payload;
  
//   if (!guestCartItems || guestCartItems.length === 0) return;
  
//   // ایجاد کپی از آرایه items موجود
//   const newItems = [...state.items];
  
//   // ترکیب سبد خرید مهمان با سبد خرید کاربر لاگین شده
//   guestCartItems.forEach(guestItem => {
//     const existingItemIndex = newItems.findIndex(item => 
//       item.product._id === guestItem.product._id && 
//       item.color === guestItem.color && 
//       item.size === guestItem.size
//     );
    
//     if (existingItemIndex !== -1) {
//       // به جای تغییر مستقیم، یک آیتم جدید ایجاد کرده و جایگزین می‌کنیم
//       newItems[existingItemIndex] = {
//         ...newItems[existingItemIndex],
//         quantity: newItems[existingItemIndex].quantity + guestItem.quantity
//       };
//     } else {
//       // افزودن محصول جدید به سبد
//       newItems.push(guestItem);
//     }
//   });
  
//   // جایگزینی items با آرایه جدید
//   state.items = newItems;
  
//   // محاسبه مجدد مجموع قیمت‌ها
//   let totalPrice = 0;
//   let totalDiscount = 0;
  
//   state.items.forEach(item => {
//     const product = item.product;
//     const quantity = item.quantity;
    
//     if (product.hasDiscount) {
//       totalPrice += product.price * quantity;
//       totalDiscount += (product.price - product.discountedPrice) * quantity;
//     } else {
//       totalPrice += product.price * quantity;
//     }
//   });
  
//   state.totalPrice = totalPrice;
//   state.totalDiscount = totalDiscount;
//   state.finalPrice = totalPrice - totalDiscount;
  
//   // ذخیره در localStorage
//   if (typeof window !== 'undefined') {
//     try {
//       localStorage.setItem('nassim_store_cart', JSON.stringify({
//         items: state.items,
//         totalPrice: state.totalPrice,
//         totalDiscount: state.totalDiscount,
//         finalPrice: state.finalPrice,
//       }));
//     } catch (error) {
//       console.error('خطا در ذخیره سبد خرید در localStorage:', error);
//     }
//   }
// }



import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import client from "@/graphql/client";
import {
  ADD_TO_CART,
  UPDATE_CART_ITEM,
  REMOVE_FROM_CART,
  CLEAR_CART,
  SYNC_GUEST_CART
} from "@/graphql/entities/cart/cart.mutations";
import { GET_USER_CART } from "@/graphql/entities/cart/cart.queries";

const CART_STORAGE_KEY = 'nassim_store_cart';

// محاسبه اطلاعات سبد خرید
const calculateCartInfo = (items) => {
  let totalPrice = 0;
  let totalDiscount = 0;

  items.forEach(item => {
    const product = item.product;
    const quantity = item.quantity;

    if (product.hasDiscount) {
      totalPrice += product.price * quantity;
      totalDiscount += (product.price - product.discountedPrice) * quantity;
    } else {
      totalPrice += product.price * quantity;
    }
  });

  return {
    items,
    totalPrice,
    totalDiscount,
    finalPrice: totalPrice - totalDiscount,
    lastModified: new Date().toISOString()
  };
};

// ذخیره در localStorage
const saveCartToLocalStorage = (cartInfo) => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartInfo));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

// خواندن از localStorage
const getCartFromLocalStorage = () => {
  if (typeof window === 'undefined') return null;

  try {
    const cartData = localStorage.getItem(CART_STORAGE_KEY);
    return cartData ? JSON.parse(cartData) : null;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return null;
  }
};

// تطبیق داده فروشنده
const normalizeSellerData = (sellerData) => {
  if (!sellerData) return null;

  if (typeof sellerData === 'object' && sellerData._id) {
    return {
      _id: sellerData._id,
      name: sellerData.name || "فروشنده نامشخص"
    };
  }

  if (typeof sellerData === 'string') {
    return {
      _id: sellerData,
      name: "فروشگاه نسیم"
    };
  }

  return null;
};

// استخراج پیام خطای کاربرپسند از GraphQL errors
const extractErrorMessage = (errors) => {
  if (!errors || !Array.isArray(errors) || errors.length === 0) {
    return 'خطای ناشناخته رخ داد';
  }

  const error = errors[0];
  const message = error.message || 'خطای ناشناخته';

  // ترجمه خطاهای رایج
  if (message.includes('موجودی')) {
    return 'موجودی محصول کافی نیست';
  }
  if (message.includes('لاگین') || message.includes('وارد شوید')) {
    return 'برای این عملیات باید وارد حساب کاربری خود شوید';
  }
  if (message.includes('محصول یافت نشد')) {
    return 'محصول موردنظر یافت نشد';
  }
  if (message.includes('فروشنده')) {
    return 'اطلاعات فروشنده معتبر نیست';
  }
  if (message.includes('ID cannot represent value')) {
    return 'خطا در اطلاعات ارسالی. لطفاً مجدد تلاش کنید';
  }

  return message;
};

// افزودن به سبد خرید (هیبریدی)
export const addToCartThunk = createAsyncThunk(
  'cart/addToCart',
  async ({ product, quantity = 1, color = null, size = null, sellerId = null }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      console.log('🛒 addToCartThunk called:', { 
        productId: product._id, 
        quantity, 
        color, 
        size, 
        sellerId, 
        isAuthenticated: auth.isAuthenticated 
      });
      
      // اعتبارسنجی ورودی‌ها
      if (!product || !product._id) {
        throw new Error('اطلاعات محصول معتبر نیست');
      }

      if (quantity <= 0) {
        throw new Error('تعداد باید بیشتر از صفر باشد');
      }

      // بررسی موجودی
      if (product.stock < quantity) {
        throw new Error('موجودی محصول کافی نیست');
      }

      // اگر کاربر لاگین است، از GraphQL استفاده کن
      if (auth.isAuthenticated) {
        console.log('👤 User authenticated, using GraphQL...');
        
        // اطمینان از اینکه sellerId فقط string است
        const cleanSellerId = sellerId ? String(sellerId) : null;

        const { data, errors } = await client.mutate({
          mutation: ADD_TO_CART,
          variables: {
            input: {
              productId: String(product._id),
              quantity: Number(quantity),
              color: color || null,
              size: size || null,
              sellerId: cleanSellerId
            }
          }
        });

        console.log('📡 GraphQL ADD_TO_CART response:', { data, errors });

        if (errors && errors.length > 0) {
          const errorMessage = extractErrorMessage(errors);
          console.error('❌ GraphQL errors:', errors);
          throw new Error(errorMessage);
        }

        if (!data || !data.addToCart) {
          console.error('❌ Invalid GraphQL response:', data);
          throw new Error('پاسخ سرور معتبر نیست');
        }

        // نمایش پیام موفقیت
        toast.success('کالا با موفقیت به سبد خرید افزوده شد');
        console.log('✅ GraphQL add to cart successful:', data.addToCart);
        return data.addToCart;
      } 
      
      // اگر کاربر مهمان است، از localStorage استفاده کن
      console.log('👥 Guest user, using localStorage...');
      const cartData = getCartFromLocalStorage() || { items: [] };
      let items = cartData.items || [];

      // پاک کردن آیتم‌های نامعتبر
      items = items.filter(item => item._id && item.product && item.product._id);

      const normalizedSeller = normalizeSellerData(sellerId);

      // بررسی وجود محصول در سبد
      const existingItemIndex = items.findIndex(item => {
        let itemProductId = String(item.product._id);
        let currentProductId = String(product._id);

        const productIdMatch = itemProductId === currentProductId;
        const colorMatch = (item.color === null && color === null) || String(item.color) === String(color);
        const sizeMatch = (item.size === null && size === null) || String(item.size) === String(size);
        const sellerMatch = (item.selectedSeller === null && normalizedSeller === null) ||
          (normalizedSeller && item.selectedSeller && String(item.selectedSeller._id) === String(normalizedSeller._id));
        return productIdMatch && colorMatch && sizeMatch && sellerMatch;
      });

      if (existingItemIndex > -1) {
        const newQuantity = items[existingItemIndex].quantity + quantity;
        if (product.stock < newQuantity) {
          throw new Error('موجودی محصول کافی نیست');
        }
        items[existingItemIndex].quantity = newQuantity;
      } else {
        items.push({
          product,
          quantity,
          color,
          size,
          selectedSeller: normalizedSeller,
          _id: uuidv4()
        });
      }

      const cartInfo = calculateCartInfo(items);
      saveCartToLocalStorage(cartInfo);
      toast.success('کالا با موفقیت به سبد خرید افزوده شد');
      console.log('✅ localStorage add to cart successful:', cartInfo);
      return cartInfo;
      
    } catch (error) {
      console.error('❌ Error in addToCartThunk:', error);
      toast.error(error.message || 'خطا در افزودن به سبد خرید');
      return rejectWithValue(error.message || 'خطا در افزودن به سبد خرید');
    }
  }
);

// به‌روزرسانی آیتم سبد خرید
export const updateCartItemThunk = createAsyncThunk(
  'cart/updateCartItem',
  async ({ itemId, quantity }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      console.log('🔄 updateCartItemThunk called:', { itemId, quantity, isAuthenticated: auth.isAuthenticated });

      if (quantity < 0) {
        throw new Error('تعداد نمی‌تواند منفی باشد');
      }

      // اگر کاربر لاگین است، از GraphQL استفاده کن
      if (auth.isAuthenticated) {
        console.log('👤 User authenticated, using GraphQL...');
        
        const { data, errors } = await client.mutate({
          mutation: UPDATE_CART_ITEM,
          variables: {
            input: { 
              itemId: String(itemId), 
              quantity: Number(quantity) 
            }
          }
        });

        console.log('📡 GraphQL UPDATE_CART_ITEM response:', { data, errors });

        if (errors && errors.length > 0) {
          const errorMessage = extractErrorMessage(errors);
          console.error('❌ GraphQL errors:', errors);
          throw new Error(errorMessage);
        }

        if (!data || !data.updateCartItem) {
          console.error('❌ Invalid GraphQL response:', data);
          throw new Error('پاسخ سرور معتبر نیست');
        }

        if (quantity === 0) {
          toast.info('کالا از سبد خرید حذف شد');
        } else {
          toast.success('تعداد کالا با موفقیت تغییر کرد');
        }

        console.log('✅ GraphQL update successful:', data.updateCartItem);
        return data.updateCartItem;
      }

      // برای کاربران مهمان
      console.log('👥 Guest user, using localStorage...');
      const cartData = getCartFromLocalStorage() || { items: [] };
      let items = JSON.parse(JSON.stringify(cartData.items || []));
      
      const itemIndex = items.findIndex(item => item._id === itemId);
      if (itemIndex === -1) {
        throw new Error('آیتم موردنظر در سبد خرید یافت نشد');
      }

      const item = items[itemIndex];

      if (item.product.stock < quantity) {
        throw new Error('موجودی محصول کافی نیست');
      }

      if (quantity <= 0) {
        items = items.filter(item => item._id !== itemId);
        toast.info('کالا از سبد خرید حذف شد');
      } else {
        items[itemIndex] = { ...items[itemIndex], quantity };
        toast.success('تعداد کالا با موفقیت تغییر کرد');
      }

      const cartInfo = calculateCartInfo(items);
      saveCartToLocalStorage(cartInfo);
      console.log('✅ localStorage update successful:', cartInfo);
      return cartInfo;
    } catch (error) {
      console.error('❌ Error in updateCartItemThunk:', error);
      toast.error(error.message || 'خطا در به‌روزرسانی سبد خرید');
      return rejectWithValue(error.message || 'خطا در به‌روزرسانی سبد خرید');
    }
  }
);

// حذف از سبد خرید
export const removeFromCartThunk = createAsyncThunk(
  'cart/removeFromCart',
  async (itemId, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      console.log('🗑️ removeFromCartThunk called:', { itemId, isAuthenticated: auth.isAuthenticated });

      // اگر کاربر لاگین است، از GraphQL استفاده کن
      if (auth.isAuthenticated) {
        console.log('👤 User authenticated, using GraphQL...');
        
        const { data, errors } = await client.mutate({
          mutation: REMOVE_FROM_CART,
          variables: { itemId: String(itemId) }
        });

        console.log('📡 GraphQL REMOVE_FROM_CART response:', { data, errors });

        if (errors && errors.length > 0) {
          const errorMessage = extractErrorMessage(errors);
          console.error('❌ GraphQL errors:', errors);
          throw new Error(errorMessage);
        }

        if (!data || !data.removeFromCart) {
          console.error('❌ Invalid GraphQL response:', data);
          throw new Error('پاسخ سرور معتبر نیست');
        }

        toast.success('کالا با موفقیت از سبد خرید حذف شد');
        console.log('✅ GraphQL remove successful:', data.removeFromCart);
        return data.removeFromCart;
      }

      // برای کاربران مهمان
      console.log('👥 Guest user, using localStorage...');
      const cartData = getCartFromLocalStorage() || { items: [] };
      let items = cartData.items || [];
      
      const itemIndex = items.findIndex(item => item._id === itemId);
      if (itemIndex === -1) {
        throw new Error('آیتم موردنظر در سبد خرید یافت نشد');
      }

      items = items.filter(item => item._id !== itemId);
      const cartInfo = calculateCartInfo(items);
      saveCartToLocalStorage(cartInfo);
      toast.success('کالا با موفقیت از سبد خرید حذف شد');
      console.log('✅ localStorage remove successful:', cartInfo);
      return cartInfo;
    } catch (error) {
      console.error('❌ Error in removeFromCartThunk:', error);
      toast.error(error.message || 'خطا در حذف از سبد خرید');
      return rejectWithValue(error.message || 'خطا در حذف از سبد خرید');
    }
  }
);

// پاک کردن سبد خرید
export const clearCartThunk = createAsyncThunk(
  'cart/clearCart',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      console.log('🧹 clearCartThunk called:', { isAuthenticated: auth.isAuthenticated });

      // اگر کاربر لاگین است، از GraphQL استفاده کن
      if (auth.isAuthenticated) {
        console.log('👤 User authenticated, using GraphQL...');
        
        const { data, errors } = await client.mutate({
          mutation: CLEAR_CART
        });

        console.log('📡 GraphQL CLEAR_CART response:', { data, errors });

        if (errors && errors.length > 0) {
          const errorMessage = extractErrorMessage(errors);
          console.error('❌ GraphQL errors:', errors);
          throw new Error(errorMessage);
        }

        toast.success('سبد خرید با موفقیت خالی شد');
        console.log('✅ GraphQL clear successful');
        return { items: [], totalPrice: 0, totalDiscount: 0, finalPrice: 0 };
      }

      // برای کاربران مهمان
      console.log('👥 Guest user, using localStorage...');
      if (typeof window !== 'undefined') {
        localStorage.removeItem(CART_STORAGE_KEY);
      }
      toast.success('سبد خرید با موفقیت خالی شد');
      console.log('✅ localStorage clear successful');
      return { items: [], totalPrice: 0, totalDiscount: 0, finalPrice: 0 };
    } catch (error) {
      console.error('❌ Error in clearCartThunk:', error);
      toast.error(error.message || 'خطا در پاک کردن سبد خرید');
      return rejectWithValue(error.message || 'خطا در پاک کردن سبد خرید');
    }
  }
);

// سینک سبد خرید از localStorage
export const syncCartFromLocalStorage = createAsyncThunk(
  'cart/syncFromLocalStorage',
  async () => {
    try {
      console.log('📱 syncCartFromLocalStorage called');
      const cartData = getCartFromLocalStorage();
      const freshCartData = cartData ? JSON.parse(JSON.stringify(cartData)) : { 
        items: [], 
        totalPrice: 0, 
        totalDiscount: 0, 
        finalPrice: 0 
      };
      console.log('📱 localStorage sync result:', freshCartData);
      return freshCartData;
    } catch (error) {
      console.error('❌ Error in syncCartFromLocalStorage:', error);
      return { items: [], totalPrice: 0, totalDiscount: 0, finalPrice: 0 };
    }
  }
);

// دریافت سبد خرید کاربر لاگین شده
export const fetchUserCart = createAsyncThunk(
  'cart/fetchUserCart',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      console.log('📥 fetchUserCart called:', { 
        isAuthenticated: auth.isAuthenticated,
        userId: auth.user?._id,
        userName: auth.user?.username 
      });
      
      if (!auth.isAuthenticated) {
        console.log('❌ User not authenticated in fetchUserCart');
        return rejectWithValue('کاربر لاگین نیست');
      }

      if (!auth.user?._id) {
        console.log('❌ No user ID found');
        return rejectWithValue('شناسه کاربر یافت نشد');
      }

      console.log('📡 Making GraphQL query for GET_USER_CART...');
      
      const { data, errors, loading, networkStatus } = await client.query({
        query: GET_USER_CART,
        fetchPolicy: "network-only", // همیشه از server بخواند
        errorPolicy: "all",
        notifyOnNetworkStatusChange: true
      });

      console.log('📡 GraphQL Raw Response:', {
        data: data,
        errors: errors,
        loading: loading,
        networkStatus: networkStatus,
        
        // بررسی ساختار data
        dataExists: !!data,
        dataKeys: data ? Object.keys(data) : null,
        
        // بررسی getUserCart
        getUserCartExists: !!data?.getUserCart,
        getUserCartValue: data?.getUserCart,
        getUserCartType: typeof data?.getUserCart,
        
        // بررسی items
        itemsExists: !!data?.getUserCart?.items,
        itemsValue: data?.getUserCart?.items,
        itemsType: typeof data?.getUserCart?.items,
        itemsIsArray: Array.isArray(data?.getUserCart?.items),
        itemsLength: data?.getUserCart?.items?.length,
        
        // سایر فیلدها
        totalPrice: data?.getUserCart?.totalPrice,
        totalDiscount: data?.getUserCart?.totalDiscount,
        finalPrice: data?.getUserCart?.finalPrice,
        lastModified: data?.getUserCart?.lastModified
      });

      if (errors && errors.length > 0) {
        console.error('❌ GraphQL errors:', errors);
        const errorMessage = extractErrorMessage(errors);
        return rejectWithValue(errorMessage);
      }

      if (!data) {
        console.error('❌ No data in GraphQL response');
        return rejectWithValue('پاسخ سرور معتبر نیست');
      }

      // اگر getUserCart null یا undefined است
      if (!data.getUserCart) {
        console.log('⚠️ getUserCart is null/undefined, this might be normal for new users');
        const emptyCart = {
          items: [],
          totalPrice: 0,
          totalDiscount: 0,
          finalPrice: 0,
          lastModified: new Date().toISOString()
        };
        console.log('📦 Returning empty cart:', emptyCart);
        return emptyCart;
      }

      const userCart = data.getUserCart;
      
      // بررسی و تمیز کردن داده‌ها
      const cleanCart = {
        items: Array.isArray(userCart.items) ? userCart.items : [],
        totalPrice: Number(userCart.totalPrice) || 0,
        totalDiscount: Number(userCart.totalDiscount) || 0,
        finalPrice: Number(userCart.finalPrice) || 0,
        lastModified: userCart.lastModified || new Date().toISOString()
      };

      console.log('📦 User cart cleaned data:', {
        originalCart: userCart,
        cleanedCart: cleanCart,
        itemsCount: cleanCart.items.length,
        itemsPreview: cleanCart.items.slice(0, 2) // نمایش 2 آیتم اول
      });

      // اگر items دارد، جزئیات آن‌ها را نمایش دهید
      if (cleanCart.items.length > 0) {
        console.log('🎯 Cart items details:', cleanCart.items.map((item, index) => ({
          index,
          id: item._id,
          productId: item.product?._id,
          productTitle: item.product?.title,
          quantity: item.quantity,
          color: item.color,
          size: item.size,
          sellerName: item.selectedSeller?.name
        })));
      } else {
        console.log('📭 Cart is empty (no items)');
      }

      console.log('✅ fetchUserCart completed successfully');
      return cleanCart;

    } catch (error) {
      console.error('❌ Critical error in fetchUserCart:', error);
      
      // بررسی انواع خطا
      if (error.networkError) {
        console.error('🌐 Network error details:', {
          error: error.networkError,
          message: error.networkError.message,
          statusCode: error.networkError.statusCode
        });
        return rejectWithValue('خطای شبکه در دریافت سبد خرید');
      }
      
      if (error.graphQLErrors && error.graphQLErrors.length > 0) {
        console.error('🔥 GraphQL error details:', error.graphQLErrors);
        const errorMessage = extractErrorMessage(error.graphQLErrors);
        return rejectWithValue(errorMessage);
      }
      
      return rejectWithValue(error.message || 'خطا در دریافت سبد خرید');
    }
  }
);
// سینک سبد مهمان با سبد کاربر هنگام لاگین
export const syncGuestCartWithUser = createAsyncThunk(
  'cart/syncGuestCartWithUser',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      console.log('🔄 syncGuestCartWithUser called:', { isAuthenticated: auth.isAuthenticated });
      
      if (!auth.isAuthenticated) {
        return rejectWithValue('کاربر لاگین نیست');
      }

      // دریافت سبد مهمان از localStorage
      const guestCart = getCartFromLocalStorage();
      console.log('📱 Guest cart from localStorage:', guestCart);
      
      if (!guestCart || !guestCart.items || guestCart.items.length === 0) {
        console.log('📱 Guest cart is empty, fetching user cart...');
        // اگر سبد مهمان خالی است، فقط سبد کاربر را بازیابی کن
        const { data, errors } = await client.query({
          query: GET_USER_CART,
          fetchPolicy: "network-only"
        });

        if (errors && errors.length > 0) {
          const errorMessage = extractErrorMessage(errors);
          console.error('❌ GraphQL errors:', errors);
          return rejectWithValue(errorMessage);
        }

        const result = data.getUserCart || { items: [], totalPrice: 0, totalDiscount: 0, finalPrice: 0 };
        console.log('✅ User cart fetch successful:', result);
        return result;
      }

      // تبدیل آیتم‌های سبد مهمان به فرمت مناسب GraphQL
      const guestCartItems = guestCart.items.map(item => ({
        productId: String(item.product._id),
        quantity: Number(item.quantity),
        color: item.color || null,
        size: item.size || null,
        sellerId: item.selectedSeller ? String(item.selectedSeller._id) : null
      }));

      console.log('🔄 Syncing guest cart items:', guestCartItems);

      const { data, errors } = await client.mutate({
        mutation: SYNC_GUEST_CART,
        variables: {
          input: { guestCartItems }
        }
      });

      console.log('📡 GraphQL SYNC_GUEST_CART response:', { data, errors });

      if (errors && errors.length > 0) {
        const errorMessage = extractErrorMessage(errors);
        console.warn('⚠️ Sync failed, trying to fetch user cart:', errorMessage);
        
        // اگر سینک ناموفق بود، سعی کن سبد کاربر را بازیابی کنی
        try {
          const { data: userData, errors: userErrors } = await client.query({
            query: GET_USER_CART,
            fetchPolicy: "network-only"
          });

          if (userErrors && userErrors.length > 0) {
            return rejectWithValue(extractErrorMessage(userErrors));
          }

          const fallbackResult = userData.getUserCart || { items: [], totalPrice: 0, totalDiscount: 0, finalPrice: 0 };
          console.log('✅ Fallback user cart fetch successful:', fallbackResult);
          return fallbackResult;
        } catch (fallbackError) {
          console.error('❌ Fallback also failed:', fallbackError);
          return rejectWithValue(errorMessage);
        }
      }

      if (!data || !data.syncGuestCart) {
        console.error('❌ Invalid sync response:', data);
        return rejectWithValue('پاسخ سرور معتبر نیست');
      }

      // پاک کردن سبد مهمان از localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem(CART_STORAGE_KEY);
        console.log('🗑️ Guest cart cleared from localStorage');
      }

      toast.success('سبد خرید شما با موفقیت به‌روزرسانی شد');
      console.log('✅ Sync successful:', data.syncGuestCart);
      return data.syncGuestCart;
    } catch (error) {
      console.error('❌ Error in syncGuestCartWithUser:', error);
      
      // در صورت خطا، سعی کن حداقل سبد کاربر را بازیابی کنی
      try {
        console.log('🔄 Attempting fallback user cart fetch...');
        const { data, errors } = await client.query({
          query: GET_USER_CART,
          fetchPolicy: "network-only"
        });

        if (errors && errors.length > 0) {
          return rejectWithValue(extractErrorMessage(errors));
        }

        const fallbackResult = data.getUserCart || { items: [], totalPrice: 0, totalDiscount: 0, finalPrice: 0 };
        console.log('✅ Fallback successful:', fallbackResult);
        return fallbackResult;
      } catch (fallbackError) {
        console.error('❌ All attempts failed:', fallbackError);
        return rejectWithValue(error.message || 'خطا در سینک سبد خرید');
      }
    }
  }
);

// تابع کمکی برای ترکیب سبد مهمان با سبد کاربر (برای استفاده در reducer)
export const mergeGuestCartWithUserCart = (state, action) => {
  const { guestCartItems } = action.payload;
  
  if (!guestCartItems || guestCartItems.length === 0) return;
  
  const newItems = [...state.items];
  
  guestCartItems.forEach(guestItem => {
    const existingItemIndex = newItems.findIndex(item => 
      item.product._id === guestItem.product._id && 
      item.color === guestItem.color && 
      item.size === guestItem.size
    );
    
    if (existingItemIndex !== -1) {
      newItems[existingItemIndex] = {
        ...newItems[existingItemIndex],
        quantity: newItems[existingItemIndex].quantity + guestItem.quantity
      };
    } else {
      newItems.push(guestItem);
    }
  });
  
  state.items = newItems;
  
  // محاسبه مجدد مجموع قیمت‌ها
  let totalPrice = 0;
  let totalDiscount = 0;
  
  state.items.forEach(item => {
    const product = item.product;
    const quantity = item.quantity;
    
    if (product.hasDiscount) {
      totalPrice += product.price * quantity;
      totalDiscount += (product.price - product.discountedPrice) * quantity;
    } else {
      totalPrice += product.price * quantity;
    }
  });
  
  state.totalPrice = totalPrice;
  state.totalDiscount = totalDiscount;
  state.finalPrice = totalPrice - totalDiscount;
  
  // ذخیره در localStorage
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('nassim_store_cart', JSON.stringify({
        items: state.items,
        totalPrice: state.totalPrice,
        totalDiscount: state.totalDiscount,
        finalPrice: state.finalPrice,
      }));
    } catch (error) {
      console.error('خطا در ذخیره سبد خرید در localStorage:', error);
    }
  }
};