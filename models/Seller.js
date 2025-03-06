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