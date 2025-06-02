const { GraphQLList, GraphQLString } = require("graphql");
const { AddressType } = require("../types/address.types");
const UserModel = require('../../../../models/User');
const AddressModel = require('../../../../models/Address');
const { validateToken } = require("../../../utils/authBackend");

const getAllAddress = {
  type: new GraphQLList(AddressType),
  resolve: async (_, args, { req }) => {
      try {
          const user = await validateToken(req);
          if (!user) {
              throw new Error("کاربر احراز هویت نشده است");
          }
          // برای دیباگ: بررسی اینکه آیا user.addresses وجود دارد
          if (user.addresses) {
          }

          // روش اول: مستقیم از دیتابیس آدرس بگیریم - این روش معمولاً دقیق‌تر است
          const directAddresses = await AddressModel.find({ user: user._id }).lean();
          if (directAddresses.length > 0) {
              return directAddresses;
          }

          // روش دوم: از طریق populate کاربر
          const userData = await UserModel.findById(user._id).populate('addresses');
          if (userData && userData.addresses && userData.addresses.length > 0) {
              return userData.addresses;
          }

          // هیچ آدرسی پیدا نشد
          return [];
      } catch (error) {
          console.error("Error in getAllAddress:", error.message, error.stack);
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

      const updatedUser = await UserModel.findByIdAndUpdate(
        user._id,
        { $addToSet: { addresses: { $each: addressIds } } },
        { new: true }
      );
      return `${addresses.length} آدرس با موفقیت به کاربر متصل شد`;
    } catch (error) {
      console.error("Error in linkExistingAddresses:", error);
      throw new Error(`خطا در اتصال آدرس‌ها: ${error.message}`);
    }
  }
};

module.exports = {
  getAllAddress,
  linkExistingAddresses
}