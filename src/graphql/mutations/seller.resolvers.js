const { GraphQLNonNull } = require("graphql");
const { SellerType, SellerInputType } = require("../types/seller.types");
const { validateToken } = require("../../utils/auth");
const SellerModel = require("../../../models/Seller");

const addSeller = {
    type: SellerType,
    args: {
        input: { type: new GraphQLNonNull(SellerInputType) },
    },
    resolve: async (_, { index }, context) => {
        try {
            const user = await validateToken(context.req);
            if (!user) {
                throw new Error("احراز هویت نشده است")
            }

            if (user.role !== "ADMIN") {
                throw new Error("دسترسی لازم برای انجام این کار را ندارید")
            }

            const existingSeller = await SellerModel.findOne({ name: input.name });
            if (existingSeller) {
                throw new Error("فروشنده ایی با این نام قبلا ثبت نام کرده است")
            }

            const newSeller = new SellerModel({
                name: input.name,
                address: input.address || "",
                contactNumber: input.contactNumber,
                logo: input.logo,
                rating: input.rating || 0,
                product: input.product || [],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            })

            const savedSeller = await newSeller.save();

        } catch (error) {
            throw new Error(`خطا در ایجاد فروشنده  ${error.message}`)
        }
    }
};

module.exports = {
    addSeller,
};