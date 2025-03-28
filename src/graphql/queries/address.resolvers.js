const { GraphQLList, GraphQLString } = require("graphql");
const { AddressType } = require("../types/address.types");
const UserModel = require('../../../models/User');
const AddressModel = require('../../../models/Address');
const { validateToken } = require("../../utils/authBackend");

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

const linkExistingAddresses = {
    type: GraphQLString,
    resolve: async (_, __, { req }) => {
      try {
        const user = await validateToken(req);
        if (!user) throw new Error('کاربر احراز هویت نشده است');
  
        const addresses = await AddressModel.find({ user: user._id });
        if (addresses.length === 0) return "هیچ آدرسی برای اتصال یافت نشد";
  
        const addressIds = addresses.map(address => address._id);
  
        await UserModel.findByIdAndUpdate(
          user._id,
          { $addToSet: { addresses: { $each: addressIds } } },
          { new: true }
        );
  
        return `${addresses.length} آدرس با موفقیت به کاربر متصل شد`;
      } catch (error) {
        throw new Error(`خطا در اتصال آدرس‌ها: ${error.message}`);
      }
    }
  };

module.exports = {
    getAllAddress,
    linkExistingAddresses
}