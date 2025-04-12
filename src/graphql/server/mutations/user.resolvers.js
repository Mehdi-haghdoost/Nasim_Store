const { GraphQLString, GraphQLNonNull, GraphQLObjectType, GraphQLBoolean } = require("graphql");
const { AuthType, OtpType, UserType, UserProfileInputType } = require("../types/user.types");
const { registerUserValidator } = require("../../../utils/validators");
const UserModel = require('../../../../models/User')
const RefreshTokenModel = require('../../../../models/RefreshToken');
const OtpModel = require('../../../../models/Otp')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { sendRequest } = require('../../../utils/requestHelper');
const { setAuthCookies, validateToken } = require("../../../utils/authBackend");


const registerUser = {
    type: AuthType,
    args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLString },
        password: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (_, args, { res }) => {
        try {
            const validationResult = registerUserValidator(args);

            const error = validationResult[0] ? validationResult[0].message : undefined;

            if (error) throw new Error(error);

            const { username, email, phone, password, otp } = args;

            const hasUser = await UserModel.countDocuments();

            const isRegisteredUser = await UserModel.findOne({ email });
            if (isRegisteredUser) {
                throw new Error("کاربری با این مشخصات قبلا ثبت نام کرده است");
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = {
                username,
                email,
                phone,
                password: hashedPassword,
                role: hasUser ? 'USER' : 'ADMIN',
            };

            const user = await UserModel.create(newUser)

            const AccessTokenSecretKey = process.env.ACCESS_TOKEN_SECRET_KEY;
            const RefreshTokenSecretKey = process.env.REFRESH_TOKEN_SECRET_KEY;
            if (!AccessTokenSecretKey || !RefreshTokenSecretKey) {
                throw new Error("کلید مخفی توکن در فایل .env تنظیم نشده است");
            }

            const accessToken = jwt.sign({ id: user._id }, AccessTokenSecretKey, {
                expiresIn: "1h"
            });

            const refreshToken = jwt.sign({ id: user._id }, RefreshTokenSecretKey, {
                expiresIn: "30d"
            })

            const refreshTokenExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)

            await RefreshTokenModel.create({
                userId: user._id,
                token: refreshToken,
                expiresAt: refreshTokenExpiresAt,
            })

            // ست کردن کوکی‌ها
            setAuthCookies(res, accessToken, refreshToken);
            console.log("User registered successfully:", user._id);
            //  تست توکن : 
            try {
                const decodedAccess = jwt.verify(accessToken, AccessTokenSecretKey);
                const decodedRefresh = jwt.verify(refreshToken, RefreshTokenSecretKey);
                console.log("access Token is valid:", decodedAccess);
                console.log("refresh Token is valid:", decodedRefresh);
            } catch (error) {
                console.error("Token verification failed:", error);
            }

            return {
                token: accessToken,
                refreshToken,
                user,
            };
        } catch (error) {
            console.error("Error in registerUser:", error);
            throw new Error(error.message || "خطا در ثبت‌نام کاربر");
        }
    }
}


