const { GraphQLObjectType, GraphQLSchema, GraphQLString } = require("graphql");
const { registerUser } = require("./mutations/user.resolvers");


const RootQuery = new GraphQLObjectType({
    name : "RootQuery",
    fields : {
        hello : {
            type : GraphQLString,
            resolve () {
                return "Hello, World !"
            }
        }
    }
})

const RootMutation = new GraphQLObjectType({
    name: "RootMutation",
    fields: {
        registerUser
    },
});

const schema = new GraphQLSchema({
    mutation: RootMutation,
    query : RootQuery,
});

module.exports = schema;