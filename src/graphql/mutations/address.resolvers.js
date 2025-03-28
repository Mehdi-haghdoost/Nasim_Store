const { GraphQLNonNull } = require("graphql");
const { AddressType, AddressInputType } = require("../types/address.types");
const { validateToken } = require("../../utils/authBackend");
const AddressModel = require('../../../models/Address');
const UserModel = require('../../../models/User');

const addNewAddress = {
    type: AddressType,
    args: {
        input: { type: new GraphQLNonNull(AddressInputType) }
    },
    resolve: async (_, { input }, { req }) => {
        try {
            const user = await validateToken(req);
            if (!user) {
                throw new Error('کاربر احراز هویت نشده است')
            }

            const { street, province, city, fullAddress } = input;

            const newAddress = new AddressModel({
                street,
                province,
                city,
                fullAddress,
                createdAt: new Date().toISOString(),
            });

            const savedAddress = await newAddress.save();

            // اضافه کردن آدرس به لیست آدرس‌های کاربر
            await UserModel.findByIdAndUpdate(
                user._id,
                { $push: { address: savedAddress._id } },
                { new: true }
            );

            return savedAddress;
        } catch (error) {
            throw new Error(`خطا در ثبت آدرس: ${error.message}`);
        }
    }
};

module.exports = {
    addNewAddress
};