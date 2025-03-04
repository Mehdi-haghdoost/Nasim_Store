const mongoose = require("mongoose");
const UserModel = require('./User');

const schema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },

    // عنوان درخواست
    title: {
        type: String,
        required: true,
        trim: true,
    },

    // وضعیت درخواست
    status: {
        type: String,
        enum: ["pending", "responded", "closed"],
        default: "pending",
    },

    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true, // جلوی تغییر تاریخ ایجاد رو می‌گیره
    },

    // تاریخ به‌روزرسانی (برای ردیابی آخرین تغییر)
    updatedAt: {
        type: Date,
        default: Date.now,
    },

    // متن اصلی درخواست کاربر
    initialRequest: {
        type: String,
        required: true,
        trim: true,
    },

    // نام کاربر (برای نمایش یا تأیید)
    username: {
        type: String,
        required: true,
        trim: true,
    },

    // پیام‌های مکالمه (برای ارسال پیام‌های بعدی توسط کاربر یا پشتیبانی)
    messages: [
        {
            sender: {
                type: String,
                enum: ["user", "support"], // فرستنده (کاربر یا تیم پشتیبانی)
                required: true,
            },
            text: {
                type: String,
                required: true,
                trim: true,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],

    attachments: {
        type: [
            {
                fileUrl: {
                    type: String,
                    required: true,
                    trim: true,
                },
                uploadedAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        required: false,
        default: [],
    },
},
    { timestamps: false } // فقط از createdAt و updatedAt استفاده می‌کنیم
);

const model = mongoose.models.Ticket || mongoose.model("Ticket", schema);

module.exports = model;