const { GraphQLNonNull, GraphQLList, GraphQLID } = require("graphql");
const { CommentType } = require("../types/comment.types");
const CommentModel = require("../../../../models/Comment");
const UserModel = require("../../../../models/User");
const { UserType } = require("../types/user.types");

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
            }).populate('user').sort({ createdAt: -1 });

            return comments;
        } catch (error) {
            throw new Error(`خطا در دریافت کامنت‌ها: ${error.message}`);
        }
    },
};

const getUserProfile = {
    type: UserType,
    resolve: async (_, __, context) => {
        try {
            const userId = context.user._id; 
            const user = await UserModel.findById(userId).populate("addresses");
            return user;
        } catch (error) {
            throw new Error(`خطا در دریافت اطلاعات کاربر: ${error.message}`);
        }
    },
};

module.exports = {
    getProductComments,
    getUserProfile,
};
