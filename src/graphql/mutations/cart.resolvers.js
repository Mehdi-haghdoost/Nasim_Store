const { GraphQLNonNull, GraphQLBoolean, GraphQLID } = require("graphql");
const { CartItemType, AddToCartInputType, UpdateCartItemInputType } = require("../types/cart.types");
const { validateToken } = require("../../utils/authBackend");
const ProductModel = require('../../../models/Product');
const UserModel = require('../../../models/User');

const addToCart = {
    type: CartItemType,
    args: {
        input: { type: new GraphQLNonNull(AddToCartInputType) }
    },
    resolve: async (_, { input }, { req }) => {
        try {
            const user = await validateToken(req);
            if (!user) {
                throw new Error('کاربر احراز هویت نشده است');
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

            const userDoc = await UserModel.findById(user._id);

            // بررسی آیا محصول قبلاً در سبد خرید وجود دارد
            const existingItemIndex = userDoc.cart.findIndex(
                item => item.product.toString() === productId &&
                    item.color === color &&
                    item.size === size
            );

            if (existingItemIndex > -1) {
                // اگر محصول با همان مشخصات در سبد وجود دارد، تعداد را افزایش بده
                userDoc.cart[existingItemIndex].quantity += quantity;
            } else {
                // افزودن محصول جدید به سبد خرید
                userDoc.cart.push({
                    product: productId,
                    quantity,
                    color,
                    size,
                    selectedSeller: sellerId
                });
            }

            await userDoc.save();

            // دریافت آخرین آیتم اضافه شده با اطلاعات کامل
            const updatedUser = await UserModel.findById(user._id)
                .populate({
                    path: 'cart.product',
                    model: 'Product'
                })
                .populate({
                    path: 'cart.selectedSeller',
                    model: 'Seller'
                });

            const cartItem = existingItemIndex > -1
                ? updatedUser.cart[existingItemIndex]
                : updatedUser.cart[updatedUser.cart.length - 1];

            return cartItem;

        } catch (error) {
            throw new Error(`خطا در افزودن به سبد خرید: ${error.message}`);
        }
    }
};

const updateCartItem = {
    type: CartItemType,
    args: {
        input: { type: new GraphQLNonNull(UpdateCartItemInputType) }
    },
    resolve: async (_, { input }, { req }) => {
        try {
            const user = await validateToken(req);
            if (!user) {
                throw new Error('کاربر احراز هویت نشده است');
            }

            const { itemId, quantity } = input;

            const userDoc = await UserModel.findById(user._id);

            // پیدا کردن آیتم در سبد خرید
            const cartItemIndex = userDoc.cart.findIndex(item => item._id.toString() === itemId);

            if (cartItemIndex === -1) {
                throw new Error('آیتم موردنظر در سبد خرید یافت نشد');
            }

            if (quantity <= 0) {
                // حذف آیتم اگر تعداد 0 یا کمتر باشد
                userDoc.cart.splice(cartItemIndex, 1);
                await userDoc.save();
                return null; // چون آیتم حذف شده، null برمی‌گردانیم
            } else {
                // بررسی موجودی محصول
                const productId = userDoc.cart[cartItemIndex].product;
                const product = await ProductModel.findById(productId);

                if (product.stock < quantity) {
                    throw new Error('موجودی محصول کافی نیست');
                }

                // بروزرسانی تعداد
                userDoc.cart[cartItemIndex].quantity = quantity;
                await userDoc.save();

                // بازگرداندن آیتم به‌روز شده با اطلاعات کامل
                const updatedUser = await UserModel.findById(user._id)
                    .populate({
                        path: 'cart.product',
                        model: 'Product'
                    })
                    .populate({
                        path: 'cart.selectedSeller',
                        model: 'Seller'
                    });

                return updatedUser.cart[cartItemIndex];
            }
        } catch (error) {
            throw new Error(`خطا در بروزرسانی سبد خرید: ${error.message}`);
        }
    }
};

// حذف محصول از سبد خرید
const removeFromCart = {
    type: GraphQLBoolean,
    args: {
        itemId: { type: new GraphQLNonNull(GraphQLID) }
    },
    resolve: async (_, { itemId }, { req }) => {
        try {
            const user = await validateToken(req);
            if (!user) {
                throw new Error('کاربر احراز هویت نشده است');
            }

            const userDoc = await UserModel.findById(user._id);

            // پیدا کردن آیتم در سبد خرید
            const cartItemIndex = userDoc.cart.findIndex(item => item._id.toString() === itemId);

            if (cartItemIndex === -1) {
                throw new Error('آیتم موردنظر در سبد خرید یافت نشد');
            }

            // حذف آیتم از سبد خرید
            userDoc.cart.splice(cartItemIndex, 1);
            await userDoc.save();

            return true;
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
                throw new Error('کاربر احراز هویت نشده است');
            }

            await UserModel.findByIdAndUpdate(user._id, { cart: [] });

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