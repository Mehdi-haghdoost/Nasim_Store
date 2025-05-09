const { GraphQLNonNull, GraphQLList, GraphQLID } = require("graphql");
const CommentModel = require("../../../../models/Comment");
const UserModel = require("../../../../models/User");
const { UserType, CommentType } = require("../types/user.types");
const { validateToken } = require("../../../utils/authBackend");

const getProductComments = {
  type: new GraphQLList(CommentType),
  args: {
    productId: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (_, { productId }) => {
    try {
      const comments = await CommentModel.find({
        product: productId,
        isReply: false,
        status: "active",
      })
        .populate("user")
        .sort({ createdAt: -1 });

      return comments;
    } catch (error) {
      throw new Error(`خطا در دریافت کامنت‌ها: ${error.message}`);
    }
  },
};

const getUserProfile = {
  type: UserType,
  resolve: async (_, __, { req }) => {
    try {
      const user = await validateToken(req);
      if (!user) {
        throw new Error("کاربر احراز هویت نشده است");
      }
      const userData = await UserModel.findById(user._id).populate("addresses");
      if (!userData) {
        throw new Error("کاربر یافت نشد");
      }
      return userData;
    } catch (error) {
      throw new Error(`خطا در دریافت اطلاعات کاربر: ${error.message}`);
    }
  },
};

const me = {
  type: UserType,
  resolve: async (_, __, { req }) => {
    try {
      const user = await validateToken(req);
      if (!user) {
        throw new Error("کاربر احراز هویت نشده است");
      }
      const userData = await UserModel.findById(user._id).populate("addresses");
      if (!userData) {
        throw new Error("کاربر یافت نشد");
      }
      return {
        _id: userData._id,
        username: userData.username,
        email: userData.email,
        phone: userData.phone,
        role: userData.role,
        addresses: userData.addresses,
      };
    } catch (error) {
      throw new Error(`خطا در دریافت اطلاعات کاربر: ${error.message}`);
    }
  },
};

module.exports = {
  getProductComments,
  getUserProfile,
  me,
};