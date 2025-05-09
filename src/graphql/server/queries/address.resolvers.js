const { GraphQLList, GraphQLString } = require("graphql");
const { AddressType } = require("../types/address.types");
const UserModel = require('../../../../models/User');
const AddressModel = require('../../../../models/Address');
const { validateToken } = require("../../../utils/authBackend");

const getAllAddress = {
  type: new GraphQLList(AddressType),
  resolve: async (_, args, { req }) => {
      try {
          console.log("getAllAddress resolver called");
          console.log("Request Headers:", req.headers);

          const user = await validateToken(req);
          if (!user) {
              console.log("User authentication failed");
              throw new Error("کاربر احراز هویت نشده است");
          }

          console.log("Authenticated User:", user);
          console.log("User ID:", user._id);

          // برای دیباگ: بررسی اینکه آیا user.addresses وجود دارد
          console.log("User has addresses array:", !!user.addresses);
          if (user.addresses) {
              console.log("Number of addresses in user:", user.addresses.length);
              console.log("User addresses:", user.addresses);
          }

          // روش اول: مستقیم از دیتابیس آدرس بگیریم - این روش معمولاً دقیق‌تر است
          const directAddresses = await AddressModel.find({ user: user._id }).lean();
          console.log("Direct addresses from AddressModel:", directAddresses);
          console.log("Number of direct addresses:", directAddresses.length);
          
          if (directAddresses.length > 0) {
              return directAddresses;
          }

          // روش دوم: از طریق populate کاربر
          const userData = await UserModel.findById(user._id).populate('addresses');
          console.log("User data after populate:", userData ? "Found" : "Not Found");
          
          if (userData && userData.addresses && userData.addresses.length > 0) {
              console.log("Populated addresses length:", userData.addresses.length);
              return userData.addresses;
          }

          // هیچ آدرسی پیدا نشد
          console.log("No addresses found for this user.");
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
      console.log("linkExistingAddresses resolver called");
      
      const user = await validateToken(req);
      if (!user) throw new Error('کاربر احراز هویت نشده است');

      const addresses = await AddressModel.find({ user: user._id });
      console.log("Found addresses to link:", addresses.length);
      
      if (addresses.length === 0) return "هیچ آدرسی برای اتصال یافت نشد";

      const addressIds = addresses.map(address => address._id);

      const updatedUser = await UserModel.findByIdAndUpdate(
        user._id,
        { $addToSet: { addresses: { $each: addressIds } } },
        { new: true }
      );
      
      console.log("Updated user after linking addresses:", updatedUser ? "Success" : "Failed");

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