const { GraphQLObjectType, GraphQLSchema, GraphQLString } = require("graphql");
const { registerUser,
    sendOtp,
    confirmOtpAndRegister,
    refreshTokenMutation, } = require("./mutations/user.resolvers");
const { addProduct } = require("./mutations/product.resolvers");
const { addCategory, getCategories } = require("./mutations/category.resolvers");
const { addSeller } = require("./mutations/seller.resolvers");


const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        getCategories
    }
})

const RootMutation = new GraphQLObjectType({
    name: "RootMutation",
    fields: {
        registerUser,
        sendOtp,
        confirmOtpAndRegister,
        addProduct,
        addCategory,
        addSeller,
        refreshTokenMutation,
    },
});

const schema = new GraphQLSchema({
    mutation: RootMutation,
    query: RootQuery,
});

module.exports = schema;