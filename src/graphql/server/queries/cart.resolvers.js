const { validateToken } = require("../../../utils/authBackend");
const { CartType } = require("../types/cart.types");
const UserModel = require('../../../../models/User');

const getUserCart = {
    type: CartType,
    resolve: async (_, args, { req }) => {
        try {
            const user = await validateToken(req);
            if (!user) {
                throw new Error('کاربر احراز هویت نشده است');
            }

            const populatedUser = await UserModel.findById(user._id)
                .populate({
                    path: 'cart.product',
                    model: 'Product'
                })
                .populate({
                    path: 'cart.selectedSeller',
                    model: 'Seller'
                })
            // محاسبه قیمت کل، تخفیف و قیمت نهایی
            let totalPrice = 0;
            let totalDiscount = 0;

            populatedUser.cart.forEach(item => {
                const product = item.product;
                const quantity = item.quantity;

                if (product.hasDiscount) {
                    totalPrice += product.price * quantity;
                    totalDiscount += (product.price - product.discountedPrice) * quantity;
                } else {
                    totalPrice += product.price * quantity;
                }
            });

            const finalPrice = totalPrice - totalDiscount;

            return {
                items: populatedUser.cart,
                totalPrice,
                totalDiscount,
                finalPrice,
            };

        } catch (error) {
            throw new Error(`خطا در دریافت سبد خرید: ${error.message}`);
        }
    }
}

module.exports = {
    getUserCart
};