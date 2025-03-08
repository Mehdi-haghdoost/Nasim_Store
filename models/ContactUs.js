const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "لطفا نام خود را وارد کنید"],
        trim: true,
        minlength: [2, "نام باید حداقل 2 کاراکتر داشته باشد"],
        maxlength: [30, "نام نمی‌تواند بیشتر از 30 کاراکتر باشد"]
    },

    email: {
        type: String,
        required: [true, "وارد کردن ایمیل الزامی می باشد"],
        trim: true,
        match: [/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g, "لطفا یک ایمیل معتبر وارد کنید"],
    },

    message: {
        type: String,
        required: [true, "دیدگاه الزامی است"],
        trim: true,
        minlength: [10, "دیدگاه باید حداقل 10 کاراکتر باشد"],
        maxlength: [1000, "دیدگاه نمی‌تواند بیشتر از 1000 کاراکتر باشد"],
    },

    isRead: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true
})

const model = mongoose.models.ContactUs || mongoose.model("ContactUs", schema);

module.exports = model;