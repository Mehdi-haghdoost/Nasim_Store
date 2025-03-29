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
    
       // دپارتمان
       department: {
        type: String,
        enum: ["technical", "financial", "sales", "general"],
        required: true,
    },

    // ساب دپارتمان
    subDepartment: {
        type: String,
        required: false,
        trim: true,
    },

     // اولویت
     priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "medium",
        required: true,
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
                fileName: {
                    type: String,
                    required: true,
                    trim: true,
                },
                fileType: {
                    type: String,
                    required: false,
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

schema.statics.getDepartmentsMap = function() {
    return {
        "technical": ["سوالات فنی", "مشکلات سایت", "مشکلات اپلیکیشن"],
        "financial": ["پرداخت", "بازپرداخت", "فاکتور"],
        "sales": ["سفارش‌ها", "محصولات", "قیمت‌گذاری"],
        "general": ["پیشنهاد", "انتقاد", "سایر"]
    };
};

const model = mongoose.models.Ticket || mongoose.model("Ticket", schema);

module.exports = model;