const jwt = require("jsonwebtoken");
const UserModel = require("../../models/User");

const getUserById = (id) => {
    return UserModel.findOne({ _id: id });
}

const validatePhone = (phone) => {
    const pattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g;

    return pattern.test(phone)
}
const validateEmail = (email) => {
    const pattern = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g;

    return pattern.test(email)
}

const validatePassword = (password) => {
    const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/g;

    return pattern.test(password)
}

const validateToken = async (req) => {
    if (req) {
        const authHeader = req.headers.authorization;
        console.log('authHeader ==>', authHeader);

        if (authHeader) {
            const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;
            console.log("Received token:", token);
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
    validatePhone,
    validateEmail,
    validatePassword,
    validateToken,
}