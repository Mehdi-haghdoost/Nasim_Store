const { GraphQLInputObjectType, GraphQLNonNull, GraphQLID, GraphQLObjectType, GraphQLBoolean, GraphQLString } = require("graphql");

const WishlistItemInputType = new GraphQLInputObjectType({
    name: "WishlistItemInputType",
    fields: {
        productId: { type: new GraphQLNonNull(GraphQLID) },
    }
});

// تایپ خروجی برای نتیجه عملیات لیست علاقه‌مندی‌ها
const WishlistOperationResultType = new GraphQLObjectType({
    name: "WishlistOperationResultType",
    fields: {
        success: { type: GraphQLBoolean },
        message: { type: GraphQLString },
        productId: { type: GraphQLID },
    }
});

module.exports = {
    WishlistItemInputType,
    WishlistOperationResultType
};