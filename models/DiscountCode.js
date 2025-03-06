const mongoose = require("mongoose");
const UserModel = require('./User');

const schema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        uppercase: true,
    },

    discountPercentage: {
        type: Number,
        required: true,
        min: 1,
        max: 100,
    },

    expiresAt: {
        type: Date,
        required: true,
    },


    status: {
        type: String,
        enum: ["active", "expired", "disabled"],
        default: "active",
    },

    allowedUsers: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: false,
        },
    ],


    maxUses: {
        type: Number,
        required: false,
        min: 1,
        default: Infinity,
    },

    
    description: {
        type: String,
        required: false,
        trim: true,
    },

},
    { timestamps: true },
);

const model = mongoose.models.DiscountCode || mongoose.model("DiscountCode", schema);

module.exports = model;