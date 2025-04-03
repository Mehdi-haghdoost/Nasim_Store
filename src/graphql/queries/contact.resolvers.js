const { GraphQLList, GraphQLID } = require("graphql");
const { ContactType } = require("../types/contact.types");
const ContactModel = require('../../../models/Contact');

const ContactQueries = {
    type: new GraphQLList(ContactType),
    resolve: async () => {
        try {

            const contacts = await ContactModel.find().sort({ createdAt: -1 });
            return contacts;
        } catch (error) {
            throw new Error(`خطا در دریافت پیام: ${error.message}`);
        }
    },
    // Get contact by ID
    contact: {
        type: ContactType,
        args: {
            id: { type: GraphQLID },
        },
        resolve: async (_, { id }) => {
            try {
                const contact = await ContactModel.findById(id);
                if (!contact) {
                    throw new Error("پیام مورد نظر یافت نشد");
                };
                return contact;

            } catch (error) {
                throw new Error(`خطا در دریافت پیام: ${error.message}`);
            }
        }
    }
};

module.exports = {
    ContactQueries,
} 