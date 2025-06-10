// const { GraphQLNonNull, GraphQLBoolean, GraphQLID } = require("graphql");
// const { CartItemType, AddToCartInputType, UpdateCartItemInputType } = require("../types/cart.types");
// const { validateToken } = require("../../../utils/authBackend");
// const ProductModel = require('../../../../models/Product');

// // میوتیشن افزودن به سبد خرید
// // این فقط اطلاعات محصول را برمی‌گرداند و ذخیره‌سازی در localStorage توسط کلاینت انجام می‌شود
// const addToCart = {
//     type: CartItemType,
//     args: {
//         input: { type: new GraphQLNonNull(AddToCartInputType) }
//     },
//     resolve: async (_, { input }, { req }) => {
//         try {
//             // بررسی احراز هویت کاربر (اختیاری)
//             // نیازی به الزام لاگین برای افزودن به سبد خرید نیست
//             // حتی کاربر مهمان هم می‌تواند به سبد خرید اضافه کند
//             let user = null;
//             try {
//                 user = await validateToken(req);
//             } catch (error) {
//                 // اگر کاربر لاگین نباشد، ادامه می‌دهیم
//             }

//             const { productId, quantity = 1, color, size, sellerId } = input;

//             // بررسی وجود محصول
//             const product = await ProductModel.findById(productId);
//             if (!product) {
//                 throw new Error('محصول یافت نشد');
//             }

//             // بررسی موجودی محصول
//             if (product.stock < quantity) {
//                 throw new Error('موجودی محصول کافی نیست');
//             }

//             // ما فقط اطلاعات محصول را برمی‌گردانیم
//             // ذخیره‌سازی در localStorage توسط کلاینت انجام می‌شود
//             return {
//                 _id: Math.random().toString(36).substr(2, 9), // یک شناسه موقت
//                 product,
//                 quantity,
//                 color,
//                 size,
//                 selectedSeller: sellerId ? await SellerModel.findById(sellerId) : null
//             };
//         } catch (error) {
//             throw new Error(`خطا در افزودن به سبد خرید: ${error.message}`);
//         }
//     }
// };

// // میوتیشن به‌روزرسانی آیتم سبد خرید
// // این فقط اطلاعات آیتم به‌روز شده را برمی‌گرداند
// const updateCartItem = {
//     type: GraphQLBoolean,
//     args: {
//         input: { type: new GraphQLNonNull(UpdateCartItemInputType) }
//     },
//     resolve: async (_, { input }, { req }) => {
//         try {
//             const { itemId, quantity } = input;

//             if (quantity < 0) {
//                 throw new Error('مقدار باید بزرگتر یا مساوی صفر باشد');
//             }

//             // ما فقط موفقیت عملیات را برمی‌گردانیم
//             // به‌روزرسانی واقعی در localStorage توسط کلاینت انجام می‌شود
//             return true;
//         } catch (error) {
//             throw new Error(`خطا در بروزرسانی سبد خرید: ${error.message}`);
//         }
//     }
// };

// // میوتیشن حذف محصول از سبد خرید
// const removeFromCart = {
//     type: GraphQLBoolean,
//     args: {
//         itemId: { type: new GraphQLNonNull(GraphQLID) }
//     },
//     resolve: async (_, { itemId }, { req }) => {
//         try {
//             // ما فقط موفقیت عملیات را برمی‌گردانیم
//             // حذف واقعی از localStorage توسط کلاینت انجام می‌شود
//             return true;
//         } catch (error) {
//             throw new Error(`خطا در حذف از سبد خرید: ${error.message}`);
//         }
//     }
// };

// // میوتیشن پاک کردن کامل سبد خرید
// const clearCart = {
//     type: GraphQLBoolean,
//     resolve: async (_, args, { req }) => {
//         try {
//             // ما فقط موفقیت عملیات را برمی‌گردانیم
//             // پاک کردن واقعی از localStorage توسط کلاینت انجام می‌شود
//             return true;
//         } catch (error) {
//             throw new Error(`خطا در پاک کردن سبد خرید: ${error.message}`);
//         }
//     }
// };

// module.exports = {
//     addToCart,
//     updateCartItem,
//     removeFromCart,
//     clearCart
// };

const { GraphQLNonNull, GraphQLBoolean, GraphQLID } = require("graphql");
const { CartType, AddToCartInputType, UpdateCartItemInputType, SyncCartInputType } = require("../types/cart.types");
const { validateToken } = require("../../../utils/authBackend");
const UserModel = require('../../../../models/User');
const ProductModel = require('../../../../models/Product');
const SellerModel = require('../../../../models/Seller');

