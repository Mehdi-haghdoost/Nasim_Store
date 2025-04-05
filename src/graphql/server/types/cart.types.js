const { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString, GraphQLList, GraphQLFloat, GraphQLInputObjectType, GraphQLNonNull } = require("graphql");
const { SellerType } = require("./seller.types");
const { ProductType } = require("./product.types");

// تعریف نوع آیتم سبد خرید
const CartItemType = new GraphQLObjectType({
    name: "CartItem",
    fields: {
        _id: { type: GraphQLID },
        product: { type: ProductType },
        quantity: { type: GraphQLInt },
        color: { type: GraphQLString },
        size: { type: GraphQLString },
        selectedSeller: { type: SellerType },
    }
});

// تعریف نوع سبد خرید

const CartType = new GraphQLObjectType({
    name: "Cart",
    fields: {
        items: { type: new GraphQLList(CartItemType) },
        totalPrice: { type: GraphQLFloat },
        totalDiscount: { type: GraphQLFloat },
        finalPrice: { type: GraphQLFloat },
    }
});

// ورودی برای افزودن محصول به سبد خرید
const AddToCartInputType = new GraphQLInputObjectType({
    name: "AddToCartInput",
    fields: {
        productId: { type: new GraphQLNonNull(GraphQLID) },
        quantity: { type: GraphQLInt },
        color: { type: GraphQLString },
        size: { type: GraphQLString },
        sellerId: { type: GraphQLID },
    }
});

// ورودی برای بروزرسانی محصول در سبد خرید
const UpdateCartItemInputType = new GraphQLInputObjectType({
    name: "UpdateCartItemInput",
    fields: {
        itemId: { type: new GraphQLNonNull(GraphQLID) },
        quantity: { type: new GraphQLNonNull(GraphQLInt) },
    }
});


module.exports = {
    CartItemType,
    CartType,
    AddToCartInputType,
    UpdateCartItemInputType
};