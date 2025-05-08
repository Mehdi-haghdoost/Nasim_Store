const { GraphQLList, GraphQLString } = require("graphql");
const { AddressType } = require("../types/address.types");
const UserModel = require('../../../../models/User');
const AddressModel = require('../../../../models/Address');
const { validateToken } = require("../../../utils/authBackend");

const getAllAddress = {
  type: new GraphQLList(AddressType),
  resolve: async (_, args, { req }) => {
      try {
          console.log("Request Headers:", req.headers);  // لاگ کردن هدر درخواست

          const user = await validateToken(req);
          if (!user) {
              throw new Error("کاربر احراز هویت نشده است");
          }

          console.log("Authenticated User:", user);

          const userData = await UserModel.findById(user._id);
          if (!userData || !userData.address || userData.address.length === 0) {
              console.log("No addresses found for user.");
              return [];
          }

          const addressList = await AddressModel.find({ _id: { $in: userData.address } }).lean();
          console.log("Address List from DB:", JSON.stringify(addressList, null, 2));

          return addressList;
      } catch (error) {
          console.error("Error in getAllAddress:", error.message);
          throw new Error(`خطا در بازیابی آدرس‌ها: ${error.message}`);
      }
  }
};


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