const { GraphQLString, GraphQLBoolean } = require("graphql");
const { ContactResponseType } = require("../types/contact.types");

const ContactMutations = {
    submitContact: {
        type: ContactResponseType,
        args: {
            name: { type: GraphQLString },
            email: { type: GraphQLString },
            message: { type: GraphQLString },
            savedInfo: { type: GraphQLBoolean },
        },
        resolve: async (_, args) => {
            try {

                if (!args.name || !args.email || !args.message) {
                    throw new Error("لطفا تمام فیلدهای الزامی را پر کنید");
                }

                const savedInfo = args.savedInfo === "true";

                const contact = new Contact({
                    name: args.name,
                    email: args.email,
                    message: args.message,
                    savedInfo,
                });

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
        }
    }
};

module.exports = {
    ContactMutations,
};