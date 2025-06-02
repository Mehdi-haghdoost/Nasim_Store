const {
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLInputObjectType,
    GraphQLBoolean,
  } = require("graphql");
  const CommentModel = require("../../../../models/Comment");
  const AddressModel = require("../../../../models/Address");
  const TicketModel = require("../../../../models/Ticket");
  
  const AddressType = new GraphQLObjectType({
    name: "Address",
    fields: () => ({
      _id: { type: GraphQLID },
      fullAddress: { type: GraphQLString },
      city: { type: GraphQLString },
      province: { type: GraphQLString },
      isDefault: { type: GraphQLBoolean },
    }),
  });
  
  const CommentType = new GraphQLObjectType({
    name: "Comment",
    fields: () => ({
      _id: { type: GraphQLID },
      content: { type: GraphQLString },
      product: { type: GraphQLID },
      user: { type: UserType }, // ارجاع به UserType
      isReply: { type: GraphQLBoolean },
      status: { type: GraphQLString },
      createdAt: { type: GraphQLString },
      updatedAt: { type: GraphQLString },
    }),
  });
  
  const UserType = new GraphQLObjectType({
    name: "UserType",
    fields: () => {
      const { TicketType } = require("./ticket.types");
      return {
        _id: { type: GraphQLID },
        username: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
        role: { type: GraphQLString },
        nationalId: { type: GraphQLString },
        postalCode: { type: GraphQLString },
        bio: { type: GraphQLString },
        addresses: {
          type: new GraphQLList(AddressType),
          resolve: async (parent) => {
            try {
              if (!parent.addresses || parent.addresses.length === 0) {
                return [];
              }
              const addresses = await AddressModel.find({
                _id: { $in: parent.addresses },
              });
              return addresses;
            } catch (error) {
              throw new Error(`خطا در بازیابی آدرس‌ها: ${error.message}`);
            }
          },
        },
        wishlist: { type: new GraphQLList(GraphQLString) },
        cart: { type: new GraphQLList(GraphQLString) },
        orderHistory: { type: new GraphQLList(GraphQLString) },
        orders: { type: new GraphQLList(GraphQLString) },
        discountCoupons: { type: new GraphQLList(GraphQLString) },
        dateOfBirth: { type: GraphQLString },
        comments: {
          type: new GraphQLList(CommentType),
          resolve: async (parent) => {
            try {
              if (!parent.comments || parent.comments.length === 0) {
                return [];
              }
              const comments = await CommentModel.find({
                _id: { $in: parent.comments },
              });
              return comments;
            } catch (error) {
              throw new Error(
                `خطا در بازیابی کامنت‌ها. لطفاً دوباره تلاش کنید. ${error.message}`
              );
            }
          },
        },
        tickets: {
          type: new GraphQLList(TicketType),
          resolve: async (parent) => {
            try {
              if (!parent.tickets || parent.tickets.length === 0) {
                return [];
              }
              const tickets = await TicketModel.find({
                _id: { $in: parent.tickets },
              });
              return tickets;
            } catch (error) {
              throw new Error(
                `خطا در بازیابی تیکت‌ها. لطفاً دوباره تلاش کنید. ${error.message}`
              );
            }
          },
        },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
      };
    },
  });
  
  const AuthType = new GraphQLObjectType({
    name: "AuthType",
    fields: {
      token: { type: GraphQLString },
      refreshToken: { type: GraphQLString },
      user: { type: UserType },
    },
  });
  
  const OtpType = new GraphQLObjectType({
    name: "OtpType",
    fields: {
      message: { type: GraphQLString },
    },
  });
  
  const UserProfileInputType = new GraphQLInputObjectType({
    name: "UserProfileInput",
    fields: {
      username: { type: GraphQLString },
      email: { type: GraphQLString },
      phone: { type: GraphQLString },
      nationalId: { type: GraphQLString },
      postalCode: { type: GraphQLString },
      bio: { type: GraphQLString },
    },
  });
  
  module.exports = {
    UserType,
    CommentType,
    AddressType,
    AuthType,
    OtpType,
    UserProfileInputType,
  };