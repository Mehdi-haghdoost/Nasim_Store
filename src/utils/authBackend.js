const jwt = require("jsonwebtoken");
const UserModel = require("../../models/User");

// تابع کمکی برای ست کردن کوکی‌ها
const setAuthCookies = (res, accessToken, refreshToken) => {
    res.cookie('accessToken', accessToken, {
        httpOnly: true, // کوکی فقط از طریق سرور قابل دسترسیه
        maxAge: 1 * 60 * 60 * 1000,
        sameSite: 'Strict', // جلوگیری از CSRF
    });

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000, // ۳۰ روز (هماهنگ با Refresh Token)
        sameSite: 'Strict',
    });
}

const getUserById = (id) => {
    return UserModel.findOne({ _id: id });
}

const validateToken = async (req) => {
    if (req) {
        let token;

        const authHeader = req.headers.authorization;
        if (authHeader) {
            token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

            if (!token && req.cookies && req.cookies.accessToken) {
                token = req.cookies.accessToken
            }
            
            if (!token || token.trim() === "") {
                throw new Error("توکنی یافت نشد !!")
            }

            const AccessTokenSecretKey = process.env.ACCESS_TOKEN_SECRET_KEY;
            if (!AccessTokenSecretKey) {
                throw new Error("کلید مخفی توکن در فایل .env تنظیم نشده است");
            }

            const { id } = jwt.verify(token, AccessTokenSecretKey);
            const user = await getUserById(id);

            if (!user) {
                throw new Error("کاربر پیدا نشد");
            }
            return user;
        } else {
            throw new Error("احراز هویت نشده است !!");
        }

    } else {
        throw new Error("احراز هویت نشده است !!");
    }
}

module.exports = {
    validateToken,
    setAuthCookies,
}