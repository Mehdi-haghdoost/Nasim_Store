// src/graphql/server/queries/category.resolvers.js
const { GraphQLList } = require("graphql");
const CategoryModel = require("../../../../models/Category");
const ProductModel = require("../../../../models/Product"); // اضافه کردن مدل Product
const { CategoryType } = require("../types/category.types");

const getCategories = {
  type: new GraphQLList(CategoryType),
  resolve: async () => {
    try {
      return await CategoryModel.find({}).sort({ createdAt: -1 });
    } catch (error) {
      throw new Error(`خطا در گرفتن دسته‌بندی‌ها ${error.message}`);
    }
  }
};

// رزولور برای فیلد products در CategoryType
const CategoryResolvers = {
  Category: {
    products: async (parent) => {
      try {
        return await ProductModel.find({ category: parent._id });
      } catch (error) {
        throw new Error(`خطا در گرفتن محصولات دسته‌بندی: ${error.message}`);
      }
    }
  }
};

module.exports = {
  getCategories,
  CategoryResolvers
};