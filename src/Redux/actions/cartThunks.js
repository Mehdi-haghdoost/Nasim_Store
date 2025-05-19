import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const CART_STORAGE_KEY = 'nassim_store_cart';

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
  };
};

const saveCartToLocalStorage = (cartInfo) => {
  if (typeof window === 'undefined') return;

  try {
    console.log('Saving to localStorage:', cartInfo);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartInfo));
    console.log('Saved to localStorage successfully');
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

const getCartFromLocalStorage = () => {
  if (typeof window === 'undefined') return null;

  try {
    const cartData = localStorage.getItem(CART_STORAGE_KEY);
    const parsedData = cartData ? JSON.parse(cartData) : null;
    console.log('Loaded from localStorage:', parsedData);
    return parsedData;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return null;
  }
};

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

export const addToCartThunk = createAsyncThunk(
  'cart/addToCart',
  async ({ product, quantity = 1, color = null, size = null, sellerId = null }, { rejectWithValue }) => {
    try {
      console.log('addToCartThunk called:', { productId: product._id, quantity, color, sellerId });

      const cartData = getCartFromLocalStorage() || { items: [] };
      let items = cartData.items || [];

      items = items.filter(item => item._id && item.product && item.product._id);
      console.log('Filtered valid cart items:', items);

      if (product.stock < quantity) {
        toast.error('موجودی محصول کافی نیست');
        return rejectWithValue('موجودی محصول کافی نیست');
      }

      const normalizedSeller = normalizeSellerData(sellerId);

      const existingItemIndex = items.findIndex(item => {
        let itemProductId = String(item.product._id);
        let currentProductId = String(product._id);

        if (itemProductId.includes('_')) {
          itemProductId = itemProductId.split('_')[0];
        }
        if (currentProductId.includes('_')) {
          currentProductId = currentProductId.split('_')[0];
        }

        const productIdMatch = itemProductId === currentProductId;
        let colorMatch = (item.color === null && color === null) || String(item.color) === String(color);
        let sizeMatch = (item.size === null && size === null) || String(item.size) === String(size);
        let sellerMatch = (item.selectedSeller === null && normalizedSeller === null) ||
          (normalizedSeller && item.selectedSeller && String(item.selectedSeller._id) === String(normalizedSeller._id));

        console.log('Checking item match:', { itemId: item.product._id, productId: product._id, productIdMatch, colorMatch, sizeMatch, sellerMatch });

        return productIdMatch && colorMatch && sizeMatch && sellerMatch;
      });

      console.log('Existing item index:', existingItemIndex, 'Quantity:', quantity);

      if (existingItemIndex > -1) {
        console.log(`Updating quantity from ${items[existingItemIndex].quantity} to ${items[existingItemIndex].quantity + quantity}`);
        items[existingItemIndex].quantity += quantity;
      } else {
        console.log('Adding new item with quantity:', quantity);
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

      console.log('Updated cart info:', cartInfo);
      toast.success('کالای مورد نظر با موفقیت به سبد خرید افزوده شد');
      return cartInfo;
    } catch (error) {
      console.error('Error in addToCartThunk:', error);
      toast.error(error.message || 'خطا در افزودن به سبد خرید');
      return rejectWithValue(error.message || 'خطا در افزودن به سبد خرید');
    }
  }
);


export const updateCartItemThunk = createAsyncThunk(
  'cart/updateCartItem',
  async ({ itemId, quantity }, { rejectWithValue }) => {
    try {
      console.log('updateCartItemThunk called:', { itemId, quantity });
      const cartData = getCartFromLocalStorage() || { items: [] };
      let items = JSON.parse(JSON.stringify(cartData.items || [])); // کپی عمیق
      console.log('Current cart items:', items.map(i => ({ _id: i._id, productId: i.product._id })));

      const itemIndex = items.findIndex(item => item._id === itemId);
      console.log('Item index:', itemIndex, 'Item ID:', itemId);

      if (itemIndex === -1) {
        console.error('Item not found in cart:', { itemId, availableIds: items.map(i => i._id) });
        toast.error('آیتم موردنظر در سبد خرید یافت نشد');
        return rejectWithValue('آیتم موردنظر در سبد خرید یافت نشد');
      }

      const item = items[itemIndex];

      if (item.product.stock < quantity) {
        toast.error('موجودی محصول کافی نیست');
        return rejectWithValue('موجودی محصول کافی نیست');
      }

      if (quantity <= 0) {
        console.log('Removing item with ID:', itemId);
        items = items.filter(item => item._id !== itemId);
        toast.info('کالا از سبد خرید حذف شد');
      } else {
        console.log('Updating item quantity to:', quantity);
        items[itemIndex] = { ...items[itemIndex], quantity }; // ایجاد یک شیء جدید
        toast.success('تعداد کالا با موفقیت تغییر کرد');
      }

      const cartInfo = calculateCartInfo(items);
      saveCartToLocalStorage(cartInfo);

      console.log('Updated cart info:', cartInfo);
      return cartInfo;
    } catch (error) {
      console.error('Error in updateCartItemThunk:', error);
      toast.error(error.message || 'خطا در به‌روزرسانی سبد خرید');
      return rejectWithValue(error.message || 'خطا در به‌روزرسانی سبد خرید');
    }
  }
);

export const removeFromCartThunk = createAsyncThunk(
  'cart/removeFromCart',
  async (itemId, { rejectWithValue }) => {
    try {
      console.log('removeFromCartThunk called:', { itemId });
      const cartData = getCartFromLocalStorage() || { items: [] };
      let items = cartData.items || [];
      console.log('Current cart items:', items.map(i => ({ _id: i._id, productId: i.product._id })));

      const itemIndex = items.findIndex(item => item._id === itemId);
      if (itemIndex === -1) {
        console.error('Item not found in cart:', { itemId, availableIds: items.map(i => i._id) });
        toast.error('آیتم موردنظر در سبد خرید یافت نشد');
        return rejectWithValue('آیتم موردنظر در سبد خرید یافت نشد');
      }

      items = items.filter(item => item._id !== itemId);
      console.log('Filtered items:', items.map(i => ({ _id: i._id, productId: i.product._id })));

      const cartInfo = calculateCartInfo(items);
      saveCartToLocalStorage(cartInfo);

      console.log('Updated cart info:', cartInfo);
      toast.success('کالا با موفقیت از سبد خرید حذف شد');
      return cartInfo;
    } catch (error) {
      console.error('Error in removeFromCartThunk:', error);
      toast.error(error.message || 'خطا در حذف از سبد خرید');
      return rejectWithValue(error.message || 'خطا در حذف از سبد خرید');
    }
  }
);

export const clearCartThunk = createAsyncThunk(
  'cart/clearCart',
  async (_, { rejectWithValue }) => {
    try {
      console.log('clearCartThunk called');
      if (typeof window !== 'undefined') {
        localStorage.removeItem(CART_STORAGE_KEY);
        console.log('localStorage cleared');
      }
      toast.success('سبد خرید با موفقیت خالی شد');
      return { items: [], totalPrice: 0, totalDiscount: 0, finalPrice: 0 };
    } catch (error) {
      console.error('Error in clearCartThunk:', error);
      toast.error(error.message || 'خطا در پاک کردن سبد خرید');
      return rejectWithValue(error.message || 'خطا در پاک کردن سبد خرید');
    }
  }
);

export const syncCartFromLocalStorage = createAsyncThunk(
  'cart/syncFromLocalStorage',
  async () => {
    try {
      const cartData = getCartFromLocalStorage();
      // یک کپی تازه برای جلوگیری از مشکل read-only
      const freshCartData = cartData ? JSON.parse(JSON.stringify(cartData)) : { items: [], totalPrice: 0, totalDiscount: 0, finalPrice: 0 };
      console.log('syncCartFromLocalStorage loaded:', freshCartData);
      return freshCartData;
    } catch (error) {
      console.error('Error in syncCartFromLocalStorage:', error);
      // در صورت خطا، یک سبد خرید خالی برگردانید
      return { items: [], totalPrice: 0, totalDiscount: 0, finalPrice: 0 };
    }
  }
);



// export const mergeGuestCartWithUserCartThunk = createAsyncThunk(

//   'cart/mergeGuestCart',
//   async (userId, { dispatch, getState }) => {
//     try {
//       if (!userId) {
//         console.log('No userId provided, skipping merge');
//         return false;
//       }
//       const guestCartData = getCartFromLocalStorage() || { items: [] };
//       console.log('Guest cart data:', guestCartData);
//       if (!guestCartData.items || guestCartData.items.length === 0) {
//         console.log('No guest cart items to merge');
//         return false;
//       }

//       // ادغام آیتم‌های سبد خرید مهمان با سبد خرید کاربر
//       const currentCart = getState().cart;
//       let mergedItems = [...(currentCart.items || [])];

//       guestCartData.items.forEach(guestItem => {
//         const existingItemIndex = mergedItems.findIndex(item =>
//           item.product._id === guestItem.product._id &&
//           item.color === guestItem.color &&
//           item.size === guestItem.size &&
//           item.selectedSeller?._id === guestItem.selectedSeller?._id
//         );

//         if (existingItemIndex > -1) {
//           mergedItems[existingItemIndex].quantity += guestItem.quantity;
//         } else {
//           mergedItems.push({
//             ...guestItem,
//             _id: uuidv4() // تخصیص یک ID جدید برای جلوگیری از تداخل
//           });
//         }
//       });

//       const mergedCartInfo = calculateCartInfo(mergedItems);
//       dispatch({
//         type: 'cart/mergeGuestCartWithUserCart',
//         payload: { guestCartItems: mergedItems }
//       });

//       // ذخیره سبد خرید ادغام‌شده در localStorage
//       console.log('Saving merged cart to localStorage:', mergedCartInfo);
//       saveCartToLocalStorage(mergedCartInfo);

//       toast.success('سبد خرید شما با حساب کاربری همگام‌سازی شد');
//       return true;
//     } catch (error) {
//       console.error('Error in mergeGuestCartWithUserCartThunk:', error);
//       toast.error(error.message || 'خطا در همگام‌سازی سبد خرید');
//       return false;
//     }
//   }
// );


mergeGuestCartWithUserCart: (state, action) => {
  const { guestCartItems } = action.payload;
  
  if (!guestCartItems || guestCartItems.length === 0) return;
  
  // ایجاد کپی از آرایه items موجود
  const newItems = [...state.items];
  
  // ترکیب سبد خرید مهمان با سبد خرید کاربر لاگین شده
  guestCartItems.forEach(guestItem => {
    const existingItemIndex = newItems.findIndex(item => 
      item.product._id === guestItem.product._id && 
      item.color === guestItem.color && 
      item.size === guestItem.size
    );
    
    if (existingItemIndex !== -1) {
      // به جای تغییر مستقیم، یک آیتم جدید ایجاد کرده و جایگزین می‌کنیم
      newItems[existingItemIndex] = {
        ...newItems[existingItemIndex],
        quantity: newItems[existingItemIndex].quantity + guestItem.quantity
      };
    } else {
      // افزودن محصول جدید به سبد
      newItems.push(guestItem);
    }
  });
  
  // جایگزینی items با آرایه جدید
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
}

