const { GraphQLList } = require("graphql");
const { AddressType } = require("../types/address.types");
const UserModel = require('../../../models/User');
const AddressModel = require('../../../models/Address');

const getAllAddress = {
    type: new GraphQLList(AddressType),
    resolve: async (_, args, { req }) => {
        try {
            const user = await validateToken(context.req);
            if (!user) {
                throw new Error("کاربر احراز هویت نشده است");
            }

            const userData = await UserModel.findById(user._id);
            if (!userData.address || userData.address.length === 0) {
              return [];
            }

            const addressList = await AddressModel.find({ _id: { $in: userData.address } });
            return addressList;
        } catch (error) {
            throw new Error(`خطا در بازیابی آدرس‌ها: ${error.message}`);
        }
    }

}

module.exports = {
    getAllAddress,
}