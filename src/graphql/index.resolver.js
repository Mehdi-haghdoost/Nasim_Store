const { GraphQLObjectType, GraphQLSchema, GraphQLString } = require("graphql");
const { registerUser,
    sendOtp,
    confirmOtpAndRegister, } = require("./mutations/user.resolvers");
const { addProduct } = require("./mutations/product.resolvers");
const { addCategory } = require("./mutations/category.resolvers");


const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        hello: {
            type: GraphQLString,
            resolve() {
                return "Hello, World !"
            }
        }
    }
})

const RootMutation = new GraphQLObjectType({
    name: "RootMutation",
    fields: {
        registerUser,
        sendOtp,
        confirmOtpAndRegister,
        addProduct,
        addCategory
    },
});

const schema = new GraphQLSchema({
    mutation: RootMutation,
    query: RootQuery,
});

module.exports = schema;