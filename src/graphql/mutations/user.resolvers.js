const { GraphQLString, GraphQLNonNull } = require("graphql");
const { AuthType } = require("../types/user.types");
const { registerUserValidator } = require("../../utils/validators");
const UserModel = require('./../../../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

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

        const token = jwt.sign({ id: user._id }, process.env.AccessTokenSecretKey, {
            expiresIn: "7d"
        })

        return {
            token,
            user,
        };
    }
}

const registerWithOtp = {
    type: AuthType,
    args: {
        otp: { type: new GraphQLNonNull(GraphQLString) },
        phone: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (_, { top, phone }) => {
        const hasUser = await UserModel.countDocuments();

        if (!phone) {
            throw new Error("لطفا شماره موبایل را وارد نمایید")
        }

        const isOtpValid = await verifyOtp(phone, otp);
        if (!isOtpValid) {
            throw new Error("کد تایید وارد شده صحیح نیست")
        }

        const isRegisteredUser = await UserModel.findOne({ phone });
        if (isRegisteredUser) {
            throw new Error("کاربری با این شماره وبایل قبلا ثبت نام کرده است")
        }

        const newUser = {
            phone,
            role: hasUser ? "USER" : "ADMIN",
        }

        const user = await UserModel.create(newUser);

        const token = jwt.sign({id : user._id} , process.env.AccessTokenSecretKey , {
            expiresIn : "7d"
        });

        return {
            token,
            user,
        }
    }
}

module.exports = {
    registerUser,
    registerWithOtp,
};
