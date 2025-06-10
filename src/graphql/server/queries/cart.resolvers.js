const { validateToken } = require("../../../utils/authBackend");
const { CartType } = require("../types/cart.types");
const UserModel = require('../../../../models/User');

// دریافت سبد خرید کاربر لاگین شده
const getUserCart = {
    type: CartType,
    resolve: async (_, args, { req }) => {
        try {
            const user = await validateToken(req);
            if (!user) {
                // برای کاربران مهمان سبد خرید خالی برمی‌گردانیم
                // اطلاعات واقعی در localStorage کلاینت نگهداری می‌شود
                return {
                    items: [],
                    totalPrice: 0,
                    totalDiscount: 0,
                    finalPrice: 0,
                    lastModified: new Date().toISOString()
                };
            }

            const userData = await UserModel.findById(user._id)
                .populate({
                    path: 'cart.items.product',
                    populate: [
                        {
                            path: 'category',
                            select: 'name icon'
                        },
                        {
                            path: 'sellers',
                            select: 'name logo rating'
                        }
                    ]
                })
                .populate('cart.items.selectedSeller');

            if (!userData || !userData.cart) {
                // اگر کاربر سبد خرید ندارد، یک سبد خرید خالی ایجاد می‌کنیم
                const newCart = {
                    items: [],
                    totalPrice: 0,
                    totalDiscount: 0,
                    finalPrice: 0,
                    lastModified: new Date()
                };
                
                if (userData) {
                    userData.cart = newCart;
                    await userData.save();
                }
                
                return {
                    items: [],
                    totalPrice: 0,
                    totalDiscount: 0,
                    finalPrice: 0,
                    lastModified: new Date().toISOString()
                };
            }

            // محاسبه مجدد قیمت‌ها (در صورت تغییر قیمت محصولات)
            userData.calculateCartTotals();
            await userData.save();

            return {
                items: userData.cart.items || [],
                totalPrice: userData.cart.totalPrice || 0,
                totalDiscount: userData.cart.totalDiscount || 0,
                finalPrice: userData.cart.finalPrice || 0,
                lastModified: userData.cart.lastModified ? userData.cart.lastModified.toISOString() : new Date().toISOString()
            };
        } catch (error) {
            console.error('Error in getUserCart:', error);
            throw new Error(`خطا در دریافت سبد خرید: ${error.message}`);
        }
    }
}

module.exports = {
    getUserCart
};