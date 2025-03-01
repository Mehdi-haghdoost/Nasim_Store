const mongoose = require("mongoose");
const UserModel = require("./User");

const schema = new mongoose.Schema({

    user : {
        type: mongoose.Types.ObjectId,
        ref : "USer",
        required : true,
    },

    street: {
        type: String,
        required: true,
    },

    fullAddress: {
        type: String,
        required: false,
    },

    // استان
    province: {
        type: String,
        required: true,
        enum: ["تهران", "اصفهان", "خراسان رضوی", "فارس", "آذربایجان شرقی"],
    },

    city: {
        type: String,
        required: true,
    },

    postalCode: {
        type: String,
        required: false,
    },

    phoneNumber: {
        type: String,
        required: false,
    },

    mobileNumber: {
        type: String,
        required: true,
    },

    recipientName: {
        type: String,
        required: true,
    },

    isDefault: {
        type: Boolean,
        default: false,
    },

    country: {
        type: String,
        default: "ایران",
    },
},

    { timestamps: true }
);

const model = mongoose.models.Address || mongoose.model("Address", schema);

module.exports = model;