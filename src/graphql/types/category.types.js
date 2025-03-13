const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLID } = require("graphql");

const CategoryType = new GraphQLObjectType({
    name: "CategoryType",
    fields: () => ({
        _id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        icon: { type: new GraphQLNonNull(GraphQLString) },
        createdAt: { type: new GraphQLNonNull(GraphQLString) },
        updatedAt: { type: new GraphQLNonNull(GraphQLString) },
    })
});

const CategoryInputType = new GraphQLObjectType({
    name: "CategoryInput",
    fields: () => ({
        name: { type: new GraphQLNonNull(GraphQLString) },
        icon: { type: new GraphQLNonNull(GraphQLString) },
    })

})

module.exports = {
    CategoryType,
    CategoryInputType,
}