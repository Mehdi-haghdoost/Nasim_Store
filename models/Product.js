const mongoose = require("mongoose");
const UserModel = require('./User');
const SellerModel = require('./Seller');
const CategoryModel = require("./Category");


const schema = new mongoose.Schema({
    image: {
        type: String, // img src
        required: true,
        trim: true,
    },

    title: {
        type: String,
        required: true,
        trim: true,
    },

    // ویژگی‌های کلی کالا
    features: {
        type: [String],
        required: false,
        default: [],
    },

    rating: {
        type: Number,
        required: false,
        default: 0,
        min: 0,
        max: 5,
    },

    // 4 مورد از برجسته‌ترین ویژگی‌های محصول
    highlights: {
        type: [
            {
                feature: {
                    type: String,
                    required: true,
                    trim: true,
                },
            },
        ],
        default: [],
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        required: true
    },

    colors: {
        type: [
            {
                color: {
                    type: String,
                    enum: ["قرمز", "مشکی", "سبز", "آبی", "نارنجی", "بنفش"],
                    required: true,
                },
                available: {
                    type: Boolean,
                    default: true, // --> موجود  

                }
            },
        ],
        default: [
            { color: "رمز", available: true },
            { color: "مشکی", available: true },
            { color: "آبی", available: true },
            { color: "سبز", available: false },
        ]
    },

    // تعداد موجودی کالا در انبار
    stock: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
    },

    price: {
        type: Number,
        required: true,
        default: 0,
    },

    // قیمت با تخفیف
    discountedPrice: {
        type: Number,
        required: false,
        min: 0,
        default: null,
    },

    hasDiscount: {
        type: Boolean,
        required: false,
    },

    // آیکون برند محصول (URL یا مسیر فایل)
    brandIcon: {
        type: String,
        required: true,
        trim: true,
    },

    originalName: {
        type: String,
        required: true,
        trim: true,
    },

    // توضیحات کلی محصول (معرفی مختصر)
    description: {
        type: String,
        required: true,
        trim: true,
    },

    // مشخصات محصول (بررسی دقیق)
    specifications: {
        type: String,
        required: true,
        trim: true,
    },

    comments: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Comment",
            required: false,
        },
    ],

    // لیست فروشندگان این محصول
    sellers: [
       {
        type : mongoose.Types.ObjectId,
        ref : "Seller",
        required : true,
       }
    ],

    // میزان رضایت مشتریان از کالا بر حسب درصد
    customerSatisfaction: {
        type: Number,
        required: false,
        min: 0,
        max: 100,
        default: 0,
    },

    salesCount: {
        type: Number,
        min: 0,
        default: 0,
    },

},
    { timestamps: true },
);

const model = mongoose.models.Product || mongoose.model("Product", schema);

module.exports = model;