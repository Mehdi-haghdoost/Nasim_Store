const { 
    GraphQLObjectType, 
    GraphQLID, 
    GraphQLInt, 
    GraphQLString, 
    GraphQLList, 
    GraphQLInputObjectType, 
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQLEnumType
} = require("graphql");

// وضعیت سفارش
const OrderStatusType = new GraphQLEnumType({
    name: "OrderStatus",
    values: {
        PENDING: { value: "PENDING" },
        SHIPPED: { value: "SHIPPED" },
        DELIVERED: { value: "DELIVERED" },
        CANCELLED: { value: "CANCELLED" }
    }
});

// روش پرداخت
const PaymentMethodType = new GraphQLEnumType({
    name: "PaymentMethod",
    values: {
        DirectBankPayment: { value: "DirectBankPayment" },
        CashOnDelivery: { value: "CashOnDelivery" }
    }
});

// کوپن تخفیف
const DiscountCouponType = new GraphQLObjectType({
    name: "DiscountCoupon",
    fields: {
        code: { type: GraphQLString },
        discountPercentage: { type: GraphQLInt },
        used: { type: GraphQLBoolean }
    }
});

// آیتم سفارش
const OrderItemType = new GraphQLObjectType({
    name: "OrderItem",
    fields: () => {
        const { ProductType } = require("./product.types");
        
        return {
            _id: { type: GraphQLID },
            product: {
                type: ProductType,
                resolve: (parent) => {
                    // product قبلاً populate شده توسط mongoose
                    return parent.product;
                }
            },
            quantity: { type: GraphQLInt },
            name: { type: GraphQLString },
            price: { type: GraphQLInt },
            image: { type: GraphQLString }
        };
    }
});

// سفارش اصلی
const OrderType = new GraphQLObjectType({
    name: "Order",
    fields: () => {
        const { UserType } = require("./user.types");
        
        return {
            _id: { type: GraphQLID },
            user: {
                type: UserType,
                resolve: (parent) => {
                    // user قبلاً populate شده توسط mongoose
                    return parent.user;
                }
            },
            trackingId: { type: GraphQLString },
            items: { 
                type: new GraphQLList(OrderItemType),
                resolve: (parent) => {
                    // items قبلاً populate شده
                    return parent.items || [];
                }
            },
            orderDate: { type: GraphQLString },
            recipient: { type: GraphQLString },
            phoneNumber: { type: GraphQLString },
            shippingAddress: { type: GraphQLString },
            postalCode: { type: GraphQLString },
            totalAmount: { type: GraphQLInt },
            paymentMethod: { type: PaymentMethodType },
            discountCoupon: { 
                type: DiscountCouponType,
                resolve: (parent) => {
                    return parent.discountCoupon || null;
                }
            },
            shippingCost: { type: GraphQLInt },
            deliveryDate: { type: GraphQLString },
            status: { type: OrderStatusType },
            createdAt: { type: GraphQLString },
            updatedAt: { type: GraphQLString }
        };
    }
});

// Input Types
const DiscountCouponInputType = new GraphQLInputObjectType({
    name: "DiscountCouponInput",
    fields: {
        code: { type: GraphQLString },
        discountPercentage: { type: GraphQLInt },
        used: { type: GraphQLBoolean }
    }
});

const OrderItemInputType = new GraphQLInputObjectType({
    name: "OrderItemInput",
    fields: {
        product: { type: new GraphQLNonNull(GraphQLID) },
        quantity: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLInt) },
        image: { type: new GraphQLNonNull(GraphQLString) }
    }
});

const CreateOrderInputType = new GraphQLInputObjectType({
    name: "CreateOrderInput",
    fields: {
        user: { type: GraphQLID }, // اختیاری - از token گرفته می‌شود
        items: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(OrderItemInputType))) },
        recipient: { type: new GraphQLNonNull(GraphQLString) },
        phoneNumber: { type: new GraphQLNonNull(GraphQLString) },
        shippingAddress: { type: new GraphQLNonNull(GraphQLString) },
        postalCode: { type: new GraphQLNonNull(GraphQLString) },
        totalAmount: { type: new GraphQLNonNull(GraphQLInt) },
        paymentMethod: { type: new GraphQLNonNull(PaymentMethodType) },
        discountCoupon: { type: DiscountCouponInputType },
        shippingCost: { type: GraphQLInt },
        deliveryDate: { type: GraphQLString }
    }
});

const UpdateOrderInputType = new GraphQLInputObjectType({
    name: "UpdateOrderInput",
    fields: {
        orderId: { type: new GraphQLNonNull(GraphQLID) },
        status: { type: OrderStatusType },
        deliveryDate: { type: GraphQLString },
        trackingId: { type: GraphQLString }
    }
});

module.exports = {
    OrderType,
    OrderItemType,
    DiscountCouponType,
    OrderStatusType,
    PaymentMethodType,
    CreateOrderInputType,
    UpdateOrderInputType,
    OrderItemInputType,
    DiscountCouponInputType
};