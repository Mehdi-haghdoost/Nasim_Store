const mongoose = require("mongoose");
const UserModel = require("./User");

const schema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },

    product: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true,
    },

    // نام کاربر (مثلاً برای کامنت‌های ناشناس یا بدون ثبت‌نام)
    name: {
        type: String,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        trim: true,
        match: [/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g, "ایمیل معتبر وارد کنید"],
    },

    // وب‌سایت کاربر (اختیاری، برای چک‌باکس ذخیره) // 
    website: {
        type: String,
        required: false,
        trim: true,
        match: [/^https?:\/\/[^\s/$.?#].[^\s]*$/, "آدرس وب‌سایت معتبر وارد کنید"],
    },

    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
        default: 1,
    },

    commentText: {
        type: String,
        required: true,
        trim: true,
    },

    strengths: {
        type: [String],
        required: false,
        default: [],
    },

    weaknesses: {
        type: [String],
        required: false,
        default: [],
    },

    status: {
        type: String,
        enum: ["active", "pending", "rejected", "archived"],
        default: "pending", // کامنت‌ها ابتدا در انتظار تأیید مدیر باشن
    },
},
    { timestamps: true },
);

const model = mongoose.models.Comment || mongoose.model("Comment", schema);

module.exports = model;