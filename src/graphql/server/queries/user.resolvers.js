const { GraphQLNonNull, GraphQLList, GraphQLID, GraphQLInt } = require("graphql");
const { UserCommentsResponseType } = require("../types/comment.types");
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

const getUserComments = {
  type: UserCommentsResponseType,
  args: {
    page: { type: GraphQLInt },
    limit: { type: GraphQLInt }
  },
  resolve: async (_, { page = 1, limit = 10 }, { req }) => {
    try {
      // احراز هویت کاربر
      const user = await validateToken(req);
      if (!user) {
        throw new Error("کاربر احراز هویت نشده است");
      }
      
      const skip = (page - 1) * limit;
      
      // تعداد کل کامنت‌های کاربر
      const totalComments = await CommentModel.countDocuments({ user: user._id });
      
      // محاسبه تعداد صفحات
      const totalPages = Math.ceil(totalComments / limit);
      
      // دریافت کامنت‌های کاربر با پیجینیشن
      const comments = await CommentModel.find({ user: user._id })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('product'); // populate محصول
      
      console.log("getUserComments - comments found:", comments.length);
      
      return {
        comments,
        totalPages: totalPages || 0,
        currentPage: page,
        totalComments
      };
    } catch (error) {
      console.error("Error in getUserComments:", error);
      throw new Error(`خطا در دریافت کامنت‌های کاربر: ${error.message}`);
    }
  }
};


module.exports = {
  getProductComments,
  getUserProfile,
  me,
  getUserComments, 
};
