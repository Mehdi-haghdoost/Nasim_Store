const { GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString, GraphQLInputObjectType, GraphQLBoolean } = require("graphql");

const AddressType = new GraphQLObjectType({
    name: "AddressType",
    fields: {
        _id: { type: GraphQLID },
        street: { type: new GraphQLNonNull(GraphQLString) },
        province: { type: new GraphQLNonNull(GraphQLString) },
        city: { type: new GraphQLNonNull(GraphQLString) },
        fullAddress: { type: GraphQLString },
        isDefault: { type: new GraphQLNonNull(GraphQLBoolean) },
        country: { type: GraphQLString, defaultValue: 'ایران' } // اضافه کردن فیلد country
    }
});

const AddressInputType = new GraphQLInputObjectType({
    name: 'AddressInput',
    fields: {
        street: { type: new GraphQLNonNull(GraphQLString) },
        province: { type: new GraphQLNonNull(GraphQLString) },
        city: { type: new GraphQLNonNull(GraphQLString) },
        fullAddress: { type: new GraphQLNonNull(GraphQLString) },
        isDefault: { type: GraphQLBoolean },
        country: { type: GraphQLString, defaultValue: 'ایران' } // اضافه کردن فیلد country
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
    UpdateAddressDefaultInputType,
};