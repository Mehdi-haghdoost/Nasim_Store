const { GraphQLEnumType, GraphQLObjectType, GraphQLID, GraphQLNonNull, GraphQLString, GraphQLFloat, GraphQLList } = require("graphql");
const { UserType } = require("./user.types");

const CommentStatusEnum = new GraphQLEnumType({
    name: "CommentStatus",
    values: {
        active: { value: "active" },
        pending: { value: "pending" },
        rejected: { value: "rejected" },
        archived: { value: "archived" },
    },
});

const CommentType = new GraphQLObjectType({
    name: "CommentType",
    fields: () => ({
        _id: { type: GraphQLID },
        user: { type: new GraphQLNonNull(UserType) },
        product: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        website: { type: GraphQLString },
        rating: { type: new GraphQLNonNull(GraphQLFloat) },
        commentText: { type: new GraphQLNonNull(GraphQLString) },
        strengths: { type: new GraphQLList(GraphQLString) },
        weaknesses: { type: new GraphQLList(GraphQLString) },
        status: { type: CommentStatusEnum },
        createdAt: { type: new GraphQLNonNull(GraphQLString) },
        updatedAt: { type: new GraphQLNonNull(GraphQLString) },
    }),
});

const CommentInputType = new GraphQLObjectType({
    name: "CommentInput",
    fields: () => ({
        user: { type: new GraphQLNonNull(GraphQLID) },
        product: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        website: { type: GraphQLString },
        rating: { type: new GraphQLNonNull(GraphQLFloat) },
        commentText: { type: new GraphQLNonNull(GraphQLString) },
        strengths: { type: new GraphQLList(GraphQLString) },
        weaknesses: { type: new GraphQLList(GraphQLString) },
        status: { type: CommentStatusEnum },
    }),
});

module.exports = {
    CommentInputType,
    CommentType,
};