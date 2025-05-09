const { GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString, GraphQLInputObjectType, GraphQLBoolean } = require("graphql");

const AddressType = new GraphQLObjectType({
    name: "AddressType",
    fields: {
        _id: { type: GraphQLID },
        user: { type: GraphQLID },
        street: { type: new GraphQLNonNull(GraphQLString) },
        province: { type: new GraphQLNonNull(GraphQLString) },
        city: { type: new GraphQLNonNull(GraphQLString) },
        fullAddress: { type: GraphQLString },
        isDefault: { type: new GraphQLNonNull(GraphQLBoolean) },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString }
    }
});

const AddressInputType = new GraphQLInputObjectType({
    name: 'AddressInput',
    fields: {
        street: { type: new GraphQLNonNull(GraphQLString) },
        province: { type: new GraphQLNonNull(GraphQLString) },
        city: { type: new GraphQLNonNull(GraphQLString) },
        fullAddress: { type: new GraphQLNonNull(GraphQLString) },
        isDefault: { type: GraphQLBoolean }
    }
});

const UpdateAddressDefaultInputType = new GraphQLInputObjectType({
    name: 'UpdateAddressDefaultInput',
    fields: {
        addressId: { type: new GraphQLNonNull(GraphQLID) },
        isDefault: { type: new GraphQLNonNull(GraphQLBoolean) },
    },
});

module.exports = {
    AddressType,
    AddressInputType,
    UpdateAddressDefaultInputType
};