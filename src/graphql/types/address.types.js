const { GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString, GraphQLInputObjectType, GraphQLBoolean } = require("graphql");

const AddressType = new GraphQLObjectType({
    name: "AddressType",
    fields: {
        _id: { type: GraphQLID },
        street: { type: new GraphQLNonNull(GraphQLString) },
        province: { type: new GraphQLNonNull(GraphQLString) },
        city: { type: new GraphQLNonNull(GraphQLString) },
        fullAddress:  { type: new GraphQLNonNull(GraphQLString) },
        isDefault: { type: new GraphQLNonNull(GraphQLBoolean) },
    }
});

const AddressInputType  = new GraphQLInputObjectType({
    name : 'AddressInput',
    fields : {
        street: { type: new GraphQLNonNull(GraphQLString) },
        province: { type: new GraphQLNonNull(GraphQLString) },
        city: { type: new GraphQLNonNull(GraphQLString) },
        fullAddress:  { type: new GraphQLNonNull(GraphQLString) },
        isDefault: { type: GraphQLBoolean },
    }
});

module.exports = {
    AddressType,
    AddressInputType,
}