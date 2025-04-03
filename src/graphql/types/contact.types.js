const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean, GraphQLNonNull, GraphQLInputObjectType } = require("graphql");

const ContactType = new GraphQLObjectType({
    name: "Contact",
    description: "Contact form submission data",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: (GraphQLString) },
        email: { type: (GraphQLString) },
        message: { type: (GraphQLString) },
        saveInfo: { type: GraphQLBoolean },
        createdAt: { type: (GraphQLString) },
    })
});

const ContactInputType = new GraphQLInputObjectType({
    name: "ContactInput",
    description: "Input for contact form submission",
    fields: () => ({
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        message: { type: new GraphQLNonNull(GraphQLString) },
        saveInfo: { type: GraphQLBoolean },
    }),
});

// Contact Response Type for mutation responses
const ContactResponseType = new GraphQLObjectType({
    name: "ContactResponse",
    description: "Response for contact form submission",
    fields: () => ({
        success: { type: GraphQLBoolean },
        message: { type: GraphQLString },
        contact: { type: ContactType },
    }),
});

module.exports = {
    ContactType,
    ContactInputType,
    ContactResponseType,
};