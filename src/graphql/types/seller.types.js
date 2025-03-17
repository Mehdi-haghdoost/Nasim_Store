const { GraphQLObjectType, GraphQLID, GraphQLNonNull, GraphQLString, GraphQLFloat, GraphQLList, GraphQLInputObjectType } = require("graphql");

const ProductRefType = new GraphQLObjectType({
    name: "ProductRef",
    fields: () => ({
        product: { type: new GraphQLNonNull(GraphQLID) },
        price: { type: new GraphQLNonNull(GraphQLFloat) },
    }),
});

const SellerType = new GraphQLObjectType({
    name: "SellerType",
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        address: { type: GraphQLString },
        contactNumber: { type: new GraphQLNonNull(GraphQLString) },
        logo: { type: new GraphQLNonNull(GraphQLString) },
        rating: { type: GraphQLFloat },
        product: { type: new GraphQLList(ProductRefType) },
        createdAt: { type: new GraphQLNonNull(GraphQLString) },
        updatedAt: { type: new GraphQLNonNull(GraphQLString) },
    })
})

const ProductRefInputType = new GraphQLInputObjectType({
    name: "ProductRefInput",
    fields: () => ({
        product: { type: new GraphQLNonNull(GraphQLID) },
        price: { type: new GraphQLNonNull(GraphQLFloat) },
    }),
});

const SellerInputType = new GraphQLInputObjectType({
    name: "SellerInput",
    fields: () => ({
        name: { type: new GraphQLNonNull(GraphQLString) },
        address: { type: GraphQLString },
        contactNumber: { type: new GraphQLNonNull(GraphQLString) },
        logo: { type: new GraphQLNonNull(GraphQLString) },
        rating: { type: GraphQLFloat },
        product: { type: new GraphQLList(ProductRefInputType) },
    }),
});

module.exports = {
    SellerType,
    SellerInputType,
}