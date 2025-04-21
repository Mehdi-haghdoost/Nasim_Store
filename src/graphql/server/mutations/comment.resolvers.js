const { GraphQLNonNull } = require("graphql");
const { CommentType, CommentInputType, ReplyCommentInputType } = require("../types/comment.types");
const { validateToken } = require("../../../utils/authBackend");
const ProductModel = require("../../../../models/Product");
const CommentModel = require("../../../../models/Comment");
const UserModel = require("../../../../models/User");

const addComment = {
    type: CommentType,
    args: {
        input: { type: new GraphQLNonNull(CommentInputType) }
    },
    resolve: async (_, { input }, { req }) => {
        try {
            const { product, commentText, rating, name, email, website, strengths, weaknesses } = input;

            const user = await validateToken(req)
            if (!user) {
                throw new Error("کاربر احراز هویت نشده است")
            }

            if (!["USER", "ADMIN"].includes(user.role)) {
                throw new Error("برای ثبت کامنت لطفا لاگین کنید")
            }

            const UserDoc = await UserModel.findById(user._id);
            if (!UserDoc) {
                throw new Error("کاربر پیدا نشد !!")
            }

            // چک کردن وجود محصول
            const existingProduct = await ProductModel.findById(product);
            if (!existingProduct) {
                throw new Error("محصول پیدا نشد")
            }

            // اعتبارسنجی وب‌سایت (اگه وارد شده باشه)
            if (website) {
                const websiteRegex = /^https?:\/\/[^\s/$.?#].[^\s]*$/;
                if (!websiteRegex.test(website)) {
                    throw new Error("آدرس وب‌سایت معتبر وارد کنید");
                }
            }
            // اعتبارسنجی ایمیل
            const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g;
            if (!emailRegex.test(email)) {
                throw new Error("ایمیل معتبر وارد کنید");
            }
            const newComment = await CommentModel.create({
                user: user._id,
                product: existingProduct._id,
                name: name || UserDoc.name,
                email: email || UserDoc.email,
                website: website || null,
                rating,
                commentText,
                strengths: strengths || [],
                weaknesses: weaknesses || [],
                status: "pending"
            })

            //    اضافه کردن آیدی کامنت به لیست comments کاربر
            UserDoc.comments.push(newComment._id);
            await UserDoc.save();

            // اضافه کردن آیدی کامنت به لیست comments محصول
            existingProduct.comments.push(newComment._id);
            await existingProduct.save();


            return {
                _id: newComment._id,
                user: {
                    _id: user._id,
                    username: UserDoc.username,
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

const replyToComment = {
    type: CommentType,
    args: {
        input: { type: new GraphQLNonNull(ReplyCommentInputType) }
    },
    resolve: async (_, { input }, { req }) => {
        try {
            const { parentId, commentText, name, email, website } = input;

            const user = await validateToken(req);
            if (!user) {
                throw new Error("کاربر احراز هویت نشده است")
            }

            if (!["USER", "ADMIN"].includes(user.role)) {
                throw new Error("برای ثبت پاسخ لطفا لاگین کنید")
            }

            const UserDoc = await UserModel.findById(user._id);
            if (!UserDoc) {
                throw new Error("کاربر پیدا نشد !!")
            }

            // پیدا کردن کامنت والد
            const parentComment = await CommentModel.findById(parentId);
            if (!parentComment) {
                throw new Error("کامنت مورد نظر برای پاسخ یافت نشد")
            }

            if (!parentComment.status.includes("active")) {
                throw new Error("فقط به کامنت‌های تایید شده می‌توان پاسخ داد");
            }
            
            // پیدا کردن محصول مربوطه
            const productDoc = await ProductModel.findById(parentComment.product);
            if (!productDoc) {
                throw new Error("محصول مربوط به این کامنت یافت نشد");
            }

            // ایجاد کامنت پاسخ
            const replyComment = await CommentModel.create({
                user: user._id,
                product: parentComment.product, // پاسخ روی همان محصول ثبت می‌شود
                name: name || UserDoc.name,
                email: email || UserDoc.email,
                website: website || null,
                rating: 1, // رتبه‌دهی برای پاسخ‌ها نیاز نیست
                commentText,
                strengths: [], // نقاط قوت برای پاسخ‌ها نیاز نیست
                weaknesses: [], // نقاط ضعف برای پاسخ‌ها نیاز نیست
                parent: parentId,
                isReply: true,
                status: user.role === "ADMIN" ? "active" : "pending" // اگر ادمین باشد، پاسخ مستقیماً تایید می‌شود
            });


            // اضافه کردن پاسخ به آرایه replies کامنت والد
            parentComment.replies.push(replyComment._id);
            await parentComment.save();

            // اضافه کردن آیدی کامنت پاسخ به لیست comments کاربر
            UserDoc.comments.push(replyComment._id);
            await UserDoc.save();
            
            // اضافه کردن آیدی کامنت پاسخ به لیست comments محصول
            productDoc.comments.push(replyComment._id);
            await productDoc.save();

            return {
                _id: replyComment._id,
                user: {
                    _id: user._id,
                    username: UserDoc.username,
                    role: user.role,
                },
                product: replyComment.product,
                name: replyComment.name,
                email: replyComment.email,
                website: replyComment.website,
                rating: replyComment.rating,
                commentText: replyComment.commentText,
                strengths: replyComment.strengths,
                weaknesses: replyComment.weaknesses,
                parent: parentComment,
                replies: [],
                isReply: replyComment.isReply,
                status: replyComment.status,
                createdAt: replyComment.createdAt.toISOString(),
                updatedAt: replyComment.updatedAt.toISOString(),
            };

        } catch (error) {
            throw new Error(`خطا در ثبت پاسخ: ${error.message}`);
        }
    }
};


module.exports = {
    addComment,
    replyToComment,
}