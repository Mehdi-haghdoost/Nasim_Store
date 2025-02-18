const { GraphQLString, GraphQLNonNull } = require("graphql");
const { AuthType } = require("../types/user.types");
const { registerUserValidator } = require("@/utils/validators");
const UserModel = require('./../../../models/User')
const bcrypt = required('bcryptjs');

const registerUser = {
    type: AuthType,
    args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
        password: { type: new GraphQLNonNull(GraphQLString) },
        otp: { type: GraphQLString },
    },
    resolve: async (_, args) => {
        const validationResult = registerUserValidator(args);

        const error = validationResult[0] ? validationResult[0].message : undefined;

        if (error) throw new Error(error);

        const { username, email, phone, password, otp } = args;

        if (otp) {
            if (!phone) {
                throw new Error("لطفا شماره موبایل را وارد نمایید")
            }
        } else {
            if (!username || !password || !email) {
                throw new Error("وارد کردن نام کاربری و پسورد و ایمیل ضروری است")
            }
        }

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
            password,
            role: hasUser ? 'USER' : 'ADMIN',
        };

        const user = await UserModel.create(newUser)

        const token = JsonWebTokenError.sign({ id: user._id }, process.env.AccessTokenSecretKey, {
            expiresIn: "7d"
        })

        return {
            token,
            user,
        };
    }
}

module.exports = {
    registerUser,
};
