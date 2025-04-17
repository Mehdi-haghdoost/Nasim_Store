const { validateToken } = require("../../../utils/authBackend");
const { CartType } = require("../types/cart.types");

// این query صرفاً برای سازگاری با API قبلی نگه داشته شده است
// اما در واقع هیچ اطلاعاتی از سرور برنمی‌گرداند
// چون همه اطلاعات سبد خرید در localStorage کلاینت نگهداری می‌شود
const getUserCart = {
    type: CartType,
    resolve: async (_, args, { req }) => {
        try {
            // بررسی احراز هویت کاربر (اختیاری)
            let user = null;
            try {
                user = await validateToken(req);
            } catch (error) {
                // اگر کاربر لاگین نباشد، یک سبد خرید خالی برمی‌گردانیم
            }

            // برگرداندن یک سبد خرید خالی
            // اطلاعات واقعی در کلاینت از localStorage خوانده می‌شود
            return {
                items: [],
                totalPrice: 0,
                totalDiscount: 0,
                finalPrice: 0,
            };
        } catch (error) {
            throw new Error(`خطا در دریافت سبد خرید: ${error.message}`);
        }
    }
}

module.exports = {
    getUserCart
};