const { GraphQLEnumType, GraphQLObjectType, GraphQLID, GraphQLNonNull, GraphQLString, GraphQLFloat, GraphQLList, GraphQLInputObjectType, GraphQLBoolean } = require("graphql");
const ProductModel = require('../../../../models/Product');
const CommentModel = require("../../../../models/Comment")

// تعریف میکنیم ولی دیگر استفاده نمیکنیم
const CommentStatusEnum = new GraphQLEnumType({
    name: "CommentStatus",
    values: {
        active: { value: "active" },
        pending: { value: "pending" },
        rejected: { value: "rejected" },
        archived: { value: "archived" },
    },
});

const CommentType = new GraphQLObjectType({
    name: "CommentType",
    fields: () => {
        const { UserType } = require("./user.types");
        const { ProductType } = require("./product.types");


        return {
            _id: { type: GraphQLID },
            user: { type: new GraphQLNonNull(UserType) },
            product: {
                type: new GraphQLNonNull(ProductType),
                resolve: async (comment) => {
                    return await ProductModel.findById(comment.product);
                }
            },
            name: { type: new GraphQLNonNull(GraphQLString) },
            email: { type: new GraphQLNonNull(GraphQLString) },
            website: { type: GraphQLString },
            rating: { type: new GraphQLNonNull(GraphQLFloat) },
            commentText: { type: new GraphQLNonNull(GraphQLString) },
            strengths: { type: new GraphQLList(GraphQLString) },
            weaknesses: { type: new GraphQLList(GraphQLString) },
            parent: {
                type: CommentType,
                resolve: async (comment) => {
                    if (!comment.parent) return null;
                    return await CommentModel.findById(comment.parent).populate('user')
                }
            },
            replies: {
                type: new GraphQLList(CommentType),
                resolve: async (comment) => {
                    return await CommentModel.find({ parent: comment._id }).populate('user').sort({ createdAt: 1 });
                }
            },
            isReply: { type: GraphQLBoolean },
            status: { type: CommentStatusEnum }, // همچنان نگه میداریم برای سازگاری با بقیه کدها
            createdAt: { type: new GraphQLNonNull(GraphQLString) },
            updatedAt: { type: new GraphQLNonNull(GraphQLString) },
        }
    }
});

const CommentInputType = new GraphQLInputObjectType({
    name: "CommentInput",
    fields: () => ({
        product: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        website: { type: GraphQLString },
        rating: { type: new GraphQLNonNull(GraphQLFloat) },
        commentText: { type: new GraphQLNonNull(GraphQLString) },
        strengths: { type: new GraphQLList(GraphQLString) },
        weaknesses: { type: new GraphQLList(GraphQLString) },
        status: { type: GraphQLString }, // تغییر به GraphQLString برای حفظ سازگاری
    }),
});

const ReplyCommentInputType = new GraphQLInputObjectType({
    name: "ReplyCommentInput",
    fields: () => ({
        parentId: { type: new GraphQLNonNull(GraphQLID) }, // آیدی کامنت والد
        commentText: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLString }, // اختیاری - می‌تواند از کاربر گرفته شود
        email: { type: GraphQLString }, // اختیاری - می‌تواند از کاربر گرفته شود
        rating: { type: GraphQLFloat }, // اضافه کردن امتیاز به ورودی پاسخ
    }),
});

module.exports = {
    CommentInputType,
    CommentType,
    ReplyCommentInputType,
    CommentStatusEnum, // برای سازگاری با کدهای دیگر صادر میکنیم
};