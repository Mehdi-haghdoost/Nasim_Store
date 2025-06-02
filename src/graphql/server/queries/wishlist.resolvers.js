const { GraphQLList, GraphQLBoolean, GraphQLNonNull, GraphQLID } = require("graphql");
const { ProductType } = require("../types/product.types");
const { validateToken } = require("../../../utils/authBackend");
const UserModel = require("../../../../models/User");
const ProductModel = require("../../../../models/Product");

// دریافت لیست علاقه‌مندی‌های کاربر
const getUserWishlist = {
    type: new GraphQLList(ProductType),
    resolve: async (_, args, { req }) => {
        try {
            const user = await validateToken(req);
            if (!user) {
                throw new Error("کاربر احراز هویت نشده است");
            }

            // دریافت اطلاعات کاربر
            const userDoc = await UserModel.findById(user._id);
            if (!userDoc) {
                throw new Error("کاربر پیدا نشد");
            }

            // اگر wishlist خالی باشد، آرایه خالی برگرداند
            if (!userDoc.wishlist || userDoc.wishlist.length === 0) {
                return [];
            }

            // به صورت دستی محصولات را بر اساس آیدی‌های ذخیره شده در wishlist بازیابی می‌کنیم
            const productIds = userDoc.wishlist;
            const products = await ProductModel.find({ 
                _id: { $in: productIds } 
            });
            return products;
        } catch (error) {
            console.error('Error in getUserWishlist resolver:', error);
            throw new Error(`خطا در دریافت لیست علاقه‌مندی‌ها: ${error.message}`);
        }
    }
};

// بررسی اینکه آیا محصول در لیست علاقه‌مندی‌های کاربر وجود دارد
const isInWishlist = {
    type: GraphQLBoolean,
    args: {
        productId: { type: new GraphQLNonNull(GraphQLID) }
    },
    resolve: async (_, { productId }, { req }) => {
        try {
            const user = await validateToken(req);
            if (!user) {
                throw new Error("کاربر احراز هویت نشده است");
            }

            const userDoc = await UserModel.findById(user._id);
            if (!userDoc) {
                throw new Error("کاربر پیدا نشد");
            }

            return userDoc.wishlist && userDoc.wishlist.includes(productId);
        } catch (error) {
            console.error('Error in isInWishlist resolver:', error);
            throw new Error(`خطا در بررسی وضعیت لیست علاقه‌مندی‌ها: ${error.message}`);
        }
    }
};

module.exports = {
    getUserWishlist,
    isInWishlist,
};