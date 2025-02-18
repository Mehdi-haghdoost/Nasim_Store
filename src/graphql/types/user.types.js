const { GraqhQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLObjectType } = require('graphql')

const AddressType = require('./addressType');
const WishType = require('./wishType');
const CartItemType = require('./cartItemType');
const OrderType = require('./orderType');
const DiscountCouponsType = require('./discountCouponsType')

const UserType = new GraqhQLObjectType({
    name: "UserType",
    fields: {
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
        role: { type: GraphQLString },
        address: { type: new GraphQLList(AddressType) },
        wishlist: { type: new GraphQLList(WishType) },
        cart: { type: new GraphQLList(CartItemType) },
        orderHistory: { type: new GraphQLList(OrderHistoryType) },
        orders: { type: new GraphQLList(OrderType) },
        discountCoupons: { type: new GraphQLList(DiscountCouponsType) },
        dateOfBirth: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
    }
});

const AuthType = new GraphQLObjectType({
    name: 'AuthType',
    fields: {
        token: { type: GraphQLString },
        user: { type: UserType },
    }
})

module.exports = { UserType, AuthType };