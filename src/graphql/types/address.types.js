const { GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString, GraphQLInputObjectType } = require("graphql");

const AddressType = new GraphQLObjectType({
    name: "AddressType",
    fields: {
        _id: { type: GraphQLID },
        street: { type: new GraphQLNonNull(GraphQLString) },
        province: { type: new GraphQLNonNull(GraphQLString) },
        city: { type: new GraphQLNonNull(GraphQLString) },
        fullAddress:  { type: new GraphQLNonNull(GraphQLString) },
    }
});

const AddressInputType  = new GraphQLInputObjectType({
    name : 'AddressInput',
    fields : {
        street: { type: new GraphQLNonNull(GraphQLString) },
        province: { type: new GraphQLNonNull(GraphQLString) },
        city: { type: new GraphQLNonNull(GraphQLString) },
        fullAddress:  { type: new GraphQLNonNull(GraphQLString) },
    }
});

module.exports = {
    AddressType,
    AddressInputType,
}