const ContactModel = require("../../models/Contact");
const { ContactResponseType } = require("../typeDefs/contact.types");
const { GraphQLString } = require("graphql");


// Create new contact
const submitContact = {
  type: ContactResponseType,
  args: {
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    message: { type: GraphQLString },
    saveInfo: { type: GraphQLString },
  },
  resolve: async (_, args) => {
    try {
      // Validate required fields
      if (!args.name || !args.email || !args.message) {
        throw new Error("لطفا تمام فیلدهای الزامی را پر کنید");
      }

      // Convert saveInfo to boolean
      const saveInfo = args.saveInfo === "true";

      // Create new contact
      const contact = new Contact({
        name: args.name,
        email: args.email,
        message: args.message,
        saveInfo,
      });

      // Save to database
      await contact.save();

      return {
        success: true,
        message: "پیام شما با موفقیت ارسال شد",
        contact,
      };
    } catch (error) {
      return {
        success: false,
        message: `خطا در ارسال پیام: ${error.message}`,
        contact: null,
      };
    }
  },
};

const ContactMutations = {
  submitContact
};

module.exports = {
  ContactMutations
};