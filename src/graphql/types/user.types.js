const { GraphQLID, GraphQLString, GraphQLList, GraphQLObjectType, GraphQLNonNull } = require('graphql')

// const {AddressType} = require('./address.types');
// const {WishType} = require('./wish.types');
// const {CartItemType} = require('./cartItem.types');
// const {OrderType} = require('./order.types');
// const {DiscountCouponsType} = require('./discountCoupons.types')

const UserType = new GraphQLObjectType({
    name: "UserType",
    fields: {
        _id: { type: GraphQLID },
        username: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
        role: { type: GraphQLString },
        address: { type: new GraphQLList(GraphQLString) },
        wishlist: { type: new GraphQLList(GraphQLString) },
        cart: { type: new GraphQLList(GraphQLString) },
        orderHistory: { type: new GraphQLList(GraphQLString) },
        orders: { type: new GraphQLList(GraphQLString) },
        discountCoupons: { type: new GraphQLList(GraphQLString) },
        dateOfBirth: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
    }
});

const AuthType = new GraphQLObjectType({
    name: 'AuthType',
    fields: {
        token: { type: GraphQLString },
        refreshToken: { type: GraphQLString },
        user: { type: UserType },
    }
})

const OtpType = new GraphQLObjectType({
    name: "OtpType",
    fields: {
        message: { type: GraphQLString },
    }
})

module.exports = { UserType, AuthType, OtpType };