const { GraphQLString } = require("graphql");
const ContactModel = require('../../../../models/Contact');
const { ContactResponseType } = require("../types/contact.types");
const { validateToken } = require('../../../utils/authBackend');

// Create new contact
const submitContact = {
    type: ContactResponseType,
    args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        message: { type: GraphQLString },
        saveInfo: { type: GraphQLString },
    },
    resolve: async (_, args, { req }) => {
        try {
            // احراز هویت کاربر
            const user = await validateToken(req);
            if (!user) {
                return {
                    success: false,
                    message: "برای ارسال پیام لطفا ابتدا وارد حساب کاربری خود شوید",
                    contact: null,
                };
            }

            if (!["USER", "ADMIN"].includes(user.role)) {
                return {
                    success: false,
                    message: "برای ارسال پیام لطفا لاگین کنید",
                    contact: null,
                };
            }

            // Validate required fields
            if (!args.name || !args.email || !args.message) {
                return {
                    success: false,
                    message: "لطفا تمام فیلدهای الزامی را پر کنید",
                    contact: null,
                };
            }

            // اعتبارسنجی ایمیل
            const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g;
            if (!emailRegex.test(args.email)) {
                return {
                    success: false,
                    message: "لطفا ایمیل معتبر وارد کنید",
                    contact: null,
                };
            }

            // اعتبارسنجی نام (حداقل 2 کاراکتر)
            if (args.name.trim().length < 2) {
                return {
                    success: false,
                    message: "نام باید حداقل 2 کاراکتر باشد",
                    contact: null,
                };
            }

            // اعتبارسنجی پیام (حداقل 10 کاراکتر)
            if (args.message.trim().length < 10) {
                return {
                    success: false,
                    message: "پیام باید حداقل 10 کاراکتر باشد",
                    contact: null,
                };
            }

            // Convert saveInfo to boolean
            const saveInfo = args.saveInfo === "true";

            // Create new contact
            const contact = new ContactModel({
                name: args.name.trim(),
                email: args.email.trim().toLowerCase(),
                message: args.message.trim(),
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
                message: "پیام شما با موفقیت ارسال شد. به زودی با شما تماس خواهیم گرفت.",
                contact: contactToReturn,
            };

        } catch (error) {
            console.error('خطا در ارسال پیام تماس:', error);
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