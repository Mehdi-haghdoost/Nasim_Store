const mongoose = require("mongoose");
const ProductModel = require('./Product');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    address: {
        type: String,
        required: false,
        trim: true,
    },

    contactNumber: {
        type: String,
        required: true,
        trim: true,
    },

    logo: {
        type: String,
        required: true,
        trim: true,
    },

    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
    },

    // فیلدهای جدید برای عملکرد و رضایت مشتریان
    performance: {
        type: String,
        enum: ['عالی', 'متوسط', 'ضعیف'],
        default: 'متوسط'
    },

    satisfaction: {
        type: String,
        default: '0%',
        trim: true
    },

    performanceStatus: {
        type: String,
        enum: ['success', 'warning', 'danger'],
        default: 'warning'
    },

    isSelected: {
        type: Boolean,
        default: false
    },

    product: [{
        product: {
            type: mongoose.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
            default: 0
        }
    }],
},
    { timestamps: true }
);

const model = mongoose.models.Seller || mongoose.model("Seller", schema);

module.exports = model;