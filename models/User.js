const mongoose = require("mongoose");
const AddressModel = require("./Address");
const CommentModel = require("./Comment");
const TicketModel = require('./Ticket');


const schema = new mongoose.Schema({
    // User information
    username: {
        type: String,
        default: "کاربر نسیم استور",
        required: true,
    },

    email: {
        type: String,
        unique: true,
        sparse: true,
    },
    phone: {
        type: String,
        unique: true,
        sparse: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN", "SELLER"],
        default: "USER",
    },

    // تاریخ ثبت‌نام (به‌طور خودکار مقداردهی می‌شود)
    registrationDate: {
        type: Date,
        default: Date.now,
    },


    nationalId: {
        type: String,
        required: false,
    },

    // Address management (supports multiple addresses per user)
    addresses: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Address",
        }
    ],


    paymentMethod:
    {
        type: { type: String, enum: ["DirectBankPayment", "CashOnDelivery"] },
        last4Digits: { type: String },
        provider: { type: String },
        isDefault: { type: Boolean, default: false }
    },

    paymentHistory: [
        {
            transactionId: { type: String, required: true },
            amount: { type: Number, required: true },
            method: { type: String, enum: ["DirectBankPayment", "CashOnDelivery",], required: true },
            status: { type: String, enum: ["PENDING", "COMPLETED", "FAILED"], default: "PENDING" },
            paymentDate: { type: Date, default: Date.now },
            transactionDetails: { type: String },
        }
    ],

    wishlist: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Product"
        }
    ],

    // سبد خرید حذف شد و به localStorage منتقل شد
    
    orders: [{ type: mongoose.Types.ObjectId, ref: "Order" }],

    orderHistory: [
        {
            orderId: { type: mongoose.Types.ObjectId, ref: "Order", required: true },
            orderDate: { type: Date, default: Date.now },
            totalAmount: { type: Number, required: true },
            status: { type: String, enum: ["PENDING", "SHIPPED", "DELIVERED", "CANCELLED"], default: "PENDING" },
            shippingAddress: { type: String, required: true },
            paymentMethod: { type: String, enum: ["DirectBankPayment", "CashOnDelivery"], required: true },
            paymentStatus: { type: String, enum: ["PENDING", "PAID", "FAILED"], default: "PENDING" },
            deliveryDate: { type: Date },
            postalCode: {
                type: String,
            }
        }
    ],

    discountCoupons: [
        {
            code: { type: String, required: true },
            discountPercentage: { type: Number },
            expiryDate: { type: Date },
            usedAt: { type: Date },
            used: { type: Boolean, default: false },
        }
    ],

    dateOfBirth: {
        type: Date,
    },

    comments: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Comment"
        }
    ],

    postalCode: {
        type: String,
        required: false,
    },

    bio: {
        type: String,
        required: false,
        trim: true,
    },
    tickets: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Ticket"
        }
    ]
},
    { timestamps: true }
);

const model = mongoose.models.User || mongoose.model("User", schema);

module.exports = model;