// افزودن محصول به سبد خرید کاربر لاگین شده
const addToCart = {
    type: CartType,
    args: {
        input: { type: new GraphQLNonNull(AddToCartInputType) }
    },
    resolve: async (_, { input }, { req }) => {
        try {
            // بررسی احراز هویت کاربر
            const user = await validateToken(req);
            if (!user) {
                throw new Error('برای افزودن به سبد خرید باید وارد شوید');
            }

            const { productId, quantity = 1, color, size, sellerId } = input;

            // بررسی وجود محصول و موجودی
            const product = await ProductModel.findById(productId);
            if (!product) {
                throw new Error('محصول یافت نشد');
            }

            if (product.stock < quantity) {
                throw new Error('موجودی محصول کافی نیست');
            }

            // بررسی وجود فروشنده (اختیاری)
            let selectedSeller = null;
            if (sellerId) {
                selectedSeller = await SellerModel.findById(sellerId);
                if (!selectedSeller) {
                    throw new Error('فروشنده یافت نشد');
                }
            }

            // پیدا کردن کاربر
            const userData = await UserModel.findById(user._id);
            if (!userData) {
                throw new Error('کاربر یافت نشد');
            }

            // اگر سبد خرید وجود ندارد، ایجاد کنیم
            if (!userData.cart) {
                userData.cart = {
                    items: [],
                    totalPrice: 0,
                    totalDiscount: 0,
                    finalPrice: 0,
                    lastModified: new Date()
                };
            }

            // بررسی وجود محصول در سبد
            const existingItemIndex = userData.cart.items.findIndex(item => {
                const productMatch = String(item.product) === String(productId);
                const colorMatch = (item.color === color) || (!item.color && !color);
                const sizeMatch = (item.size === size) || (!item.size && !size);
                const sellerMatch = String(item.selectedSeller) === String(sellerId) || (!item.selectedSeller && !sellerId);
                
                return productMatch && colorMatch && sizeMatch && sellerMatch;
            });

            if (existingItemIndex > -1) {
                // افزایش تعداد محصول موجود
                const newQuantity = userData.cart.items[existingItemIndex].quantity + quantity;
                
                if (product.stock < newQuantity) {
                    throw new Error('موجودی محصول کافی نیست');
                }
                
                userData.cart.items[existingItemIndex].quantity = newQuantity;
            } else {
                // افزودن محصول جدید به سبد
                userData.cart.items.push({
                    product: productId,
                    quantity,
                    color,
                    size,
                    selectedSeller: sellerId,
                    addedAt: new Date()
                });
            }

            // محاسبه مجدد قیمت‌ها
            await userData.populate('cart.items.product');
            userData.calculateCartTotals();
            
            await userData.save();

            return {
                items: userData.cart.items,
                totalPrice: userData.cart.totalPrice,
                totalDiscount: userData.cart.totalDiscount,
                finalPrice: userData.cart.finalPrice,
                lastModified: userData.cart.lastModified.toISOString()
            };
        } catch (error) {
            throw new Error(`خطا در افزودن به سبد خرید: ${error.message}`);
        }
    }
};

// به‌روزرسانی تعداد محصول در سبد خرید
const updateCartItem = {
    type: CartType,
    args: {
        input: { type: new GraphQLNonNull(UpdateCartItemInputType) }
    },
    resolve: async (_, { input }, { req }) => {
        try {
            const user = await validateToken(req);
            if (!user) {
                throw new Error('برای تغییر سبد خرید باید وارد شوید');
            }

            const { itemId, quantity } = input;

            if (quantity < 0) {
                throw new Error('تعداد نمی‌تواند منفی باشد');
            }

            const userData = await UserModel.findById(user._id).populate('cart.items.product');
            if (!userData || !userData.cart) {
                throw new Error('سبد خرید یافت نشد');
            }

            const itemIndex = userData.cart.items.findIndex(item => String(item._id) === String(itemId));
            if (itemIndex === -1) {
                throw new Error('محصول در سبد خرید یافت نشد');
            }

            const item = userData.cart.items[itemIndex];
            
            if (quantity === 0) {
                // حذف محصول از سبد
                userData.cart.items.splice(itemIndex, 1);
            } else {
                // بررسی موجودی
                if (item.product.stock < quantity) {
                    throw new Error('موجودی محصول کافی نیست');
                }
                
                userData.cart.items[itemIndex].quantity = quantity;
            }

            // محاسبه مجدد قیمت‌ها
            userData.calculateCartTotals();
            await userData.save();

            return {
                items: userData.cart.items,
                totalPrice: userData.cart.totalPrice,
                totalDiscount: userData.cart.totalDiscount,
                finalPrice: userData.cart.finalPrice,
                lastModified: userData.cart.lastModified.toISOString()
            };
        } catch (error) {
            throw new Error(`خطا در به‌روزرسانی سبد خرید: ${error.message}`);
        }
    }
};

