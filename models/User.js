// const mongoose = require("mongoose");
// const AddressModel = require("./Address");
// const CommentModel = require("./Comment");
// const TicketModel = require('./Ticket');


// const schema = new mongoose.Schema({
//     // User information
//     username: {
//         type: String,
//         default: "کاربر نسیم استور",
//         required: true,
//     },

//     email: {
//         type: String,
//         unique: true,
//         sparse: true,
//     },
//     phone: {
//         type: String,
//         unique: true,
//         sparse: true,
//     },
//     password: {
//         type: String,
//         required: true,
//     },
//     role: {
//         type: String,
//         enum: ["USER", "ADMIN", "SELLER"],
//         default: "USER",
//     },

//     // تاریخ ثبت‌نام (به‌طور خودکار مقداردهی می‌شود)
//     registrationDate: {
//         type: Date,
//         default: Date.now,
//     },


//     nationalId: {
//         type: String,
//         required: false,
//     },

//     // Address management (supports multiple addresses per user)
//     addresses: [
//         {
//             type: mongoose.Types.ObjectId,
//             ref: "Address",
//         }
//     ],


//     paymentMethod:
//     {
//         type: { type: String, enum: ["DirectBankPayment", "CashOnDelivery"] },
//         last4Digits: { type: String },
//         provider: { type: String },
//         isDefault: { type: Boolean, default: false }
//     },

//     paymentHistory: [
//         {
//             transactionId: { type: String, required: true },
//             amount: { type: Number, required: true },
//             method: { type: String, enum: ["DirectBankPayment", "CashOnDelivery",], required: true },
//             status: { type: String, enum: ["PENDING", "COMPLETED", "FAILED"], default: "PENDING" },
//             paymentDate: { type: Date, default: Date.now },
//             transactionDetails: { type: String },
//         }
//     ],

//     wishlist: [
//         {
//             type: mongoose.Types.ObjectId,
//             ref: "Product"
//         }
//     ],

//     // سبد خرید حذف شد و به localStorage منتقل شد
    
//     orders: [{ type: mongoose.Types.ObjectId, ref: "Order" }],

//     orderHistory: [
//         {
//             orderId: { type: mongoose.Types.ObjectId, ref: "Order", required: true },
//             orderDate: { type: Date, default: Date.now },
//             totalAmount: { type: Number, required: true },
//             status: { type: String, enum: ["PENDING", "SHIPPED", "DELIVERED", "CANCELLED"], default: "PENDING" },
//             shippingAddress: { type: String, required: true },
//             paymentMethod: { type: String, enum: ["DirectBankPayment", "CashOnDelivery"], required: true },
//             paymentStatus: { type: String, enum: ["PENDING", "PAID", "FAILED"], default: "PENDING" },
//             deliveryDate: { type: Date },
//             postalCode: {
//                 type: String,
//             }
//         }
//     ],

//     discountCoupons: [
//         {
//             code: { type: String, required: true },
//             discountPercentage: { type: Number },
//             expiryDate: { type: Date },
//             usedAt: { type: Date },
//             used: { type: Boolean, default: false },
//         }
//     ],

//     dateOfBirth: {
//         type: Date,
//     },

//     comments: [
//         {
//             type: mongoose.Types.ObjectId,
//             ref: "Comment"
//         }
//     ],

//     postalCode: {
//         type: String,
//         required: false,
//     },

//     bio: {
//         type: String,
//         required: false,
//         trim: true,
//     },
//     tickets: [
//         {
//             type: mongoose.Types.ObjectId,
//             ref: "Ticket"
//         }
//     ]
// },
//     { timestamps: true }
// );

// const model = mongoose.models.User || mongoose.model("User", schema);

// module.exports = model;

const mongoose = require("mongoose");
const AddressModel = require("./Address");
const CommentModel = require("./Comment");
const TicketModel = require('./Ticket');

// تعریف schema برای آیتم‌های سبد خرید
const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1,
    },
    color: {
        type: String,
        required: false,
        trim: true,
    },
    size: {
        type: String,
        required: false,
        trim: true,
    },
    selectedSeller: {
        type: mongoose.Types.ObjectId,
        ref: "Seller",
        required: false,
    },
    addedAt: {
        type: Date,
        default: Date.now,
    }
}, { _id: true }); // هر آیتم ID منحصر به فرد داشته باشد

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

    paymentMethod: {
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

    // سبد خرید - اضافه شده مجدد برای کاربران لاگین
    cart: {
        items: [cartItemSchema],
        totalPrice: {
            type: Number,
            default: 0,
            min: 0,
        },
        totalDiscount: {
            type: Number,
            default: 0,
            min: 0,
        },
        finalPrice: {
            type: Number,
            default: 0,
            min: 0,
        },
        lastModified: {
            type: Date,
            default: Date.now,
        }
    },

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

// متد کمکی برای محاسبه مجدد قیمت‌های سبد خرید
schema.methods.calculateCartTotals = function() {
    let totalPrice = 0;
    let totalDiscount = 0;

    this.cart.items.forEach(item => {
        // فرض می‌کنیم که product populate شده است
        if (item.product) {
            const product = item.product;
            const quantity = item.quantity;

            if (product.hasDiscount && product.discountedPrice) {
                totalPrice += product.price * quantity;
                totalDiscount += (product.price - product.discountedPrice) * quantity;
            } else {
                totalPrice += product.price * quantity;
            }
        }
    });

    this.cart.totalPrice = totalPrice;
    this.cart.totalDiscount = totalDiscount;
    this.cart.finalPrice = totalPrice - totalDiscount;
    this.cart.lastModified = new Date();
};

const model = mongoose.models.User || mongoose.model("User", schema);

module.exports = model;