const { GraphQLNonNull } = require("graphql");
const { CommentType, CommentInputType } = require("../types/comment.types");
const { validateToken } = require("../../utils/authBackend");
const ProductModel = require("../../../models/Product");
const CommentModel = require("../../../models/Comment");

const addComment = {
    type: CommentType,
    args: {
        input: { type: new GraphQLNonNull(CommentInputType) }
    },
    resolve: async (_, { input }, { req }) => {
        try {
            const { product, commentText, rating, strengths, weaknesses } = input;

            const user = await validateToken(req)
            if (!user) {
                throw new Error("کاربر احراز هویت نشده است")
            }

            if (!["USER", "ADMIN"].includes(user.role)) {
                throw new Error("برای ثبت کامنت لطفا لاگین کنید")
            }

            // چک کردن وجود محصول
            const existingProduct = await ProductModel.findById(product);
            if (!existingProduct) {
                throw new Error("محصول پیدا نشد")
            }

            const newComment = await CommentModel.create({
                user: user._id,
                product: existingProduct._id,
                name: user.name,
                email: user.email,
                website: null,
                rating,
                commentText,
                strengths: strengths || [],
                weaknesses: weaknesses || [],
                status: "pending"
            })

            // ۷. اضافه کردن آیدی کامنت به لیست comments کاربر
            user.comments.push(newComment._id);
            await user.save();
            // ۸. اضافه کردن آیدی کامنت به لیست comments محصول
            existingProduct.comments.push(newComment._id);
            await product.save();

            return {
                _id: newComment._id,
                user: {
                    _id: user._id,
                    username: user.username,
                    role: user.role,
                },
                product: newComment.product,
                name: newComment.name,
                email: newComment.email,
                website: newComment.website,
                rating: newComment.rating,
                commentText: newComment.commentText,
                strengths: newComment.strengths,
                weaknesses: newComment.weaknesses,
                status: newComment.status,
                createdAt: newComment.createdAt.toISOString(),
                updatedAt: newComment.updatedAt.toISOString(),
            };
        } catch (error) {
            throw new Error(`خطا در ایجاد کامنت جدید ${error.message}`)
        }
    }
}
module.exports = {
    addComment,
}