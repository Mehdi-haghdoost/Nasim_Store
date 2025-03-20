const jwt = require("jsonwebtoken");
const UserModel = require("../../models/User");

const getUserById = (id) => {
    return UserModel.findOne({ _id: id });
}

const validateToken = async (req) => {
    if (req) {
        const authHeader = req.headers.authorization;

        if (authHeader) {
            const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;
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
}