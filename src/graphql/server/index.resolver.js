const { GraphQLObjectType, GraphQLSchema, GraphQLString } = require("graphql");
const { registerUser, 
    sendOtp, 
    confirmOtpAndRegister, 
    refreshTokenMutation, 
    loginUser, 
    updateUserProfile, 
    logout, 
    sendOtpForLogin, 
    verifyOtpAndLogin,
} = require("./mutations/user.resolvers");
const { addProduct } = require("./mutations/product.resolvers");
const { addCategory } = require("./mutations/category.resolvers");
const { addSeller } = require("./mutations/seller.resolvers");
const { addComment, replyToComment, deleteComment } = require("./mutations/comment.resolvers");
const { getProductComments, getUserProfile, me, getUserComments } = require("./queries/user.resolvers");
const { getAllAddress, linkExistingAddresses } = require("./queries/address.resolvers");
const { addNewAddress, deleteAddress, updateAddressDefault, updateAddress } = require("./mutations/address.resolvers");
const { createTicket, addMessageToTicket, closeTicket } = require("./mutations/ticket.resolver");
const { getUserTickets, getTicketById, getDepartments } = require("./queries/ticket.resolvers");
const { addToWishlist, removeFromWishlist } = require("./mutations/wishlist.resolvers");
const { getUserWishlist, isInWishlist } = require("./queries/wishlist.resolvers");
const { addToCart, updateCartItem, removeFromCart, clearCart, syncGuestCart } = require("./mutations/cart.resolvers");
const { getUserCart } = require("./queries/cart.resolvers");
const { getContacts, getContactById } = require("./queries/contact.resolvers");
const { submitContact } = require("./mutations/contact.resolvers");
const { product, similarProducts, bestSellingProducts, products } = require("./queries/product.resolvers");
const { getCategories, CategoryResolvers } = require("./queries/category.resolvers");
 
// تعریف RootQuery فقط با queryهای واقعی (بدون resolvers)
const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        getCategories,
        getProductComments,
        getUserProfile,
        getAllAddress,
        linkExistingAddresses,
        getUserTickets,
        getTicketById,
        getDepartments,
        getUserWishlist,
        isInWishlist,
        getUserCart,
        getContacts,
        getContactById,
        product,
        similarProducts,
        bestSellingProducts,
        products,
        me,
        getUserComments,
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
        deleteComment,
        loginUser,
        updateUserProfile,
        addNewAddress,
        deleteAddress,
        updateAddressDefault,
        updateAddress,
        linkExistingAddresses,
        createTicket,
        addMessageToTicket,
        closeTicket,
        addToWishlist,
        removeFromWishlist,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        logout,
        submitContact,
        sendOtpForLogin,
        verifyOtpAndLogin,
        syncGuestCart,
    },
});

const schema = new GraphQLSchema({
    mutation: RootMutation,
    query: RootQuery,
});

module.exports = schema;