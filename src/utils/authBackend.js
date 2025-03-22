const jwt = require("jsonwebtoken");
const UserModel = require("../../models/User");

// تابع کمکی برای ست کردن کوکی‌ها
const setAuthCookies = function(res, accessToken, refreshToken) {

    if (res && typeof res.cookie === 'function') {
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000, // 1 ساعت
            sameSite: 'lax'
        });
        
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 روز
            sameSite: 'lax'
        });
    }
    
    return {
        accessToken,
        refreshToken
    };
};

const getUserById = (id) => {
    return UserModel.findOne({ _id: id });
}

// const validateToken = async (req) => {
//     if (req) {
//         let token;
//         let refreshToken ;

//         const authHeader = req.headers.authorization;
//         if (authHeader) {
//             token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

//             if (!token && req.cookies && req.cookies.accessToken) {
//                 token = req.cookies.accessToken
//             }

//             if (!token && req.cookies && req.cookies.refreshToken) {
//                 refreshToken = req.cookies.accessToken
//             }

//             if (!token || token.trim() === "") {
//                 if(refreshToken) {
//                     return await refreshAndValidateToken(refreshToken, res);
//                 }
//                 throw new Error("توکنی یافت نشد !!")
//             }

//             const AccessTokenSecretKey = process.env.ACCESS_TOKEN_SECRET_KEY;
//             if (!AccessTokenSecretKey) {
//                 throw new Error("کلید مخفی توکن در فایل .env تنظیم نشده است");
//             }

//             const { id } = jwt.verify(token, AccessTokenSecretKey);
//             const user = await getUserById(id);

//             if (!user) {
//                 throw new Error("کاربر پیدا نشد");
//             }
//             return user;
//         } else {
//             throw new Error("احراز هویت نشده است !!");
//         }

//     } else {
//         throw new Error("احراز هویت نشده است !!");
//     }
// }

const validateToken = async (req, res) => {
    if (!req) {
        throw new Error("درخواست معتبر نیست");
    }

    let token;
    let refreshToken;

    // چک کردن هدر Authorization
    const authHeader = req.headers.authorization;
    if (authHeader) {
        token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;
    }

    // چک کردن کوکی‌ها
    if (!token && req.cookies && req.cookies.accessToken) {
        token = req.cookies.accessToken;
    }

    if (req.cookies && req.cookies.refreshToken) {
        refreshToken = req.cookies.refreshToken;
    }

    if (!token || token.trim() === "") {
        // اگه توکن وجود نداشته باشه اما رفرش توکن داشته باشیم
        if (refreshToken) {
            return await refreshAndValidateToken(refreshToken, res);
        }
        throw new Error("توکنی یافت نشد !!");
    }

    const AccessTokenSecretKey = process.env.ACCESS_TOKEN_SECRET_KEY;
    if (!AccessTokenSecretKey) {
        throw new Error("کلید مخفی توکن در فایل .env تنظیم نشده است");
    }

    try {
        const { id } = jwt.verify(token, AccessTokenSecretKey);
        const user = await getUserById(id);

        if (!user) {
            throw new Error("کاربر پیدا نشد");
        }
        return user;
    } catch (error) {
        // اگه توکن منقضی شده یا نامعتبره، از رفرش توکن استفاده کن
        if (error.name === 'TokenExpiredError' && refreshToken) {
            return await refreshAndValidateToken(refreshToken, res);
        }
        throw new Error("توکن نامعتبر است: " + error.message);
    }
};

const refreshAndValidateToken = async (refreshToken, res) => {
    const RefreshTokenSecretKey = process.env.REFRESH_TOKEN_SECRET_KEY;
    if (!RefreshTokenSecretKey) {
        throw new Error("کلید مخفی Refresh Token در فایل .env تنظیم نشده است");
    }

    let decoded;
    try {
        decoded = jwt.verify(refreshToken, RefreshTokenSecretKey);
    } catch (error) {
        throw new Error("Refresh Token نامعتبر است: " + error.message);
    }

    const storedToken = await RefreshTokenModel.findOne({ token: refreshToken });
    if (!storedToken) {
        throw new Error("Refresh Token پیدا نشد");
    }

    if (storedToken.expiresAt < new Date()) {
        await RefreshTokenModel.deleteOne({ token: refreshToken });
        throw new Error("Refresh Token منقضی شده است");
    }

    const user = await UserModel.findById(decoded.id);
    if (!user) {
        throw new Error("کاربر پیدا نشد");
    }

    const AccessTokenSecretKey = process.env.ACCESS_TOKEN_SECRET_KEY;
    const accessToken = jwt.sign({ id: user._id }, AccessTokenSecretKey, {
        expiresIn: "1h",
    });

    // ست کردن کوکی جدید برای accessToken
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 1000, // 1 ساعت
    });

    return user;
};

module.exports = {
    validateToken,
    setAuthCookies,
}