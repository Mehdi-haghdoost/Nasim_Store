const { GraphQLObjectType, GraphQLSchema, GraphQLString } = require("graphql");
const { registerUser,
    sendOtp,
    confirmOtpAndRegister,
    refreshTokenMutation,
    loginUser,
    updateUserProfile, } = require("./mutations/user.resolvers");
const { addProduct } = require("./mutations/product.resolvers");
const { addCategory, getCategories } = require("./mutations/category.resolvers");
const { addSeller } = require("./mutations/seller.resolvers");
const { addComment, replyToComment } = require("./mutations/comment.resolvers");
const { getProductComments } = require("./queries/user.resolvers");
const { getAllAddress, linkExistingAddresses } = require("./queries/address.resolvers");
const { addNewAddress, deleteAddress, updateAddressDefault } = require("./mutations/address.resolvers");
const { createTicket, addMessageToTicket, closeTicket } = require("./mutations/ticket.resolver");
const { getUserTickets, getTicketById, getDepartments } = require("./queries/ticket.resolvers");


const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        getCategories,
        getProductComments,
        getAllAddress,
        linkExistingAddresses,
        getUserTickets,
        getTicketById,
        getDepartments,
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
        addComment,
        replyToComment,
        loginUser,
        updateUserProfile,
        addNewAddress,
        deleteAddress,
        updateAddressDefault,
        linkExistingAddresses,
        createTicket,
        addMessageToTicket,
        closeTicket,
    },
});

const schema = new GraphQLSchema({
    mutation: RootMutation,
    query: RootQuery,
});

module.exports = schema;