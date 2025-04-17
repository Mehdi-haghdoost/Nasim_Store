const { GraphQLNonNull, GraphQLBoolean, GraphQLID } = require("graphql");
const { CartItemType, AddToCartInputType, UpdateCartItemInputType } = require("../types/cart.types");
const { validateToken } = require("../../../utils/authBackend");
const ProductModel = require('../../../../models/Product');

// میوتیشن افزودن به سبد خرید
// این فقط اطلاعات محصول را برمی‌گرداند و ذخیره‌سازی در localStorage توسط کلاینت انجام می‌شود
const addToCart = {
    type: CartItemType,
    args: {
        input: { type: new GraphQLNonNull(AddToCartInputType) }
    },
    resolve: async (_, { input }, { req }) => {
        try {
            // بررسی احراز هویت کاربر (اختیاری)
            // نیازی به الزام لاگین برای افزودن به سبد خرید نیست
            // حتی کاربر مهمان هم می‌تواند به سبد خرید اضافه کند
            let user = null;
            try {
                user = await validateToken(req);
            } catch (error) {
                // اگر کاربر لاگین نباشد، ادامه می‌دهیم
            }

            const { productId, quantity = 1, color, size, sellerId } = input;

            // بررسی وجود محصول
            const product = await ProductModel.findById(productId);
            if (!product) {
                throw new Error('محصول یافت نشد');
            }

            // بررسی موجودی محصول
            if (product.stock < quantity) {
                throw new Error('موجودی محصول کافی نیست');
            }

            // ما فقط اطلاعات محصول را برمی‌گردانیم
            // ذخیره‌سازی در localStorage توسط کلاینت انجام می‌شود
            return {
                _id: Math.random().toString(36).substr(2, 9), // یک شناسه موقت
                product,
                quantity,
                color,
                size,
                selectedSeller: sellerId ? await SellerModel.findById(sellerId) : null
            };
        } catch (error) {
            throw new Error(`خطا در افزودن به سبد خرید: ${error.message}`);
        }
    }
};

// میوتیشن به‌روزرسانی آیتم سبد خرید
// این فقط اطلاعات آیتم به‌روز شده را برمی‌گرداند
const updateCartItem = {
    type: GraphQLBoolean,
    args: {
        input: { type: new GraphQLNonNull(UpdateCartItemInputType) }
    },
    resolve: async (_, { input }, { req }) => {
        try {
            const { itemId, quantity } = input;

            if (quantity < 0) {
                throw new Error('مقدار باید بزرگتر یا مساوی صفر باشد');
            }

            // ما فقط موفقیت عملیات را برمی‌گردانیم
            // به‌روزرسانی واقعی در localStorage توسط کلاینت انجام می‌شود
            return true;
        } catch (error) {
            throw new Error(`خطا در بروزرسانی سبد خرید: ${error.message}`);
        }
    }
};

// میوتیشن حذف محصول از سبد خرید
const removeFromCart = {
    type: GraphQLBoolean,
    args: {
        itemId: { type: new GraphQLNonNull(GraphQLID) }
    },
    resolve: async (_, { itemId }, { req }) => {
        try {
            // ما فقط موفقیت عملیات را برمی‌گردانیم
            // حذف واقعی از localStorage توسط کلاینت انجام می‌شود
            return true;
        } catch (error) {
            throw new Error(`خطا در حذف از سبد خرید: ${error.message}`);
        }
    }
};

// میوتیشن پاک کردن کامل سبد خرید
const clearCart = {
    type: GraphQLBoolean,
    resolve: async (_, args, { req }) => {
        try {
            // ما فقط موفقیت عملیات را برمی‌گردانیم
            // پاک کردن واقعی از localStorage توسط کلاینت انجام می‌شود
            return true;
        } catch (error) {
            throw new Error(`خطا در پاک کردن سبد خرید: ${error.message}`);
        }
    }
};

module.exports = {
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart
};