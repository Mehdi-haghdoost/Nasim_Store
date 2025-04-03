
const { GraphQLString } = require("graphql");
const ContactModel = require('../../../models/Contact');
const { ContactResponseType } = require("../types/contact.types");


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
            const contact = new ContactModel({
                name: args.name,
                email: args.email,
                message: args.message,
                saveInfo,
            });

            // Save to database
            await contact.save();

            const contactToReturn = {
                id: contact._id,
                _id: contact._id,
                name: contact.name,
                email: contact.email,
                message: contact.message,
                saveInfo: contact.saveInfo,
                createdAt: contact.createdAt
            };
          
            return {
                success: true,
                message: "پیام شما با موفقیت ارسال شد",
                contact: contactToReturn,
            };

        } catch (error) {
            return {
                success: false,
                message: `خطا در ارسال پیام: ${error.message}`,
                contact: null,
            };
        }
    }
};

module.exports = {
    submitContact
};