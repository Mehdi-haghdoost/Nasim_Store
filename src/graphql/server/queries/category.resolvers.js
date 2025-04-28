const { GraphQLList } = require("graphql");
const CategoryModel = require("../../../../models/Category");
const { CategoryType } = require("../types/category.types");


const getCategories = {
    type: new GraphQLList(CategoryType),
    resolve: async () => {
        try {
            return await CategoryModel.find({}).sort({ createdAt: -1 });
        } catch (error) {
            throw new Error(`خطا در گرفتن دسته‌بندی‌ها ${error.message}`)
        }
    }
}


module.exports = {
    getCategories,
};