const sendOtp = {
    type: OtpType,
    args: {
        phone: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (_, { phone }) => {
        const code = Math.floor(Math.random() * 99999);
        console.log("Your Code is :", code);

        const now = new Date();
        const expTime = now.getTime() + 300_000;
        const minTimeBetweenRequests = now.getTime() - 60_000;

        const isUserExist = await UserModel.findOne({ $or: [{ phone }] });
        if (isUserExist) {
            throw new Error("کاربری با این شماره تلفن در سایت وجود دارد");
        }
        // چک کردن زمان آخرین درخواست
        const lastOtp = await OtpModel.findOne({ phone }).sort({ expTime: -1 });

        if (lastOtp && lastOtp.expTime > minTimeBetweenRequests) {
            throw new Error("لطفا تا ارسال درخواست مجدد یک دقیقه صبر کنید");
        }

        // حذف کدهای قبلی برای این شماره
        await OtpModel.deleteMany({ phone });
        console.log("کدهای تایید قبلی برای این شماره تلفن حذف شد");

        const { response, body } = await sendRequest({
            url: 'http://ippanel.com/api/select',
            body: {
                op: "pattern",
                user: "u09211367465",
                pass: "Faraz@1461240014841169",
                fromNum: "3000505",
                toNum: phone,
                patternCode: "d2q42ceze02l38o",
                inputData: [{ "verification-code": code }]
            },
            json: true
        });

        console.log("IPPANEL Response Status:", response.statusCode);
        console.log("IPPANEL Response Body:", JSON.stringify(body));

        if (response.statusCode === 200) {
            // چک کردن فرمت جدید پاسخ (عدد به جای آرایه)
            if (body && typeof body === 'number') { // فرض می‌کنیم عدد یعنی موفقیت
                await OtpModel.create({
                    phone,
                    code,
                    expTime
                });
                return { message: 'کد با موفقیت ارسال شد :))' };
            } else if (body && Array.isArray(body) && body[0] === "0") { // فرمت قدیمی
                await OtpModel.create({
                    phone,
                    code,
                    expTime
                });
                return { message: 'کد با موفقیت ارسال شد :))' };
            } else {
                console.error("SMS failed, IPPANEL response:", body);
                throw new Error(` ارسال پیامک ناموفق بود: ${JSON.stringify(body)}`);
            }
        } else {
            console.error("IPPANEL server error:", response.statusCode, body);
            throw new Error(` خطای سرور IPPANEL: ${response.statusCode} - ${JSON.stringify(body)}`);
        }
    }
};

const sendOtpForLogin = {
    type: OtpType,
    args: {
        phone: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (_, { phone }) => {
        const code = Math.floor(Math.random() * 99999);
        console.log("Your Login Code is :", code);

        const now = new Date();
        const expTime = now.getTime() + 300_000;
        const minTimeBetweenRequests = now.getTime() - 60_000;

        // چک کردن وجود کاربر
        const isUserExist = await UserModel.findOne({ phone });
        if (!isUserExist) {
            throw new Error("کاربری با این شماره تلفن در سایت وجود ندارد");
        }
        // چک کردن زمان آخرین درخواست
        const lastOtp = await OtpModel.findOne({ phone }).sort({ expTime: -1 });

        if (lastOtp && lastOtp.expTime > minTimeBetweenRequests) {
            throw new Error("لطفا تا ارسال درخواست مجدد یک دقیقه صبر کنید");
        }

        // حذف کدهای قبلی برای این شماره
        await OtpModel.deleteMany({ phone });
        console.log("کدهای تایید قبلی برای این شماره تلفن حذف شد");

        const { response, body } = await sendRequest({
            url: 'http://ippanel.com/api/select',
            body: {
                op: "pattern",
                user: "u09211367465",
                pass: "Faraz@1461240014841169",
                fromNum: "3000505",
                toNum: phone,
                patternCode: "d2q42ceze02l38o",
                inputData: [{ "verification-code": code }]
            },
            json: true
        });

        console.log("IPPANEL Response Status:", response.statusCode);
        console.log("IPPANEL Response Body:", JSON.stringify(body));

        if (response.statusCode === 200) {
            // چک کردن فرمت جدید پاسخ (عدد به جای آرایه)
            if (body && typeof body === 'number') { // فرض می‌کنیم عدد یعنی موفقیت
                await OtpModel.create({
                    phone,
                    code,
                    expTime
                });
                return { message: 'کد با موفقیت ارسال شد :))' };
            } else if (body && Array.isArray(body) && body[0] === "0") { // فرمت قدیمی
                await OtpModel.create({
                    phone,
                    code,
                    expTime
                });
                return { message: 'کد با موفقیت ارسال شد :))' };
            } else {
                console.error("SMS failed, IPPANEL response:", body);
                throw new Error(` ارسال پیامک ناموفق بود: ${JSON.stringify(body)}`);
            }
        } else {
            console.error("IPPANEL server error:", response.statusCode, body);
            throw new Error(` خطای سرور IPPANEL: ${response.statusCode} - ${JSON.stringify(body)}`);
        }
    }
}

const confirmOtpAndRegister = {
    type: AuthType,
    args: {
        phone: { type: new GraphQLNonNull(GraphQLString) },
        code: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (_, { phone, code }, { res }) => {
        try {
            const otp = await OtpModel.findOne({ phone, code });
            const now = Date.now();
            if (otp) {
                if (otp.expTime > now) {
                    const hasUser = await UserModel.countDocuments();
                    const isRegisteredUser = await UserModel.findOne({ phone });
                    if (isRegisteredUser) {
                        throw new Error("کاربری با این شماره تلفن قبلاً ثبت‌نام کرده است");
                    }

                    const email = `${phone}@gmail.com`;
                    const hashedPassword = await bcrypt.hash(phone, 10);
                    const newUser = {

                        email,
                        phone,
                        password: hashedPassword,
                        role: hasUser ? "USER" : "ADMIN",
                    };

                    const user = await UserModel.create(newUser);
                    const AccessTokenSecretKey = process.env.ACCESS_TOKEN_SECRET_KEY;
                    const RefreshTokenSecretKey = process.env.REFRESH_TOKEN_SECRET_KEY;
                    if (!AccessTokenSecretKey || !RefreshTokenSecretKey) {
                        throw new Error("کلید مخفی توکن در فایل .env تنظیم نشده است");
                    }

                    const accessToken = jwt.sign({ id: user._id }, AccessTokenSecretKey, {
                        expiresIn: "1h",
                    });

                    const refreshToken = jwt.sign({ id: user._id }, RefreshTokenSecretKey, {
                        expiresIn: "30d",
                    });

                    const refreshTokenExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
                    await RefreshTokenModel.create({
                        userId: user._id,
                        token: refreshToken,
                        expiresAt: refreshTokenExpiresAt,
                    });

                    // ست کردن کوکی‌ها
                    setAuthCookies(res, accessToken, refreshToken);

                    await OtpModel.deleteOne({ phone, code });

                    return { token: accessToken, refreshToken, user };
                } else {
                    throw new Error("کد منقضی شده است :((");
                }
            } else {
                throw new Error("کد نامعتبر است :((");
            }
        } catch (error) {
            console.log("Error ===>", error);
            throw new Error(error.message || "خطای ناشناخته سرور رخ داد!!");
        }
    },
}

const loginUser = {
    type: AuthType,
    args: {
        phoneOrEmail: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (_, { phoneOrEmail, password }, { res }) => {
        // پیدا کردن کاربر با ایمیل یا شماره تلفن
        const user = await UserModel.findOne({
            $or: [{ email: phoneOrEmail }, { phone: phoneOrEmail }],
        });

        if (!user) {
            throw new Error("کاربر پیدا نشد")
        }

        // بررسی رمز عبور
        const isVerifyPasswordWithHash = await bcrypt.compare(password, user.password);
        if (!isVerifyPasswordWithHash) {
            throw new Error('رمز عبور یا ایمیل اشتباه است')
        }

        const AccessTokenSecretKey = process.env.ACCESS_TOKEN_SECRET_KEY;
        const RefreshTokenSecretKey = process.env.REFRESH_TOKEN_SECRET_KEY;
        if (!AccessTokenSecretKey || !RefreshTokenSecretKey) {
            throw new Error("کلید مخفی توکن در فایل .env تنظیم نشده است");
        }


        const accessToken = jwt.sign({ id: user._id }, AccessTokenSecretKey, {
            expiresIn: "1h"
        });

        const refreshToken = jwt.sign({ id: user._id }, RefreshTokenSecretKey, {
            expiresIn: "30d"
        });

        const refreshTokenExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        await RefreshTokenModel.create({
            userId: user._id,
            token: refreshToken,
            expiresAt: refreshTokenExpiresAt,
        });

        // ست کردن کوکی‌ها
        setAuthCookies(res, accessToken, refreshToken);

        try {
            const decodedAccess = jwt.verify(accessToken, AccessTokenSecretKey);
            const decodedRefresh = jwt.verify(refreshToken, RefreshTokenSecretKey);
            console.log("Access Token is valid:", decodedAccess);
            console.log("Refresh Token is valid:", decodedRefresh);
        } catch (error) {
            console.error("Token verification failed:", error);
        }

        return {
            token: accessToken,
            refreshToken,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                phone: user.phone,
                role: user.role,
                address: user.addresses,
                wishlist: user.wishlist,
                cart: user.cart,
                orderHistory: user.orderHistory,
                orders: user.orders,
                discountCoupons: user.discountCoupons,
                dateOfBirth: user.dateOfBirth ? user.dateOfBirth.toISOString() : null,
                createdAt: user.createdAt.toISOString(),
                updatedAt: user.updatedAt.toISOString(),
            },
        }
    }
}
const verifyOtpAndLogin = {
    type: AuthType,
    args: {
        phone: { type: new GraphQLNonNull(GraphQLString) },
        code: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (_, { phone, code }, { res }) => {
        try {

            const otp = await OtpModel.findOne({ phone, code });
            const now = Date.now();

            if (otp) {
                if (otp.expTime > now) {
                    const user = await UserModel.findOne({ phone })
                    if (!user) {
                        throw new Error("کاربری با این شماره تلفن یافت نشد !!")
                    }

                    const AccessTokenSecretKey = process.env.ACCESS_TOKEN_SECRET_KEY;
                    const RefreshTokenSecretKey = process.env.REFRESH_TOKEN_SECRET_KEY;
                    if (!AccessTokenSecretKey || !RefreshTokenSecretKey) {
                        throw new Error("کلید مخفی توکن در فایل .env تنظیم نشده است");
                    }

                    const accessToken = jwt.sign({ id: user._id }, AccessTokenSecretKey, {
                        expiresIn: "1h",
                    });

                    const refreshToken = jwt.sign({ id: user._id }, RefreshTokenSecretKey, {
                        expiresIn: "30d",
                    });

                    const refreshTokenExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
                    await RefreshTokenModel.create({
                        userId: user._id,
                        token: refreshToken,
                        expiresAt: refreshTokenExpiresAt,
                    });

                    //  ست کردن کوکی ها  
                    setAuthCookies(res, accessToken, refreshToken);

                    await OtpModel.deleteMany({ phone });

                    return {
                        token: accessToken,
                        refreshToken,
                        user: {
                            _id: user._id,
                            username: user.username,
                            email: user.email,
                            phone: user.phone,
                            role: user.role,
                            address: user.addresses,
                            wishlist: user.wishlist,
                            cart: user.cart,
                            orderHistory: user.orderHistory,
                            orders: user.orders,
                            discountCoupons: user.discountCoupons,
                            dateOfBirth: user.dateOfBirth ? user.dateOfBirth.toISOString() : null,
                            createdAt: user.createdAt.toISOString(),
                            updatedAt: user.updatedAt.toISOString(),
                        }
                    }

                } else {
                    throw new Error('کد منقضی شده است :((')
                }
            } else {
                throw new Error("کد نا معتبر است :((")
            }
        } catch (error) {
            console.log("Error ===>", error);
            throw new Error(`خطای ناشناخته سمت سرور رخ داد =>>>>>> ${error.message}`)
        }
    }
}

const refreshTokenMutation = {
    type: AuthType,
    args: {},
    resolve: async (_, __, { req, res }) => {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            throw new Error("Refresh Token ارائه نشده است");
        }

        const RefreshTokenSecretKey = process.env.REFRESH_TOKEN_SECRET_KEY;
        if (!RefreshTokenSecretKey) {
            throw new Error("کلید مخفی Refresh Token در فایل .env تنظیم نشده است");
        }

        let decoded;
        try {
            decoded = jwt.verify(refreshToken, RefreshTokenSecretKey);
        } catch (error) {
            throw new Error("Refresh Token نامعتبر است");
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

        // ست کردن کوکی‌ها با استفاده از تابع واردشده
        setAuthCookies(res, accessToken, refreshToken);

        return {
            token: accessToken,
            refreshToken,
            user: {
                ...user._doc,
                dateOfBirth: user.dateOfBirth ? user.dateOfBirth.toISOString() : null,
                createdAt: user.createdAt.toISOString(),
                updatedAt: user.updatedAt.toISOString(),
            },
        };
    },
};

const updateUserProfile = {
    type: UserType,
    args: {
        input: { type: new GraphQLNonNull(UserProfileInputType) },
    },
    resolve: async (_, { input }, { req }) => {
        try {
            // احراز هویت کاربر
            const user = await validateToken(req);
            if (!user) {
                throw new Error("کاربر احراز هویت نشده است !!")
            }

            // پیدا کردن کاربر در دیتا بیس
            const UserDoc = await UserModel.findById(user._id);
            if (!UserDoc) {
                throw new Error('کاربر پیدا نشد')
            }

            // بررسی ایمیل تکراری
            if (input.email && input.email !== UserDoc.email) {
                const existingEmail = await UserModel.findOne({
                    email: input.email,
                    _id: { $ne: user._id }
                });
                if (existingEmail) {
                    throw new Error('این ایمیل قبلاً توسط کاربر دیگری استفاده شده است')
                }
            }

            // بررسی شماره تلفن تکراری
            if (input.phone && input.phone !== UserDoc.phone) {
                const existingPhone = await UserModel.findOne({
                    phone: input.phone,
                    _id: { $ne: user._id }
                });
                if (existingPhone) {
                    throw new Error("این شماره تلفن قبلاً توسط کاربر دیگری استفاده شده است");
                }
            }

            // بررسی کد ملی (اگر وارد شده باشد)
            if (input.nationalId) {
                const nationalIdRegex = /^\d{10}$/;
                if (!nationalIdRegex.test(input.nationalId)) {
                    throw new Error("کد ملی باید دقیقاً 10 رقم باشد");
                }
            }

            // بررسی کد پستی (اگر وارد شده باشد)
            if (input.postalCode) {
                const postalCodeRegex = /^\d{10}$/;
                if (!postalCodeRegex.test(input.postalCode)) {
                    throw new Error("کد پستی باید دقیقاً 10 رقم باشد");
                }
            }

            // بروزرسانی فیلدهای کاربر
            const updateData = {};

            if (input.username) updateData.username = input.username;
            if (input.email) updateData.email = input.email;
            if (input.phone) updateData.phone = input.phone;
            if (input.nationalId) updateData.nationalId = input.nationalId;
            if (input.postalCode) updateData.postalCode = input.postalCode;
            if (input.bio !== undefined) updateData.bio = input.bio;

            // به‌روزرسانی اطلاعات کاربر در دیتابیس
            const updatedUser = await UserModel.findByIdAndUpdate(
                user._id,
                { $set: updateData },
                { new: true, runValidators: true }
            );

            return {
                _id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
                phone: updatedUser.phone,
                role: updatedUser.role,
                nationalId: updatedUser.nationalId,
                postalCode: updatedUser.postalCode,
                bio: updatedUser.bio,
                address: updatedUser.addresses,
                wishlist: updatedUser.wishlist,
                cart: updatedUser.cart,
                orderHistory: updatedUser.orderHistory,
                orders: updatedUser.orders,
                discountCoupons: updatedUser.discountCoupons,
                dateOfBirth: updatedUser.dateOfBirth ? updatedUser.dateOfBirth.toISOString() : null,
                createdAt: updatedUser.createdAt.toISOString(),
                updatedAt: updatedUser.updatedAt.toISOString(),
            }
        } catch (error) {
            throw new Error(`خطا در به‌روزرسانی پروفایل: ${error.message}`);
        }
    }
};

const logout = {
    type: GraphQLBoolean,
    resolve: async (_, args, context) => {
        try {
            // استخراج توکن از هدر Authorization یا کوکی‌ها
            let token = null;

            // بررسی Authorization header
            const req = context.req || {};
            const authHeader = req.headers?.authorization || '';
            if (authHeader.startsWith('Bearer ')) {
                token = authHeader.slice(7); // جدا کردن بخش 'Bearer ' از توکن
            }

            // اگر توکن از هدر پیدا نشد، دنبال کوکی‌ها می‌گردیم
            if (!token && req.cookies) {
                token = req.cookies.accessToken || req.cookies.refreshToken;
            }

            // اگر هیچ توکنی پیدا نشد
            if (!token) {
                throw new Error('توکن احراز هویت یافت نشد. کاربر احتمالاً قبلاً از سیستم خارج شده است');
            }

            // حذف توکن از دیتابیس - هم با مطابقت دقیق و هم با regex
            await RefreshTokenModel.deleteMany({
                $or: [
                    { token: token },
                    { token: { $regex: new RegExp(token.substring(0, 20)) } }
                ]
            });

            // تلاش برای پاک کردن کوکی‌ها (اگر res درست تعریف شده باشد)
            const res = context.res;
            if (res && typeof res.clearCookie === 'function') {
                try {
                    res.clearCookie('accessToken');
                    res.clearCookie('refreshToken');
                } catch (cookieError) {
                    console.warn('خطا در پاک کردن کوکی‌ها:', cookieError);
                    // خطای پاک کردن کوکی را نادیده می‌گیریم، چون حذف توکن از دیتابیس مهم‌تر است
                }
            }

            return true;
        } catch (error) {
            throw new Error(`خطا در خروج از حساب کاربری: ${error.message}`);
        }
    }
};

module.exports = {
    registerUser,
    sendOtp,
    sendOtpForLogin,
    confirmOtpAndRegister,
    loginUser,
    verifyOtpAndLogin,
    refreshTokenMutation,
    updateUserProfile,
    logout
};
