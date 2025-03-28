const mongoose = require("mongoose")
const UserModel = require("./User");
const { provinces, cities } = require("../data/provincesCities");


const schema = new mongoose.Schema({

    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },

    street: {
        type: String,
        required: true,
    },

    fullAddress: {
        type: String,
        required: true,
    },

    // استان
    province: {
        type: String,
        required: true,
        enum: provinces,
        default: "تهران",
    },

    city: {
        type: String,
        required: true,
        enum: function () {
            const selectedProvince = this.get("province") || "تهران";
            const cityList = cities[selectedProvince];
            return Array.isArray(cityList) ? cityList : [];
        }
    },

    postalCode: {
        type: String,
        required: false,
        match: [/^\d{10}$/, "کد پستی باید ۱۰ رقم باشد."],
    },

    phoneNumber: {
        type: String,
        required: false,
        match: [/^0\d{2,3}-\d{7,8}$/, "فرمت شماره تلفن نامعتبر است."],
    },

    mobileNumber: {
        type: String,
        required: false,
        match: [/^09\d{9}$/, "فرمت شماره همراه نامعتبر است."],
    },

    recipientName: {
        type: String,
        required: false,
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