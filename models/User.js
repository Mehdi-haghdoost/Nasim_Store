const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    // User information
    name: {
        type: String,
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


    // Address management (supports multiple addresses per user)
    address: [
        {
            street: String,
            fullAddress: String,
            city: String,
            postalCode: String,
            country: { type: String, default: "ایران" },
            isDefault: { type: Boolean, default: false }

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

    cart: [{
        product: { type: mongoose.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 }
    }],

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
    }


},
    { timestamps: true }
);

const model = mongoose.models.User || mongoose.model("User", schema);

export default model;
