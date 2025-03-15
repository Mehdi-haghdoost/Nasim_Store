const { GraphQLString, GraphQLNonNull, GraphQLObjectType } = require("graphql");
const { AuthType, OtpType } = require("../types/user.types");
const { registerUserValidator } = require("../../utils/validators");
const UserModel = require('./../../../models/User')
const OtpModel = require('./../../../models/Otp')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { sendRequest } = require('../../utils/requestHelper');

const registerUser = {
    type: AuthType,
    args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLString },
        password: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (_, args) => {
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
        if (!AccessTokenSecretKey) {
            throw new Error("کلید مخفی توکن در فایل .env تنظیم نشده است");
        }

        const token = jwt.sign({ id: user._id }, AccessTokenSecretKey, {
            expiresIn: "7d"
        })

        return {
            token,
            user,
        };
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

const confirmOtpAndRegister = {
    type: AuthType,
    args: {
        phone: { type: new GraphQLNonNull(GraphQLString) },
        code: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (_, { phone, code }) => {
        try {
            const otp = await OtpModel.findOne({ phone, code });
            const date = new Date();
            const now = date.getTime();

            if (otp) {
                if (otp.expTime > now) {
                    const hasUser = await UserModel.countDocuments();
                    const isRegisteredUser = await UserModel.findOne({ phone });
                    if (isRegisteredUser) {
                        throw new Error("A user with this phone number already exists");
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
                    if (!AccessTokenSecretKey) {
                        throw new Error("کلید مخفی توکن در فایل .env تنظیم نشده است");
                    }
                    
                    const token = jwt.sign({ id: user._id }, AccessTokenSecretKey, {
                        expiresIn: "7d",
                    });

                    await OtpModel.deleteOne({ phone, code });

                    return { token, user };
                } else {
                    throw new Error("Code has expired :((");
                }
            } else {
                throw new Error("Invalid code :((");
            }
        } catch (error) {
            console.log("Error ===>", error);
            throw new Error(error.message || "Unknown server error occurred!!");
        }
    },
}
module.exports = {
    registerUser,
    sendOtp,
    confirmOtpAndRegister,
};
