const { GraphQLNonNull, GraphQLList, GraphQLID } = require("graphql");
const { CommentType } = require("../types/comment.types");
const CommentModel = require("../../../../models/Comment");

// resolver برای دریافت تمام کامنت‌های یک محصول (بدون کامنت‌های پاسخ)
const getProductComments = {
    type: new GraphQLList(CommentType),
    args: {
        productId: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve: async (_, { productId }) => {
        try {
            // فقط کامنت‌های اصلی که پاسخ نیستند را برمی‌گرداند
            const comments = await CommentModel.find({
                product: productId,
                isReply: false,
                status: "active"
            }).populate('user').sort({ createdAt: -1 });

            return comments;
        } catch (error) {
            throw new Error(`خطا در دریافت کامنت‌ها: ${error.message}`);
        }
    }
};

module.exports = {
    getProductComments,
}