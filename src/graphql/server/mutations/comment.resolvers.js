const { GraphQLNonNull, GraphQLID, GraphQLObjectType, GraphQLBoolean, GraphQLString } = require("graphql");
const { CommentType, CommentInputType, ReplyCommentInputType, UserCommentsResponseType } = require("../types/comment.types");
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
                status: "active" // نگه داشتن فیلد برای سازگاری
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
                status: "active", // برای سازگاری
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
            const { parentId, commentText, name, email, website, rating } = input;

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
                rating: rating || 5, // استفاده از امتیاز ارسالی یا مقدار پیش‌فرض
                commentText,
                strengths: [], // نقاط قوت برای پاسخ‌ها نیاز نیست
                weaknesses: [], // نقاط ضعف برای پاسخ‌ها نیاز نیست
                parent: parentId,
                isReply: true,
                status: "active" // نگه داشتن فیلد برای سازگاری
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
                status: "active", // برای سازگاری
                createdAt: replyComment.createdAt.toISOString(),
                updatedAt: replyComment.updatedAt.toISOString(),
            };

        } catch (error) {
            throw new Error(`خطا در ثبت پاسخ: ${error.message}`);
        }
    }
};

const deleteComment = {
    type: new GraphQLObjectType({
        name: 'DeleteCommentResponse',
        fields: {
            success: { type: GraphQLBoolean },
            message: { type: GraphQLString }
        }
    }),
    args: {
        commentId: { type: new GraphQLNonNull(GraphQLID) }
    },
    resolve: async (_, { commentId }, { req }) => {
        try {
            console.log('deleteComment resolver called with commentId:', commentId);

            // احراز هویت کاربر
            const user = await validateToken(req);
            console.log('User authentication result:', user ? 'Authenticated' : 'Not authenticated');

            if (!user) {
                throw new Error("کاربر احراز هویت نشده است");
            }

            // پیدا کردن کامنت
            const comment = await CommentModel.findById(commentId);
            console.log('Found comment:', comment ? 'Yes' : 'No');

            if (!comment) {
                throw new Error("کامنت یافت نشد");
            }

            console.log('Comment user ID:', comment.user.toString());
            console.log('Current user ID:', user._id.toString());

            // بررسی اینکه آیا کامنت متعلق به کاربر است
            if (comment.user.toString() !== user._id.toString()) {
                throw new Error("شما اجازه حذف این کامنت را ندارید");
            }

            // قبل از حذف، تعداد کامنت‌های کاربر را بررسی کنیم
            const commentCountBefore = await CommentModel.countDocuments({ user: user._id });
            console.log(`Before deletion - User has ${commentCountBefore} comments`);

            // حذف کامنت
            const deletedComment = await CommentModel.findByIdAndDelete(commentId);
            console.log('Comment deletion result:', deletedComment ? 'Successful' : 'Failed');

            // بعد از حذف، تعداد کامنت‌های کاربر را دوباره بررسی کنیم
            const commentCountAfter = await CommentModel.countDocuments({ user: user._id });
            console.log(`After deletion - User has ${commentCountAfter} comments`);

            // به‌روزرسانی آرایه‌های مرتبط
            if (comment.parent) {
                // اگر این کامنت یک پاسخ است، آن را از آرایه replies کامنت والد حذف کنیم
                await CommentModel.updateOne(
                    { _id: comment.parent },
                    { $pull: { replies: commentId } }
                );
                console.log('Updated parent comment by removing this reply');
            }

            // حذف این کامنت از آرایه comments کاربر
            await UserModel.updateOne(
                { _id: user._id },
                { $pull: { comments: commentId } }
            );
            console.log('Updated user by removing this comment');

            // حذف این کامنت از آرایه comments محصول
            await ProductModel.updateOne(
                { _id: comment.product },
                { $pull: { comments: commentId } }
            );
            console.log('Updated product by removing this comment');

            return {
                success: true,
                message: "کامنت با موفقیت حذف شد"
            };
        } catch (error) {
            console.error("Error in deleteComment:", error);
            throw new Error(`خطا در حذف کامنت: ${error.message}`);
        }
    }
};

module.exports = {
    addComment,
    replyToComment,
    deleteComment,
}