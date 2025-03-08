const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'عنوان بلاگ الزامی است'],
        trim: true,
    },
    image: {
        type: String,
        required: true,
        trim: true,
    },
    readingTime: {
        type: Number,
        required : true,
        min: 1,
    },

    category: {
        type: String,
        required: true,
        enum: ["علم و تکنولوژی", "بازی ویدیویی", "کتاب و ادبیات", "هنر و سینما", "سبک زندگی"],
    },

    sections: {
        type: [
            {
                title: {
                    type: String,
                    required: true,
                    trim: true,
                },
                description: {
                    type: String,
                    required: true,
                    trim: true,
                }
            }
        ],
        default: [],
    },

    comments: [
        {
            content: {
                type: String,
                required: [true, 'محتوای دیدگاه الزامی است'],
                trim: true
            },
            user: {
                type: mongoose.Types.ObjectId,
                ref: "User",
                required: [true, 'برای ثبت  کامنت لطفا لاگین کنید'],
            },
            replies: [
                {
                    // کاربر یا مدیر (کسی که پاسخ می‌ده)
                    user: {
                        type: mongoose.Types.ObjectId,
                        ref: "User",
                    },

                    // متن پاسخ
                    message: {
                        type: String,
                        trim: true,
                    },
                    // تاریخ ثبت پاسخ
                    createdAt: {
                        type: Date,
                        default: Date.now,
                    },
                }
            ],

            // تاریخ ثبت کامنت
            createdAt: {
                type: Date,
                default: Date.now,
            },
        }
    ],
},
    { timestamps: true }
);

const model = mongoose.models.Blog || mongoose.model("Blog", schema);

module.exports = model;