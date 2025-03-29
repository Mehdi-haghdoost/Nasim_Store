const { GraphQLNonNull } = require("graphql");
const { WishlistOperationResultType, WishlistItemInputType } = require("../types/wishlist.types");
const { validateToken } = require("../../utils/authBackend");
const ProductModel = require('../../../models/Product');
const UserModel = require('../../../models/User');

// اضافه کردن محصول به لیست علاقه‌مندی‌ها
const addToWishlist = {
    type: WishlistOperationResultType,
    args: {
        input: { type: new GraphQLNonNull(WishlistItemInputType) }
    },
    resolve: async (_, { input }, { req }) => {
        try {
            const user = await validateToken(req);
            if (!user) {
                throw new Error("کاربر احراز هویت نشده است");
            }

            const { productId } = input;

            // بررسی اینکه آیا محصول وجود دارد
            const product = await ProductModel.findById(productId);
            if (!product) {
                throw new Error("محصول مورد نظر یافت نشد");
            }

            // بررسی اینکه آیا محصول قبلاً در لیست علاقه‌مندی‌ها وجود دارد
            const userDoc = await UserModel.findById(user._id);
            if (!userDoc) {
                throw new Error("کاربر پیدا نشد");
            }

            // اگر محصول قبلاً در لیست علاقه‌مندی‌ها وجود داشت
            if (userDoc.wishlist && userDoc.wishlist.includes(productId)) {
                return {
                    success: false,
                    message: "این محصول قبلاً به لیست علاقه‌مندی‌های شما اضافه شده است",
                    productId: productId,
                }
            }

            // اضافه کردن محصول به لیست علاقه‌مندی‌ها
            const updatedUser = await UserModel.findByIdAndUpdate(
                user._id,
                { $addToSet: { wishlist: productId } },
                { new: true }
            );

            return {
                success: true,
                message: "محصول با موفقیت به لیست علاقه‌مندی‌های شما اضافه شد",
                productId: productId,
            }
        } catch (error) {
            throw new Error(`خطا در اضافه کردن به لیست علاقه‌مندی‌ها: ${error.message}`);
        }
    }
}

// حذف محصول از لیست علاقه‌مندی‌ها
const removeFromWishlist = {
    type: WishlistOperationResultType,
    args: {
        input: { type: new GraphQLNonNull(WishlistItemInputType) }
    },
    resolve: async (_, { input }, { req }) => {
        try {
            const user = await validateToken(req);
            if (!user) {
                throw new Error("کاربر احراز هویت نشده است");
            }

            const { productId } = input;

            // حذف محصول از لیست علاقه‌مندی‌ها
            const updatedUser = await UserModel.findByIdAndUpdate(
                user._id,
                { $pull: { wishlist: productId } },
                { new: true }
            );

            if(!updatedUser) {
                throw new Error("کاربر پیدا نشد");
            }

            return {
                success : true,
                message : "محصول با موفقیت از لیست علاقه‌مندی‌های شما حذف شد",
                productId : productId,
            };

        } catch (error) {
            throw new Error(`خطا در حذف از لیست علاقه‌مندی‌ها: ${error.message}`);
        }
    }
};

module.exports = {
    addToWishlist,
    removeFromWishlist,
};