const { GraphQLNonNull, GraphQLList } = require("graphql");
const CategoryModel = require("../../../../models/Category");
const { CategoryType, CategoryInputType } = require("../types/category.types");
const { validateToken } = require("../../../utils/authBackend");


const addCategory = {
    type: CategoryType,
    args: {
        input: { type: new GraphQLNonNull(CategoryInputType) },
    },
    resolve: async (_, { input }, context) => {
        try {

            const user = await validateToken(context.req);
            if (!user) {
                throw new Error("احراز هویت نشده است")
            }

            if (user.role !== "ADMIN") {
                throw new Error("دسترسی لازم برای انجام این کار را ندارید")
            }

            const existingCategory = await CategoryModel.findOne({ name: input.name });
            if (existingCategory) {
                throw new Error(`دسته‌بندی با این نام قبلاً ثبت شده است`)
            }

            const newCategory = new CategoryModel({
                ...input,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            });

            const savedCategory = await newCategory.save();
            return savedCategory;

        } catch (error) {
            throw new Error(`خطا در ایجاد دسته بندی ${error.message}`)
        }
    }
};



module.exports = {
    addCategory,
};