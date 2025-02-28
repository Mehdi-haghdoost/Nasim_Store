const mongoose = require("mongoose");
const UserModel = require("../models/User");

const schema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },

    trackingId: {
        type: String,
        unique: true,
        default: () => Math.random().toString(36).substring(2, 11)
    },

    items: [
        {
            product: {
                type: mongoose.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                default: 1,
            },
            name: {
                type: String,
                require: true,
            },
            price: {
                type: Number,
                required: true,
            },
            image: {
                type: String,
                required: true,
            }
        }
    ],

    orderDate: {
        type: Date,
        default: Date.now,
        required: true,
    },

    recipient: {
        type: String,
        required: true,
    },

    phoneNumber: {
        type: String,
        required: true,
    },

    shippingAddress: {
        type: String,
        required: true,
    },

    postalCode: {
        type: String,
        required: true,
    },

    totalAmount: {
        type: Number,
        required: true,
    },

    paymentMethod: {
        type: String,
        enum: ["DirectBankPayment", "CashOnDelivery"],
        required: true,
    },

    discountCoupon: {
        code: { type: String, },
        discountPercentage: { type: Number, default: 0 },
        used: { type: Boolean, default: false },
    },

    shippingCost: {
        type: Number,
        required: true,
        default: 0,
    },

    deliveryDate: {
        type: Date,
    },

    // وضعیت سفارش
    status: {
        type: String,
        enum: ["PENDING", "SHIPPED", "DELIVERED", "CANCELLED"],
        default: "PENDING",
        required: true,
    },

},
    // برای ثبت createdAt و updatedAt
    { timestamps: true },

);

const model = mongoose.models.Order || mongoose.model("Order", schema);

module.exports = model;