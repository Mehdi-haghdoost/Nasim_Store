const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "نام الزامی است"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "ایمیل الزامی است"],
        match: [/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g, "لطفا یک ایمیل معتبر وارد کنید"],
        trim: true,
    },
    messgae: {
        type: String,
        trim: true,
        default: "",
    },
    saveInfo: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const model = mongoose.models.Contact || mongoose.model("Contact", schema);
module.exports = model;