// حذف محصول از سبد خرید
const removeFromCart = {
    type: CartType,
    args: {
        itemId: { type: new GraphQLNonNull(GraphQLID) }
    },
    resolve: async (_, { itemId }, { req }) => {
        try {
            const user = await validateToken(req);
            if (!user) {
                throw new Error('برای حذف از سبد خرید باید وارد شوید');
            }

            const userData = await UserModel.findById(user._id).populate('cart.items.product');
            if (!userData || !userData.cart) {
                throw new Error('سبد خرید یافت نشد');
            }

            const itemIndex = userData.cart.items.findIndex(item => String(item._id) === String(itemId));
            if (itemIndex === -1) {
                throw new Error('محصول در سبد خرید یافت نشد');
            }

            // حذف محصول
            userData.cart.items.splice(itemIndex, 1);

            // محاسبه مجدد قیمت‌ها
            userData.calculateCartTotals();
            await userData.save();

            return {
                items: userData.cart.items,
                totalPrice: userData.cart.totalPrice,
                totalDiscount: userData.cart.totalDiscount,
                finalPrice: userData.cart.finalPrice,
                lastModified: userData.cart.lastModified.toISOString()
            };
        } catch (error) {
            throw new Error(`خطا در حذف از سبد خرید: ${error.message}`);
        }
    }
};

// پاک کردن کامل سبد خرید
const clearCart = {
    type: GraphQLBoolean,
    resolve: async (_, args, { req }) => {
        try {
            const user = await validateToken(req);
            if (!user) {
                throw new Error('برای پاک کردن سبد خرید باید وارد شوید');
            }

            const userData = await UserModel.findById(user._id);
            if (!userData) {
                throw new Error('کاربر یافت نشد');
            }

            // پاک کردن سبد خرید
            userData.cart = {
                items: [],
                totalPrice: 0,
                totalDiscount: 0,
                finalPrice: 0,
                lastModified: new Date()
            };

            await userData.save();
            return true;
        } catch (error) {
            throw new Error(`خطا در پاک کردن سبد خرید: ${error.message}`);
        }
    }
};

// سینک کردن سبد مهمان با سبد کاربر هنگام لاگین
const syncGuestCart = {
    type: CartType,
    args: {
        input: { type: new GraphQLNonNull(SyncCartInputType) }
    },
    resolve: async (_, { input }, { req }) => {
        try {
            const user = await validateToken(req);
            if (!user) {
                throw new Error('برای سینک سبد خرید باید وارد شوید');
            }

            const { guestCartItems } = input;
            
            const userData = await UserModel.findById(user._id).populate('cart.items.product');
            if (!userData) {
                throw new Error('کاربر یافت نشد');
            }

            // اگر سبد خرید وجود ندارد، ایجاد کنیم
            if (!userData.cart) {
                userData.cart = {
                    items: [],
                    totalPrice: 0,
                    totalDiscount: 0,
                    finalPrice: 0,
                    lastModified: new Date()
                };
            }

            // ترکیب آیتم‌های سبد مهمان با سبد کاربر
            for (const guestItem of guestCartItems || []) {
                const { productId, quantity, color, size, sellerId } = guestItem;

                // بررسی وجود محصول
                const product = await ProductModel.findById(productId);
                if (!product) continue; // رد کردن محصولات نامعتبر

                // بررسی موجودی
                if (product.stock < quantity) continue; // رد کردن محصولات بدون موجودی

                // بررسی وجود محصول در سبد کاربر
                const existingItemIndex = userData.cart.items.findIndex(item => {
                    const productMatch = String(item.product._id || item.product) === String(productId);
                    const colorMatch = (item.color === color) || (!item.color && !color);
                    const sizeMatch = (item.size === size) || (!item.size && !size);
                    const sellerMatch = String(item.selectedSeller) === String(sellerId) || (!item.selectedSeller && !sellerId);
                    
                    return productMatch && colorMatch && sizeMatch && sellerMatch;
                });

                if (existingItemIndex > -1) {
                    // افزایش تعداد محصول موجود
                    const newQuantity = userData.cart.items[existingItemIndex].quantity + quantity;
                    
                    if (product.stock >= newQuantity) {
                        userData.cart.items[existingItemIndex].quantity = newQuantity;
                    }
                } else {
                    // افزودن محصول جدید
                    userData.cart.items.push({
                        product: productId,
                        quantity,
                        color,
                        size,
                        selectedSeller: sellerId,
                        addedAt: new Date()
                    });
                }
            }

            // محاسبه مجدد قیمت‌ها
            await userData.populate('cart.items.product');
            userData.calculateCartTotals();
            await userData.save();

            return {
                items: userData.cart.items,
                totalPrice: userData.cart.totalPrice,
                totalDiscount: userData.cart.totalDiscount,
                finalPrice: userData.cart.finalPrice,
                lastModified: userData.cart.lastModified.toISOString()
            };
        } catch (error) {
            throw new Error(`خطا در سینک سبد خرید: ${error.message}`);
        }
    }
};

module.exports = {
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    syncGuestCart
};